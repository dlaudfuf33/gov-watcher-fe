"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Eye, ArrowLeft, Filter } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
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
import { motion } from "framer-motion";
import { Legislation, legislationApi } from "@/api/legislation";
import SkeletonCard from "@/components/legislation/CategorySkeletonCard";

// 카테고리 정보
const categoryInfo = {
  defense: { title: "국방 관련 입법예고안", emoji: "🛡️" },
  education: { title: "교육 관련 입법예고안", emoji: "📚" },
  economy: { title: "경제 관련 입법예고안", emoji: "💰" },
  welfare: { title: "복지 관련 입법예고안", emoji: "🏥" },
  environment: { title: "환경 관련 입법예고안", emoji: "🌱" },
};
type CategoryKey = keyof typeof categoryInfo;

async function fetchCategoryLegislations(
  page: number,
  itemsPerPage: number,
  sortBy: string,
  category: CategoryKey
) {
  return await legislationApi.getLegislations(
    page,
    itemsPerPage,
    sortBy,
    category
  );
}

export default function CategoryDetailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [legislations, setLegislations] = useState<Legislation[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();
  const params = useParams();

  const category = (
    Array.isArray(params?.category) ? params?.category[0] : params?.category
  ) as CategoryKey | undefined;

  if (!category || !categoryInfo[category]) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">
              카테고리를 찾을 수 없습니다
            </h1>
            <Button
              onClick={() => router.back()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              홈으로 돌아가기
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const itemsPerPage = 10;
  // API에서 카테고리별 입법예고안 데이터 가져오기
  useEffect(() => {
    const loadLegislations = async () => {
      try {
        setIsLoading(true);

        const result = await fetchCategoryLegislations(
          currentPage,
          itemsPerPage,
          sortBy,
          category
        );

        setLegislations(result.data);
        setTotalItems(result.total);
        setError(null);
      } catch (err) {
        setError("카테고리별 입법예고안을 불러오는 중 오류가 발생했습니다.");
        console.error("카테고리별 입법예고안 로딩 오류:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadLegislations();
  }, [category, currentPage, sortBy]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const { title, emoji } = categoryInfo[category];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            className="mb-4 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            onClick={() => router.push("/legislation")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            돌아가기
          </Button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {emoji} {title}
            </h1>
            <div className="mt-4 mb-6 overflow-x-auto">
              <div className="inline-flex bg-white rounded-lg p-1 shadow-md min-w-full md:min-w-0">
                {Object.entries(categoryInfo).map(([cat, info]) => (
                  <Button
                    key={cat}
                    variant={cat === category ? "default" : "ghost"}
                    className={`px-4 py-2 rounded-md transition-all duration-300 ${
                      cat === category
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                    onClick={() => router.push(`/legislation/category/${cat}`)}
                  >
                    <span className="mr-2">{info.emoji}</span>
                    {cat === "defense"
                      ? "국방"
                      : cat === "education"
                      ? "교육"
                      : cat === "economy"
                      ? "경제"
                      : cat === "welfare"
                      ? "복지"
                      : "환경"}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
              <Filter className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">정렬:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] border-none shadow-none focus:ring-0">
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">최신순</SelectItem>
                  <SelectItem value="views">조회수</SelectItem>
                  <SelectItem value="comments">의견수</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {error && (
          <div className="text-center text-red-500 font-medium mb-4">
            {error}
          </div>
        )}

        <motion.div
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {isLoading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          ) : error ? (
            <div className="text-center text-red-600 font-semibold py-8">
              {error}
            </div>
          ) : (
            <>
              {legislations.length === 0 && (
                <div className="text-center text-gray-500 py-16 font-medium">
                  해당 카테고리의 입법예고안이 없습니다.
                </div>
              )}
              {legislations.map((legislation) => (
                <motion.div key={legislation.id} variants={item}>
                  <Card className="bg-white border-opacity-70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] rounded-xl overflow-hidden">
                    <CardContent className="p-5 space-y-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
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

                        <section className="flex flex-row space-x-2 pt-2">
                          <Button
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
                            size="default"
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
                        </section>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </>
          )}
        </motion.div>

        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className={`${
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer hover:bg-blue-50 hover:text-blue-600"
                } transition-colors`}
              />
            </PaginationItem>

            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNumber)}
                    isActive={currentPage === pageNumber}
                    className={
                      currentPage === pageNumber
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        : "hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    }
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
                    className={
                      currentPage === totalPages
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        : "hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    }
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
                className={`${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer hover:bg-blue-50 hover:text-blue-600"
                } transition-colors`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
}
