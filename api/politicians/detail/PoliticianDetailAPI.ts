import instance from "@/api/axios";
import { PoliticianNetworkDataResponse } from "./PoliticianDetail.types";
import { getPoliticianNetworkDataFallback } from "./PoliticianDetailFallback";

export async function getgetPoliticianNetworkData(
  politicianID: number
): Promise<PoliticianNetworkDataResponse> {
  try {
    const res = await instance.get(`/politicians/network/${politicianID}`);
    return res.data;
  } catch {
    return getPoliticianNetworkDataFallback();
  }
}
