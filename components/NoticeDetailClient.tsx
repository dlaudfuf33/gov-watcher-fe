"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { NoticeProps } from "@/types/notice";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { useRouter } from "next/navigation";
import { BillOpinionStats } from "@/types/DailyOpinionStats";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, Share2 } from "lucide-react";
import BattleChart from "@/components/charts/BattleChart";
import TrendChart from "@/components/charts/TrendChart";
import ProposerGrid from "@/components/ProposerGrid";
import Header from "@/components/Header";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);
export const dummyBillOpinionStats: BillOpinionStats = {
  bill_no: "2209892",
  stats: [
    { date: "2025-04-17", total: 16, agree: 0, oppose: 16 },
    { date: "2025-04-18", total: 18, agree: 18, oppose: 0 },
    { date: "2025-04-19", total: 8, agree: 3, oppose: 5 },
    { date: "2025-04-20", total: 9, agree: 6, oppose: 3 },
    { date: "2025-04-21", total: 12, agree: 3, oppose: 9 },
    { date: "2025-04-22", total: 12, agree: 7, oppose: 5 },
    { date: "2025-04-23", total: 14, agree: 2, oppose: 12 },
  ],
};

interface NoticeDetailClientProps {
  billID: string; // props로 billID 받는 인터페이스 정의, OK
}

export default function NoticeDetailClient({
  billID,
}: NoticeDetailClientProps) {
  const [data, setData] = useState<NoticeProps | null>(null); // 상태 정의 OK
  const [loading, setLoading] = useState(true); // 로딩 플래그 OK
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      setLoading(true); // 요청 전 로딩 시작
      const res = await fetch(`/api/notices/${billID}`); // API 호출 경로도 정확
      const result = await res.json(); // JSON 파싱
      setData(result); // 응답값 세팅
      setLoading(false); // 로딩 종료
    }
    fetchData(); // mount 시 실행
  }, [billID]); // billID가 바뀔 경우 재요청

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[url('/mock/Taegeukgi.png')] bg-cover bg-center bg-fixed">
        <main className="container mx-auto py-6 px-4 bg-white/70 backdrop-blur-sm">
          <Card className="bg-[#EFEEEA] shadow-sm mb-6 overflow-hidden">
            <div className="mb-1">
              <div className="h-8 w-40 mb-4">
                <Skeleton className="h-full w-full" />
              </div>
            </div>
            <div className="border-b border-[#514332]/40 p-6">
              <div className="h-8 w-3/4 mb-4">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="h-6 w-full mb-2">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="h-5 w-full mb-2">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="h-5 w-11/12 mb-2">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="h-5 w-2/3">
                <Skeleton className="h-full w-full" />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 p-6">
              <div className="md:col-span-2 space-y-4">
                <div className="h-6 w-40">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="h-48 w-full">
                  <Skeleton className="h-full w-full" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-6 w-24">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="h-8 w-full">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="space-y-2 mt-4">
                  <div className="h-5 w-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <div className="h-5 w-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <div className="h-5 w-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="h-6 w-32 mb-4">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="h-28 w-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <div className="h-5 w-10">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="h-5 w-10">
                  <Skeleton className="h-full w-full" />
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  // 찬성/반대 비율 계산
  const agreeRatio = data.agreeRatio;
  const opposeRatio = data.opposeRatio;

  return (
    <div className="min-h-screen bg-[url(/mock/Taegeukgi.png)] bg-cover bg-center bg-fixed">
      <Header />
      {/* 메인 컨텐츠 */}
      <main className="container mx-auto py-3 px-4 bg-white/70">
        {/* 뒤로가기 버튼 */}
        <div className="mb-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center text-sm text-gray-700 hover:text-blue-800 bg-white/80 px-3 py-1 rounded-md"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> 목록으로 돌아가기
          </Button>
        </div>

        {/* 주요 정보 카드 */}
        <Card className="bg-[#EFEEEA] shadow-sm mb-6 overflow-hidden">
          {/* 제목 및 작성자 정보 */}
          <div className="border-b border-[#514332]/40 p-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-100/70 to-cyan-100/70 border border-blue-200 rounded-full shadow-inner backdrop-blur-md text-sm text-blue-800 font-semibold mb-4">
              📌 입법예고 {new Date(data.startDate).toLocaleDateString()} ~{" "}
              {new Date(data.endDate).toLocaleDateString()}
            </div>

            <h1 className="text-2xl font-bold text-gray-800">{data.title}</h1>
            <p className="mt-2 text-xl text-gray-800 hover:text-black">
              {data.summary}
            </p>
          </div>

          {/* 내용과 찬반 투표를 나란히 배치 */}
          <div className="grid md:grid-cols-3 gap-6 p-6 ">
            {/* 내용 */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-3 text-gray-800">
                추세 분석
              </h3>
              <TrendChart stats={dummyBillOpinionStats.stats} />
            </div>

            {/* 찬반 현황 */}
            <div className="border-l border-[#514332]/40 pl-6 md:pl-6">
              <h3 className="text-lg font-medium mb-3 text-gray-800">
                찬반 현황
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">찬성</span>
                  <span className="font-medium">반대</span>
                </div>
                <div className="relative h-8 mb-2">
                  <div className="absolute inset-0 flex">
                    <BattleChart
                      agree={data.agreeRatio}
                      oppose={data.opposeRatio}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <span className="text-white text-sm font-medium">
                      {agreeRatio}%
                    </span>
                    <span className="text-white text-sm font-medium">
                      {opposeRatio}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-[15px] text-gray-800 mt-6 font-normal">
                <div className="flex justify-between items-center border-b border-[#514332]/40 pb-1">
                  <span className="text-gray-500">📎 발의자</span>
                  <span className="font-medium">{data.mainProposer}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#514332]/40 pb-1">
                  <span className="text-gray-500">🏛️ 정당</span>
                  <span className="font-medium">{data.proposerParty}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#514332]/40 pb-1">
                  <span className="text-gray-500">💼 위원회</span>
                  <span className="font-medium">{data.committee}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#514332]/40 pb-1">
                  <span className="text-gray-500">📅 발의일</span>
                  <span className="font-medium">
                    {new Date(data.proposerDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-[#514332]/40 pb-1">
                  <span className="text-gray-500">🔄 진행 단계</span>
                  <span className="font-medium">{data.currentStep}</span>
                </div>
                <div className="pt-4">
                  <span className="block text-gray-500 mb-1">📘 단계</span>
                  <div className="flex flex-wrap gap-2">
                    {data.stepLog.map((step, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm transition-all duration-200 ${
                          step === data.currentStep
                            ? "bg-cyan-500 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-[#514332]/40  text-sm font-medium text-gray-700 mt-4">
                <div className="text-gray-500">👁️ {data.viewCount} 조회</div>
                <div className="text-gray-500">
                  💬 {data.commentsCount} 댓글
                </div>
              </div>
            </div>
          </div>

          {/* 프로필 카드 그리드 */}
          <ProposerGrid proposers={data.proposers} />

          {/* 공유 및 댓글 버튼 */}
          <div className="border-t border-[#514332]/40 p-4 flex justify-between gap-2">
            <div className="flex gap-2">
              <a
                href={data.detailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/90 border border-blue-300 text-blue-800 font-medium rounded-lg hover:bg-blue-100 transition shadow-sm text-sm"
              >
                📄 원문 보기
              </a>
              <a
                href={data.commentsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/90 border border-blue-300 text-blue-800 font-medium rounded-lg hover:bg-blue-100 transition shadow-sm text-sm"
              >
                🗣️ 의견 보기
              </a>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:bg-gray-100"
              >
                <MessageSquare className="w-4 h-4 mr-1" /> 댓글 보기
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:bg-gray-100"
              >
                <Share2 className="w-4 h-4 mr-1" /> 공유하기
              </Button>
            </div>
          </div>
        </Card>
      </main>

      {/* 푸터 */}
    </div>
  );
}
