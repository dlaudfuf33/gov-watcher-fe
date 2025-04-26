"use client";

import NoticeShortCard from "@/components/notice/NoticeShortCard";
import NoticeFeedCard from "@/components/notice/NoticeFeedCard";
import NoticeListCard from "@/components/notice/NoticeListCard";
import type { NoticeProps } from "@/types/notice.types";
import SidebarFilter from "@/components/notice/SidebarFilter";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Sliders,
  ChevronsLeft,
  ListFilter,
  LayoutList,
  Smartphone,
} from "lucide-react";

function applyFiltersAndSort(
  notices: NoticeProps[],
  filters: any
): NoticeProps[] {
  let result = notices;

  // 필터링
  result = result.filter((notice) => {
    if (filters.party && !filters.party.includes(notice.proposerParty))
      return false;
    if (
      filters.category &&
      !filters.category.some((cat: string) => notice.summary.includes(cat))
    )
      return false;
    if (filters.ratio) {
      const diff = Math.abs(notice.agreeRatio - notice.opposeRatio);
      if (
        filters.ratio.includes("찬성 우세") &&
        notice.agreeRatio <= notice.opposeRatio
      )
        return false;
      if (
        filters.ratio.includes("반대 우세") &&
        notice.agreeRatio >= notice.opposeRatio
      )
        return false;
      if (filters.ratio.includes("팽팽") && diff > 5) return false;
    }
    return true;
  });

  // 정렬
  switch (filters.sortOption) {
    case "찬성률 높은순":
      result = result.slice().sort((a, b) => b.agreeRatio - a.agreeRatio);
      break;
    case "반대률 높은순":
      result = result.slice().sort((a, b) => b.opposeRatio - a.opposeRatio);
      break;
    case "의견 많은순":
      result = result.slice().sort((a, b) => b.commentsCount - a.commentsCount);
      break;
    default: // 최신순 (startDate 내림차순)
      result = result
        .slice()
        .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
      break;
  }

  return result;
}

export default function NoticesList({ notices }: { notices: NoticeProps[] }) {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsFilterOpen(window.innerWidth > 768);
    }
  }, []);
  const [filters, setFilters] = useState({});

  const filteredNotices = applyFiltersAndSort(notices, filters);

  return (
    <>
      <main className="flex-grow flex relative max-h-full">
        {/* 사이드필터 */}
        <section
          className={cn(
            `absolute top-14 bottom-0 
            max-h-[calc(100vh-56px)] overflow-y-auto scrollbar-hide
            left-0 z-20 transition-all duration-300 ease-in-out`,
            isFilterOpen
              ? "translate-x-0 w-[240px]"
              : "-translate-x-full w-[240px]"
          )}
        >
          <SidebarFilter
            onFilterChange={(newFilters) => setFilters(newFilters)}
          />
        </section>
        <section
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
                      {filteredNotices.map((notice, index) => (
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
                      {filteredNotices.map((notice, index) => (
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
                        {filteredNotices.map((notice, index) => (
                          <NoticeListCard key={index} notice={notice} />
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </section>
      </main>
    </>
  );
}
