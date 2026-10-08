// src/utils/apiCache.ts
// In-memory global API response cache with direct Supabase BaaS SDK communication
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export interface TeamMember {
  name: string;
  position: string;
  academic_year: string;
  comment?: string | null;
  description?: string | null;
  image_url?: string | null;
}

export interface TeamDataResponse {
  festHeads: TeamMember[];
  executives: TeamMember[];
  heads: TeamMember[];
  coHeads: TeamMember[];
  headsAndCoheads: TeamMember[];
  advisoryCommittee: TeamMember[];
  organizingFaculty: TeamMember[];
}

export interface ClubDetailsResponse {
  id: string;
  name: string;
  eventName: string;
  eventDescription: string;
  learningOutcomes: string[];
  location: string;
}

export interface SponsorRecord {
  id: string;
  name: string;
  role: string;
  domain?: string | null;
  description?: string | null;
  image_url?: string | null;
  telemetry_status?: string | null;
  node_ref?: string | null;
  accent?: string | null;
  icon?: string | null;
  stats?: any;
  intel_overview?: string | null;
  intel_tracks?: any;
  intel_perks?: any;
  website_url?: string | null;
  display_order?: number | null;
}

interface CacheStore {
  teamData: TeamDataResponse | null;
  clubsData: Record<string, ClubDetailsResponse>;
  allClubs: any[] | null;
  sponsorsData: SponsorRecord[] | null;
}

const cacheStore: CacheStore = {
  teamData: null,
  clubsData: {},
  allClubs: null,
  sponsorsData: null,
};

// Comprehensive mapping for all short and long slug aliases used in the app
export const SLUG_TO_SR_NO: Record<string, number> = {
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

/**
 * Custom sort comparator for Advisory Committee
 * Order: Director first -> DD Mam -> DD Sir -> Alphabetical
 */
function sortAdvisory(a: TeamMember, b: TeamMember): number {
  const getWeight = (name: string): number => {
    const lower = (name || "").toLowerCase();
    if (lower.includes("director") && !lower.includes("deputy") && !lower.includes("dd")) return 1;
    if (lower.includes("dd mam") || lower.includes("dd ma")) return 2;
    if (lower.includes("dd sir")) return 3;
    return 4;
  };

  const weightA = getWeight(a.name);
  const weightB = getWeight(b.name);
  if (weightA !== weightB) return weightA - weightB;
  return (a.name || "").localeCompare(b.name || "");
}

/**
 * Custom sort comparator for Organizing Faculty
 * Order: Sankit -> Sameer -> Alphabetical
 */
function sortFaculty(a: TeamMember, b: TeamMember): number {
  const getWeight = (name: string): number => {
    const lower = (name || "").toLowerCase();
    if (lower.includes("sankit")) return 1;
    if (lower.includes("sameer")) return 2;
    return 3;
  };

  const weightA = getWeight(a.name);
  const weightB = getWeight(b.name);
  if (weightA !== weightB) return weightA - weightB;
  return (a.name || "").localeCompare(b.name || "");
}

/**
 * Fetches team data directly from Supabase BaaS REST API with in-memory caching.
 * Prevents redundant queries when navigating between views.
 */
export async function getTeamDataCached(forceRefresh = false): Promise<TeamDataResponse> {
  if (!forceRefresh && cacheStore.teamData) {
    return cacheStore.teamData;
  }

  if (!isSupabaseConfigured()) {
    console.warn("Supabase credentials not fully configured; attempting query or returning empty structure.");
  }

  const [
    festHeadsRes,
    executivesRes,
    headsRes,
    coheadsRes,
    headsAndCoheadsRes,
    advisoryRes,
    organizingFacultyRes,
  ] = await Promise.all([
    supabase
      .from("fest_heads")
      .select("name, position, academic_year, comment, description, image_url")
      .order("name", { ascending: true }),
    supabase
      .from("executives")
      .select("name, position, academic_year, comment, description, image_url")
      .order("name", { ascending: true }),
    supabase
      .from("heads")
      .select("name, position, academic_year, comment, description, image_url")
      .order("name", { ascending: true }),
    supabase
      .from("coheads")
      .select("name, position, academic_year, comment, description, image_url")
      .order("name", { ascending: true }),
    supabase
      .from("heads_and_coheads")
      .select("name, position, academic_year, comment, description, image_url")
      .order("name", { ascending: true }),
    supabase
      .from("advisory_committee")
      .select("name, position, academic_year, comment, description, image_url"),
    supabase
      .from("organizing_faculty")
      .select("name, position, academic_year, comment, description, image_url"),
  ]);

  if (festHeadsRes.error && executivesRes.error) {
    throw new Error(
      festHeadsRes.error?.message ||
        executivesRes.error?.message ||
        "Failed to query team members from Supabase"
    );
  }

  // Resolve heads & coheads with backward compatibility fallback
  let headsRows: TeamMember[] = (headsRes.data as TeamMember[]) || [];
  let coHeadsRows: TeamMember[] = (coheadsRes.data as TeamMember[]) || [];

  if (headsRows.length === 0 && coHeadsRows.length === 0 && headsAndCoheadsRes.data) {
    const all = (headsAndCoheadsRes.data as TeamMember[]) || [];
    headsRows = all.filter((m) => !/co[- ]?head/i.test(m.position || ""));
    coHeadsRows = all.filter((m) => /co[- ]?head/i.test(m.position || ""));
  }

  // Apply custom ordering
  const advisorySorted: TeamMember[] = ((advisoryRes.data as TeamMember[]) || []).sort(sortAdvisory);
  const facultySorted: TeamMember[] = ((organizingFacultyRes.data as TeamMember[]) || []).sort(sortFaculty);

  const teamData: TeamDataResponse = {
    festHeads: (festHeadsRes.data as TeamMember[]) || [],
    executives: (executivesRes.data as TeamMember[]) || [],
    heads: headsRows,
    coHeads: coHeadsRows,
    headsAndCoheads: [...headsRows, ...coHeadsRows],
    advisoryCommittee: advisorySorted,
    organizingFaculty: facultySorted,
  };

  cacheStore.teamData = teamData;
  return teamData;
}

/**
 * Fetches club event details directly from Supabase BaaS REST API with in-memory caching.
 */
export async function getClubDetailsCached(
  clubId: string,
  forceRefresh = false
): Promise<ClubDetailsResponse> {
  const cleanId = (clubId || "").toLowerCase().replace(/[\/\s]/g, "-");
  const cacheKey = cleanId;

  if (!forceRefresh && cacheStore.clubsData[cacheKey]) {
    return cacheStore.clubsData[cacheKey];
  }

  const srNo = SLUG_TO_SR_NO[cleanId] || SLUG_TO_SR_NO[clubId.toLowerCase()] || 0;
  const searchPattern = `%${cleanId.replace(/-/g, "%")}%`;

  let query = supabase
    .from("symbitech_event_details")
    .select("sr_no, club_name, event_name, learning_outcome, event_description, preferred_location");

  if (srNo > 0) {
    query = query.or(`sr_no.eq.${srNo},club_name.ilike.${searchPattern}`);
  } else {
    query = query.ilike("club_name", searchPattern);
  }

  const { data, error } = await query.order("sr_no", { ascending: true }).limit(1);

  if (error) {
    throw new Error(`Supabase query error: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error(`Club event for ID '${clubId}' not found in Supabase database`);
  }

  const event = data[0];
  const outcomes = event.learning_outcome
    ? (event.learning_outcome as string)
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
    : [];

  const formatted: ClubDetailsResponse = {
    id: clubId,
    name: event.club_name,
    eventName: event.event_name || `${event.club_name} Event`,
    eventDescription:
      event.event_description || "Detailed event specifications available in ChronoNexia portal.",
    learningOutcomes:
      outcomes.length > 0
        ? outcomes
        : [
            "Understanding core concepts and methodologies of the domain",
            "Collaborating in teams to build innovative solutions",
            "Developing real-world problem-solving skills under professional guidance",
          ],
    location: event.preferred_location || "TBD - ChronoNexia Venue",
  };

  cacheStore.clubsData[cacheKey] = formatted;
  return formatted;
}

/**
 * Fetches all clubs from symbitech_event_details via Supabase BaaS.
 */
export async function getAllClubsCached(forceRefresh = false): Promise<any[]> {
  if (!forceRefresh && cacheStore.allClubs) {
    return cacheStore.allClubs;
  }

  const { data, error } = await supabase
    .from("symbitech_event_details")
    .select("sr_no, club_name, event_name, learning_outcome, event_description, preferred_location")
    .order("sr_no", { ascending: true });

  if (error) {
    throw new Error(`Failed to query all clubs: ${error.message}`);
  }

  const mapped = (data || []).map((row) => ({
    sr_no: row.sr_no,
    name: row.club_name,
    event_name: row.event_name,
    learning_outcome: row.learning_outcome,
    event_description: row.event_description,
    location: row.preferred_location,
  }));

  cacheStore.allClubs = mapped;
  return mapped;
}

/**
 * Fetches sponsor records directly from Supabase BaaS REST API with in-memory caching.
 */
export async function getSponsorsDataCached(forceRefresh = false): Promise<SponsorRecord[]> {
  if (!forceRefresh && cacheStore.sponsorsData) {
    return cacheStore.sponsorsData;
  }

  const { data, error } = await supabase
    .from("sponsors")
    .select(
      "id, name, role, domain, description, image_url, telemetry_status, node_ref, accent, icon, stats, intel_overview, intel_tracks, intel_perks, website_url, display_order"
    )
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Supabase query error: ${error.message}`);
  }

  cacheStore.sponsorsData = (data as SponsorRecord[]) || [];
  return cacheStore.sponsorsData;
}
