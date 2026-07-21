import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Initialize PostgreSQL Connection Pool
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:postgres@127.0.0.1:5432/chrononexia",
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
});

// Test Database Connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Failed to connect to local PostgreSQL database:", err.message);
    console.log("⚠️ Running backend in offline/fallback-ready mode. Ensure Postgres is running on 127.0.0.1:5432.");
  } else {
    console.log("✅ Successfully connected to local PostgreSQL database.");
    release();
  }
});

// ============================================================================
// API Endpoints
// ============================================================================

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

// ============================================================================
// Production Client Hosting (Serving Built Vite Static Assets)
// ============================================================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the compiled build output from Vite
app.use(express.static(path.join(__dirname, "dist")));

// SPA fallback: Route all non-API GET requests to index.html
app.get(/(.*)/, (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start Express Listener
app.listen(PORT, () => {
  console.log(`🚀 ChronoNexia HTTPS API routing online on port ${PORT}`);
  console.log(`🔗 Proxy dev routes pointing to http://localhost:${PORT}`);
});
