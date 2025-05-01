import { LegislationDetail } from "@/api/legislation";
import {
  BillOpinionStatsResponse,
  NoticeDetailResponse,
} from "./NoticeDetail.types";

export function getNoticeDetailFallback(): LegislationDetail {
  return {
    data: {
      id: 1,
      billNo: "000000",
      views: 0,
      comments: 0,
      title: "데이터를 불러오지 못했습니다.",
      daysLeft: 3,
      mainProposerImageUrl: "/placeholder.png",
      mainProposer: "시스템",
      mainProposerParty: "무소속",
      proposers: [],
      proposerDate: new Date(),
      committee: "알 수 없음",
      summary: "데이터를 불러오지 못했습니다.",
      agreeRatio: 1,
      opposeRatio: 1,
      detailUrl: "#",
      commentsUrl: "#",
      category: "",
      department: "",
    },
  };
}

export function getBillOpinionStatsFallback(): BillOpinionStatsResponse {
  return {
    data: {
      bill_no: "0000000",
      stats: [
        { date: "2025-04-17", total: 16, agree: 0, oppose: 16 },
        { date: "2025-04-18", total: 18, agree: 18, oppose: 0 },
        { date: "2025-04-19", total: 8, agree: 3, oppose: 5 },
        { date: "2025-04-20", total: 9, agree: 6, oppose: 3 },
        { date: "2025-04-21", total: 12, agree: 3, oppose: 9 },
        { date: "2025-04-22", total: 12, agree: 7, oppose: 5 },
        { date: "2025-04-23", total: 14, agree: 2, oppose: 12 },
      ],
    },
  };
}
