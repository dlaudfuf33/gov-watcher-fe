import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone } from "lucide-react"

export default function PoliticianContactInfo() {
  // 더미 데이터 - 실제로는 API에서 가져올 수 있음
  const contactInfo = {
    phone: "02-1234-5678",
    fax: "02-1234-5679",
    email: "politician@assembly.go.kr",
    office: "국회의원회관 555호",
    aides: [
      { name: "김보좌", role: "보좌관", phone: "02-1234-5680" },
      { name: "이비서", role: "비서관", phone: "02-1234-5681" },
      { name: "박비서", role: "비서", phone: "02-1234-5682" },
    ],
  }

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Phone className="h-5 w-5 mr-2 text-blue-500" />
          ☎️ 연락처
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-3 border-b border-gray-100 py-2">
            <span className="text-gray-500 text-sm">전화번호</span>
            <span className="col-span-2">{contactInfo.phone}</span>
          </div>
          <div className="grid grid-cols-3 border-b border-gray-100 py-2">
            <span className="text-gray-500 text-sm">팩스</span>
            <span className="col-span-2">{contactInfo.fax}</span>
          </div>
          <div className="grid grid-cols-3 border-b border-gray-100 py-2">
            <span className="text-gray-500 text-sm">이메일</span>
            <span className="col-span-2">{contactInfo.email}</span>
          </div>
          <div className="grid grid-cols-3 border-b border-gray-100 py-2">
            <span className="text-gray-500 text-sm">사무실</span>
            <span className="col-span-2">{contactInfo.office}</span>
          </div>
          <div className="grid grid-cols-3 py-2">
            <span className="text-gray-500 text-sm">보좌진</span>
            <div className="col-span-2 space-y-2">
              {contactInfo.aides.map((aide, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{aide.name}</span> ({aide.role}) - {aide.phone}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
