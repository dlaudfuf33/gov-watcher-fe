import { ProposerGroup, NoticeProps } from "@/types/notice.types";

export interface NoticeListResponse {
  data: NoticeProps[];
  errorCode?: string;
  message?: string;
}
