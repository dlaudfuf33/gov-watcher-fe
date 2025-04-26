import type { ParliamentStat } from "@/types/parliamentStats.types";
import type { CategoryStat } from "@/types/CategoryStat.types";
import { Bution } from "@/types/Bution.types";
import { DemographicStat } from "@/types/DemographicStat.types";

export interface ParliamentStatsResponse {
  data: {
    currentSession: number;
    parliamentStat: ParliamentStat[];
  };
}

export interface PartyDistributionResponse {
  data: Bution[];
}

export interface CategoryStatsResponse {
  data: CategoryStat[];
}

export interface DemographicStatsResponse {
  data: DemographicStat;
}
