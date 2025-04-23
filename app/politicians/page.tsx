import { Search } from "lucide-react";
import PoliticianCard from "@/components/politician-card";
import FilterSection from "@/components/filter-section";
import SortingOptions from "@/components/sorting-options";
import VisualizationSection from "@/components/visualization-section";
import RecommendationSection from "@/components/recommendation-section";
import { Politicians } from "@/lib/politiciansData";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="bg-[#f5f5f5]">
      <Header />
      <main className="max-w-screen-2xl mx-auto px-4 py-4 bg-[#f5f5f5]">
        {/* 검색 및 필터 섹션 */}
        <div className="bg-[#f5f5f5] rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">국회의원 찾기</h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <div className="relative w-full md:w-2/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="국회의원 이름, 지역구, 정당 등으로 검색"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <Suspense fallback={<div>필터 로딩 중...</div>}>
            <FilterSection />
          </Suspense>
        </div>

        <div className="">
          {/* 정렬 옵션 */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">국회의원 목록</h2>
            <Suspense fallback={<div>정렬 옵션 로딩 중...</div>}>
              <SortingOptions />
            </Suspense>
          </div>

          {/* 의원 카드 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-12">
            {Politicians.map((politician) => (
              <PoliticianCard key={politician.id} politician={politician} />
            ))}
          </div>
        </div>

        {/* 시각화 섹션 */}
        <Suspense fallback={<div>시각화 로딩 중...</div>}>
          <VisualizationSection />
        </Suspense>

        {/* 추천/큐레이션 영역 */}
        <Suspense fallback={<div>추천 섹션 로딩 중...</div>}>
          <RecommendationSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
