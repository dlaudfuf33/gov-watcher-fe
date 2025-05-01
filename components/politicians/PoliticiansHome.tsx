"use client";

import { Suspense } from "react";
import SortingOptions from "@/components/politicians/SortingOptions";
import PoliticiansCardGrid from "./PoliticiansCardGrid";
import { useEffect, useState, useRef } from "react";
import { Politician } from "@/types/politiciansType";
import { getPoliticiansList } from "@/api/politicians/PoliticiansAPI";
import SearchAndFilterSection from "./SearchAndFilterSection";
import PoliticianCardSkeletonList from "./PoliticianCardSkeleton";

// 전체 의원 목록을 저장하는 상태
export default function PoliticianHome() {
  const [politicians, setPoliticians] = useState<Politician[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // 정렬 기준 (e.g., 최근 발의, 통과율 등)
  const [sortBy, setSortBy] = useState("bills");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParties, setSelectedParties] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);

  // 전달된 정렬 기준에 따라 의원 배열을 정렬하는 함수
  function getSortedPoliticians(politicians: Politician[], sortKey: string) {
    return [...politicians].sort((a, b) => {
      switch (sortKey) {
        case "bills":
          return b.recentBills - a.recentBills;
        case "passRate":
          return (b.passRate ?? 0) - (a.passRate ?? 0);
        case "career":
          return (b.careerYears ?? 0) - (a.careerYears ?? 0);
        case "activity":
          return (b.recentActivities ?? 0) - (a.recentActivities ?? 0);
        default:
          return 0;
      }
    });
  }

  const sortedPoliticians = getSortedPoliticians(politicians, sortBy);

  // 검색어, 필터 조건(정당, 지역구, 대수)에 따라 정렬된 의원 목록을 필터링
  const filteredPoliticians = sortedPoliticians.filter((p) => {
    const matchesSearch = [p.name, p.party, p.district].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesParty =
      selectedParties.length === 0 || selectedParties.includes(p.party);
    const matchesRegion =
      selectedRegions.length === 0 ||
      selectedRegions.some((region) => p.district.includes(region));
    const matchesTerm =
      selectedTerms.length === 0 || selectedTerms.includes(`${p.term}대`);

    return matchesSearch && matchesParty && matchesRegion && matchesTerm;
  });

  // 페이지 변경 시 새로운 의원 데이터를 가져오고 기존 목록에 추가
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log("📦 Fetching page:", page);
      const res = await getPoliticiansList({ page, limit: 20 });

      // 중복 제거 (id 기준)
      setPoliticians((prev) => {
        const newIds = new Set(prev.map((p) => p.id));
        const deduped = res.data.filter((p) => !newIds.has(p.id));
        return [...prev, ...deduped];
      });

      // 데이터가 20개 미만이면 마지막 페이지로 간주
      setHasMore(res.data.length === 20);
      setLoading(false);
    };
    fetchData();
  }, [page]);

  // 무한 스크롤: 마지막 요소가 뷰포트에 들어오면 다음 페이지 로딩
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          console.log("📍 Loader in view, loading next page...");
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <div>
      <main className="max-w-screen-2xl mx-auto px-4 py-4 bg-[#f5f5f5]">
        {/* 검색어 입력 및 필터 상태 변경을 위한 UI 섹션 */}
        <SearchAndFilterSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedParties={selectedParties}
          setSelectedParties={setSelectedParties}
          selectedRegions={selectedRegions}
          setSelectedRegions={setSelectedRegions}
          selectedTerms={selectedTerms}
          setSelectedTerms={setSelectedTerms}
        />

        <div className="">
          {/* 사용자가 정렬 기준을 선택할 수 있는 정렬 UI 섹션 */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">국회의원 목록</h2>
            <Suspense fallback={<div>정렬 옵션 로딩 중...</div>}>
              <SortingOptions value={sortBy} onChange={setSortBy} />
            </Suspense>
          </div>

          {/* 필터링된 결과를 기반으로 국회의원 카드 목록 렌더링 */}
          {loading ? (
            <PoliticianCardSkeletonList />
          ) : (
            <PoliticiansCardGrid politicians={filteredPoliticians} />
          )}
        </div>

        {/* 추천 의원 섹션 (현재 전체 데이터 기반으로 샘플링) */}
        {/* <Suspense fallback={<div>추천 섹션 로딩 중...</div>}>
          <RecommendationSection politicians={politicians} />;
        </Suspense> */}
      </main>
    </div>
  );
}
