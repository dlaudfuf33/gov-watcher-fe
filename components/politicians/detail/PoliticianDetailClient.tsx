"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PoliticianBasicInfo from "@/components/politicians/detail/PoliticianBasicInfo";
import PoliticianContactInfo from "@/components/politicians/detail/PoliticianContactInfo";
import PoliticianCareerHistory from "@/components/politicians/detail/PoliticianCareerHistory";
import { PoliticianDetail } from "@/types/politiciansType";
import { useRouter } from "next/navigation";
import SocialMediaIcons from "./SocialGroup";
import BillActivityCard from "./BillActivityCard";
import { PoliticianNetworkData } from "@/types/PoliticianJointNetwork.types";
import PoliticianJointNetwork from "./PoliticianJointNetwork";
import { politicianApi } from "@/api/politicians";
import PoliticianPoliticalHistory from "./PoliticianPoliticalHistory";

interface PoliticianDetailClientProps {
  politicianDetail: PoliticianDetail;
}

export default function PoliticianDetailClient({
  politicianDetail,
}: PoliticianDetailClientProps) {
  const router = useRouter();
  // 클라이언트 상태 관리
  const [activeTab, setActiveTab] = useState("basic");
  const [networkData, setNetworkData] = useState<PoliticianNetworkData | null>(
    null
  );
  const [loadingNetwork, setLoadingNetwork] = useState(false);

  // 정당에 따른 배지 색상 설정
  const partyColorMap: Record<string, string> = {
    더불어민주당: "bg-party-blue-bg text-party-blue-text",
    국민의힘: "bg-party-red-bg text-party-red-text",
    정의당: "bg-party-yellow-bg text-party-yellow-text",
    기본소득당: "bg-party-purple-bg text-party-purple-text",
    국가혁신당: "bg-party-green-bg text-party-green-text",
    무소속: "bg-party-gray-bg text-party-gray-text",
  };

  const partyColor =
    partyColorMap[politicianDetail.profile.party] ||
    "bg-party-gray-bg text-party-gray-text";

  const loadNetworkData = async () => {
    if (loadingNetwork) return;
    setLoadingNetwork(true);
    try {
      const res = await politicianApi.getgetPoliticianNetworkData({
        politicianID: politicianDetail.profile.id,
        isServer: false,
      });
      setNetworkData(res.data);
    } catch (error) {
      console.error("Failed to load network data:", error);
    } finally {
      setLoadingNetwork(false);
    }
  };

  // 클라이언트 측 이벤트 핸들러
  const handleTabChange = async (value: string) => {
    setActiveTab(value);

    if (value === "network" || !networkData) {
      await loadNetworkData();
    }
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Button
          onClick={router.back}
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 pl-0"
        >
          <ArrowLeft className="h-4 w-4" />
          돌아가기
        </Button>
      </div>

      {/* 상단 프로필 섹션 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 프로필 이미지 */}
          <div className="md:w-1/4 flex flex-col items-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
              <Image
                src={
                  `/politician/${politicianDetail.profile.monaCD}.jpg` ||
                  "/mock/empty.jpg"
                }
                alt={`${politicianDetail.profile.name} 의원 프로필 사진`}
                fill
                className="object-cover"
              />
            </div>
            <Badge className={`${partyColor} mb-2 text-sm px-3 py-1`}>
              {politicianDetail.profile.party}
            </Badge>
            <h1 className="text-2xl font-bold text-center">
              {politicianDetail.profile.name}
            </h1>
            <p className="text-gray-600 text-center">
              {politicianDetail.profile.district}
            </p>
            <p className="text-gray-500 text-sm text-center">
              {politicianDetail.profile.term}대 | 국회의원
            </p>
          </div>

          {/* 기본 정보 요약 */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              <BillActivityCard
                totalBills={politicianDetail.billActivities.totalBills}
                recentBills={politicianDetail.billActivities.recentBills}
                passRate={politicianDetail.billActivities.passRate}
                bills={politicianDetail.billActivities.bills}
              />
            </div>

            {/* 연락처 및 SNS 요약 */}
            <div className="mt-4 flex flex-wrap gap-3">
              <SocialMediaIcons politicianDetail={politicianDetail} />
            </div>
          </div>
        </div>
      </div>

      {/* 상세 정보 탭 */}
      <Tabs
        defaultValue="basic"
        className="mb-8"
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsList className="bg-gray-100 p-1 mb-6">
          <TabsTrigger
            value="basic"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md transition-all duration-300"
          >
            기본 정보
          </TabsTrigger>
          <TabsTrigger
            value="network"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md transition-all duration-300"
          >
            네트워크
          </TabsTrigger>
          <TabsTrigger
            value="political"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md transition-all duration-300"
          >
            정치 이력
          </TabsTrigger>
          {/* 일단 여기 까지..  */}
          <TabsTrigger
            value="bills"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md transition-all duration-300"
          >
            법안 활동
          </TabsTrigger>
          <TabsTrigger
            value="analysis"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md transition-all duration-300"
          >
            데이터 분석
          </TabsTrigger>
          <TabsTrigger
            value="news"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md transition-all duration-300"
          >
            관련 뉴스
          </TabsTrigger>
        </TabsList>

        {/* 기본 정보 탭 */}
        <TabsContent value="basic">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PoliticianBasicInfo politicianDetail={politicianDetail} />
            <PoliticianCareerHistory politicianDetail={politicianDetail} />
            <PoliticianContactInfo politicianDetail={politicianDetail} />
          </div>
        </TabsContent>

        {/* 네트워크 탭 */}
        <TabsContent value="network">
          {loadingNetwork ? (
            <div className="text-center text-gray-500">불러오는 중...</div>
          ) : networkData ? (
            <PoliticianJointNetwork politicianNetworkData={networkData} />
          ) : (
            <div className="text-center text-gray-400">네트워크 정보 없음</div>
          )}
        </TabsContent>

        {/* 정치 이력 탭 */}
        <TabsContent value="political">
          <PoliticianPoliticalHistory politicianDetail={politicianDetail} />
        </TabsContent>

        {/* 일단 여기 까지..  */}

        {/* 법안 활동 탭 */}
        <TabsContent value="bills">
          <div className="text-center py-8 text-gray-500">
            법안 활동 정보를 준비 중입니다.
          </div>
        </TabsContent>

        {/* 데이터 분석 탭 */}
        <TabsContent value="analysis">
          <div className="text-center py-8 text-gray-500">
            데이터 분석 정보를 준비 중입니다.
          </div>
        </TabsContent>

        {/* 관련 뉴스 탭 */}
        <TabsContent value="news">
          <div className="text-center py-8 text-gray-500">
            관련 뉴스 정보를 준비 중입니다.
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
