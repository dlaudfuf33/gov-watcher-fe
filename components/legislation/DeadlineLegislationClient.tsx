"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ArrowLeft, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Legislation, legislationApi } from "@/api/legislation";
import DeadlineSkeletonCard from "@/components/legislation/DeadlineSkeletonCard";
import ScrollToTopButton from "../ScrollToTopButton";

export default function DeadlineLegislationClient({
  initialData,
  total,
  initialPage,
  initialPrimarySort,
  initalsecondarySort,
}: {
  initialData: Legislation[];
  total: number;
  initialPage: number;
  initialPrimarySort: string;
  initalsecondarySort: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [legislations, setLegislations] = useState<Legislation[]>(initialData);
  const [currentPage, setCurrentPage] = useState(initialPage || 1);
  const [totalItems, setTotalItems] = useState(total);
  const router = useRouter();
  const [primarySort] = useState(initialPrimarySort);
  const [secondarySort, setSecondarySort] = useState(initalsecondarySort);
  const itemsPerPage = 10;
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          setIsLoading(true);
          try {
            const { data, total } = await legislationApi.getLegislations({
              isServer: false,
              page: currentPage + 1,
              size: itemsPerPage,
              primarySort,
              secondarySort,
            });

            if (data.length === 0) {
              setHasMore(false);
            } else {
              setLegislations((prev) => {
                const combined = [...prev, ...data];
                const uniqueMap = new Map(
                  combined.map((item) => [item.id, item])
                );
                return Array.from(uniqueMap.values());
              });
              setCurrentPage((prev) => prev + 1);
              setTotalItems(total);
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
    primarySort,
    secondarySort,
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header />
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
            <h1 className="text-3xl font-bold">⏰ 마감 임박 입법예고안</h1>
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
            Array.from({ length: 5 }).map((_, idx) => (
              <DeadlineSkeletonCard key={idx} />
            ))
          ) : legislations && legislations.length === 0 ? (
            <div className="text-center text-gray-500 py-16 font-medium">
              현재 마감 임박한 입법예고안이 없습니다.
            </div>
          ) : (
            legislations &&
            legislations.map((legislation) => (
              <Card
                key={legislation.id}
                className="overflow-hidden bg-white border-opacity-70 shadow-lg transition-transform duration-200 hover:shadow-2xl hover:scale-[1.01]"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex items-center justify-center p-4 bg-blue-50 md:w-24">
                      <Badge
                        variant={
                          legislation.daysLeft && legislation.daysLeft <= 3
                            ? "destructive"
                            : "default"
                        }
                        className="text-lg font-bold px-3 py-1"
                      >
                        D-{legislation.daysLeft}
                      </Badge>
                    </div>

                    <div className="flex-1 p-4 space-y-2">
                      <div>
                        <h3 className="font-bold text-lg">
                          {legislation.title}
                        </h3>
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-500">
                            {legislation.proposer} ({legislation.party})
                          </p>
                          <p className="text-sm text-gray-500">
                            {legislation.date}
                          </p>
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
                              router.push(
                                `/legislation/detail/${legislation.id}`
                              )
                            }
                          >
                            자세히 보기
                          </Button>
                          <Button
                            asChild
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
      <Footer />
    </div>
  );
}
