import type {
  ParliamentStatsResponse,
  PartyDistributionResponse,
  CategoryStatsResponse,
  DemographicStatsResponse,
} from "@/api/home/Home.types";

export function getParliamentStatsFallback(): ParliamentStatsResponse {
  return {
    data: {
      currentSession: 0,
      parliamentStat: [],
    },
  };
}

export function getPartyDistributionFallback(): PartyDistributionResponse {
  return {
    data: { currentSession: 0, partyData: [] },
  };
}

export function getCategoryStatsFallback(): CategoryStatsResponse {
  return {
    data: { total: 0, categories: [] },
  };
}

export function getDemographicStatsFallback(): DemographicStatsResponse {
  return {
    data: { labels: [], male: [], female: [] },
  };
}
