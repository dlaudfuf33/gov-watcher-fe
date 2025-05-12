import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PoliticianDetail } from "@/types/politiciansType";
interface PoliticianBasicInfoProps {
  politicianDetail: PoliticianDetail;
}
export default function PoliticianCareerHistory({
  politicianDetail,
}: PoliticianBasicInfoProps) {
  // 더미 데이터
  const items = politicianDetail.career
    .replace(/&middot;/g, "·")
    .split(/\n|,|■|&middot;|ㅇ/g)
    .map((item) => item.trim())
    .filter(
      (item) => item.length > 1 && !/^(제?\d{1,2})$/.test(item) // "제20", "21" 같은 의미없는 숫자 제거
    );

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">📜 약력</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative border-l-2 border-gray-200 pl-4 ml-2 space-y-6">
          {items.map((entry, index) => (
            <div key={index} className="text-sm">
              {entry}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
