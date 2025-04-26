import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import type { NoticeProps } from "@/types/notice.types";
import { useRouter } from "next/navigation";
import AgreeOpposeBar from "@/components/charts/AgreeOpposeBar";

export default function NoticeListCard({ notice }: { notice: NoticeProps }) {
  const router = useRouter();
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
    <>
      <Card
        onClick={() => router.push(`/notices/detail/${notice.billNo}`)}
        className={`cursor-pointer shadow-md rounded-lg backdrop-blur-md ${getPartyColor()} transition-transform duration-200 ease-in-out hover:scale-[1.015] hover:shadow-lg hover:bg-white/90`}
      >
        <CardContent className="p-4 flex items-center">
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <Badge className={getPartyBadgeColor()}>
                {notice.proposerParty}
              </Badge>

              <span className="text-sm text-gray-500 ml-2">
                [{notice.billNo}]
              </span>
            </div>
            <h3 className="font-bold text-lg mb-1">{notice.title}</h3>
            <div className="flex items-center mt-2">
              <img
                src={
                  notice.proposerImageUrl ||
                  "/placeholder.svg?height=40&width=40"
                }
                alt={notice.mainProposer}
                className="w-6 h-6 rounded-full mr-2 border border-white shadow-sm"
              />
              <span className="text-sm text-gray-700">
                {notice.mainProposer}의원 등 {notice.proposers.length}인
              </span>
            </div>
            <section className="max-w-64">
              <AgreeOpposeBar
                agreeRatio={notice.agreeRatio}
                opposeRatio={notice.opposeRatio}
              />
            </section>
          </div>
          <div className="ml-4 flex flex-col items-end">
            <ChevronRight className="h-10 w-8 text-gray-400" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
