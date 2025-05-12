"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Eye, ArrowLeft, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import BattleChart from "@/components/charts/battle-chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { legislationApi, Legislation } from "@/api/legislation";
import PopularLegislationSkeleton from "@/components/legislation/PopularLegislationSkeleton";
import ScrollToTopButton from "../ScrollToTopButton";

export default function PopularLegislationClient({
  initialData,
  total,
  initialPage,
  initialPrimarySort,
  initialSecondarySort,
}: {
  initialData: Legislation[];
  total: number;
  initialPage: number;
  initialPrimarySort: string;
  initialSecondarySort: string;
}) {
  const [legislations, setLegislations] = useState<Legislation[]>(initialData);
  const [totalItems, setTotalItems] = useState(total);
  const [isLoading, setIsLoading] = useState(false);
  const primarySort = initialPrimarySort;
  const [secondarySort, setSecondarySort] = useState(initialSecondarySort);
  const [currentPage, setCurrentPage] = useState(initialPage || 1);
  const itemsPerPage = 10;
  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          setIsLoading(true);
          try {
            const result = await legislationApi.getLegislations({
              isServer: false,
              page: currentPage + 1,
              size: itemsPerPage,
              primarySort: initialPrimarySort,
              secondarySort: initialSecondarySort,
            });

            if (result.data.length === 0) {
              setHasMore(false);
            } else {
              setLegislations((prev) => {
                const combined = [...prev, ...result.data];
                const uniqueMap = new Map(
                  combined.map((item) => [item.id, item])
                );
                return Array.from(uniqueMap.values());
              });
              setCurrentPage((prev) => prev + 1);
            }
          } catch (err) {
            console.error("더 불러오기 실패:", err);
          } finally {
            setIsLoading(false);
          }
        }
      },
      { threshold: 1.0 }
    );

    const ref = observerRef.current;
    if (ref) observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [
    observerRef,
    isLoading,
    hasMore,
    currentPage,
    initialPrimarySort,
    initialSecondarySort,
  ]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            돌아가기
          </Button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold">🔥 인기 입법예고안</h1>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">정렬:</span>
              <Select
                value={secondarySort}
                onValueChange={(newSort) => {
                  setSecondarySort(newSort);
                  setCurrentPage(1);
                  setLegislations([]);
                  setHasMore(true);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="보조 정렬" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NONE">없음</SelectItem>
                  <SelectItem value="OPINIONS">의견수</SelectItem>
                  <SelectItem value="AGREE">찬성률</SelectItem>
                  <SelectItem value="DISAGREE">반대률</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <PopularLegislationSkeleton />
          ) : legislations.length === 0 ? (
            <Card className="bg-white shadow-md rounded-lg">
              <CardContent className="p-8 text-center text-gray-500">
                표시할 입법예고안이 없습니다.
              </CardContent>
            </Card>
          ) : (
            legislations.map((legislation) => (
              <Card
                key={legislation.id}
                className="bg-white border-opacity-70 shadow-lg hover:scale-[1.01] hover:shadow-xl transition-transform"
              >
                <CardContent className="p-4 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg">{legislation.title}</h3>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">
                        {legislation.proposer} ({legislation.party})
                      </p>
                      <p className="text-sm text-gray-500">
                        {legislation.date}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>찬성</span>
                      <span>반대</span>
                    </div>
                    <div className="w-full">
                      <BattleChart
                        agree={legislation.agreeRatio}
                        disagree={legislation.disagreeRatio}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{legislation.opinionCounts}</span>
                      </div>
                    </div>

                    <div className="flex flex-row space-x-2 pt-2">
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
                        onClick={() =>
                          router.push(`/legislation/detail/${legislation.id}`)
                        }
                      >
                        자세히 보기
                      </Button>

                      <Button
                        size="sm"
                        className="bg-white text-blue-600 border border-blue-500 hover:bg-blue-200 shadow-sm flex-1"
                      >
                        <a
                          href={legislation.opinionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          의견 내러 가기
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        {isLoading && <div className="text-center py-4">불러오는 중...</div>}
        <div ref={observerRef} className="h-5" />
        <ScrollToTopButton />
      </main>
    </div>
  );
}
