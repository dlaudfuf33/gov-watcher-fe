import { ProposerGroup, NoticeProps } from "@/types/notice.types";

export interface Pagination {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

export interface NoticeListResponse {
  data: NoticeProps[];
  pagination: Pagination;
}
