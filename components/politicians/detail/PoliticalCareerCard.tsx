"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface PoliticalCareerCardProps {
  careerYears: number;
  electedCount: number;
}

export default function PoliticalCareerCard({
  careerYears,
  electedCount,
}: PoliticalCareerCardProps) {
  return (
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
            <p className="text-xl font-bold text-purple-600">{careerYears}년</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-500">당선 횟수</p>
            <p className="text-xl font-bold text-purple-600">
              {electedCount}회
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
