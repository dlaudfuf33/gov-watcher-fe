"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Eye, Share2, BookmarkPlus } from "lucide-react";
import BattleChart from "@/components/charts/battle-chart";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProposerGrid from "@/components/notice/ProposerGrid";
import ReactMarkdown from "react-markdown";
import { parseToMarkdown } from "@/lib/parseToMarkdown";
import type { LegislationDetail } from "@/api/legislation";
import { useRouter } from "next/navigation";

export default function LegislationDetailClient({
  props,
}: {
  props: LegislationDetail;
}) {
  const [activeTab, setActiveTab] = useState("content");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter();
  const legislationDetail = props;
  return (
    <Card className="bg-white shadow-xl mb-6 rounded-xl overflow-hidden border-none">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                {legislationDetail.category}
              </Badge>
              {legislationDetail.daysLeft &&
                legislationDetail.daysLeft <= 7 && (
                  <Badge variant="destructive">
                    D-{legislationDetail.daysLeft}
                  </Badge>
                )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
              {legislationDetail.title}
            </h1>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4 text-blue-500" />
              <span>{legislationDetail.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4 text-blue-500" />
              <span>{legislationDetail.opinionCounts}</span>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              공유하기
            </Button>
            <Button
              variant={isBookmarked ? "default" : "outline"}
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <BookmarkPlus className="h-4 w-4 mr-2" />
              {isBookmarked ? "저장됨" : "저장하기"}
            </Button>
          </div>
        </div>

        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
          <h3 className="font-medium mb-2 text-gray-700">찬반 현황</h3>
          <BattleChart
            agree={legislationDetail.agreeRatio}
            oppose={legislationDetail.opposeRatio}
          />
        </div>

        <Tabs
          defaultValue="content"
          value={activeTab}
          onValueChange={setActiveTab}
          className="bg-white rounded-xl"
        >
          <TabsList className="grid grid-cols-2 mb-4 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="content">법안 내용</TabsTrigger>
            <TabsTrigger value="proposers">
              발의자 ({legislationDetail.proposers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <div className="prose text-[1.05rem] max-w-none leading-relaxed">
              <ReactMarkdown>
                {parseToMarkdown(legislationDetail.summary)}
              </ReactMarkdown>
            </div>
          </TabsContent>

          <TabsContent value="proposers">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
              <ProposerGrid proposers={legislationDetail.proposers} />
            </div>
            <Separator className="bg-gray-200" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
