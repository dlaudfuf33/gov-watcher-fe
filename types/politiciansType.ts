export interface Politician {
  id: number; // ID
  monaCD: string;
  name: string; // 의원 이름
  party: string; // 정당명 (예: 더불어민주당, 국민의힘)
  district: string; // 지역구 (예: 서울 강남갑)
  position: string; // 직책 (예: 국회의원, 위원장 등)
  term: number; // 국회 대수 (예: 21대 → 21)
  recentBills: number; // 최근 발의한 법안 수
  profileImage: string; // 프로필 이미지 URL

  // 선택 필드 (UI 추가 정보용)
  passRate?: number; // 발의 법안 중 통과된 비율 (%) - 예: 42.5
}

export interface PoliticianDetail {
  profile: {
    id: number;
    monaCD: string;
    name: string;
    engName?: string;
    hanjaName?: string;
    birthDate: string;
    gender: string;
    party: string;
    district: string;
    term: number;
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
    totalBills: number;
    recentBills: number;
    passRate: number;
    bills: {
      title: string;
      status: string;
    }[];
  };
}
