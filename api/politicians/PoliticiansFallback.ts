import {
  PoliticianDetailResponse,
  PoliticianResponse,
} from "./Politicians.types";

export function getAllPoliticiansFallback(): PoliticianResponse {
  return {
    data: [
      {
        id: 1,
        name: "홍길동",
        party: "무소속",
        district: "알 수 없음",
        position: "의원",
        term: 14,
        recentBills: 10,
        profileImage: "https://api.dicebear.com/7.x/thumbs/svg?seed=홍길동",
        passRate: 0.1,
        careerYears: 0,
        recentActivities: -1,
      },
      {
        id: 2,
        name: "김길동",
        party: "무소속",
        district: "알 수 없음",
        position: "의원",
        term: 13,
        recentBills: 20,
        profileImage: "https://api.dicebear.com/7.x/thumbs/svg?seed=김길동",
        passRate: 0.2,
        careerYears: 1,
        recentActivities: -1,
      },
      {
        id: 3,
        name: "이길동",
        party: "무소속",
        district: "알 수 없음",
        position: "의원",
        term: 2,
        recentBills: 30,
        profileImage: "https://api.dicebear.com/7.x/thumbs/svg?seed=이길동",
        passRate: 0.21,
        careerYears: 10,
        recentActivities: -1,
      },
      {
        id: 44,
        name: "박길동",
        party: "무소속",
        district: "알 수 없음",
        position: "의원",
        term: 1,
        recentBills: 40,
        profileImage: "https://api.dicebear.com/7.x/thumbs/svg?seed=갈희나",
        passRate: 0.22,
        careerYears: 5,
        recentActivities: -1,
      },
      {
        id: 130,
        name: "홍길막",
        party: "무소속",
        district: "알 수 없음",
        position: "의원",
        term: 14,
        recentBills: 10,
        profileImage: "https://api.dicebear.com/7.x/thumbs/svg?seed=홍길미",
        passRate: 0.1,
        careerYears: 0,
        recentActivities: -1,
      },
    ],
  };
}

export function getPoliticianByIdFallback(): PoliticianDetailResponse {
  return {
    data: {
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
        homepage: "",
        officeRoom: "의원회관 450호",
        aides: {
          staff: ["김영우", "이은혜"],
          secretary: ["권민희", "박찬호"],
          secretary2: ["이진주", "송종무", "김미혜", "문영백", "박제욱"],
        },
      },
      sns: {
        twitter: "https://twitter.com/hong",
        facebook: "https://facebook.com/hong",
        youtube: "https://youtube.com/hong",
      },
      career: `제20&middot;21&middot;22대 국회의원
더불어민주당 탄소중립위원회 위원장
더불어민주당 서귀포시지역위원회 지역위원장

더불어민주당 원내정책수석부대표(前)
국회 농림축산식품해양수산위원회 위원장 직무대리(前)
국회 농림축산식품해양수산위원회 간사(前)
국회 기후위기특별위원회 간사(前)
더불어민주당 정책위원회 제5정책조정위원장(前)
더불어민주당 전국농어민위원장(前)
더불어민주당 원내부대표(前)
더불어민주당 정책위원회 부의장(前)
을지키는민생실천위원회 운영위원(前)`,
      terms: [
        {
          unit: 1,
          party: "무슨당",
          constituency: "서울 강서구갑",
          job_title: "간사",
          committees: "보건복지위원회, 연금개혁 특별위원회",
        },
        {
          unit: 2,
          party: "무슨당",
          constituency: "서울 강남구갑",
          job_title: "",
          committees: "",
        },
        {
          unit: 3,
          party: "무슨당",
          constituency: "서울 강동구갑",
          job_title: "",
          committees: "",
        },
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
  };
}
