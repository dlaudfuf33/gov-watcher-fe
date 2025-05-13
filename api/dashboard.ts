import { clientAxios, serverAxios } from "@/api/axios";
import { DemographicStat } from "@/types/DemographicStat.types";
import { CategoryStat } from "@/types/CategoryStat.types";
import { PartyDistribution } from "@/types/Bution.types";
import { ParliamentStat } from "@/types/parliamentStats.types";

export interface ParliamentStatsResponse {
  data: {
    currentSession: number;
    parliamentStat: ParliamentStat[];
  };
}

export interface PartyDistributionResponse {
  data: PartyDistribution;
}

export interface CommitteeStatsResponse {
  data: CategoryStat;
}

export interface DemographicStatsResponse {
  data: DemographicStat;
}

export const dashboardApi = {
  getParliamentStats: async (): Promise<ParliamentStatsResponse> => {
    try {
      const res = await clientAxios.get("/v1/dashboard/parliament-stats");
      return res.data;
    } catch (error) {
      console.error("parliament-stats 조회 실패:", error);
      return {
        data: {
          currentSession: 0,
          parliamentStat: [],
        },
      };
    }
  },

  getPartyDistribution: async (): Promise<PartyDistributionResponse> => {
    try {
      const res = await clientAxios.get("/v1/dashboard/party-distribution");
      return res.data;
    } catch (error) {
      console.error("parliament-stats 조회 실패:", error);
      return {
        data: { currentSession: 0, partyData: [] },
      };
    }
  },

  getCommitteeStats: async (): Promise<CommitteeStatsResponse> => {
    try {
      const res = await clientAxios.get("/v1/dashboard/committee-stats");
      return res.data;
    } catch (error) {
      console.error("committee-stats 조회 실패:", error);
      return {
        data: { total: 0, categories: [] },
      };
    }
  },

  getPartyBillStats: async (): Promise<CommitteeStatsResponse> => {
    try {
      const res = await clientAxios.get("/v1/dashboard/partybill-stats");
      return res.data;
    } catch (error) {
      console.error("partybill-stats 조회 실패:", error);
      return {
        data: { total: 0, categories: [] },
      };
    }
  },

  getDemographicStats: async (): Promise<DemographicStatsResponse> => {
    try {
      const res = await clientAxios.get("/v1/dashboard/demographic-stats");
      return res.data;
    } catch (error) {
      console.error("demographic-stats 조회 실패:", error);
      return {
        data: { labels: [], male: [], female: [] },
      };
    }
  },
};
