import { clientAxios, serverAxios } from "@/api/axios";

export const suggestionApi = {
  // 건의사항 제출 (POST)
  async submitSuggestion(data: {
    name: string | null;
    email: string | null;
    type: string;
    category: string;
    content: string;
    isAnonymous: boolean;
  }) {
    return clientAxios.post("/suggestions", data);
  },

  // 건의사항 목록 조회 (GET)
  async fetchSuggestions(status?: string) {
    const query = status && status !== "all" ? `?status=${status}` : "";
    const res = await clientAxios.get(`/suggestions${query}`);
    return res.data;
  },

  // 추천 (POST)
  async voteSuggestion(id: number, up: boolean, visitorId: string) {
    const res = await clientAxios.patch(`/suggestions/${id}/vote`, {
      up,
      visitorId,
    });
    return res.data;
  },

  // 서버 측에서 목록 조회
  async fetchSuggestionsSSR(status?: string) {
    const query = status && status !== "all" ? `?status=${status}` : "";
    const res = await serverAxios.get(`/suggestions${query}`);
    return res.data;
  },
};
