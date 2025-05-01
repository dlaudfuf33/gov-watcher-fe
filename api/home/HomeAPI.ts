import instance from "@/api/axios";
import type {
  ParliamentStatsResponse,
  PartyDistributionResponse,
  CategoryStatsResponse,
  DemographicStatsResponse,
} from "@/api/home/Home.types";
import {
  getCategoryStatsFallback,
  getDemographicStatsFallback,
  getParliamentStatsFallback,
  getPartyDistributionFallback,
} from "./HomeFallback";

export async function getParliamentStats(): Promise<ParliamentStatsResponse> {
  try {
    const res = await instance.get("/dashboard/parliament-stats");
    return res.data;
  } catch {
    return getParliamentStatsFallback();
  }
}

export async function getPartyDistribution(): Promise<PartyDistributionResponse> {
  try {
    const res = await instance.get("/dashboard/party-distribution");
    return res.data;
  } catch {
    return getPartyDistributionFallback();
  }
}

export async function getCategoryStats(): Promise<CategoryStatsResponse> {
  try {
    const res = await instance.get("/dashboard/category-stats");
    return res.data;
  } catch {
    return getCategoryStatsFallback();
  }
}

export async function getDemographicStats(): Promise<DemographicStatsResponse> {
  try {
    const res = await instance.get("/dashboard/demographic-stats");
    return res.data;
  } catch {
    return getDemographicStatsFallback();
  }
}
