import instance from "@/api/axios";
import type { NoticeListResponse } from "@/api/notices/NoticeList.types";
import { getNoticeListFallback } from "./NoticeListFallback";

export async function getNoticeList(): Promise<NoticeListResponse> {
  try {
    const res = await instance.get("/home/parliament-stats");
    return res.data;
  } catch {
    return getNoticeListFallback();
  }
}
