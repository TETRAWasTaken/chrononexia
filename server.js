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
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
});

// Test Database Connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Failed to connect to local PostgreSQL database:", err.message);
    console.log("⚠️  Running backend in offline/fallback-ready mode. Ensure Postgres is running on the target port.");
  } else {
    console.log("✅ Successfully connected to local PostgreSQL database.");
    release();
  }
});

// ============================================================================
// API Endpoints
// ============================================================================

const SLUG_TO_SR_NO = {
  "codex-club": 1,
  "mathelete-club": 2,
  "ieee-sit-student-branch": 3,
  "ai-club": 4,
  "symbiosis-quantum-club": 5,
  "rotonity-club": 6,
  "foss-club": 7,
  "antriksh-club": 8,
  "electronics-design-club": 9,
  "mesa": 10,
  "google-developer-students-club": 11,
  "symbiosis-economic-club": 12,
  "ar/vr-club": 13,
  "v@rsity-care": 14,
  "civil-engineering-society": 15
};

// 1. Get Club Details by ID (slug)
app.get("/api/clubs/:id", async (req, res) => {
  const { id } = req.params;
  const srNo = SLUG_TO_SR_NO[id];

  if (!srNo) {
    return res.status(404).json({ error: `Club with ID '${id}' not found in event schema` });
  }

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
      WHERE sr_no = $1
    `;
    const result = await pool.query(query, [srNo]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Event with SR_NO '${srNo}' not found in DB` });
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
      eventDescription: event.event_description,
      learningOutcomes: outcomes,
      location: event.location,
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
app.get(/.*/, (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start Express Listener
app.listen(PORT, () => {
  console.log(`🚀 ChronoNexia HTTPS API routing online on port ${PORT}`);
  console.log(`🔗 Proxy dev routes or configure Cloudflare Tunnel pointing to http://localhost:${PORT}`);
});
