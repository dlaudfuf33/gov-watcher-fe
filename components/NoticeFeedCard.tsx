"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, MessageCircle, Share2 } from "lucide-react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";
import type { NoticeProps } from "./NoticeShortCard";

// Chart.js 등록
ChartJS.register(ArcElement, Tooltip, Legend);

export default function NoticeFeedCard({ notice }: { notice: NoticeProps }) {
  const [isHovered, setIsHovered] = useState(false);

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

  // 정당에 따른 색상 결정
  const getPartyColor = () => {
    switch (notice.proposerParty) {
      case "더불어민주당":
        return "border-blue-200/50 bg-gradient-to-tr from-blue-50/70 to-white/70";
      case "국민의힘":
        return "border-red-200/50 bg-gradient-to-tr from-red-50/70 to-white/70";
      case "정의당":
        return "border-yellow-200/50 bg-gradient-to-tr from-yellow-50/70 to-white/70";
      default:
        return "border-gray-200/50 bg-gradient-to-tr from-gray-50/70 to-white/70";
    }
  };

  return (
    <Card
      className={`w-full shadow-lg rounded-xl backdrop-blur-md border ${getPartyColor()}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={
              notice.proposerImageUrl || "/placeholder.svg?height=40&width=40"
            }
            alt={notice.proposerName}
            className="w-12 h-12 rounded-full mr-4 border-2 border-white shadow-md"
          />
          <div>
            <div className="font-medium text-gray-800">
              {notice.proposerName}
            </div>
            <div className="text-sm text-gray-500">
              {notice.proposerParty} · 외 {notice.proposerCount}인 ·{" "}
              {notice.billNo}
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 text-gray-800">{notice.title}</h2>
        <p className="text-gray-700 mb-6">{notice.summary}</p>

        <div className="flex">
          <div className="w-1/3">
            <div
              className="w-full max-w-[150px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Pie data={chartData} options={chartOptions} />
            </div>
          </div>
          <div className="w-2/3 pl-4 flex flex-col justify-center">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm">찬성: {notice.agreeRatio}%</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm">반대: {notice.opposeRatio}%</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-gray-100/50 p-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex space-x-6">
            <button className="flex items-center text-gray-600 hover:text-blue-500">
              <ThumbsUp className="h-5 w-5 mr-1" />
              <span>찬성</span>
            </button>
            <button className="flex items-center text-gray-600 hover:text-red-500">
              <ThumbsDown className="h-5 w-5 mr-1" />
              <span>반대</span>
            </button>
          </div>
          <div className="flex space-x-6">
            <button
              className="text-gray-600 hover:text-gray-800"
              title="의견 보기"
              aria-label="의견 보기"
            >
              <MessageCircle className="h-5 w-5" />
            </button>
            <button
              className="text-gray-600 hover:text-gray-800"
              title="공유하기"
              aria-label="공유하기"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
