// types/parliamentStats.types.ts

export interface ParliamentStat {
  title: string;
  value: number;
  changePeriod: number;
  changeRecent: number;
  changePeriodRatio: number;
  changeRecentRatio: number;
}

export interface ParliamentStatsSectionProps {
  currentSession: number;
  stats: ParliamentStat[];
}
