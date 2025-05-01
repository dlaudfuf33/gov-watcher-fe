export interface PartyDistribution {
  currentSession: number;
  partyData: Bution[];
}
export interface Bution {
  party: string;
  localCount: number;
  proportionalCount: number;
  total: number;
  ratio: number;
}
