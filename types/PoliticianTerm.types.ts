interface PoliticianTerm {
  unit: number; // 대수 (21, 22 등)
  party: string; // 소속 정당
  constituency: string; // 지역구
  job_title?: string; // 직책 (nullable)
  committees?: string; // 참여 상임위 목록 (쉼표구분 문자열)
}
