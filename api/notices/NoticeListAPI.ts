import instance from "@/api/axios";
import type { NoticeListResponse } from "@/api/notices/NoticeList.types";
import { getNoticeListFallback } from "./NoticeListFallback";

export async function getNoticeList(
  page = 1,
  size = 20,
  filters: Record<string, any> = {}
): Promise<NoticeListResponse> {
  try {
    const res = await instance.get(`/notice`, {
      params: { page, size, ...filters },
    });
    return res.data;
  } catch {
    return getNoticeListFallback();
  }
}
