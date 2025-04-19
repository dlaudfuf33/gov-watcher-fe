"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeShortCard, {
  type NoticeProps,
} from "@/components/NoticeShortCard";
import NoticeFeedCard from "@/components/NoticeFeedCard";
import NoticeGridCard from "@/components/NoticeGridCard";
import NoticeListCard from "@/components/NoticeListCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Sliders,
  Grid3X3,
  ListFilter,
  LayoutList,
  Smartphone,
} from "lucide-react";
import SidebarFilter from "@/components/SidebarFilter";

// Mock 데이터
const mockNotices: NoticeProps[] = [
  {
    billNo: "제2023-12345호",
    title: "청소년 보호법 일부개정법률안",
    proposerImageUrl: "/mock/hong.jpg",
    proposerName: "홍길동",
    proposerParty: "더불어민주당",
    proposerCount: 12,
    summary:
      "이 법안은 청소년의 인터넷 게임 중독 예방을 위해 심야시간대(0시~6시) 인터넷 게임 제공을 제한하는 '셧다운제'를 부활시키는 내용을 담고 있습니다. 또한 청소년 보호를 위한 게임 이용시간 제한 및 모니터링 시스템 구축을 의무화합니다.",
    agreeRatio: 73,
    opposeRatio: 27,
    detailUrl: "https://example.com/bill/1",
    opinionUrl: "https://example.com/opinion/1",
  },
  {
    billNo: "제2023-12346호",
    title: "기후위기 대응을 위한 탄소중립·녹색성장 기본법 일부개정법률안",
    proposerImageUrl: "/mock/kim.jpg",
    proposerName: "김철수",
    proposerParty: "국민의힘",
    proposerCount: 8,
    summary:
      "이 법안은 2050년까지 탄소중립 달성을 위한 구체적인 로드맵을 제시하고, 온실가스 감축 목표를 강화하는 내용을 담고 있습니다. 또한 기업의 탄소배출량 공시 의무화 및 탄소세 도입 근거를 마련합니다.",
    agreeRatio: 85,
    opposeRatio: 15,
    detailUrl: "https://example.com/bill/2",
    opinionUrl: "https://example.com/opinion/2",
  },
  {
    billNo: "제2023-12347호",
    title: "디지털 플랫폼 이용자 보호에 관한 법률안",
    proposerImageUrl: "/mock/lee.jpg",
    proposerName: "이영희",
    proposerParty: "정의당",
    proposerCount: 5,
    summary:
      "이 법안은 디지털 플랫폼 사업자의 불공정 거래행위를 규제하고 이용자의 권익을 보호하기 위한 내용을 담고 있습니다. 플랫폼 사업자의 정보 공개 의무, 알고리즘 투명성 확보, 소비자 피해구제 절차 등을 규정합니다.",
    agreeRatio: 62,
    opposeRatio: 38,
    detailUrl: "https://example.com/bill/3",
    opinionUrl: "https://example.com/opinion/3",
  },
  {
    billNo: "제2023-12348호",
    title: "인공지능 윤리 및 규제에 관한 법률안",
    proposerImageUrl: "/mock/park.jpg",
    proposerName: "박민수",
    proposerParty: "더불어민주당",
    proposerCount: 15,
    summary:
      "이 법안은 인공지능 기술의 윤리적 개발과 활용을 위한 기본원칙을 수립하고, 고위험 AI 시스템에 대한 규제 체계를 마련하는 내용을 담고 있습니다. AI 개발자와 사업자의 책임성, 투명성, 공정성 등을 강조합니다.",
    agreeRatio: 58,
    opposeRatio: 42,
    detailUrl: "https://example.com/bill/4",
    opinionUrl: "https://example.com/opinion/4",
  },
  {
    billNo: "제2023-12349호",
    title: "주택임대차보호법 일부개정법률안",
    proposerImageUrl: "/mock/choi.jpg",
    proposerName: "최지원",
    proposerParty: "국민의힘",
    proposerCount: 10,
    summary:
      "이 법안은 전월세 상한제를 강화하고 계약갱신청구권 행사 기간을 연장하는 내용을 담고 있습니다. 또한 임대차 계약 정보의 투명한 공개와 임대료 인상률 제한을 통해 세입자의 주거 안정성을 높이고자 합니다.",
    agreeRatio: 70,
    opposeRatio: 30,
    detailUrl: "https://example.com/bill/5",
    opinionUrl: "https://example.com/opinion/5",
  },
];

export default function NoticesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* 헤더 배경 */}
      <div className="z-20 bg-gradient-to-r from-blue-200/80  to-red-200/80 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                입법예고 쇼츠
              </h1>
              <p className="text-gray-600 mt-2">
                국회에서 현재 논의 중인 법안들을 다양한 형태로 확인하세요.
              </p>
            </div>
          </div>
        </div>
      </div>
      <main className="flex-grow flex">
        {/* 좌측 필터 고정 */}
        <div className="w-64 shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-hidden bg-white/80 border-r border-gray-200 z-10">
          <SidebarFilter />
        </div>

        {/* 우측 콘텐츠 */}
        <div className="flex-1 scrollbar-hide overflow-y-auto h-[calc(100vh-64px)] bg-[url('/mock/Taegeukgi.png')] bg-cover bg-center bg-no-repeat backdrop-blur-sm">
          {/* 뷰 모드 탭 */}
          <div className="bg-white/60 backdrop-blur-md border-b border-gray-200/50">
            <div className="container">
              <Tabs
                defaultValue="shorts"
                className="w-full h-full flex flex-col"
              >
                <TabsList className="grid grid-cols-4 md:w-fit bg-gray-100/70 sticky top-0 z-20">
                  <TabsTrigger value="shorts">
                    <Smartphone className="h-4 w-4 mr-2" />
                    <span className="hidden md:inline">쇼츠</span>
                  </TabsTrigger>
                  <TabsTrigger value="feed">
                    <LayoutList className="h-4 w-4 mr-2" />
                    <span className="hidden md:inline">피드</span>
                  </TabsTrigger>
                  <TabsTrigger value="grid">
                    <Grid3X3 className="h-4 w-4 mr-2" />
                    <span className="hidden md:inline">그리드</span>
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <ListFilter className="h-4 w-4 mr-2" />
                    <span className="hidden md:inline">리스트</span>
                  </TabsTrigger>
                </TabsList>
                <div className="flex-1 scrollbar-hide overflow-y-auto relative">
                  {/* 쇼츠 뷰 (유튜브 쇼츠 스타일) */}
                  <TabsContent value="shorts" className="mt-0">
                    <div className="flex justify-center py-8">
                      {/* <div className="flex justify-center py-8 bg-[url('/mock/Taegeukgi.png')] bg-cover bg-center bg-no-repeat backdrop-blur-sm"> */}
                      <div className="max-w-md w-full space-y-4">
                        {mockNotices.map((notice, index) => (
                          <div key={index} className="snap-start">
                            <NoticeShortCard notice={notice} vertical={true} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* 피드 뷰 (페이스북/스레드 스타일) */}
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

                  {/* 그리드 뷰 (인스타그램 스타일) */}
                  <TabsContent value="grid" className="mt-0">
                    <div className="py-8">
                      <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {mockNotices.map((notice, index) => (
                            <NoticeGridCard key={index} notice={notice} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* 리스트 뷰 (카카오페이지 스타일) */}
                  <TabsContent value="list" className="mt-0">
                    <div className="py-8">
                      <div className="container mx-auto px-4">
                        <div className="space-y-4">
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
