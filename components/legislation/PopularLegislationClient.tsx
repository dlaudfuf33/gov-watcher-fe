"use client";

import { useEffect, useState } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { legislationApi, Legislation } from "@/api/legislation";
import PopularLegislationSkeleton from "@/components/legislation/PopularLegislationSkeleton";

export default function PopularLegislationClient({
  initialData,
  total,
  initialPage,
  initialSortBy,
}: {
  initialData: Legislation[];
  total: number;
  initialPage: number;
  initialSortBy: string;
}) {
  const [legislations, setLegislations] = useState<Legislation[]>(initialData);
  const [totalItems, setTotalItems] = useState(total);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const router = useRouter();

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await legislationApi.getPopularLegislations({
          page: currentPage,
          limit: itemsPerPage,
          sortBy,
        });
        setLegislations(result.data);
        setTotalItems(result.total);
      } catch (err) {
        console.error("인기 입법예고안 불러오기 실패:", err);
        setLegislations([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage, sortBy]);

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
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="views">조회수</SelectItem>
                  <SelectItem value="comments">의견수</SelectItem>
                  <SelectItem value="agree">찬성률</SelectItem>
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
                        agree={legislation.agree}
                        oppose={legislation.oppose}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{legislation.opinionCounts}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{legislation.views}</span>
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

        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNumber)}
                    isActive={currentPage === pageNumber}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {totalPages > 5 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(totalPages)}
                    isActive={currentPage === totalPages}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
}
