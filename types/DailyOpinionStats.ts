export interface DailyOpinionStats {
  date: string; // "2025-04-23" 형식
  total: number;
  agree: number;
  oppose: number;
}

export interface BillOpinionStats {
  bill_no: string;
  stats: DailyOpinionStats[];
}
