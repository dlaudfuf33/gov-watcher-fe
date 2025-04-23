"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useRouter } from "next/navigation";
import ProposerProfile from "@/components/ProposerProfile";
import { NoticeProps } from "@/types/notice";
import BattleChart from "@/components/charts/BattleChart";

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
    <Card className="flex flex-col w-full bg-white/80 border border-gray-200 rounded-xl shadow-md p-2 space-y-5">
      <CardContent className="p-4 flex-grow min-h-0 overflow-hidden relative">
        <div
          className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 
        bg-gradient-to-r from-rose-200 to-blue-200 border-2
        text-sm text-gray-800 font-semibold rounded-lg shadow-sm backdrop-blur-sm"
        >
          <span className="text-blue-700">📌예고 기간</span>
          <span className="text-gray-700 font-extrabold">
            {notice.startDate.toLocaleDateString()} ~{" "}
            {notice.endDate.toLocaleDateString()}
          </span>
        </div>

        <ProposerProfile
          notice={notice}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
        />

        <div className="mb-4 gap-2 space-y-0">
          {/* 본문 영역 */}
          <div className="px-5 py-5 bg-white/90 rounded-lg border border-gray-200 shadow-sm hover:bg-white transition-all duration-200 cursor-pointer">
            <div className="space-y-4">
              <h2 className="text-[clamp(1.25rem,3vw,1.75rem)] font-semibold text-gray-900 tracking-tight">
                [{notice.billNo}] {notice.title}
              </h2>
              <p className="text-[clamp(1rem,2.5vw,1.125rem)] text-gray-600 leading-relaxed">
                {notice.summary}
              </p>
            </div>
          </div>

          <div className="relative w-full h-[20vw] max-h-12 flex-shrink-0 bg-white rounded-lg overflow-hidden mb-6">
            <BattleChart
              agree={notice.agreeRatio}
              oppose={notice.opposeRatio}
            />
          </div>
        </div>

        <div className="flex flex-col justify-between items-end gap-3 mt-4">
          {/* 버튼 묶음 영역 */}
          <div className="flex flex-row items-end gap-2 w-fit">
            <Button
              asChild
              className="w-[150px] bg-white border border-blue-200 text-blue-800 hover:bg-blue-50 transition shadow-sm rounded-lg text-sm"
            >
              <a
                href={notice.detailUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                🔍 원문 보기
              </a>
            </Button>
            <Button
              asChild
              className="w-[150px] bg-white border border-blue-200 text-blue-800 hover:bg-blue-50 transition shadow-sm rounded-lg text-sm"
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
          <div className="flex flex-row items-end gap-2 w-fit">
            {/* <Button
              asChild
              className="w-[150px] bg-white border border-blue-200 text-blue-800 hover:bg-blue-50 transition shadow-sm rounded-lg text-sm"
            >
              <a
                href={notice.detailUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                📜 바뀌는 법 내용 보기
              </a>
            </Button> */}
            {/* <Button
              asChild
              className="w-[150px] bg-white border border-blue-200 text-blue-800 hover:bg-blue-50 transition shadow-sm rounded-lg text-sm"
            >
              <a
                href={notice.commentsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                🗣️ 임시
              </a>
            </Button> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
