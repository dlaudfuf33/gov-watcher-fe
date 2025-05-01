import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PoliticianBillActivities() {
  // 더미 데이터 - 실제로는 API에서 가져올 수 있음
  const billActivities = {
    total: 45,
    representative: 12,
    joint: 33,
    sessionTrends: [
      { session: "2023년 정기국회", count: 8 },
      { session: "2023년 임시국회", count: 6 },
      { session: "2022년 정기국회", count: 10 },
      { session: "2022년 임시국회", count: 7 },
      { session: "2021년 정기국회", count: 9 },
      { session: "2021년 임시국회", count: 5 },
    ],
  };

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          🧾 법안 활동
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">총 발의</p>
            <p className="text-xl font-bold text-blue-600">
              {billActivities.total}건
            </p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">대표발의</p>
            <p className="text-xl font-bold text-green-600">
              {billActivities.representative}건
            </p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">공동발의</p>
            <p className="text-xl font-bold text-purple-600">
              {billActivities.joint}건
            </p>
          </div>
        </div>

        <h3 className="text-sm font-medium mb-3">회기별 발의 현황</h3>
        <div className="space-y-2">
          {billActivities.sessionTrends.map((session, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{session.session}</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(session.count / 10) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{session.count}건</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
