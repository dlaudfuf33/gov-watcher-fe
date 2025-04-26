export default function SidebarFilter() {
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
              <div className="space-y-0">
                <label className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#e6f0ff]/60 transition-all">
                  <span className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      id="party-dp"
                      className="form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-300 rounded-md"
                    />
                    더불어민주당
                  </span>
                </label>
                <label className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#e6f0ff]/60 transition-all">
                  <span className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      id="party-gp"
                      className="form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-300 rounded-md"
                    />
                    국민의힘
                  </span>
                </label>

                <label className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#e6f0ff]/60 transition-all">
                  <span className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      id="party-etc"
                      className="form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-300 rounded-md"
                    />
                    기타 정당
                  </span>
                </label>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/60 to-[#f8f5f2]/60 border border-[#d7cfc6] rounded-2xl shadow-inner p-4 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-gray-700 border-b pb-2 mb-2">
                카테고리
              </h3>
              <div className="space-y-2">
                <label className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#e6f0ff]/60 transition-all">
                  <span className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      id="category-economy"
                      className="form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-300 rounded-md"
                    />
                    💰 경제
                  </span>
                </label>
                <label className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#e6f0ff]/60 transition-all">
                  <span className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      id="category-welfare"
                      className="form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-300 rounded-md"
                    />
                    🧑‍⚕️ 복지
                  </span>
                </label>
                <label className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#e6f0ff]/60 transition-all">
                  <span className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      id="category-education"
                      className="form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-300 rounded-md"
                    />
                    🎓 교육
                  </span>
                </label>
                <label className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#e6f0ff]/60 transition-all">
                  <span className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      id="category-environment"
                      className="form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-300 rounded-md"
                    />
                    🌿 환경
                  </span>
                </label>
                <label className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#e6f0ff]/60 transition-all">
                  <span className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      id="category-defense"
                      className="form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-300 rounded-md"
                    />
                    🛡️ 국방
                  </span>
                </label>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/60 to-[#f8f5f2]/60 border border-[#d7cfc6] rounded-2xl shadow-inner p-4 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-gray-700 border-b pb-2 mb-2">
                찬반 비율
              </h3>
              <div className="space-y-2">
                <label className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#e6f0ff]/60 transition-all">
                  <span className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      id="ratio-support"
                      className="form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-300 rounded-md"
                    />
                    찬성 우세
                  </span>
                </label>
                <label className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#e6f0ff]/60 transition-all">
                  <span className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      id="ratio-even"
                      className="form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-300 rounded-md"
                    />
                    팽팽
                  </span>
                </label>
                <label className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#e6f0ff]/60 transition-all">
                  <span className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      id="ratio-opposition"
                      className="form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-300 rounded-md"
                    />
                    반대 우세
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
