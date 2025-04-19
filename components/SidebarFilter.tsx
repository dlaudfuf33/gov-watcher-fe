import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react"; // 아이콘

export default function SidebarFilter() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle Button (모바일 전용) */}
      <Button
        onClick={() => setOpen(!open)}
        variant="outline"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden bg-white/70 backdrop-blur-md"
      >
        <Filter className="w-4 h-4 mr-1" />
        {open ? "닫기" : "필터"}
      </Button>

      {/* Sidebar */}
      <div
        className={`z-20 h-full w-64 bg-gradient-to-b from-blue-200/80  to-red-200/80 backdrop-blur-sm bg-cover bg-center bg-no-repeat text-gray-800 border-r border-[#e4ded5] transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:sticky md:top-16 md:h-[calc(100vh-64px)] md:block`}
      >
        <div className="p-3 space-y-0">
          {/* 상단 닫기 버튼 */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <h2 className="text-lg font-bold">필터</h2>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="bg-[#fffefc]/60 border border-[#e5dfd1] rounded-xl p-4 backdrop-blur-md">
              <h3 className="text-sm font-bold mb-2 text-[#2d1f10] border-b border-[#e0d8c8] pb-1">
                정렬
              </h3>
              <select
                className="w-full rounded-lg border border-[#d7ccc0] bg-white/70 backdrop-blur-sm p-2 text-sm text-[#3d2b1f] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
                title="정렬 기준 선택"
                aria-label="정렬 기준 선택"
              >
                <option>최신순</option>
                <option>찬성률 높은순</option>
                <option>반대률 높은순</option>
                <option>의견 많은순</option>
              </select>
            </div>

            <div className="bg-[#fffefc]/60 border border-[#e5dfd1] rounded-xl p-4 backdrop-blur-md">
              <h3 className="text-sm font-bold mb-2 text-[#2d1f10] border-b border-[#e0d8c8] pb-1">
                정당
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-[#3d2b1f] hover:bg-[#f7f3eb] px-1 py-1 rounded transition-colors">
                  <input
                    type="checkbox"
                    id="party-dp"
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span>더불어민주당</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-[#3d2b1f] hover:bg-[#f7f3eb] px-1 py-1 rounded transition-colors">
                  <input
                    type="checkbox"
                    id="party-gp"
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span>국민의힘</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-[#3d2b1f] hover:bg-[#f7f3eb] px-1 py-1 rounded transition-colors">
                  <input
                    type="checkbox"
                    id="party-yd"
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span>정의당</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-[#3d2b1f] hover:bg-[#f7f3eb] px-1 py-1 rounded transition-colors">
                  <input
                    type="checkbox"
                    id="party-etc"
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span>기타 정당</span>
                </label>
              </div>
            </div>

            <div className="bg-[#fffefc]/60 border border-[#e5dfd1] rounded-xl p-4 backdrop-blur-md">
              <h3 className="text-sm font-bold mb-2 text-[#2d1f10] border-b border-[#e0d8c8] pb-1">
                카테고리
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-[#3d2b1f] hover:bg-[#f7f3eb] px-1 py-1 rounded transition-colors">
                  <input
                    type="checkbox"
                    id="category-economy"
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span>💰 경제</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-[#3d2b1f] hover:bg-[#f7f3eb] px-1 py-1 rounded transition-colors">
                  <input
                    type="checkbox"
                    id="category-welfare"
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span>🧑‍⚕️ 복지</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-[#3d2b1f] hover:bg-[#f7f3eb] px-1 py-1 rounded transition-colors">
                  <input
                    type="checkbox"
                    id="category-education"
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span>🎓 교육</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-[#3d2b1f] hover:bg-[#f7f3eb] px-1 py-1 rounded transition-colors">
                  <input
                    type="checkbox"
                    id="category-environment"
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span>🌿 환경</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-[#3d2b1f] hover:bg-[#f7f3eb] px-1 py-1 rounded transition-colors">
                  <input
                    type="checkbox"
                    id="category-defense"
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span>🛡️ 국방</span>
                </label>
              </div>
            </div>

            <div className="bg-[#fffefc]/60 border border-[#e5dfd1] rounded-xl p-4 backdrop-blur-md">
              <h3 className="text-sm font-bold mb-2 text-[#2d1f10] border-b border-[#e0d8c8] pb-1">
                찬반 비율
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-[#3d2b1f] hover:bg-[#f7f3eb] px-1 py-1 rounded transition-colors">
                  <input
                    type="checkbox"
                    id="ratio-support"
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span>찬성 우세 (60% 이상)</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-[#3d2b1f] hover:bg-[#f7f3eb] px-1 py-1 rounded transition-colors">
                  <input
                    type="checkbox"
                    id="ratio-even"
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span>팽팽 (40~60%)</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-[#3d2b1f] hover:bg-[#f7f3eb] px-1 py-1 rounded transition-colors">
                  <input
                    type="checkbox"
                    id="ratio-opposition"
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span>반대 우세 (60% 이상)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
