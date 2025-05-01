"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Eye, ArrowLeft, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { Legislation, legislationApi } from "@/api/legislation";
import DeadlineSkeletonCard from "@/components/legislation/DeadlineSkeletonCard";

export default function DeadlineLegislationClient({
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [legislations, setLegislations] = useState<Legislation[]>(initialData);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalItems, setTotalItems] = useState(total);
  const router = useRouter();

  const itemsPerPage = 10;

  // API에서 마감 임박 입법예고안 데이터 가져오기
  useEffect(() => {
    const fetchDeadlineLegislations = async () => {
      try {
        setIsLoading(true);

        const { data, total } = await legislationApi.getDeadlineLegislations({
          page: currentPage,
          limit: itemsPerPage,
          sortBy,
        });

        setLegislations(data);
        setTotalItems(total);
        setError(null);
      } catch (err) {
        setError("마감 임박 입법예고안을 불러오는 중 오류가 발생했습니다.");
        console.error("마감 임박 입법예고안 로딩 오류:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeadlineLegislations();
  }, [currentPage, sortBy]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daysLeft">마감일</SelectItem>
                  <SelectItem value="views">조회수</SelectItem>
                  <SelectItem value="comments">의견수</SelectItem>
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
          ) : legislations.length === 0 ? (
            <div className="text-center text-gray-500 py-16 font-medium">
              현재 마감 임박한 입법예고안이 없습니다.
            </div>
          ) : (
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
      <Footer />
    </div>
  );
}
