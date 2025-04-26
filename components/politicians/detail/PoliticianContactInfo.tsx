import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PoliticianDetail } from "@/types/politiciansType";
interface PoliticianBasicInfoProps {
  politicianDetail: PoliticianDetail;
}
export default function PoliticianContactInfo({
  politicianDetail,
}: PoliticianBasicInfoProps) {
  const contactInfo = {
    phone: politicianDetail.contact.phone,
    email: politicianDetail.contact.email,
    office: politicianDetail.contact.officeRoom,
    aides: politicianDetail.contact.aides,
  };

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">☎️ 연락처</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-3 border-b border-gray-100 py-2">
            <span className="text-gray-500 text-sm">전화번호</span>
            <span className="col-span-2">{contactInfo.phone}</span>
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
              {/* 보좌관들 */}
              {contactInfo.aides.staff.map((name, idx) => (
                <div key={`staff-${idx}`} className="text-sm">
                  <span className="font-medium">{name}</span> (보좌관)
                </div>
              ))}

              {/* 비서관들 */}
              {contactInfo.aides.secretary.map((name, idx) => (
                <div key={`secretary-${idx}`} className="text-sm">
                  <span className="font-medium">{name}</span> (비서관)
                </div>
              ))}

              {/* 비서들 */}
              {contactInfo.aides.secretary2.map((name, idx) => (
                <div key={`secretary2-${idx}`} className="text-sm">
                  <span className="font-medium">{name}</span> (비서)
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
