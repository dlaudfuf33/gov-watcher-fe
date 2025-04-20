"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ProposerProfile from "@/components/ProposerProfile";
import { NoticeProps } from "@/types/notice";

// Chart.js 등록
ChartJS.register(ArcElement, Tooltip, Legend);
export interface ProposerGroup {
  id: string;
  name: string;
  party: string;
  imageUrl?: string;
}

interface NoticeShortCardProps {
  notice: NoticeProps;
}

export default function NoticeShortCard({ notice }: NoticeShortCardProps) {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card
      className={`w-full min-h-0 max-h-[1400px] flex flex-col shadow-2xl rounded-2xl backdrop-blur-3xl border`}
    >
      <CardContent className="p-4 flex-grow min-h-0 overflow-hidden">
        <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-rose-50 to-blue-50 border border-rose-200 text-sm text-gray-800 font-semibold rounded-lg shadow-sm backdrop-blur-sm">
          <span className="text-blue-700">📌 입법예고 기간</span>
          <span className="text-gray-700 font-medium">
            {notice.startDate.toLocaleDateString()} ~{" "}
            {notice.endDate.toLocaleDateString()}
          </span>
        </div>
        <div className="mt-2 text-sm text-gray-500">[No.{notice.billNo}]</div>
        <h2 className="text-[clamp(1.125rem,4vw,1.5rem)] font-bold mb-2 text-gray-800 break-words line-clamp-1 leading-relaxed">
          {notice.title}
        </h2>

        <div className="mb-4 gap-4 space-y-3">
          {/* 공동발의자 프로필 카드 및 모달 */}
          <ProposerProfile
            notice={notice}
            showDetails={showDetails}
            setShowDetails={setShowDetails}
          />

          <div className="relative w-full h-[20vw] max-h-12 flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            {/* 찬성 영역 */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-400 to-blue-600 backdrop-blur-xl text-sm font-bold flex items-center justify-end pr-0 gap-0.5 z-10"
              initial={{ width: 0 }}
              animate={{ width: `${notice.agreeRatio}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.span className="text-xs md:text-sm font-bold text-white whitespace-nowrap">
                {notice.agreeRatio}%
              </motion.span>
              <motion.img
                src="/characters/left-fighter.gif"
                alt="찬성 캐릭터"
                className="h-16 md:h-16 w-auto object-contain ml-[-4px]"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 50 }}
              />
            </motion.div>
            {/* 반대 영역 */}
            <motion.div
              className="absolute top-0 right-0 h-full bg-gradient-to-l from-pink-500 to-red-500 backdrop-blur-xl text-white text-sm font-bold flex items-center justify-start pl-0 gap-0.5 z-10"
              initial={{ width: 0 }}
              animate={{ width: `${notice.opposeRatio}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.img
                src="/characters/right-fighter.gif"
                alt="반대 캐릭터"
                className="h-16 md:h-16 w-auto object-contain mr-[-4px]"
                initial={{ x: 20 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 50 }}
              />
              <span className="text-xs md:text-sm font-bold text-white whitespace-nowrap">
                {notice.opposeRatio}%
              </span>
            </motion.div>
          </div>
        </div>

        {/* 본문 영역 */}
        <div
          className="px-6 py-6 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300
          hover:bg-white/90 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] cursor-pointer"
        >
          <div className="space-y-4">
            <h2 className="text-[clamp(1.25rem,3vw,1.75rem)] font-semibold text-gray-900 tracking-tight">
              {notice.title}
            </h2>
            <p className="text-[clamp(1rem,2.5vw,1.125rem)] text-gray-600 leading-relaxed">
              {notice.summary}
            </p>
          </div>
        </div>

        <div
          id="midle"
          className="flex flex-row justify-between items-start gap-4 mt-4"
        >
          <div className="w-3/5 max-w-[450px]">
            <div className="flex flex-col gap-2 p-4 rounded-xl border border-cyan-200 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-sm backdrop-blur-sm">
              <div className="text-base font-semibold text-cyan-700">
                🧭 입법 절차 진행 상황
              </div>
              <div className="flex flex-wrap items-center gap-1">
                {notice.stepLog.map((step, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-xs tracking-tight transition-all duration-200 ${
                      step === notice.currentStep
                        ? "bg-cyan-200 text-cyan-900 font-bold shadow-sm"
                        : "bg-white border border-gray-300 text-gray-600"
                    }`}
                  >
                    {step} ➡
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* 버튼 묶음 영역 */}
          <div className="flex flex-col items-end gap-3 w-fit">
            <Button
              asChild
              className="w-[160px] self-end bg-gradient-to-br from-blue-100 via-cyan-200 to-cyan-300 text-cyan-900 hover:from-blue-200 hover:to-cyan-400 font-semibold shadow-inner border border-cyan-300"
            >
              <a
                href={notice.detailUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                🔍 입법예고 자세히 보기
              </a>
            </Button>
            <Button
              asChild
              className="w-[160px] self-end bg-gradient-to-br from-blue-100 via-cyan-200 to-cyan-300 text-cyan-900 hover:from-blue-200 hover:to-cyan-400 font-semibold shadow-inner border border-cyan-300"
            >
              <a
                href={notice.detailUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                📜 바뀌는 법 내용 보기
              </a>
            </Button>
            <Button
              asChild
              className="w-[160px] self-end bg-gradient-to-br from-blue-100 via-cyan-200 to-cyan-300 text-cyan-900 hover:from-blue-200 hover:to-cyan-400 font-semibold shadow-inner border border-cyan-300"
            >
              <a
                href={notice.commentsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                🗣️ 의견 남기러 가기
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
