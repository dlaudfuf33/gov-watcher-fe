import instance from "@/api/axios";
import type {
  GetAllPoliticiansParams,
  GetPoliticianByIdParams,
  PoliticianDetailResponse,
  PoliticianResponse,
} from "@/api/politicians/Politicians.types";
import {
  getAllPoliticiansFallback,
  getPoliticianByIdFallback,
} from "./PoliticiansFallback";

export async function getPoliticiansList(
  params: GetAllPoliticiansParams = {}
): Promise<PoliticianResponse> {
  try {
    const res = await instance.get("/politicians", { params });
    return res.data;
  } catch (err: any) {
    // console.error("❌ Failed to fetch politicians:", err.message || err);
    return getAllPoliticiansFallback();
  }
}

export async function getPoliticianById(
  params: GetPoliticianByIdParams = {}
): Promise<PoliticianDetailResponse> {
  try {
    const res = await instance.get(
      `/politicians/detail/${params.politicianID}`
    );
    return res.data;
  } catch (err: any) {
    // console.error("❌ Failed to fetch politicians:", err.message || err);
    return getPoliticianByIdFallback();
  }
}
