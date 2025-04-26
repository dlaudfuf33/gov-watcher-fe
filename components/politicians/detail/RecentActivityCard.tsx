"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

interface RecentActivityCardProps {
  recentActivities: number;
  commentCount: number;
}

export default function RecentActivityCard({
  recentActivities,
  commentCount,
}: RecentActivityCardProps) {
  return (
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
              {recentActivities}건
            </p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-500">시민 의견</p>
            <p className="text-xl font-bold text-orange-600">
              {commentCount}건
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
