import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { History } from "lucide-react"

export default function PoliticianPoliticalHistory() {
  // 더미 데이터 - 실제로는 API에서 가져올 수 있음
  const termHistory = [
    {
      term: "21대",
      period: "2020-2024",
      party: "더불어민주당",
      district: "서울 강남구",
      position: "국회의원",
      committees: ["행정안전위원회", "국방위원회"],
    },
    {
      term: "20대",
      period: "2016-2020",
      party: "더불어민주당",
      district: "서울 강남구",
      position: "국회의원",
      committees: ["과학기술정보방송통신위원회", "교육위원회"],
    },
    {
      term: "19대",
      period: "2012-2016",
      party: "민주통합당",
      district: "서울 강남구",
      position: "국회의원",
      committees: ["보건복지위원회"],
    },
  ]

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <History className="h-5 w-5 mr-2 text-blue-500" />
          🗳️ 정치 이력 (Term)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="21">
          <TabsList className="mb-4 bg-gray-50">
            {termHistory.map((term) => (
              <TabsTrigger key={term.term} value={term.term.replace("대", "")}>
                {term.term}
              </TabsTrigger>
            ))}
          </TabsList>

          {termHistory.map((term) => (
            <TabsContent key={term.term} value={term.term.replace("대", "")}>
              <div className="space-y-3">
                <div className="grid grid-cols-3 border-b border-gray-100 py-2">
                  <span className="text-gray-500 text-sm">임기</span>
                  <span className="col-span-2">{term.period}</span>
                </div>
                <div className="grid grid-cols-3 border-b border-gray-100 py-2">
                  <span className="text-gray-500 text-sm">소속 정당</span>
                  <span className="col-span-2">
                    <Badge
                      className={
                        term.party === "더불어민주당"
                          ? "bg-party-blue-bg text-party-blue-text"
                          : "bg-party-red-bg text-party-red-text"
                      }
                    >
                      {term.party}
                    </Badge>
                  </span>
                </div>
                <div className="grid grid-cols-3 border-b border-gray-100 py-2">
                  <span className="text-gray-500 text-sm">지역구</span>
                  <span className="col-span-2">{term.district}</span>
                </div>
                <div className="grid grid-cols-3 border-b border-gray-100 py-2">
                  <span className="text-gray-500 text-sm">직책</span>
                  <span className="col-span-2">{term.position}</span>
                </div>
                <div className="grid grid-cols-3 py-2">
                  <span className="text-gray-500 text-sm">상임위원회</span>
                  <div className="col-span-2 flex flex-wrap gap-1">
                    {term.committees.map((committee) => (
                      <Badge key={committee} variant="outline" className="bg-gray-50">
                        {committee}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
