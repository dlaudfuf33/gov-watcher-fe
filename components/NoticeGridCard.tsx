import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NoticeProps } from "./NoticeShortCard";

export default function NoticeGridCard({ notice }: { notice: NoticeProps }) {
  // 정당에 따른 색상 결정
  const getPartyColor = () => {
    switch (notice.proposerParty) {
      case "더불어민주당":
        return "border-blue-200/50 bg-gradient-to-tr from-blue-50/70 to-white/70";
      case "국민의힘":
        return "border-red-200/50 bg-gradient-to-tr from-red-50/70 to-white/70";
      case "정의당":
        return "border-yellow-200/50 bg-gradient-to-tr from-yellow-50/70 to-white/70";
      default:
        return "border-gray-200/50 bg-gradient-to-tr from-gray-50/70 to-white/70";
    }
  };

  const getPartyBadgeColor = () => {
    switch (notice.proposerParty) {
      case "더불어민주당":
        return "bg-blue-100/80 text-blue-800 backdrop-blur-sm";
      case "국민의힘":
        return "bg-red-100/80 text-red-800 backdrop-blur-sm";
      case "정의당":
        return "bg-yellow-100/80 text-yellow-800 backdrop-blur-sm";
      default:
        return "bg-gray-100/80 text-gray-800 backdrop-blur-sm";
    }
  };

  return (
    <Card
      className={`overflow-hidden shadow-lg rounded-xl border backdrop-blur-md ${getPartyColor()}`}
    >
      <div className="relative aspect-square bg-gradient-to-tr from-gray-900/80 to-gray-700/60">
        <div className="absolute inset-0 flex items-center justify-center text-white p-4">
          <h2 className="text-xl font-bold text-center drop-shadow-md">
            {notice.title}
          </h2>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center">
            <img
              src={
                notice.proposerImageUrl || "/placeholder.svg?height=40&width=40"
              }
              alt={notice.proposerName}
              className="w-8 h-8 rounded-full mr-2 border-2 border-white shadow-md"
            />
            <div>
              <div className="text-sm font-medium text-white">
                {notice.proposerName}
              </div>
              <div className="text-xs text-gray-300">
                {notice.proposerParty}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <Badge className={getPartyBadgeColor()}>{notice.proposerParty}</Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">{notice.billNo}</div>
          <div className="flex space-x-2">
            <span className="text-sm font-medium text-blue-600">
              찬성 {notice.agreeRatio}%
            </span>
            <span className="text-sm font-medium text-red-600">
              반대 {notice.opposeRatio}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
