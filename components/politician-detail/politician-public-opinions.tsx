import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

export default function PoliticianPublicOpinions() {
  // 더미 데이터 - 실제로는 API에서 가져올 수 있음
  const publicOpinions = {
    total: 152,
    positive: 87,
    negative: 43,
    neutral: 22,
    topBills: [
      { title: "국민건강보험법 일부개정법률안", count: 45 },
      { title: "주택임대차보호법 일부개정법률안", count: 32 },
      { title: "청년기본법 일부개정법률안", count: 28 },
      { title: "환경보전법 일부개정법률안", count: 21 },
      { title: "교육기본법 일부개정법률안", count: 16 },
    ],
  }

  // 비율 계산
  const positiveRatio = Math.round((publicOpinions.positive / publicOpinions.total) * 100)
  const negativeRatio = Math.round((publicOpinions.negative / publicOpinions.total) * 100)
  const neutralRatio = Math.round((publicOpinions.neutral / publicOpinions.total) * 100)

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
          시민 의견 수
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">총 의견</p>
            <p className="text-xl font-bold text-blue-600">{publicOpinions.total}건</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">긍정적</p>
            <p className="text-xl font-bold text-green-600">{positiveRatio}%</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">부정적</p>
            <p className="text-xl font-bold text-red-600">{negativeRatio}%</p>
          </div>
        </div>

        <h3 className="text-sm font-medium mb-3">의견이 많은 법안</h3>
        <div className="space-y-2">
          {publicOpinions.topBills.map((bill, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 truncate mr-2">{bill.title}</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(bill.count / publicOpinions.topBills[0].count) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{bill.count}건</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
