import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import CountUp from "react-countup";

interface StatCardProps {
  title: string;
  value: number;
  changePeriod: number;
  changeGov: number;
}

export default function StatCard({
  title,
  value,
  changePeriod,
  changeGov,
}: StatCardProps) {
  // 증가/감소 여부에 따라 아이콘 반환
  const getTrendIcon = (change: number) => {
    if (change > 0) return <ArrowUpIcon className="h-4 w-4 text-green-500" />;
    if (change < 0) return <ArrowDownIcon className="h-4 w-4 text-red-500" />;
    return null;
  };

  // 증가/감소 여부에 따른 텍스트 색상 클래스 반환
  const getTrendClass = (change: number) => {
    if (change > 0) return "text-green-500";
    if (change < 0) return "text-red-500";
    return "text-gray-500";
  };

  return (
    // 카드 컨테이너
    <div
      className={`p-6 rounded-2xl shadow-lg border text-blue-700 
        bg-gradient-to-br from-blue-200 to-blue-100 
        border-blue-500 backdrop-blur-lg hover:from-blue-300 hover:to-white`}
    >
      <div className="flex justify-between items-start mt-4">
        {/* 좌측 영역: 타이틀 + 수치 */}
        <div className="flex-1 min-h-[120px]">
          {/* 항목 제목 */}
          <h3 className="text-lg font-semibold text-gray-600 mb-3">{title}</h3>
          {/* 숫자 애니메이션으로 표시 */}
          <p className="text-5xl font-extrabold">
            <CountUp end={value} start={0} delay={0}>
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          </p>
        </div>

        {/* 우측 변화율 영역 */}
        <div className="flex flex-col gap-2 items-end self-end mt-auto">
          {/* 전월 대비 변화율 */}
          <div className="flex items-center">
            {getTrendIcon(changePeriod)}
            <span
              className={`text-base font-semibold ml-1 ${getTrendClass(
                changePeriod
              )}`}
            >
              {changePeriod}%
            </span>
            <span className="text-sm text-gray-500 ml-2">1달 전 대비</span>
          </div>

          {/* 전 정부 대비 변화율 */}
          <div className="flex items-center">
            {getTrendIcon(changeGov)}
            <span
              className={`text-base font-semibold ml-1 ${getTrendClass(
                changeGov
              )}`}
            >
              {changeGov}%
            </span>
            <span className="text-sm text-gray-500 ml-2">전 국회 대비</span>
          </div>
        </div>
      </div>
    </div>
  );
}
