import { Search } from "lucide-react";
import { Suspense } from "react";
import FilterSection from "./FilterSection";
import { SearchAndFilterSectionProps } from "@/types/SearchAndFilterSectionProps.types";

export default function SearchAndFilterSection({
  searchQuery,
  setSearchQuery,
  selectedParties,
  setSelectedParties,
  selectedRegions,
  setSelectedRegions,
}: SearchAndFilterSectionProps) {
  return (
    <section className="bg-[#f5f5f5] rounded-lg shadow-md p-6 mb-8">
      {/* 제목 영역 */}
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-government-blue">
          국회의원 검색
        </h1>
        <p className="text-government-gray">
          대한민국 국회의원 정보를 검색하고 필터링하세요
        </p>
      </section>

      {/* 검색 입력창 */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-2">
        <div className="relative w-full md:w-2/3">
          {/* 검색 아이콘 */}
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {/* 검색어 입력 필드 */}
          <input
            type="text"
            placeholder="국회의원 이름, 지역구, 정당 등으로 검색"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // 입력값 변경 시 상태 업데이트
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <div>
          {/* 필터 드롭다운 섹션 (정당, 지역, 대수) */}
          <Suspense fallback={<div>필터 로딩 중...</div>}>
            <FilterSection
              selectedParties={selectedParties} // 선택된 정당 필터 값
              setSelectedParties={setSelectedParties} // 정당 필터 값 업데이트 함수
              selectedRegions={selectedRegions} // 선택된 지역 필터 값
              setSelectedRegions={setSelectedRegions} // 지역 필터 값 업데이트 함수
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
