"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface BillActivityCardProps {
  recentBills: number;
  passRate: number;
}

export default function BillActivityCard({
  recentBills,
  passRate,
}: BillActivityCardProps) {
  return (
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
            <p className="text-xl font-bold text-blue-600">{recentBills}건</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-500">통과율</p>
            <p className="text-xl font-bold text-green-600">{passRate}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
