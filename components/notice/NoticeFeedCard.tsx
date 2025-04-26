"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";
import type { NoticeProps } from "@/types/notice.types";
import ProposerProfile from "@/components/notice/ProposerProfile";
import { Button } from "@/components/ui/button";

// Chart.js 등록
ChartJS.register(ArcElement, Tooltip, Legend);

export default function NoticeFeedCard({ notice }: { notice: NoticeProps }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // 차트 데이터
  const chartData = {
    labels: [`찬성 ${notice.agreeRatio}%`, `반대 ${notice.opposeRatio}%`],
    datasets: [
      {
        data: [notice.agreeRatio, notice.opposeRatio],
        backgroundColor: ["#3B82F6", "#EF4444"],
        borderWidth: 0,
        hoverOffset: isHovered ? 4 : 0,
      },
    ],
  };

  // 차트 옵션
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: {
            size: 12,
          },
          color: "#4B5563",
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: isHovered,
    },
  };

  return (
    <Card
      className={`w-full bg-white/80 border border-gray-200 rounded-xl shadow-md backdrop-blur-md`}
    >
      <CardContent className="p-6">
        <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-rose-50 to-blue-50 border border-rose-200 text-sm text-gray-800 font-semibold rounded-lg shadow-sm backdrop-blur-sm">
          <span className="text-blue-700">📌 입법예고 기간</span>
          <span className="text-gray-700 font-medium">
            {notice.startDate.toLocaleDateString()} ~
            {notice.endDate.toLocaleDateString()}
          </span>
        </div>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="">
            <ProposerProfile
              notice={notice}
              showDetails={showDetails}
              setShowDetails={setShowDetails}
            />
          </div>

          <div
            className="px-6 py-6 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300
          hover:bg-white/90 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] cursor-pointer"
          >
            <div className="space-y-4">
              <h2 className="text-[clamp(1.25rem,3vw,1.75rem)] font-semibold text-gray-900 tracking-tight">
                <p className="mt-2 text-sm text-gray-500">
                  [No.{notice.billNo}]
                </p>
                {notice.title}
              </h2>
              <p className="text-[clamp(1rem,2.5vw,1.125rem)] text-gray-600 leading-relaxed">
                {notice.summary}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start mt-6">
          {/* 그래프 */}
          <div className="w-full md:w-1/3 flex justify-center items-center">
            <div
              className="w-full max-w-[180px] hover:scale-105 transition-transform duration-300 ease-in-out"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Pie data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* 절차 + 버튼 */}
          <div className="w-full md:w-2/3 flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="w-full lg:w-3/5 max-w-[500px]">
              <div className="flex flex-col gap-3 p-5 rounded-xl border border-cyan-200 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-md backdrop-blur-md transition-all duration-300">
                <div className="text-base font-semibold text-cyan-700 tracking-wide">
                  🧭 진행 상황
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {notice.stepLog.map((step, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs font-medium tracking-tight transition-all duration-200 ${
                        step === notice.currentStep
                          ? "bg-cyan-300/70 text-cyan-900 font-bold shadow-sm border border-cyan-400"
                          : "bg-white border border-gray-300 text-gray-600"
                      }`}
                    >
                      {step} ➡
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 w-full lg:w-fit">
              {[
                ["🔍 자세히 보기", notice.detailUrl],
                ["📜 바뀌는 법 내용 보기", notice.detailUrl],
                ["🗣️ 의견 남기러 가기", notice.commentsUrl],
              ].map(([label, url], i) => (
                <Button
                  key={i}
                  asChild
                  className="w-full lg:w-[180px] bg-gradient-to-br from-blue-100 via-cyan-200 to-cyan-300 text-cyan-900 hover:from-blue-200 hover:to-cyan-400 font-semibold shadow-inner border border-cyan-300"
                >
                  <a
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
