// src/utils/apiCache.ts
// In-memory global API response cache to prevent redundant backend network pings

interface CacheStore {
  teamData: any | null;
  clubsData: Record<string, any>;
}

const cacheStore: CacheStore = {
  teamData: null,
  clubsData: {},
};

/**
 * Fetches team data from /api/team with in-memory caching.
 * Prevents re-querying backend when navigating between pages.
 */
export async function getTeamDataCached(forceRefresh = false): Promise<any> {
  if (!forceRefresh && cacheStore.teamData) {
    return cacheStore.teamData;
  }

  const res = await fetch("/api/team");
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} - Unable to fetch team from DB`);
  }
  const data = await res.json();
  cacheStore.teamData = data;
  return data;
}

/**
 * Fetches club event details from /api/clubs/:id with in-memory caching.
 */
export async function getClubDetailsCached(clubId: string, forceRefresh = false): Promise<any> {
  const cacheKey = clubId.toLowerCase();
  if (!forceRefresh && cacheStore.clubsData[cacheKey]) {
    return cacheStore.clubsData[cacheKey];
  }

  const res = await fetch(`/api/clubs/${clubId}`);
  if (!res.ok) {
    throw new Error(`Club '${clubId}' not found in DB`);
  }
  const data = await res.json();
  cacheStore.clubsData[cacheKey] = data;
  return data;
}
