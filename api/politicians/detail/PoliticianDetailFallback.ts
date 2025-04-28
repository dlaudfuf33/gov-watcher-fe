import { PoliticianNetworkDataResponse } from "./PoliticianDetail.types";

export function getPoliticianNetworkDataFallback(): PoliticianNetworkDataResponse {
  return {
    data: {
      centerPolitician: {
        id: 1,
        name: "김만수",
        party: "더불어민주당",
        district: "서울 강남구",
        bills: 300,
      },
      connectedPoliticians: [
        {
          id: 2,
          name: "이지원",
          party: "더불어민주당",
          district: "경기 수원시",
          bills: 20,
        },
        {
          id: 3,
          name: "박서연",
          party: "더불어민주당",
          district: "부산 해운대구",
          bills: 25,
        },
      ],
      edges: [
        { from: 1, to: 2, value: 8 },
        { from: 1, to: 3, value: 12 },
      ],
    },
  };
}
