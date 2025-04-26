import type { NoticeListResponse } from "@/api/notices/NoticeList.types";

export function getNoticeListFallback(): NoticeListResponse {
  return {
    data: [
      {
        billNo: "000000",
        viewCount: 0,
        commentsCount: 0,
        title: "데이터를 불러오지 못했습니다.",
        startDate: new Date(),
        endDate: new Date(),
        proposerImageUrl: "https://randomuser.me/api/portraits/men/14.jpg",
        mainProposer: "시스템",
        proposerParty: "무소속",
        proposers: [],
        proposerDate: new Date(),
        committee: "알 수 없음",
        currentStep: "불러오기 실패",
        stepLog: [],
        summary: "데이터를 불러오지 못했습니다.",
        agreeRatio: 0,
        opposeRatio: 0,
        detailUrl: "#",
        commentsUrl: "#",
      },
    ],
  };
}
