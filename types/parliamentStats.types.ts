// types/parliamentStats.types.ts

export interface ParliamentStat {
  title: string;
  value: number;
  changePeriod: number;
  changeGov: number;
}

export interface ParliamentStatsSectionProps {
  currentSession: number;
  stats: ParliamentStat[];
}
