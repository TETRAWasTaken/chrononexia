-- ============================================================================
-- Supabase Row Level Security (RLS) & Public Read Access Policies
-- Run this script in the Supabase SQL Editor (Dashboard > SQL Editor)
-- This grants public read permissions to the anon key for ChronoNexia's BaaS client
-- ============================================================================

-- 1. symbitech_event_details
ALTER TABLE IF EXISTS symbitech_event_details ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on symbitech_event_details" ON symbitech_event_details;
CREATE POLICY "Allow public read access on symbitech_event_details"
  ON symbitech_event_details FOR SELECT
  TO anon, authenticated
  USING (true);

-- 2. fest_heads
ALTER TABLE IF EXISTS fest_heads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on fest_heads" ON fest_heads;
CREATE POLICY "Allow public read access on fest_heads"
  ON fest_heads FOR SELECT
  TO anon, authenticated
  USING (true);

-- 3. executives
ALTER TABLE IF EXISTS executives ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on executives" ON executives;
CREATE POLICY "Allow public read access on executives"
  ON executives FOR SELECT
  TO anon, authenticated
  USING (true);

-- 4. heads
ALTER TABLE IF EXISTS heads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on heads" ON heads;
CREATE POLICY "Allow public read access on heads"
  ON heads FOR SELECT
  TO anon, authenticated
  USING (true);

-- 5. coheads
ALTER TABLE IF EXISTS coheads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on coheads" ON coheads;
CREATE POLICY "Allow public read access on coheads"
  ON coheads FOR SELECT
  TO anon, authenticated
  USING (true);

-- 6. heads_and_coheads
ALTER TABLE IF EXISTS heads_and_coheads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on heads_and_coheads" ON heads_and_coheads;
CREATE POLICY "Allow public read access on heads_and_coheads"
  ON heads_and_coheads FOR SELECT
  TO anon, authenticated
  USING (true);

-- 7. advisory_committee
ALTER TABLE IF EXISTS advisory_committee ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on advisory_committee" ON advisory_committee;
CREATE POLICY "Allow public read access on advisory_committee"
  ON advisory_committee FOR SELECT
  TO anon, authenticated
  USING (true);

-- 8. organizing_faculty
ALTER TABLE IF EXISTS organizing_faculty ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on organizing_faculty" ON organizing_faculty;
CREATE POLICY "Allow public read access on organizing_faculty"
  ON organizing_faculty FOR SELECT
  TO anon, authenticated
  USING (true);

-- 9. sponsors
ALTER TABLE IF EXISTS sponsors ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on sponsors" ON sponsors;
CREATE POLICY "Allow public read access on sponsors"
  ON sponsors FOR SELECT
  TO anon, authenticated
  USING (true);

-- Grant schema usage to anon role
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
