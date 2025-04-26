import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";

export default function PoliticianBillAnalysis() {
  // 더미 데이터 - 실제로는 API에서 가져올 수 있음
  const billAnalysis = {
    passed: 15,
    rejected: 8,
    pending: 12,
    reviewing: 10,
    total: 45,
  };

  // 비율 계산
  const passedRatio = Math.round(
    (billAnalysis.passed / billAnalysis.total) * 100
  );
  const rejectedRatio = Math.round(
    (billAnalysis.rejected / billAnalysis.total) * 100
  );
  const pendingRatio = Math.round(
    (billAnalysis.pending / billAnalysis.total) * 100
  );
  const reviewingRatio = Math.round(
    (billAnalysis.reviewing / billAnalysis.total) * 100
  );

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          📊 발의 법안 결과 분석
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-40">
            {/* 원형 차트 시각화 */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* 통과 */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#22c55e"
                strokeWidth="20"
                strokeDasharray={`${passedRatio * 2.51} ${
                  100 * 2.51 - passedRatio * 2.51
                }`}
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
              />
              {/* 거부 */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#ef4444"
                strokeWidth="20"
                strokeDasharray={`${rejectedRatio * 2.51} ${
                  100 * 2.51 - rejectedRatio * 2.51
                }`}
                strokeDashoffset={`${-(passedRatio * 2.51)}`}
                transform="rotate(-90 50 50)"
              />
              {/* 보류 */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#f59e0b"
                strokeWidth="20"
                strokeDasharray={`${pendingRatio * 2.51} ${
                  100 * 2.51 - pendingRatio * 2.51
                }`}
                strokeDashoffset={`${-((passedRatio + rejectedRatio) * 2.51)}`}
                transform="rotate(-90 50 50)"
              />
              {/* 심사중 */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="20"
                strokeDasharray={`${reviewingRatio * 2.51} ${
                  100 * 2.51 - reviewingRatio * 2.51
                }`}
                strokeDashoffset={`${-(
                  (passedRatio + rejectedRatio + pendingRatio) *
                  2.51
                )}`}
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm">통과: {billAnalysis.passed}건</span>
            <span className="text-xs text-gray-500 ml-1">({passedRatio}%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm">폐기: {billAnalysis.rejected}건</span>
            <span className="text-xs text-gray-500 ml-1">
              ({rejectedRatio}%)
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
            <span className="text-sm">보류: {billAnalysis.pending}건</span>
            <span className="text-xs text-gray-500 ml-1">
              ({pendingRatio}%)
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm">심사중: {billAnalysis.reviewing}건</span>
            <span className="text-xs text-gray-500 ml-1">
              ({reviewingRatio}%)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
