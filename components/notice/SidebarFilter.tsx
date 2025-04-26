import { useState } from "react";
import { cn } from "@/lib/utils";

type NoticeFilterState = {
  party?: string[];
  category?: string[];
  ratio?: string[];
  sortOption?: string;
  startDate?: string;
  endDate?: string;
};

export default function SidebarFilter({
  onFilterChange,
}: {
  onFilterChange: (filter: NoticeFilterState) => void;
}) {
  const [party, setParty] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("최신순");
  const [selectedParties, setSelectedParties] = useState<Set<string>>(
    new Set()
  );
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const [selectedRatios, setSelectedRatios] = useState<Set<string>>(new Set());

  const handleApplyFilter = () => {
    onFilterChange({
      party: selectedParties.size > 0 ? Array.from(selectedParties) : undefined,
      category:
        selectedCategories.size > 0
          ? Array.from(selectedCategories)
          : undefined,
      ratio: selectedRatios.size > 0 ? Array.from(selectedRatios) : undefined,
      sortOption,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
  };

  const handleResetFilter = () => {
    setParty(undefined);
    setStartDate("");
    setEndDate("");
    setSortOption("최신순");
    setSelectedParties(new Set());
    setSelectedCategories(new Set());
    setSelectedRatios(new Set());
    onFilterChange({});
  };

  const toggleParty = (partyName: string) => {
    const newSet = new Set(selectedParties);
    if (newSet.has(partyName)) {
      newSet.delete(partyName);
    } else {
      newSet.add(partyName);
    }
    setSelectedParties(newSet);
    // Apply filter immediately
    onFilterChange({
      party: newSet.size > 0 ? Array.from(newSet) : undefined,
      category:
        selectedCategories.size > 0
          ? Array.from(selectedCategories)
          : undefined,
      ratio: selectedRatios.size > 0 ? Array.from(selectedRatios) : undefined,
      sortOption,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
  };

  const toggleCategory = (categoryName: string) => {
    const newSet = new Set(selectedCategories);
    if (newSet.has(categoryName)) {
      newSet.delete(categoryName);
    } else {
      newSet.add(categoryName);
    }
    setSelectedCategories(newSet);
    // Apply filter immediately
    onFilterChange({
      party: selectedParties.size > 0 ? Array.from(selectedParties) : undefined,
      category: newSet.size > 0 ? Array.from(newSet) : undefined,
      ratio: selectedRatios.size > 0 ? Array.from(selectedRatios) : undefined,
      sortOption,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
  };

  const toggleRatio = (ratioName: string) => {
    const newSet = new Set<string>();
    if (!selectedRatios.has(ratioName)) {
      newSet.add(ratioName);
    }
    setSelectedRatios(newSet);
    onFilterChange({
      party: selectedParties.size > 0 ? Array.from(selectedParties) : undefined,
      category:
        selectedCategories.size > 0
          ? Array.from(selectedCategories)
          : undefined,
      ratio: newSet.size > 0 ? Array.from(newSet) : undefined,
      sortOption,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
  };

  return (
    <div className="relative max-w-[240px]">
      {/* Sidebar */}
      <div
        className={`h-auto w-[230px] max-w-full z-20 p-4 bg-white/30 backdrop-blur-md border border-[#ddd6d1]/60 
          rounded-2xl shadow-[inset_0_1px_4px_rgba(255,255,255,0.3)] space-y-6 overflow-y-auto`}
      >
        <div className="space-y-0">
          <div className="space-y-2">
            <div className="bg-gradient-to-br from-white/60 to-[#f8f5f2]/60 border border-[#d7cfc6] rounded-2xl shadow-inner p-4 backdrop-blur-sm">
              <h3 className="text-base font-bold text-black border-b border-black pb-2 mb-2">
                정렬
              </h3>
              <select
                className="w-full rounded-lg border border-[#7B7879] bg-white/40 backdrop-blur-md 
                p-2 text-sm text-black shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition
                hover:bg-blue-400"
                title="정렬 기준 선택"
                aria-label="정렬 기준 선택"
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  onFilterChange({
                    party:
                      selectedParties.size > 0
                        ? Array.from(selectedParties)
                        : undefined,
                    category:
                      selectedCategories.size > 0
                        ? Array.from(selectedCategories)
                        : undefined,
                    ratio:
                      selectedRatios.size > 0
                        ? Array.from(selectedRatios)
                        : undefined,
                    sortOption: e.target.value,
                    startDate: startDate || undefined,
                    endDate: endDate || undefined,
                  });
                }}
              >
                <option>최신순</option>
                <option>찬성률 높은순</option>
                <option>반대률 높은순</option>
                <option>의견 많은순</option>
              </select>
            </div>

            <div className="bg-gradient-to-br from-white/60 to-[#f8f5f2]/60 border border-[#d7cfc6] rounded-2xl shadow-inner p-4 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-gray-700 border-b pb-2 mb-2">
                정당
              </h3>
              <div className="flex flex-wrap gap-2">
                {["더불어민주당", "국민의힘"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleParty(item)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200",
                      selectedParties.has(item)
                        ? "bg-blue-500 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/60 to-[#f8f5f2]/60 border border-[#d7cfc6] rounded-2xl shadow-inner p-4 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-gray-700 border-b pb-2 mb-2">
                카테고리
              </h3>
              <div className="flex flex-wrap gap-2">
                {["경제", "복지", "교육", "환경", "국방"].map((item) => {
                  let label = item;
                  if (item === "경제") label = "💰 경제";
                  if (item === "복지") label = "🧑‍⚕️ 복지";
                  if (item === "교육") label = "🎓 교육";
                  if (item === "환경") label = "🌿 환경";
                  if (item === "국방") label = "🛡️ 국방";
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleCategory(item)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200",
                        selectedCategories.has(item)
                          ? "bg-blue-500 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/60 to-[#f8f5f2]/60 border border-[#d7cfc6] rounded-2xl shadow-inner p-4 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-gray-700 border-b pb-2 mb-2">
                찬반 비율
              </h3>
              <div className="flex flex-wrap gap-2">
                {["찬성 우세", "팽팽", "반대 우세"].map((item) => {
                  let label = item;
                  if (item === "찬성 우세") label = "👍 찬성 우세";
                  if (item === "팽팽") label = "⚖️ 팽팽";
                  if (item === "반대 우세") label = "👎 반대 우세";
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleRatio(item)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200",
                        selectedRatios.has(item)
                          ? "bg-blue-500 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            onClick={handleResetFilter}
          >
            초기화
          </button>
        </div>
      </div>
    </div>
  );
}
