import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (.env file if present, fallback to container/system process.env)
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log("📄 Loaded environment variables from local .env file.");
} else {
  console.log("ℹ️ No .env file found. Reading environment variables directly from system/container environment (process.env).");
}

const app = express();

// Server environment configuration
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

// Enable CORS and JSON parsing
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Initialize PostgreSQL Connection Pool
const { Pool } = pg;

const rawDbUrl = process.env.DATABASE_URL;
const isSSL = process.env.DATABASE_SSL === "true" || (rawDbUrl && (rawDbUrl.includes("supabase.co") || rawDbUrl.includes("sslmode=")));
// Strip query parameters from connectionString so pg does not enforce strict sslmode validation overriding rejectUnauthorized: false
const cleanDbUrl = rawDbUrl ? rawDbUrl.split("?")[0] : null;

const dbConfig = cleanDbUrl
  ? {
      connectionString: cleanDbUrl,
      ssl: isSSL ? { rejectUnauthorized: false } : false,
    }
  : {
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      host: process.env.DB_HOST || "127.0.0.1",
      port: parseInt(process.env.DB_PORT || "5432", 10),
      database: process.env.DB_NAME || "chrononexia",
      ssl: isSSL ? { rejectUnauthorized: false } : false,
    };

const pool = new Pool(dbConfig);

// Test Database Connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Failed to connect to local PostgreSQL database:", err.message);
    console.log(`⚠️ Running backend in offline/fallback-ready mode. Ensure Postgres is accessible on ${process.env.DB_HOST || "127.0.0.1"}:${process.env.DB_PORT || "5432"}.`);
  } else {
    console.log("✅ Successfully connected to local PostgreSQL database.");
    release();
  }
});

// ============================================================================
// API Endpoints & Health Check
// ============================================================================

// Health check endpoint for cloud load balancers and container probes
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Comprehensive mapping for all short and long slug aliases used in the app
const SLUG_TO_SR_NO = {
  "codex": 1,
  "codex-club": 1,
  "matheletes": 2,
  "mathelete-club": 2,
  "ieee": 3,
  "ieee-sit-student-branch": 3,
  "ai-club": 4,
  "ai": 4,
  "sqc": 5,
  "symbiosis-quantum-club": 5,
  "rotonity": 6,
  "rotonity-club": 6,
  "foss": 7,
  "foss-club": 7,
  "antariksh": 8,
  "antriksh-club": 8,
  "edc": 9,
  "electronics-design-club": 9,
  "mesa": 10,
  "gdsc": 11,
  "google-developer-students-club": 11,
  "sec": 12,
  "epic": 12,
  "symbiosis-economic-club": 12,
  "arvr": 13,
  "arvr-club": 13,
  "ar-vr-club": 13,
  "varsity-care": 14,
  "v@rsity-care": 14,
  "cess": 15,
  "civil-engineering-society": 15,
  "acm": 1,
  "acm-student-chapter": 1,
};

// 1. Get All Clubs
app.get("/api/clubs", async (req, res) => {
  try {
    const query = `
      SELECT 
        sr_no,
        club_name as name,
        event_name,
        learning_outcome,
        event_description,
        preferred_location as location
      FROM symbitech_event_details
      ORDER BY sr_no ASC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching all clubs:", err);
    res.status(500).json({ error: "Database error querying all clubs" });
  }
});

// 2. Get Club Details by ID (slug)
app.get("/api/clubs/:id", async (req, res) => {
  const { id } = req.params;
  const cleanId = id.toLowerCase().replace(/[\/\s]/g, "-");
  const srNo = SLUG_TO_SR_NO[cleanId] || SLUG_TO_SR_NO[id.toLowerCase()] || 0;

  try {
    const query = `
      SELECT 
        sr_no,
        club_name as name,
        event_name,
        learning_outcome,
        event_description,
        preferred_location as location
      FROM symbitech_event_details
      WHERE sr_no = $1 OR LOWER(club_name) LIKE $2
      ORDER BY sr_no ASC
      LIMIT 1
    `;
    const searchPattern = `%${cleanId.replace(/-/g, "%")}%`;
    const result = await pool.query(query, [srNo, searchPattern]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Event for ID '${id}' not found in DB` });
    }

    const event = result.rows[0];

    // Split text by newlines and clean up items
    const outcomes = event.learning_outcome
      ? event.learning_outcome.split('\n').map(line => line.trim()).filter(line => line.length > 0)
      : [];

    // Format matches Frontend's ClubDetailsData schema
    res.json({
      id: id,
      name: event.name,
      eventName: event.event_name || `${event.name} Event`,
      eventDescription: event.event_description || "Detailed event specifications available in ChronoNexia portal.",
      learningOutcomes: outcomes.length > 0 ? outcomes : [
        "Understanding core concepts and methodologies of the domain",
        "Collaborating in teams to build innovative solutions",
        "Developing real-world problem-solving skills under professional guidance"
      ],
      location: event.location || "TBD - ChronoNexia Venue",
    });
  } catch (err) {
    console.error(`Error querying club details for '${id}' (sr_no: ${srNo}):`, err);
    res.status(500).json({ error: "Database error querying club details" });
  }
});

// 3. Get Team Members (Fest Heads, Executives, Heads, Co-Heads)
app.get("/api/team", async (req, res) => {
  try {
    const festHeadsRes = await pool.query(
      "SELECT name, position, academic_year, comment, description, image_url FROM fest_heads ORDER BY name ASC"
    );
    const executivesRes = await pool.query(
      "SELECT name, position, academic_year, comment, description, image_url FROM executives ORDER BY name ASC"
    );

    let headsRows = [];
    let coHeadsRows = [];

    try {
      const headsRes = await pool.query(
        "SELECT name, position, academic_year, comment, description, image_url FROM heads ORDER BY name ASC"
      );
      const coheadsRes = await pool.query(
        "SELECT name, position, academic_year, comment, description, image_url FROM coheads ORDER BY name ASC"
      );
      headsRows = headsRes.rows;
      coHeadsRows = coheadsRes.rows;
    } catch (tblErr) {
      const headsAndCoheadsRes = await pool.query(
        "SELECT name, position, academic_year, comment, description, image_url FROM heads_and_coheads ORDER BY name ASC"
      );
      const allRows = headsAndCoheadsRes.rows || [];
      headsRows = allRows.filter((m) => !/co[- ]?head/i.test(m.position || ""));
      coHeadsRows = allRows.filter((m) => /co[- ]?head/i.test(m.position || ""));
    }

    res.json({
      festHeads: festHeadsRes.rows,
      executives: executivesRes.rows,
      heads: headsRows,
      coHeads: coHeadsRows,
      headsAndCoheads: [...headsRows, ...coHeadsRows],
    });
  } catch (err) {
    console.error("Error querying team members from DB:", err);
    res.status(500).json({ error: "Database error querying team members" });
  }
});

// ============================================================================
// Production Client Hosting (Serving Built Vite Static Assets)
// ============================================================================

// Serve assets from src/assets (e.g., /src/assets/Photoshoot/...) with 1 day browser caching
app.use("/src/assets", express.static(path.join(__dirname, "src/assets"), { maxAge: "1d" }));

// Serve the compiled build output from Vite with static caching
app.use(express.static(path.join(__dirname, "dist"), { maxAge: "1d" }));

// SPA fallback: Route all non-API GET requests to index.html
app.get(/(.*)/, (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start Express Listener
app.listen(PORT, HOST, () => {
  console.log(`ChronoNexia API running on http://${HOST === "0.0.0.0" ? "localhost" : HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
