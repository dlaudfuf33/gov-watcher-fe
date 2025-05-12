// /types/notice.ts

export interface ProposerGroup {
  id: string;
  name: string;
  monaCD: string;
  party: string;
  imageUrl?: string;
}

export interface NoticeProps {
  billNo: string;
  viewCount: number;
  commentsCount: number;
  title: string;
  startDate: Date;
  endDate: Date;
  proposerImageUrl: string;
  mainProposer: string;
  proposerParty: string;
  proposers: ProposerGroup[];
  proposerDate: Date;
  committee: string;
  currentStep: string;
  stepLog: string[];
  summary: string;
  agreeRatio: number;
  opposeRatio: number;
  detailUrl: string;
  commentsUrl: string;
}
