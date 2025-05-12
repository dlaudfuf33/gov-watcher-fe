export {};
import { clientAxios, serverAxios } from "@/api/axios";
import { ProposerGroup } from "@/types/notice.types";

export interface Legislation {
  id: number;
  title: string;
  proposer: string;
  party: string;
  date: string;
  opinionCounts: number;
  agreeRatio: number;
  disagreeRatio: number;
  daysLeft: number;
  opinionUrl: string;
  detailUrl: string;
}

export interface LegislationDetail {
  id: number;
  billNo: string;
  title: string;
  summary: string;
  opinionCounts: number;
  daysLeft: number;
  mainProposer: string;
  mainProposerParty: string;
  mainProposerImageUrl?: string;
  proposers: ProposerGroup[];
  proposerDate: Date;
  committee: string;
  agree: number;
  disagree: number;
  agreeRatio: number;
  disagreeRatio: number;
  detailUrl: string;
  opinionUrl: string;
}

export const legislationApi = {
  // 입법예고안 리스트 조회
  getLegislations: async ({
    page,
    size,
    primarySort,
    secondarySort = "NONE",
    isServer = false,
  }: {
    page: number;
    size: number;
    primarySort: string;
    secondarySort?: string;
    isServer?: boolean;
  }): Promise<{ data: Legislation[]; total: number }> => {
    try {
      const axiosInstance = isServer ? serverAxios : clientAxios;
      const response = await axiosInstance.get("/v1/legislations/notices", {
        params: { page, size, primarySort, secondarySort },
      });
      return {
        data: response.data.content,
        total: response.data.totalElements,
      };
    } catch (error) {
      console.error("입법예고안 조회 실패:", error);
      return { data: [], total: 0 };
    }
  },

  // 입법예고안 상세 조회
  getLegislationDetail: async (id: number): Promise<LegislationDetail> => {
    try {
      const response = await serverAxios.get(`/v1/legislations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`입법예고안 상세 조회 실패 (ID: ${id}):`, error);
      return {
        id: 0,
        billNo: "",
        title: "",
        summary: "",
        daysLeft: 0,
        mainProposer: "",
        mainProposerParty: "",
        mainProposerImageUrl: "",
        proposers: [],
        proposerDate: new Date(),
        committee: "",
        opinionCounts: 0,
        agree: 0,
        disagree: 0,
        agreeRatio: 0,
        disagreeRatio: 0,
        detailUrl: "",
        opinionUrl: "",
      };
    }
  },
};
