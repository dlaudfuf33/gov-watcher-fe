export interface Politician {
  id: string;
  name: string;
  party: string;
  district: string;
  position: string;
  term: number;
  recentBills: number;
  profileImage: string;
  passRate?: number;
  careerYears?: number;
  recentActivities?: number;
}
