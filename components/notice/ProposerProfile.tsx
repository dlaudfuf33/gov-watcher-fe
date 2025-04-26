"use client";

import { useRouter } from "next/navigation";
import { NoticeProps } from "@/types/notice.types";
import { Dispatch, SetStateAction } from "react";

interface ProposerProfileProps {
  notice: NoticeProps;
  showDetails: boolean;
  setShowDetails: Dispatch<SetStateAction<boolean>>;
}

export default function ProposerProfile({
  notice,
  showDetails,
  setShowDetails,
}: ProposerProfileProps) {
  const router = useRouter();

  return (
    <>
      {/* 프로필 버튼 카드 */}
      <button
        className="w-full text-left flex items-start gap-3 group p-3 rounded-xl transition-all duration-300 ease-in-out 
                bg-white 
                  shadow-md hover:shadow-lg hover:scale-[1.015] hover:-translate-y-0.5"
        onClick={() => setShowDetails(true)}
      >
        <img
          src={notice.proposerImageUrl || "/placeholder.svg"}
          alt={notice.mainProposer}
          className="w-12 h-12 rounded-full border-2 border-white shadow group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 ease-out"
        />
        <div className="flex flex-col justify-center items-start">
          <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
            {notice.mainProposer}
          </div>
          <div className="text-sm text-gray-500 group-hover:text-red-500 transition-colors duration-300">
            ({notice.proposerParty}) 등 {notice.proposers.length}인
          </div>
        </div>
      </button>

      {/* 공동발의자 모달 */}
      <div
        className={`absolute inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
          showDetails ? "opacity-100 visible" : "opacity-0 invisible"
        } bg-gradient-to-br from-pink-100/40 via-rose-50/40 to-blue-100/40 backdrop-blur-md`}
        onClick={() => setShowDetails(false)}
      >
        <div
          className="relative bg-white rounded-3xl p-6 w-full max-w-2xl shadow-2xl border border-[rgba(255,255,255,0.3)] backdrop-blur-xl transition-all duration-300 ease-in-out max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
            onClick={() => setShowDetails(false)}
          >
            ❌
          </button>
          <h4 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 border-dashed border-rose-200">
            공동발의자
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {notice.proposers.map((p) => (
              <button
                key={p.id}
                onClick={() => router.push(`/politicians/${p.id}`)}
                className="flex flex-col items-center text-center bg-gradient-to-br from-rose-50 to-blue-50 rounded-xl p-3 shadow hover:scale-105 transition"
              >
                <img
                  src={p.imageUrl || "/placeholder.svg"}
                  alt={p.name}
                  className="w-16 h-16 rounded-full border border-pink-200 shadow-sm mb-1 object-cover"
                />
                <span className="text-sm font-semibold text-gray-800">
                  {p.name}
                </span>
                <span className="text-xs text-gray-500">{p.party}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
