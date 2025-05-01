import { Politician, PoliticianDetail } from "@/types/politiciansType";
export interface GetAllPoliticiansParams {
  page?: number;
  limit?: number;
  name?: string;
  party?: string;
  district?: string;
  sort?: string;
}

export interface PoliticianResponse {
  data: Politician[];
}

export interface GetPoliticianByIdParams {
  politicianID?: number;
}

export interface PoliticianDetailResponse {
  data: PoliticianDetail;
}
