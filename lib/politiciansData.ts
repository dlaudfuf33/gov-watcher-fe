import type { PoliticianDetail } from "@/types/politiciansType";

// 더미 데이터 생성
export const Politicians: PoliticianDetail[] = [
  {
    profile: {
      id: 0,
      name: "홍길동",
      engName: "HONG GIL DONG",
      hanjaName: "金民洙",
      birthDate: "1970-05-15",
      gender: "남",
      party: "더불어민주당",
      district: "서울 종로구",
      term: 21,
      careerYears: 8,
      electedCount: 2,
      profileImage: "https://randomuser.me/api/portraits/men/14.jpg",
    },
    contact: {
      phone: "02-1234-5678",
      email: "hong@assembly.go.kr",
      homepage: "https://honggil.example.com",
    },
    sns: {
      twitter: "https://twitter.com/hong",
      facebook: "https://facebook.com/hong",
      youtube: "https://youtube.com/hong",
    },
    politicalHistory: [
      { year: 2016, position: "서울시의원" },
      { year: 2020, position: "국회의원" },
    ],
    billActivities: {
      recentBills: 21,
      passRate: 75.5,
      recentActivities: 10,
      bills: [
        { title: "노동법 개정안", status: "통과" },
        { title: "청년 지원 법안", status: "심사중" },
      ],
    },
    billAnalysis: {
      topics: [
        { category: "복지", count: 8 },
        { category: "경제", count: 5 },
      ],
      network: [{ partner: "김의원", jointBills: 4 }],
      trend: [{ month: "2024-01", billsProposed: 3 }],
    },
    publicOpinions: {
      comments: 15,
      topKeywords: ["노동", "복지", "청년"],
    },
    news: [{ title: "홍길동 의원, 청년복지 법안 발의", link: "..." }],
  },
];
