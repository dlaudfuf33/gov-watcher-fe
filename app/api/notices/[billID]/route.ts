// app/api/notices/[billID]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { billID: string } }
) {
  const { billID } = await context.params;
  var test = `제안이유 및 주요내용

  현행법에 따라 지방교육재정교부금의 재원은 해당 연도 내국세 총액의 1만분의 2,079에 해당하는 금액 및 「유아교육지원특별회계법」에서 정하는 금액 등을 제외한 교육세 세입액을 합산한 금액으로 구성되어 있음.
  한편, 단계적으로 확대된 고등학교 등의 무상교육이 현재 전체 학년을 대상으로 실시되고 있는데 고등학교 등의 무상교육을 위한 경비 부담에 관한 특례의 유효기간이 2024년 12월 31일로 만료됨에 따라 지속가능한 고등학교 등의 무상교육 재원을 위한 대책 마련이 필요한 시점임.
  이에 교부금의 재원을 해당 연도 내국세의 1만분의 2,079에서 1만분의 2,109로 확대하여 고등학교 등의 무상교육이 안정적으로 이루어질 수 있도록 하려는 것임(안 제3조제2항제1호 등).
  제출방법: 입법예고의 진행 상태가 '진행'일 경우에만 의견 등록이 가능하며, '종료'일 경우 의견 등록이 불가능합니다.
  아래의 [의견등록] 버튼 혹은 상단의 [의견등록] 탭을 클릭하여 의견을 작성하실 수 있으며, 위의 의견제출 방법을 이용한 제출도 가능합니다.
  `;
  // 🧪 더미 데이터
  const dummyData = {
    billNo: billID,
    title: "더미 법안 제목",
    summary: test,
    mainProposer: "홍길동",
    proposerParty: "더불어민주당",
    proposerImageUrl: "/mock/hong.jpg",
    proposers: [
      {
        id: "1",
        name: "홍길동",
        party: "더불어민주당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "2",
        name: "김민정",
        party: "국민의힘",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "3",
        name: "이민정",
        party: "정의당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "4",
        name: "기본소득당",
        party: "개혁신당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "5",
        name: "최민정",
        party: "국가혁명당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "6",
        name: "곽민정",
        party: "기본소득당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "7",
        name: "독고민정",
        party: "새누리당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "8",
        name: "왕민정",
        party: "더불어민주당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "9",
        name: "만민정",
        party: "더불어민주당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "10",
        name: "성민정",
        party: "더불어민주당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "11",
        name: "한민정",
        party: "더불어민주당",
        imageUrl: "/mock/hong.jpg",
      },
    ],
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-04-01"),
    proposerDate: new Date("2024-03-01"),
    committee: "행정안전위원회",
    currentStep: "위원회 심사",
    stepLog: ["접수", "위원회 심사", "임기만료폐기"],
    agreeRatio: 60,
    opposeRatio: 40,
    viewCount: 123,
    commentsCount: 12,
    detailUrl: "https://example.com/detail",
    commentsUrl: "https://example.com/comments",
  };

  return NextResponse.json(dummyData);
}
