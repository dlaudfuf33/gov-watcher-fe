export {};
import axios from "@/api/axios";
import { ProposerGroup } from "@/types/notice.types";

// 타입 정의
export interface Legislation {
  id: number;
  title: string;
  proposer: string;
  proposers: [];
  party: string;
  date: string;
  opinionCounts: number;
  views: number;
  agree: number;
  oppose: number;
  daysLeft: number;
  category?: string;
  opinionUrl: string;
}

export interface LegislationDetail {
  id: number;
  billNo: string;
  title: string;
  summary: string;
  views: number;
  opinionCounts: number;
  daysLeft: number;
  mainProposer: string;
  mainProposerParty: string;
  mainProposerImageUrl?: string;
  proposers: ProposerGroup[];
  proposerDate: Date;
  category: string;
  committee: string;
  agreeRatio: number;
  opposeRatio: number;
  detailUrl: string;
  opinionUrl: string;
}

// API 함수
export const legislationApi = {
  // 인기 입법예고안 조회 (페이지네이션, 정렬 지원)
  getPopularLegislations: async ({
    page,
    limit,
    sortBy,
  }: {
    page: number;
    limit: number;
    sortBy: string;
  }): Promise<{ data: Legislation[]; total: number }> => {
    try {
      const response = await axios.get("/legislations/popular", {
        params: { page, limit, sortBy },
      });
      return {
        data: response.data.items,
        total: response.data.total,
      };
    } catch (error) {
      console.error("인기 입법예고안 조회 실패:", error);
      return { data: [], total: 0 };
    }
  },

  // 마감 임박 입법예고안 조회 (동적 정렬/페이징 지원)
  getDeadlineLegislations: async ({
    page,
    limit,
    sortBy,
  }: {
    page: number;
    limit: number;
    sortBy: string;
  }): Promise<{ data: Legislation[]; total: number }> => {
    try {
      const response = await axios.get("/legislations/deadline", {
        params: { page, limit, sortBy },
      });

      return {
        data: response.data.items,
        total: response.data.total,
      };
    } catch (error) {
      console.error("마감 임박 입법예고안 조회 실패:", error);
      return { data: [], total: 0 };
    }
  },

  // 카테고리별 입법예고안 조회
  getCategoryLegislations: async (category: string): Promise<Legislation[]> => {
    try {
      const response = await axios.get(`/legislations/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(`${category} 카테고리 입법예고안 조회 실패:`, error);
      return [];
    }
  },

  // 입법예고안 상세 조회
  getLegislationDetail: async (id: number): Promise<LegislationDetail> => {
    try {
      const response = await axios.get(`/legislations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`입법예고안 상세 조회 실패 (ID: ${id}):`, error);
      return {
        id: 0,
        billNo: "",
        title: "",
        summary: "",
        views: 0,
        daysLeft: 0,
        mainProposer: "",
        mainProposerParty: "",
        mainProposerImageUrl: "",
        proposers: [],
        proposerDate: new Date(),
        category: "",
        committee: "",
        opinionCounts: 0,
        agreeRatio: 0,
        opposeRatio: 0,
        detailUrl: "",
        opinionUrl: "",
      };
    }
  },

  // 전체 입법예고안 목록 조회 (페이지네이션, 정렬 지원)
  getLegislations: async (
    page = 1,
    limit = 10,
    sortBy = "date",
    category?: string
  ): Promise<{ data: Legislation[]; total: number }> => {
    try {
      const params = { page, limit, sortBy, ...(category && { category }) };
      const response = await axios.get("/legislations", { params });
      return {
        data: response.data.items,
        total: response.data.total,
      };
    } catch (error) {
      console.error("입법예고안 목록 조회 실패:", error);
      return { data: [], total: 0 };
    }
  },
};
