import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import type { NoticeProps } from "@/types/notice";

export default function NoticeListCard({ notice }: { notice: NoticeProps }) {
  // 정당에 따른 색상 결정
  const getPartyColor = () => {
    switch (notice.proposerParty) {
      case "더불어민주당":
        return "border-l-4 border-l-blue-500 border-t border-r border-b border-gray-200/50 bg-white/70";
      case "국민의힘":
        return "border-l-4 border-l-red-500 border-t border-r border-b border-gray-200/50 bg-white/70";
      case "정의당":
        return "border-l-4 border-l-yellow-500 border-t border-r border-b border-gray-200/50 bg-white/70";
      default:
        return "border-l-4 border-l-gray-500 border-t border-r border-b border-gray-200/50 bg-white/70";
    }
  };

  const getPartyBadgeColor = () => {
    switch (notice.proposerParty) {
      case "더불어민주당":
        return "bg-blue-100/80 text-blue-800 backdrop-blur-sm";
      case "국민의힘":
        return "bg-red-100/80 text-red-800 backdrop-blur-sm";
      default:
        return "bg-yellow-100/80 text-yellow-800 backdrop-blur-sm";
    }
  };

  return (
    <Card
      className={`shadow-md rounded-lg backdrop-blur-md ${getPartyColor()} hover:bg-white/80 transition-colors`}
    >
      <CardContent className="p-4 flex items-center">
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <Badge className={getPartyBadgeColor()}>
              {notice.proposerParty}
            </Badge>
            <span className="text-sm text-gray-500 ml-2">{notice.billNo}</span>
          </div>
          <h3 className="font-bold text-lg mb-1">{notice.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-1">{notice.summary}</p>
          <div className="flex items-center mt-2">
            <img
              src={
                notice.proposerImageUrl || "/placeholder.svg?height=40&width=40"
              }
              alt={notice.mainProposer}
              className="w-6 h-6 rounded-full mr-2 border border-white shadow-sm"
            />
            <span className="text-sm text-gray-700">
              {notice.mainProposer}의원 등 {notice.proposers.length}인
            </span>
          </div>
        </div>
        <div className="ml-4 flex flex-col items-end">
          <div className="w-full mt-2">
            <div className="relative h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-blue-500"
                style={{ width: `${notice.agreeRatio}%` }}
              />
              <div
                className="absolute right-0 top-0 h-full bg-red-500"
                style={{ width: `${notice.opposeRatio}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-xs text-gray-600 font-medium px-0.5">
              <span className="text-blue-600">찬성 {notice.agreeRatio}%</span>
              <span className="text-red-500">반대 {notice.opposeRatio}%</span>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
}
