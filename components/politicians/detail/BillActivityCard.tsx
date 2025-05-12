"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface BillActivityCardProps {
  totalBills: number;
  recentBills: number;
  passRate: number;
  bills: {
    title: string;
    status: string;
  }[];
}

export default function BillActivityCard({
  totalBills,
  recentBills,
  passRate,
  bills,
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
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-500">총 발의 법안</p>
            <p className="text-xl font-bold text-blue-600">{totalBills}건</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-500">최근 발의 법안</p>
            <p className="text-xl font-bold text-blue-600">{recentBills}건</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-500">가결율</p>
            <p className="text-xl font-bold text-green-600">{passRate}%</p>
          </div>
          <div className="col-span-3 p-2 bg-gray-50 rounded overflow-y-auto max-h-40">
            <p className="text-sm text-gray-500 mb-1">최근발의</p>
            <ul className="text-sm text-left space-y-1">
              {bills.map((bill, index) => (
                <li key={index} className="flex justify-between">
                  <span className="text-gray-700 truncate text-xl">
                    {bill.title}
                  </span>
                  <span className="text-gray-500 text-sm">{bill.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
