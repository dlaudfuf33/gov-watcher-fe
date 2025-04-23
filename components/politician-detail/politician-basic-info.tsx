import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"
import type { Member } from "@/lib/types"

interface PoliticianBasicInfoProps {
  politician: Member
}

export default function PoliticianBasicInfo({ politician }: PoliticianBasicInfoProps) {
  // 더미 데이터 - 실제로는 API에서 가져올 수 있음
  const basicInfo = {
    name: politician.name,
    nameEn: "Kim Min-su",
    nameCh: "金民洙",
    birthDate: "1970년 5월 15일",
    gender: "남성",
    education: "서울대학교 법학과",
    hometown: "서울특별시",
  }

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <User className="h-5 w-5 mr-2 text-blue-500" />
          🧑‍💼 기본 정보
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-3 border-b border-gray-100 py-2">
            <span className="text-gray-500 text-sm">이름</span>
            <span className="col-span-2 font-medium">{basicInfo.name}</span>
          </div>
          <div className="grid grid-cols-3 border-b border-gray-100 py-2">
            <span className="text-gray-500 text-sm">한자</span>
            <span className="col-span-2">{basicInfo.nameCh}</span>
          </div>
          <div className="grid grid-cols-3 border-b border-gray-100 py-2">
            <span className="text-gray-500 text-sm">영문</span>
            <span className="col-span-2">{basicInfo.nameEn}</span>
          </div>
          <div className="grid grid-cols-3 border-b border-gray-100 py-2">
            <span className="text-gray-500 text-sm">생년월일</span>
            <span className="col-span-2">{basicInfo.birthDate}</span>
          </div>
          <div className="grid grid-cols-3 border-b border-gray-100 py-2">
            <span className="text-gray-500 text-sm">성별</span>
            <span className="col-span-2">{basicInfo.gender}</span>
          </div>
          <div className="grid grid-cols-3 border-b border-gray-100 py-2">
            <span className="text-gray-500 text-sm">학력</span>
            <span className="col-span-2">{basicInfo.education}</span>
          </div>
          <div className="grid grid-cols-3 py-2">
            <span className="text-gray-500 text-sm">출신지</span>
            <span className="col-span-2">{basicInfo.hometown}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
