export interface PoliticianNetworkData {
  centerPolitician: CenterPolitician;
  connectedPoliticians: ConnectedPolitician[];
  edges: Edge[];
}
export interface CenterPolitician {
  id: number;
  name: string;
  party: string;
  district?: string;
  bills?: number;
}
export interface ConnectedPolitician {
  id: number;
  name: string;
  party: string;
  district?: string;
  bills?: number;
}
export interface Edge {
  from: number;
  to: number;
  value: number;
}
