import { BillOpinionStats } from "@/types/DailyOpinionStats.types";
import { NoticeProps } from "@/types/notice.types";

export interface NoticeDetailResponse {
  data: NoticeProps;
}

export interface BillOpinionStatsResponse {
  data: BillOpinionStats;
}
