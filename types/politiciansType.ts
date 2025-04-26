export interface Politician {
  id: number; // 고유 ID (DB 기본 키 등)
  name: string; // 의원 이름
  party: string; // 정당명 (예: 더불어민주당, 국민의힘)
  district: string; // 지역구 (예: 서울 강남갑)
  position: string; // 직책 (예: 국회의원, 위원장 등)
  term: number; // 국회 대수 (예: 21대 → 21)
  recentBills: number; // 최근 발의한 법안 수
  profileImage: string; // 프로필 이미지 URL

  // 선택 필드 (UI 추가 정보용)
  passRate?: number; // 발의 법안 중 통과된 비율 (%) - 예: 42.5
  careerYears?: number; // 정치 경력 연수 - 예: 12
  electedCount?: number; // 당선 횟수 - 예: 3
  recentActivities?: number; // 최근 활동 점수 or 횟수 (토론/출석 등)
  commentCount?: number; // 댓글 수
}

export interface PoliticianDetail {
  profile: {
    id: number;
    name: string;
    engName: string;
    hanjaName: string;
    birthDate: string;
    gender: string;
    party: string;
    district: string;
    term: number;
    careerYears: number;
    electedCount: number;
    profileImage: string;
  };
  contact: {
    phone: string;
    email: string;
    homepage: string;
    officeRoom: string;
    aides: {
      staff: string[];
      secretary: string[];
      secretary2: string[];
    };
  };
  sns: {
    twitter?: string;
    facebook?: string;
    youtube?: string;
  };
  career: string;
  terms: PoliticianTerm[];
  billActivities: {
    recentBills: number;
    passRate: number;
    recentActivities: number;
    bills: {
      title: string;
      status: string;
    }[];
  };
  billAnalysis: {
    topics: {
      category: string;
      count: number;
    }[];
    network: {
      partner: string;
      jointBills: number;
    }[];
    trend: {
      month: string;
      billsProposed: number;
    }[];
  };
  publicOpinions: {
    comments: number;
    topKeywords: string[];
  };
  news: {
    title: string;
    link: string;
  }[];
}
