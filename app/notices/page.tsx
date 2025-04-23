"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeShortCard from "@/components/NoticeShortCard";
import type { NoticeProps } from "@/types/notice";
import NoticeFeedCard from "@/components/NoticeFeedCard";

import NoticeListCard from "@/components/NoticeListCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

import {
  Sliders,
  ChevronsLeft,
  ListFilter,
  LayoutList,
  Smartphone,
} from "lucide-react";
import SidebarFilter from "@/components/SidebarFilter";
var test = `제안이유 및 주요내용

현행법에 따라 지방교육재정교부금의 재원은 해당 연도 내국세 총액의 1만분의 2,079에 해당하는 금액 및 「유아교육지원특별회계법」에서 정하는 금액 등을 제외한 교육세 세입액을 합산한 금액으로 구성되어 있음.
한편, 단계적으로 확대된 고등학교 등의 무상교육이 현재 전체 학년을 대상으로 실시되고 있는데 고등학교 등의 무상교육을 위한 경비 부담에 관한 특례의 유효기간이 2024년 12월 31일로 만료됨에 따라 지속가능한 고등학교 등의 무상교육 재원을 위한 대책 마련이 필요한 시점임.
이에 교부금의 재원을 해당 연도 내국세의 1만분의 2,079에서 1만분의 2,109로 확대하여 고등학교 등의 무상교육이 안정적으로 이루어질 수 있도록 하려는 것임(안 제3조제2항제1호 등).
제출방법: 입법예고의 진행 상태가 '진행'일 경우에만 의견 등록이 가능하며, '종료'일 경우 의견 등록이 불가능합니다.
아래의 [의견등록] 버튼 혹은 상단의 [의견등록] 탭을 클릭하여 의견을 작성하실 수 있으며, 위의 의견제출 방법을 이용한 제출도 가능합니다.
`;

// Mock 데이터
const mockNotices: NoticeProps[] = [
  {
    billNo: "2209892",
    viewCount: 1234,
    commentsCount: 12,
    title: "접경지역 지원 특별법 일부개정법률안(김용태의원 등 14인)",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-04-01"),
    proposerImageUrl: "/mock/hong.jpg",
    mainProposer: "홍길동",
    proposerParty: "더불어민주당",
    proposers: [
      {
        id: "1",
        name: "홍길동",
        party: "더불어민주당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "2",
        name: "이민정",
        party: "더불어민주당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "3",
        name: "이민정",
        party: "더불어민주당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "4",
        name: "이민정",
        party: "더불어민주당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "5",
        name: "이민정",
        party: "더불어민주당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "6",
        name: "이민정",
        party: "더불어민주당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "7",
        name: "이민정",
        party: "더불어민주당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "8",
        name: "이민정",
        party: "더불어민주당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "9",
        name: "이민정",
        party: "더불어민주당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "10",
        name: "이민정",
        party: "더불어민주당",
        imageUrl: "/mock/hong.jpg",
      },
      {
        id: "11",
        name: "이민정",
        party: "더불어민주당",
        imageUrl: "/mock/hong.jpg",
      },
    ],
    proposerDate: new Date("2024-03-01"),
    committee: "행정안전위원회",
    currentStep: "위원회 심사",
    stepLog: [
      "접수",
      "위원회 심사",
      "임기만료폐기",
      "접수",
      "위원회 심사",
      "임기만료폐기",
    ],
    summary: test,
    agreeRatio: 55,
    opposeRatio: 45,
    detailUrl: "https://example.com/bill/1",
    commentsUrl: "https://example.com/opinion/1",
  },
  {
    billNo: "2209892",
    viewCount: 1234,
    commentsCount: 12,
    title: "접경지역 지원 특별법 일부개정법률안(김용태의원 등 14인)",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-04-01"),
    proposerImageUrl: "/mock/hong.jpg",
    mainProposer: "홍길동",
    proposerParty: "국민의힘",
    proposers: [
      {
        id: "1",
        name: "김용태",
        party: "더불어민주당",
        imageUrl: "/mock/kim.jpg",
      },
      { id: "2", name: "이민정", party: "더불어민주당" },
    ],
    proposerDate: new Date("2024-03-01"),
    committee: "행정안전위원회",
    currentStep: "위원회 심사",
    stepLog: ["접수", "위원회 심사", "임기만료폐기"],
    summary:
      "접경지역 주민의 생활환경 개선 및 지원 강화를 위해 특별법을 개정하고자 함.",
    agreeRatio: 95,
    opposeRatio: 5,
    detailUrl: "https://example.com/bill/1",
    commentsUrl: "https://example.com/opinion/1",
  },
  {
    billNo: "2209892",
    viewCount: 1234,
    commentsCount: 12,
    title: "접경지역 지원 특별법 일부개정법률안(김용태의원 등 14인)",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-04-01"),
    proposerImageUrl: "/mock/hong.jpg",
    mainProposer: "홍길동",
    proposerParty: "더불어민주당",
    proposers: [
      {
        id: "1",
        name: "김용태",
        party: "더불어민주당",
        imageUrl: "/mock/kim.jpg",
      },
      { id: "2", name: "이민정", party: "더불어민주당" },
    ],
    proposerDate: new Date("2024-03-01"),
    committee: "행정안전위원회",
    currentStep: "위원회 심사",
    stepLog: ["접수", "위원회 심사", "임기만료폐기"],
    summary:
      "접경지역 주민의 생활환경 개선 및 지원 강화를 위해 특별법을 개정하고자 함.",
    agreeRatio: 95,
    opposeRatio: 5,
    detailUrl: "https://example.com/bill/1",
    commentsUrl: "https://example.com/opinion/1",
  },
  {
    billNo: "2209892",
    viewCount: 1234,
    commentsCount: 12,
    title: "접경지역 지원 특별법 일부개정법률안(김용태의원 등 14인)",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-04-01"),
    proposerImageUrl: "/mock/hong.jpg",
    mainProposer: "홍길동",
    proposerParty: "더불어민주당",
    proposers: [
      {
        id: "1",
        name: "김용태",
        party: "더불어민주당",
        imageUrl: "/mock/kim.jpg",
      },
      { id: "2", name: "이민정", party: "더불어민주당" },
    ],
    proposerDate: new Date("2024-03-01"),
    committee: "행정안전위원회",
    currentStep: "위원회 심사",
    stepLog: ["접수", "위원회 심사", "임기만료폐기"],
    summary:
      "접경지역 주민의 생활환경 개선 및 지원 강화를 위해 특별법을 개정하고자 함.",
    agreeRatio: 95,
    opposeRatio: 5,
    detailUrl: "https://example.com/bill/1",
    commentsUrl: "https://example.com/opinion/1",
  },
  {
    billNo: "2209892",
    viewCount: 1234,
    commentsCount: 12,
    title: "접경지역 지원 특별법 일부개정법률안(김용태의원 등 14인)",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-04-01"),
    proposerImageUrl: "/mock/hong.jpg",
    mainProposer: "홍길동",
    proposerParty: "더불어민주당",
    proposers: [
      {
        id: "1",
        name: "김용태",
        party: "더불어민주당",
        imageUrl: "/mock/kim.jpg",
      },
      { id: "2", name: "이민정", party: "더불어민주당" },
    ],
    proposerDate: new Date("2024-03-01"),
    committee: "행정안전위원회",
    currentStep: "위원회 심사",
    stepLog: ["접수", "위원회 심사", "임기만료폐기"],
    summary:
      "접경지역 주민의 생활환경 개선 및 지원 강화를 위해 특별법을 개정하고자 함.",
    agreeRatio: 95,
    opposeRatio: 5,
    detailUrl: "https://example.com/bill/1",
    commentsUrl: "https://example.com/opinion/1",
  },
  {
    billNo: "2209892",
    viewCount: 1234,
    commentsCount: 12,
    title: "접경지역 지원 특별법 일부개정법률안(김용태의원 등 14인)",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-04-01"),
    proposerImageUrl: "/mock/hong.jpg",
    mainProposer: "홍길동",
    proposerParty: "더불어민주당",
    proposers: [
      {
        id: "1",
        name: "김용태",
        party: "더불어민주당",
        imageUrl: "/mock/kim.jpg",
      },
      { id: "2", name: "이민정", party: "더불어민주당" },
    ],
    proposerDate: new Date("2024-03-01"),
    committee: "행정안전위원회",
    currentStep: "위원회 심사",
    stepLog: ["접수", "위원회 심사", "임기만료폐기"],
    summary:
      "접경지역 주민의 생활환경 개선 및 지원 강화를 위해 특별법을 개정하고자 함.",
    agreeRatio: 95,
    opposeRatio: 5,
    detailUrl: "https://example.com/bill/1",
    commentsUrl: "https://example.com/opinion/1",
  },
  {
    billNo: "2209892",
    viewCount: 1234,
    commentsCount: 12,
    title: "접경지역 지원 특별법 일부개정법률안(김용태의원 등 14인)",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-04-01"),
    proposerImageUrl: "/mock/hong.jpg",
    mainProposer: "홍길동",
    proposerParty: "더불어민주당",
    proposers: [
      {
        id: "1",
        name: "김용태",
        party: "더불어민주당",
        imageUrl: "/mock/kim.jpg",
      },
      { id: "2", name: "이민정", party: "더불어민주당" },
    ],
    proposerDate: new Date("2024-03-01"),
    committee: "행정안전위원회",
    currentStep: "위원회 심사",
    stepLog: ["접수", "위원회 심사", "임기만료폐기"],
    summary:
      "접경지역 주민의 생활환경 개선 및 지원 강화를 위해 특별법을 개정하고자 함.",
    agreeRatio: 95,
    opposeRatio: 5,
    detailUrl: "https://example.com/bill/1",
    commentsUrl: "https://example.com/opinion/1",
  },
  {
    billNo: "2209892",
    viewCount: 1234,
    commentsCount: 12,
    title: "접경지역 지원 특별법 일부개정법률안(김용태의원 등 14인)",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-04-01"),
    proposerImageUrl: "/mock/hong.jpg",
    mainProposer: "홍길동",
    proposerParty: "더불어민주당",
    proposers: [
      {
        id: "1",
        name: "김용태",
        party: "더불어민주당",
        imageUrl: "/mock/kim.jpg",
      },
      { id: "2", name: "이민정", party: "더불어민주당" },
    ],
    proposerDate: new Date("2024-03-01"),
    committee: "행정안전위원회",
    currentStep: "위원회 심사",
    stepLog: ["접수", "위원회 심사", "임기만료폐기"],
    summary:
      "접경지역 주민의 생활환경 개선 및 지원 강화를 위해 특별법을 개정하고자 함.",
    agreeRatio: 95,
    opposeRatio: 5,
    detailUrl: "https://example.com/bill/1",
    commentsUrl: "https://example.com/opinion/1",
  },
];

export default function NoticesPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex relative max-h-full">
        {/* 사이드필터 */}
        <div
          className={cn(
            `absolute top-14 bottom-0 
            max-h-[calc(100vh-56px)] overflow-y-auto scrollbar-hide
            left-0 z-20 transition-all duration-300 ease-in-out`,
            isFilterOpen
              ? "translate-x-0 w-[240px]"
              : "-translate-x-full w-[240px]"
          )}
        >
          <SidebarFilter />
        </div>
        <div
          className={cn(
            `flex-1 overflow-y-auto h-[calc(100vh-64px)] pb-20
            bg-[url('/mock/noticeBg.png')] bg-cover bg-center bg-no-repeat
            transition-all duration-300`
          )}
        >
          {/* 뷰 모드 탭 */}
          <div className=" backdrop-blur-sm border-b border-gray-200/50">
            <Tabs defaultValue="list" className="w-full h-full flex flex-col">
              <div className="flex justify-between items-center w-full sticky top-0 z-20 px-4 py-2 bg-white/60 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm text-gray-700 hover:text-black px-3 bg-white/60 border border-gray-300 rounded-md shadow-sm backdrop-blur-md transition"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  {isFilterOpen ? (
                    <span className="flex items-center">
                      <ChevronsLeft className="h-4 w-4 mr-2" />
                      <span className="hidden md:inline">닫기</span>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Sliders className="h-4 w-4 mr-2" />
                      <span className="hidden md:inline">필터</span>
                    </span>
                  )}
                </Button>

                <TabsList className="grid grid-cols-3 md:w-fit bg-gray-100/70">
                  <TabsTrigger value="list">
                    <ListFilter className="h-4 w-4 mr-2" />
                    <span className="hidden md:inline">리스트</span>
                  </TabsTrigger>
                  <TabsTrigger value="shorts">
                    <Smartphone className="h-4 w-4 mr-2" />
                    <span className="hidden md:inline">쇼츠</span>
                  </TabsTrigger>
                  <TabsTrigger value="feed">
                    <LayoutList className="h-4 w-4 mr-2" />
                    <span className="hidden md:inline">피드</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 scrollbar-hide overflow-y-auto relative">
                {/* 쇼츠 뷰 */}
                <TabsContent value="shorts" className="mt-0">
                  <div className="flex justify-center py-4">
                    <div className="w-full max-w-6xl px-4 space-y-8">
                      {mockNotices.map((notice, index) => (
                        <div key={index} className="snap-start">
                          <NoticeShortCard notice={notice} />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* 피드 뷰 */}
                <TabsContent value="feed" className="mt-0">
                  <div className="py-8">
                    <div className="container mx-auto px-4 max-w-2xl">
                      {mockNotices.map((notice, index) => (
                        <div key={index} className="mb-6">
                          <NoticeFeedCard notice={notice} />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* 리스트 뷰*/}
                <TabsContent value="list" className="mt-0">
                  <div className="py-8 mx-auto">
                    <div className="container mx-auto flex justify-center">
                      <div className="w-full max-w-7xl px-2 space-y-2">
                        {mockNotices.map((notice, index) => (
                          <NoticeListCard key={index} notice={notice} />
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
