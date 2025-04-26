import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

export default function PoliticianTopicDistribution() {
  // 더미 데이터 - 실제로는 API에서 가져올 수 있음
  const topicDistribution = [
    { topic: "복지", count: 12, percentage: 27 },
    { topic: "경제", count: 9, percentage: 20 },
    { topic: "교육", count: 7, percentage: 16 },
    { topic: "환경", count: 6, percentage: 13 },
    { topic: "국방", count: 5, percentage: 11 },
    { topic: "외교", count: 3, percentage: 7 },
    { topic: "기타", count: 3, percentage: 7 },
  ];

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          📈 법안 주제 분포
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topicDistribution.map((topic, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">{topic.topic}</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium">{topic.count}건</span>
                  <span className="text-xs text-gray-500 ml-1">
                    ({topic.percentage}%)
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${topic.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
