import type { NoticeListResponse } from "@/api/notices/NoticeList.types";

function createNotice(
  billNo: string,
  title: string,
  startDate: string,
  endDate: string,
  mainProposer: string,
  proposerParty: string,
  proposers: { id: string; name: string; party: string }[],
  proposerDate: string,
  committee: string,
  currentStep: string,
  stepLog: string[],
  summary: string,
  agreeRatio: number,
  opposeRatio: number,
  viewCount: number,
  commentsCount: number,
  proposerImageUrl: string,
  detailUrl = "#",
  commentsUrl = "#"
) {
  return {
    billNo,
    viewCount,
    commentsCount,
    title,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    proposerImageUrl,
    mainProposer,
    proposerParty,
    proposers,
    proposerDate: new Date(proposerDate),
    committee,
    currentStep,
    stepLog,
    summary,
    agreeRatio,
    opposeRatio,
    detailUrl,
    commentsUrl,
  };
}

export function getNoticeListFallback(): NoticeListResponse {
  const baseNotices = [
    createNotice(
      "000000",
      "데이터를 불러오지 못했습니다.",
      new Date().toISOString(),
      new Date().toISOString(),
      "시스템",
      "무소속",
      [],
      new Date().toISOString(),
      "알 수 없음",
      "불러오기 실패",
      [],
      "데이터를 불러오지 못했습니다.",
      0,
      0,
      0,
      0,
      "https://randomuser.me/api/portraits/men/14.jpg"
    ),
    createNotice(
      "100001",
      "청년 주거 지원 강화 법안",
      "2025-05-01",
      "2025-05-30",
      "홍길동",
      "더불어민주당",
      [
        { id: "1", name: "홍길동", party: "더불어민주당" },
        { id: "2", name: "김철수", party: "더불어민주당" },
      ],
      "2025-04-20",
      "국토교통위원회",
      "심사중",
      ["제안", "위원회 심사"],
      "청년층 주거 안정을 위한 임대 지원 법안입니다.",
      75,
      25,
      123,
      10,
      "https://randomuser.me/api/portraits/women/21.jpg"
    ),
    createNotice(
      "100002",
      "노인 복지 확대 법안",
      "2025-04-15",
      "2025-05-15",
      "이영희",
      "국민의힘",
      [{ id: "3", name: "이영희", party: "국민의힘" }],
      "2025-04-10",
      "보건복지위원회",
      "본회의 통과",
      ["제안", "위원회 심사", "본회의 의결"],
      "노인 복지 향상을 위한 의료비 지원 확대 법안입니다.",
      60,
      40,
      456,
      50,
      "https://randomuser.me/api/portraits/men/45.jpg"
    ),
    createNotice(
      "100003",
      "환경 보호를 위한 탄소세 도입 법안",
      "2025-06-01",
      "2025-06-30",
      "박민정",
      "정의당",
      [{ id: "4", name: "박민정", party: "정의당" }],
      "2025-05-20",
      "환경노동위원회",
      "위원회 계류",
      ["제안"],
      "환경 보호를 위해 탄소 배출량에 따른 세금을 부과하는 법안입니다.",
      50,
      50,
      89,
      5,
      "https://randomuser.me/api/portraits/women/32.jpg"
    ),
    createNotice(
      "100005",
      "기본소득 도입을 위한 법안",
      "2025-07-01",
      "2025-12-31",
      "김기본",
      "기본소득당",
      [
        { id: "5", name: "김기본", party: "기본소득당" },
        { id: "6", name: "이소득", party: "기본소득당" },
      ],
      "2025-06-15",
      "재정경제위원회",
      "발의",
      ["발의"],
      "모든 국민에게 정기적으로 기본소득을 지급하는 법안입니다.",
      90,
      10,
      300,
      100,
      "https://randomuser.me/api/portraits/men/55.jpg"
    ),
    createNotice(
      "100006",
      "국방 예산 증액 법안",
      "2025-03-01",
      "2025-09-30",
      "최강국",
      "국민의힘",
      [{ id: "7", name: "최강국", party: "국민의힘" }],
      "2025-02-20",
      "국방위원회",
      "폐기",
      ["제안", "위원회 심사", "폐기"],
      "국방 예산을 대폭 증액하는 법안이었으나 폐기되었습니다.",
      20,
      80,
      150,
      1,
      "https://randomuser.me/api/portraits/men/66.jpg"
    ),
    createNotice(
      "100007",
      "초중고 교육 지원 확대 법안",
      "2025-01-10",
      "2025-12-31",
      "이교육",
      "더불어민주당",
      [
        { id: "8", name: "이교육", party: "더불어민주당" },
        { id: "9", name: "박학생", party: "더불어민주당" },
        { id: "10", name: "정선생", party: "더불어민주당" },
      ],
      "2024-12-01",
      "교육위원회",
      "본회의 통과",
      ["제안", "위원회 심사", "본회의 의결"],
      "초중고 학생들을 위한 교육 지원 예산을 확대하는 법안입니다.",
      85,
      15,
      220,
      500,
      "https://randomuser.me/api/portraits/women/44.jpg"
    ),
    createNotice(
      "100008",
      "청년 창업 지원 법안",
      "2025-02-15",
      "2025-08-15",
      "김창업",
      "정의당",
      [{ id: "11", name: "김창업", party: "정의당" }],
      "2025-02-01",
      "산업통상자원위원회",
      "심사중",
      ["제안", "위원회 심사"],
      "청년 창업가들을 위한 금융 및 멘토링 지원 법안입니다.",
      65,
      35,
      75,
      30,
      "https://randomuser.me/api/portraits/men/23.jpg"
    ),
    createNotice(
      "100009",
      "농업 보조금 축소 법안",
      "2025-01-01",
      "2025-06-30",
      "최농부",
      "무소속",
      [{ id: "12", name: "최농부", party: "무소속" }],
      "2024-12-20",
      "농림축산식품해양수산위원회",
      "위원회 계류",
      ["제안"],
      "농업 보조금을 축소하여 재정 건전성을 도모하는 법안입니다.",
      40,
      60,
      10,
      0,
      "https://randomuser.me/api/portraits/women/50.jpg"
    ),
    createNotice(
      "100010",
      "디지털 경제 활성화 법안",
      "2025-04-01",
      "2025-10-01",
      "박디지털",
      "더불어민주당",
      [{ id: "13", name: "박디지털", party: "더불어민주당" }],
      "2025-03-15",
      "과학기술정보방송통신위원회",
      "심사중",
      ["제안", "위원회 심사"],
      "디지털 경제 발전과 혁신을 촉진하는 법안입니다.",
      55,
      45,
      5,
      2,
      "https://randomuser.me/api/portraits/men/77.jpg"
    ),
  ];

  // Generate additional notices to reach 33 items total with varied data
  const additionalNotices: ReturnType<typeof createNotice>[] = [];
  const parties = [
    "더불어민주당",
    "국민의힘",
    "정의당",
    "기본소득당",
    "무소속",
  ];
  const committees = [
    "국토교통위원회",
    "보건복지위원회",
    "환경노동위원회",
    "재정경제위원회",
    "국방위원회",
    "교육위원회",
    "산업통상자원위원회",
    "농림축산식품해양수산위원회",
    "과학기술정보방송통신위원회",
    "문화체육관광위원회",
  ];
  const stepStatuses = [
    { step: "발의", log: ["발의"] },
    { step: "심사중", log: ["제안", "위원회 심사"] },
    { step: "본회의 통과", log: ["제안", "위원회 심사", "본회의 의결"] },
    { step: "폐기", log: ["제안", "위원회 심사", "폐기"] },
    { step: "위원회 계류", log: ["제안"] },
  ];
  const proposerImages = [
    "https://randomuser.me/api/portraits/men/10.jpg",
    "https://randomuser.me/api/portraits/women/11.jpg",
    "https://randomuser.me/api/portraits/men/12.jpg",
    "https://randomuser.me/api/portraits/women/13.jpg",
    "https://randomuser.me/api/portraits/men/14.jpg",
    "https://randomuser.me/api/portraits/women/15.jpg",
    "https://randomuser.me/api/portraits/men/16.jpg",
    "https://randomuser.me/api/portraits/women/17.jpg",
  ];

  for (let i = 11; i <= 33; i++) {
    const billNo = (100000 + i).toString();
    const proposerParty = parties[i % parties.length];
    const mainProposerName = `제안자${i}`;
    const proposerImageUrl = proposerImages[i % proposerImages.length];
    const startDate = new Date(2025, i % 12, 1 + (i % 20))
      .toISOString()
      .slice(0, 10);
    const endDate = new Date(2025, i % 12, 15 + (i % 15))
      .toISOString()
      .slice(0, 10);
    const proposerDate = new Date(2025, i % 12, (i % 10) + 1)
      .toISOString()
      .slice(0, 10);
    const committee = committees[i % committees.length];
    const stepStatus = stepStatuses[i % stepStatuses.length];
    // Diverse agree/oppose ratios including edge cases
    let agreeRatio = 50;
    let opposeRatio = 50;
    if (i % 5 === 0) {
      agreeRatio = 99;
      opposeRatio = 1;
    } else if (i % 5 === 1) {
      agreeRatio = 1;
      opposeRatio = 99;
    } else if (i % 5 === 2) {
      agreeRatio = 75;
      opposeRatio = 25;
    } else if (i % 5 === 3) {
      agreeRatio = 25;
      opposeRatio = 75;
    }
    // View count and comments count variations
    const viewCount = i % 7 === 0 ? 10000 + i * 100 : i * 15;
    const commentsCount = i % 4 === 0 ? 0 : i * 3;

    const proposers = [
      { id: `${i}1`, name: mainProposerName, party: proposerParty },
      ...(i % 3 === 0
        ? [{ id: `${i}2`, name: `보조제안자${i}`, party: proposerParty }]
        : []),
    ];

    const titleVariants = [
      "법안",
      "정책 제안",
      "지원 계획",
      "개정안",
      "촉진 법안",
      "확대 법안",
      "축소 법안",
      "도입 법안",
      "폐지 법안",
      "강화 법안",
    ];
    const title = `${mainProposerName}의 ${
      titleVariants[i % titleVariants.length]
    }`;

    const summary = `이 법안은 ${committee}에서 논의 중인 ${title}입니다. 찬성률은 ${agreeRatio}%, 반대율은 ${opposeRatio}%입니다.`;

    additionalNotices.push(
      createNotice(
        billNo,
        title,
        startDate,
        endDate,
        mainProposerName,
        proposerParty,
        proposers,
        proposerDate,
        committee,
        stepStatus.step,
        stepStatus.log,
        summary,
        agreeRatio,
        opposeRatio,
        viewCount,
        commentsCount,
        proposerImageUrl
      )
    );
  }

  const allNotices = [...baseNotices, ...additionalNotices];

  return {
    data: allNotices,
    pagination: {
      page: 1,
      size: 30,
      totalItems: allNotices.length,
      totalPages: Math.ceil(allNotices.length / 30),
    },
  };
}
