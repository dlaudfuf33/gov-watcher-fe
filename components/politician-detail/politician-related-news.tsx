import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PoliticianRelatedNews() {
  // 더미 데이터 - 실제로는 API에서 가져올 수 있음
  const relatedNews = [
    {
      title: "김민수 의원, 국민건강보험법 개정안 발의... '보장성 강화' 주장",
      source: "한국일보",
      date: "2023-10-15",
      url: "#",
    },
    {
      title: "김민수 의원, 국정감사에서 복지부 장관에 '복지 사각지대 해소' 촉구",
      source: "동아일보",
      date: "2023-09-22",
      url: "#",
    },
    {
      title: "김민수 의원, '청년 주거 안정' 위한 토론회 개최",
      source: "조선일보",
      date: "2023-08-17",
      url: "#",
    },
    {
      title: "김민수 의원, 환경부 장관과 '탄소중립 정책' 논의",
      source: "경향신문",
      date: "2023-07-05",
      url: "#",
    },
    {
      title: "김민수 의원, '교육 격차 해소' 법안 대표 발의",
      source: "중앙일보",
      date: "2023-06-30",
      url: "#",
    },
    {
      title: "김민수 의원, 지역구 현안 점검 위한 주민 간담회 개최",
      source: "서울신문",
      date: "2023-06-15",
      url: "#",
    },
    {
      title: "김민수 의원, '청년 일자리 창출' 위한 정책 제안",
      source: "한겨레",
      date: "2023-05-20",
      url: "#",
    },
    {
      title: "김민수 의원, 국회 본회의 연설에서 '사회 안전망 강화' 강조",
      source: "매일경제",
      date: "2023-05-10",
      url: "#",
    },
  ]

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Newspaper className="h-5 w-5 mr-2 text-blue-500" />📰 관련 뉴스
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {relatedNews.map((news, index) => (
            <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <h3 className="font-medium mb-1 line-clamp-2">{news.title}</h3>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {news.source} | {news.date}
                </div>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  자세히 보기
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Button variant="outline" className="text-sm">
            더 많은 뉴스 보기
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
