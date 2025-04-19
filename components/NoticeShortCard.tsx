"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ThumbsUp, ThumbsDown, MessageCircle, Share2 } from "lucide-react";

// Chart.js 등록
ChartJS.register(ArcElement, Tooltip, Legend);

export interface NoticeProps {
  billNo: string;
  title: string;
  proposerImageUrl: string;
  proposerName: string;
  proposerParty: string;
  proposerCount: number;
  summary: string;
  agreeRatio: number;
  opposeRatio: number;
  detailUrl: string;
  opinionUrl: string;
}

interface NoticeShortCardProps {
  notice: NoticeProps;
  vertical?: boolean;
}

export default function NoticeShortCard({
  notice,
  vertical = false,
}: NoticeShortCardProps) {
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
        callbacks: {
          label: (context: any) => {
            const label = context.label || "";
            return `${label}`;
          },
        },
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
        return "border-blue-200 bg-gradient-to-br from-white to-cyan-100";
      case "국민의힘":
        return "border-red-200/50 bg-gradient-to-br from-white to-pink-100";
      case "정의당":
        return "border-yellow-200/50 bg-gradient-to-br from-white to-amber-100";
      default:
        return "border-gray-200/50 bg-gradient-to-br from-white to--stone-300";
    }
  };

  if (vertical) {
    return (
      <Card
        className={` w-full h-[80vh] flex flex-col shadow-2xl rounded-2xl backdrop-blur-3xl border ${getPartyColor()} `}
      >
        <CardContent className="p-4 flex-grow flex flex-col">
          <div className="mb-2 text-sm text-gray-500">{notice.billNo}</div>
          <h2 className="text-2xl font-bold mb-3 text-gray-800">
            {notice.title}
          </h2>

          <div className="flex items-center mb-4">
            <img
              src={
                notice.proposerImageUrl || "/placeholder.svg?height=40&width=40"
              }
              alt={notice.proposerName}
              className="w-10 h-10 rounded-full mr-3 border-2 border-white shadow-md"
            />
            <div>
              <div className="font-medium text-gray-800">
                {notice.proposerName}
              </div>
              <div className="text-sm text-gray-500">
                {notice.proposerParty} · 외 {notice.proposerCount}인
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{notice.summary}</p>

          <div className="mt-auto">
            <div
              className="w-[200px] h-[200px] mx-auto mb-6"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Pie data={chartData} options={chartOptions} />
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-4">
                <button className="flex items-center text-gray-600 hover:text-blue-500">
                  <ThumbsUp className="h-5 w-5 mr-1" />
                  <span>{notice.agreeRatio}%</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-red-500">
                  <ThumbsDown className="h-5 w-5 mr-1" />
                  <span>{notice.opposeRatio}%</span>
                </button>
              </div>
              <div className="flex space-x-4">
                <button
                  className="text-gray-600 hover:text-gray-800"
                  title="댓글"
                >
                  <MessageCircle className="h-5 w-5" />
                </button>
                <button
                  className="text-gray-600 hover:text-gray-800"
                  title="공유"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between p-4 pt-0">
          <Button
            variant="outline"
            asChild
            className="text-gray-700 hover:text-blue-500 border border-gray-200/50 hover:border-blue-200 bg-white/50 backdrop-blur-sm"
          >
            <a
              href={notice.detailUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 상세보기
            </a>
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 text-white shadow-md"
          >
            <a
              href={notice.opinionUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              ✍ 의견등록
            </a>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card
      className={`w-[300px] h-[500px] flex flex-col shadow-xl rounded-2xl snap-center shrink-0 mx-2 backdrop-blur-md border ${getPartyColor()}`}
    >
      <CardContent className="p-4 flex-grow">
        <div className="mb-2 text-sm text-gray-500">{notice.billNo}</div>
        <h2 className="text-xl font-bold mb-3 line-clamp-2 text-gray-800">
          {notice.title}
        </h2>

        <div className="flex items-center mb-4">
          <img
            src={
              notice.proposerImageUrl || "/placeholder.svg?height=40&width=40"
            }
            alt={notice.proposerName}
            className="w-10 h-10 rounded-full mr-3 border-2 border-white shadow-md"
          />
          <div>
            <div className="font-medium text-gray-800">
              {notice.proposerName}
            </div>
            <div className="text-sm text-gray-500">
              {notice.proposerParty} · 외 {notice.proposerCount}인
            </div>
          </div>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-4">{notice.summary}</p>

        <div
          className="w-[200px] h-[200px] mx-auto mb-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Pie data={chartData} options={chartOptions} />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-4 pt-0">
        <Button
          variant="outline"
          asChild
          className="text-gray-700 hover:text-blue-500 border border-gray-200/50 hover:border-blue-200 bg-white/50 backdrop-blur-sm"
        >
          <a href={notice.detailUrl} target="_blank" rel="noopener noreferrer">
            🔗 상세보기
          </a>
        </Button>
        <Button
          asChild
          className="bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 text-white shadow-md"
        >
          <a href={notice.opinionUrl} target="_blank" rel="noopener noreferrer">
            ✍ 의견등록
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
