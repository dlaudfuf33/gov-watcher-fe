"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Twitter,
  Facebook,
  Youtube,
  Globe,
  FileText,
  BarChart2,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Politician } from "@/lib/types";
import PoliticianBasicInfo from "./politician-basic-info";
import PoliticianPoliticalHistory from "./politician-political-history";
import PoliticianContactInfo from "./politician-contact-info";
import PoliticianSocialMedia from "./politician-social-media";
import PoliticianCareerHistory from "./politician-career-history";
import PoliticianBillActivities from "./politician-bill-activities";
import PoliticianBillAnalysis from "./politician-bill-analysis";
import PoliticianTopicDistribution from "./politician-topic-distribution";
import PoliticianJointNetwork from "./politician-joint-network";
import PoliticianActivityTrend from "./politician-activity-trend";
import PoliticianPublicOpinions from "./politician-public-opinions";
import PoliticianRelatedNews from "./politician-related-news";

interface PoliticianDetailClientProps {
  politician: Politician;
}

export default function PoliticianDetailClient({
  politician,
}: PoliticianDetailClientProps) {
  // 클라이언트 상태 관리
  const [activeTab, setActiveTab] = useState("basic");

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
    partyColorMap[politician.party] || "bg-party-gray-bg text-party-gray-text";

  // 클라이언트 측 이벤트 핸들러
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // 탭 변경 시 추가 로직 구현 가능 (예: 분석 데이터 로드, 스크롤 위치 조정 등)
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link href="/">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-600 pl-0"
          >
            <ArrowLeft className="h-4 w-4" />
            돌아가기
          </Button>
        </Link>
      </div>

      {/* 상단 프로필 섹션 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 프로필 이미지 */}
          <div className="md:w-1/4 flex flex-col items-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
              <Image
                src={
                  politician.profileImage ||
                  "/placeholder.svg?height=300&width=300"
                }
                alt={`${politician.name} 의원 프로필 사진`}
                fill
                className="object-cover"
              />
            </div>
            <Badge className={`${partyColor} mb-2 text-sm px-3 py-1`}>
              {politician.party}
            </Badge>
            <h1 className="text-2xl font-bold text-center">
              {politician.name}
            </h1>
            <p className="text-gray-600 text-center">{politician.district}</p>
            <p className="text-gray-500 text-sm text-center">
              {politician.position} | {politician.term}대
            </p>
          </div>

          {/* 기본 정보 요약 */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-blue-500" />
                    법안 활동
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500">발의 법안</p>
                      <p className="text-xl font-bold text-blue-600">
                        {politician.recentBills}건
                      </p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500">통과율</p>
                      <p className="text-xl font-bold text-green-600">
                        {politician.passRate}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                    정치 경력
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500">경력 기간</p>
                      <p className="text-xl font-bold text-purple-600">
                        {politician.careerYears}년
                      </p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500">당선 횟수</p>
                      <p className="text-xl font-bold text-purple-600">3회</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <BarChart2 className="h-4 w-4 mr-2 text-orange-500" />
                    최근 활동
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500">최근 활동</p>
                      <p className="text-xl font-bold text-orange-600">
                        {politician.recentActivities}건
                      </p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500">시민 의견</p>
                      <p className="text-xl font-bold text-orange-600">152건</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 연락처 및 SNS 요약 */}
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="text-gray-600">
                <Phone className="h-3 w-3 mr-1" />
                02-1234-5678
              </Button>
              <Button variant="outline" size="sm" className="text-gray-600">
                <Mail className="h-3 w-3 mr-1" />
                politician@assembly.go.kr
              </Button>
              <Button variant="outline" size="sm" className="text-blue-600">
                <Twitter className="h-3 w-3 mr-1" />
                트위터
              </Button>
              <Button variant="outline" size="sm" className="text-blue-800">
                <Facebook className="h-3 w-3 mr-1" />
                페이스북
              </Button>
              <Button variant="outline" size="sm" className="text-red-600">
                <Youtube className="h-3 w-3 mr-1" />
                유튜브
              </Button>
              <Button variant="outline" size="sm" className="text-green-600">
                <Globe className="h-3 w-3 mr-1" />
                홈페이지
              </Button>
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
          <TabsTrigger value="basic" className="data-[state=active]:bg-white">
            기본 정보
          </TabsTrigger>
          <TabsTrigger
            value="political"
            className="data-[state=active]:bg-white"
          >
            정치 이력
          </TabsTrigger>
          <TabsTrigger value="bills" className="data-[state=active]:bg-white">
            법안 활동
          </TabsTrigger>
          <TabsTrigger
            value="analysis"
            className="data-[state=active]:bg-white"
          >
            데이터 분석
          </TabsTrigger>
          <TabsTrigger value="network" className="data-[state=active]:bg-white">
            네트워크
          </TabsTrigger>
          <TabsTrigger value="news" className="data-[state=active]:bg-white">
            관련 뉴스
          </TabsTrigger>
        </TabsList>

        {/* 기본 정보 탭 */}
        <TabsContent value="basic">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PoliticianBasicInfo politician={politician} />
            <PoliticianContactInfo />
            <PoliticianSocialMedia />
            <PoliticianCareerHistory />
          </div>
        </TabsContent>

        {/* 정치 이력 탭 */}
        <TabsContent value="political">
          <PoliticianPoliticalHistory />
        </TabsContent>

        {/* 법안 활동 탭 */}
        <TabsContent value="bills">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PoliticianBillActivities />
            <PoliticianBillAnalysis />
            <PoliticianTopicDistribution />
            <PoliticianPublicOpinions />
          </div>
        </TabsContent>

        {/* 데이터 분석 탭 */}
        <TabsContent value="analysis">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PoliticianBillAnalysis />
            <PoliticianTopicDistribution />
            <PoliticianActivityTrend />
          </div>
        </TabsContent>

        {/* 네트워크 탭 */}
        <TabsContent value="network">
          <PoliticianJointNetwork />
        </TabsContent>

        {/* 관련 뉴스 탭 */}
        <TabsContent value="news">
          <PoliticianRelatedNews />
        </TabsContent>
      </Tabs>
    </main>
  );
}
