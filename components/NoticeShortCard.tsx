"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  Link,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Chart.js 등록
ChartJS.register(ArcElement, Tooltip, Legend);
export interface ProposerGroup {
  id: string;
  name: string;
  party: string;
  imageUrl?: string;
}

export interface NoticeProps {
  billNo: string;
  viewCount: number;
  commentsCount: number;
  title: string;
  startDate: Date;
  endDate: Date;
  proposerImageUrl: string;
  mainProposer: string;
  proposerParty: string;
  proposers: ProposerGroup[];
  proposerDate: Date;
  committee: string;
  currentStep: string;
  stepLog: string[];
  summary: string;
  agreeRatio: number;
  opposeRatio: number;
  detailUrl: string;
  commentsUrl: string;
}

interface NoticeShortCardProps {
  notice: NoticeProps;
}

export default function NoticeShortCard({ notice }: NoticeShortCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  // 정당에 따른 색상 결정
  const getPartyColor = () => {
    switch (notice.proposerParty) {
      case "더불어민주당":
        return "border-blue-200 bg-gradient-to-br from-white to-cyan-100";
      case "국민의힘":
        return "border-red-200/50 bg-gradient-to-br from-white to-pink-100";
      case "정의당":
        return "border-yellow-200/50 bg-gradient-to-br from-white to-amber-100";
      default:
        return "border-gray-200/50 bg-gradient-to-br from-white to--stone-300";
    }
  };

  return (
    <Card
      className={` w-full min-h-0 max-h-[1400px] flex flex-col shadow-2xl rounded-2xl backdrop-blur-3xl border ${getPartyColor()} `}
    >
      <CardContent className="p-4 flex-grow min-h-0 overflow-hidden">
        <div className="mt-1 mb-1 text-sm text-gray-500">[{notice.billNo}]</div>

        <div className="mt-1 text-sm text-red-500">
          ({notice.startDate.toLocaleDateString()} ~
          {notice.endDate.toLocaleDateString()})
        </div>
        <h2 className="text-[clamp(1.125rem,4vw,1.5rem)] font-bold mb-2 text-gray-800 break-words line-clamp-1 leading-relaxed">
          {notice.title}
        </h2>

        <div className="mb-4 gap-4 space-y-3">
          <div className="flex flex-row justify-start gap-2 border p-3 rounded-md">
            <button
              className="w-full text-left flex items-start gap-2 group hover:bg-blue-50 p-2 rounded-md transition "
              onClick={() => setShowDetails(true)}
            >
              <img
                src={notice.proposerImageUrl || "/placeholder.svg"}
                alt={notice.mainProposer}
                className="w-12 h-12 rounded-full border-2 border-white shadow-md group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col justify-start flex-grow">
                <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-700">
                  {notice.mainProposer} ({notice.proposerParty})
                </div>
                <div className="text-[clamp(0.5rem,4vw,1rem)] break-words line-clamp-1 font-normal text-gray-700 group-hover:text-blue-500">
                  등 {notice.proposers.length}인
                </div>
              </div>
            </button>
          </div>

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

        {/* 모달 창: 공동발의자 정보 */}
        {showDetails && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowDetails(false)}
          >
            <div
              className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-xl border relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={() => setShowDetails(false)}
              >
                ❌
              </button>
              <h4 className="font-semibold text-gray-800 mb-4">공동발의자</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {notice.proposers.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => router.push(`/politicians/${p.id}`)}
                    className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-200"
                  >
                    <img
                      src={p.imageUrl || "/placeholder.svg"}
                      alt={p.name}
                      className="w-16 h-16 rounded-full border shadow-sm mb-1 object-cover"
                    />
                    <span className="text-sm font-medium text-gray-800">
                      {p.name}
                    </span>
                    <span className="text-xs text-gray-500">{p.party}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 본문 영역 */}
        <div className="bg-gray-100 rounded-md p-4 mt-2 border overflow-hidden max-h-[800px]">
          <p className="text-[clamp(1rem,4vw,1.25rem)] text-sm font-semibold text-gray-700 mb-6 break-words whitespace-pre-wrap leading-snug">
            {notice.summary}
          </p>
        </div>

        <div
          id="midle"
          className="flex flex-row justify-between items-start gap-4 mt-4"
        >
          <div className="w-3/5 max-w-[450px]">
            <div className="flex flex-wrap items-start gap-2 border p-3 rounded-md">
              <div className="flex flex-col justify-start min-w-15">
                <div className="text-sm font-semibold text-gray-700 whitespace-normal">
                  🧭 진행 상황
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {notice.stepLog.map((step, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 rounded-full text-s ${
                      step === notice.currentStep
                        ? "bg-red-100 text-red-700 font-semibold"
                        : "bg-gray-100 text-gray-600"
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
              className="w-[160px] self-end bg-gradient-to-r from-blue-400 to-red-400 backdrop-blur-2xl hover:from-blue-600 hover:to-red-600 text-white shadow-md"
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
              className="w-[160px] self-end bg-gradient-to-r from-blue-400 to-red-400 backdrop-blur-2xl hover:from-blue-600 hover:to-red-600 text-white shadow-md"
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
              className="w-[160px] self-end bg-gradient-to-r from-blue-400 to-red-400 backdrop-blur-2xl hover:from-blue-600 hover:to-red-600 text-white shadow-md"
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
