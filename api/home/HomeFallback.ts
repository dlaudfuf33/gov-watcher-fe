import type {
  ParliamentStatsResponse,
  PartyDistributionResponse,
  CategoryStatsResponse,
  DemographicStatsResponse,
} from "@/api/home/Home.types";

export function getParliamentStatsFallback(): ParliamentStatsResponse {
  return {
    data: {
      currentSession: 0,
      parliamentStat: [
        {
          title: "예시 법안1",
          value: 110,
          changePeriod: 0,
          changeGov: 0,
        },
        {
          title: "예시 법안1",
          value: 110,
          changePeriod: 0,
          changeGov: 0,
        },
        {
          title: "예시 법안1",
          value: 220,
          changePeriod: 0,
          changeGov: 0,
        },
        {
          title: "예시 법안1",
          value: 220,
          changePeriod: 0,
          changeGov: 0,
        },
      ],
    },
  };
}

export function getPartyDistributionFallback(): PartyDistributionResponse {
  return {
    data: [
      { label: "국민의힘", value: 30 },
      { label: "더불어민주당", value: 30 },
      { label: "기타", value: 30 },
    ],
  };
}

export function getCategoryStatsFallback(): CategoryStatsResponse {
  return {
    data: [
      { label: "복지", value: 20 },
      { label: "경제", value: 20 },
      { label: "외교", value: 20 },
      { label: "국방", value: 20 },
      { label: "기타", value: 10 },
    ],
  };
}

export function getDemographicStatsFallback(): DemographicStatsResponse {
  return {
    data: {
      labels: ["30대 이하", "40대", "50대", "60대 이상"],
      male: [3, 7, 12, 9],
      female: [2, 6, 10, 8],
    },
  };
}
