import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase } from "lucide-react"

export default function PoliticianCareerHistory() {
  // 더미 데이터 - 실제로는 API에서 가져올 수 있음
  const careerHistory = [
    {
      period: "2020 ~ 현재",
      position: "제21대 국회의원",
      organization: "대한민국 국회",
    },
    {
      period: "2016 ~ 2020",
      position: "제20대 국회의원",
      organization: "대한민국 국회",
    },
    {
      period: "2012 ~ 2016",
      position: "제19대 국회의원",
      organization: "대한민국 국회",
    },
    {
      period: "2010 ~ 2012",
      position: "정책위원회 부의장",
      organization: "민주통합당",
    },
    {
      period: "2005 ~ 2010",
      position: "교수",
      organization: "서울대학교 법학과",
    },
    {
      period: "2000 ~ 2005",
      position: "변호사",
      organization: "법무법인 정의",
    },
  ]

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-blue-500" />📜 약력
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative border-l-2 border-gray-200 pl-4 ml-2 space-y-6">
          {careerHistory.map((career, index) => (
            <div key={index} className="relative">
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[25px] top-1"></div>
              <p className="text-xs text-gray-500 mb-1">{career.period}</p>
              <p className="font-medium">{career.position}</p>
              <p className="text-sm text-gray-600">{career.organization}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
