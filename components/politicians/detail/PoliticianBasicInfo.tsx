import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PoliticianDetail } from "@/types/politiciansType";

interface PoliticianBasicInfoProps {
  politicianDetail: PoliticianDetail;
}

export default function PoliticianBasicInfo({
  politicianDetail,
}: PoliticianBasicInfoProps) {
  const basicInfo = {
    name: politicianDetail.profile.name,
    engName: politicianDetail.profile.engName,
    hanjaName: politicianDetail.profile.hanjaName,
    birthDate: politicianDetail.profile.birthDate,
    gender: politicianDetail.profile.gender,
  };

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
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
            <span className="col-span-2">{basicInfo.hanjaName}</span>
          </div>
          <div className="grid grid-cols-3 border-b border-gray-100 py-2">
            <span className="text-gray-500 text-sm">영문</span>
            <span className="col-span-2">{basicInfo.engName}</span>
          </div>
          <div className="grid grid-cols-3 border-b border-gray-100 py-2">
            <span className="text-gray-500 text-sm">생년월일</span>
            <span className="col-span-2">{basicInfo.birthDate}</span>
          </div>
          <div className="grid grid-cols-3 border-b border-gray-100 py-2">
            <span className="text-gray-500 text-sm">성별</span>
            <span className="col-span-2">{basicInfo.gender}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
