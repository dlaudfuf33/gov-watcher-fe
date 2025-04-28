import instance from "@/api/axios";
import type {
  BillOpinionStatsResponse,
  NoticeDetailResponse,
} from "@/api/notices/detail/NoticeDetail.types";
import {
  getBillOpinionStatsFallback,
  getNoticeDetailFallback,
} from "./NoticeDetailFallback";

export async function getNoticeDetail(
  billID: string
): Promise<NoticeDetailResponse> {
  try {
    const res = await instance.get("/home/parliament-stats");
    return res.data;
  } catch {
    return getNoticeDetailFallback();
  }
}
export async function getBillOpinionStats(
  billID: string
): Promise<BillOpinionStatsResponse> {
  try {
    const res = await instance.get(`/notice/${billID}`);
    return res.data;
  } catch {
    return getBillOpinionStatsFallback();
  }
}
