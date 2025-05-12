import { clientAxios, serverAxios } from "@/api/axios";
import { PoliticianNetworkData } from "@/types/PoliticianJointNetwork.types";
import { Politician, PoliticianDetail } from "@/types/politiciansType";

export interface PoliticianResponse {
  data: Politician[];
  total: number;
}

export interface PoliticianDetailResponse {
  data: PoliticianDetail;
}

export interface PoliticianNetworkDataResponse {
  data: PoliticianNetworkData;
}

export const politicianApi = {
  getPoliticiansList: async ({
    page = 1,
    size = 20,
    name = "",
    party = "",
    district = "",
    sort = "bills",
    isServer = false,
  }: {
    page?: number;
    size?: number;
    name?: string;
    party?: string;
    district?: string;
    sort?: string;
    isServer?: boolean;
  }): Promise<PoliticianResponse> => {
    try {
      const axiosInstance = isServer ? serverAxios : clientAxios;
      const res = await axiosInstance.get("/v1/politicians", {
        params: { page, size, name, party, district, sort },
      });
      return res.data;
    } catch (error) {
      console.error("❌ Failed to fetch politicians:", error);
      return { data: [], total: 0 };
    }
  },

  getPoliticianById: async ({
    politicianID,
    isServer,
  }: {
    politicianID: number;
    isServer: boolean;
  }): Promise<PoliticianDetail> => {
    try {
      const axiosInstance = isServer ? serverAxios : clientAxios;
      const res = await axiosInstance.get(
        `/v1/politicians/detail/${politicianID}`
      );
      console.log(JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      console.error("❌ Failed to fetch politicians:", error);
      return {
        profile: {
          id: 0,
          monaCD: "",
          name: "",
          birthDate: "",
          gender: "",
          party: "",
          district: "",
          term: 0,
          profileImage: "",
        },
        contact: {
          phone: "",
          email: "",
          homepage: "",
          officeRoom: "",
          aides: {
            staff: [],
            secretary: [],
            secretary2: [],
          },
        },
        sns: {},
        career: "",
        terms: [],
        billActivities: {
          totalBills: 0,
          recentBills: 0,
          passRate: 0,
          bills: [],
        },
      };
    }
  },

  getgetPoliticianNetworkData: async ({
    politicianID,
    isServer,
  }: {
    politicianID: number;
    isServer: boolean;
  }): Promise<PoliticianNetworkDataResponse> => {
    try {
      const axiosInstance = isServer ? serverAxios : clientAxios;
      const res = await axiosInstance.get(
        `/v1/politicians/network/${politicianID}`
      );
      return res;
    } catch (error) {
      console.error("❌ Failed to fetch politicians:", error);
      return {
        data: {
          centerPolitician: {
            id: 1,
            name: "홍길동",
            party: "더불어민주당",
            district: "서울 강남갑",
            bills: 42,
          },
          connectedPoliticians: [
            {
              id: 2,
              name: "이순신",
              party: "국민의힘",
              district: "부산 해운대구",
              bills: 31,
            },
            {
              id: 3,
              name: "신사임당",
              party: "정의당",
              district: "강원 강릉시",
              bills: 28,
            },
            {
              id: 4,
              name: "김유신",
              party: "무소속",
              district: "경북 경주시",
              bills: 19,
            },
          ],
          edges: [
            { from: 1, to: 2, value: 5 },
            { from: 1, to: 3, value: 3 },
            { from: 1, to: 4, value: 2 },
          ],
        },
      };
    }
  },
};
