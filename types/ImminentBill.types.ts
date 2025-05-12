// /types/ImminentBill.ts

export interface ImminentBill {
  billNo: string; // 법안 고유 번호
  title: string; // 법안 제목
  proposer: string; // 대표 발의자 이름
  proposerParty: string; // 정당명
  proposerImageUrl?: string; // 프로필 이미지 (선택)
  daysLeft: number; // 마감까지 남은 일 수
}
