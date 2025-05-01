"use client";

import { Legislation, legislationApi } from "@/api/legislation";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Eye,
  TrendingUp,
  Link,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import BattleChart from "@/components/charts/battle-chart";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface PopularLegislationSectionProps {
  onViewMore: () => void;
}

export default function PopularLegislationSection({
  onViewMore,
}: PopularLegislationSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [popularLegislations, setPopularLegislations] = useState<Legislation[]>(
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const router = useRouter();

  const visibleItems = isMobile ? 1 : 3;
  const maxIndex = popularLegislations.length - visibleItems;

  const skeletonCards = Array.from({ length: visibleItems }).map((_, idx) => (
    <Card
      key={`skeleton-${idx}`}
      className="min-w-[300px] md:min-w-[calc(33.333%-16px)] flex-shrink-0 snap-center bg-white border-opacity-70 shadow-lg animate-pulse"
    >
      <CardContent className="p-5 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-2 bg-gray-200 rounded w-full" />
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
        <div className="h-10 bg-gray-200 rounded w-full" />
      </CardContent>
    </Card>
  ));

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.scrollWidth / popularLegislations.length;
      container.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex < maxIndex ? prevIndex + 1 : 0;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  useEffect(() => {
    const fetchPopularLegislations = async () => {
      try {
        setIsLoading(true);
        const response = await legislationApi.getPopularLegislations({
          page: 1,
          limit: 10,
          sortBy: "comments",
        });
        setPopularLegislations(response.data || []);
      } catch (error) {
        console.error("인기 입법예고안 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPopularLegislations();
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-2 rounded-lg text-white">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold">인기 입법예고안</h2>
        </div>
        <Button
          variant="outline"
          className="border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 font-semibold inline-flex items-center gap-1 px-4 py-2 rounded-full shadow-sm"
          onClick={onViewMore}
        >
          ﹢더 보기 <span className="text-sm">➔</span>
        </Button>
      </div>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-4 snap-x scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: "grab",
          }}
          onMouseDown={(e) => {
            const container = scrollContainerRef.current;
            if (!container) return;
            container.dataset.dragging = "true";
            container.dataset.startX = e.pageX.toString();
            container.dataset.scrollLeft = container.scrollLeft.toString();
          }}
          onMouseMove={(e) => {
            const container = scrollContainerRef.current;
            if (!container || container.dataset.dragging !== "true") return;
            const startX = Number(container.dataset.startX);
            const scrollLeft = Number(container.dataset.scrollLeft);
            const dx = e.pageX - startX;
            container.scrollLeft = scrollLeft - dx;
          }}
          onMouseUp={() => {
            const container = scrollContainerRef.current;
            if (container) container.dataset.dragging = "false";
          }}
          onMouseLeave={() => {
            const container = scrollContainerRef.current;
            if (container) container.dataset.dragging = "false";
          }}
        >
          {isLoading ? (
            skeletonCards
          ) : popularLegislations.length === 0 ? (
            <div className="w-full h-full text-center text-gray-500 py-6">
              표시할 입법예고안이 없습니다.
            </div>
          ) : (
            popularLegislations.map((legislation, index) => (
              <motion.div
                key={legislation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="min-w-[300px] md:min-w-[calc(33.333%-16px)] flex-shrink-0 snap-center"
              >
                <Card className="h-full bg-white border-opacity-70 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
                  <CardContent className="p-5 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold line-clamp-2 h-12 text-gray-800">
                            {legislation.title}
                          </h3>
                          <p className="text-gray-600">
                            {legislation.proposer} ({legislation.party})
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{legislation.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{legislation.opinionCounts}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-blue-600">
                          찬성 {legislation.agree}%
                        </span>
                        <span className="text-red-600">
                          반대 {legislation.oppose}%
                        </span>
                      </div>
                      <div className="w-full">
                        <BattleChart
                          agree={legislation.agree}
                          oppose={legislation.oppose}
                        />
                      </div>
                    </div>
                    <section className="flex flex-row space-x-2 pt-2">
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
                        onClick={() =>
                          router.push(`/legislation/detail/${legislation.id}`)
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
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow-md hidden md:flex hover:bg-blue-50 hover:text-blue-600 z-10"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-md hidden md:flex hover:bg-blue-50 hover:text-blue-600 z-10"
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex justify-center gap-2 md:hidden">
        {Array.from({ length: popularLegislations.length }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentIndex === index
                ? "bg-blue-600 w-4"
                : "bg-gray-300 hover:bg-gray-400"
            )}
            onClick={() => {
              setCurrentIndex(index);
              scrollToIndex(index);
            }}
          />
        ))}
      </div>
    </section>
  );
}
