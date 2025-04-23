"use client";

import StatCard from "@/components/StatCard";

// TODO: 서버에서 "몇대 정부 & 법안별 통계"

export default function ParliamentStatsSection() {
  const currentSession = 22;
  return (
    <>
      <div className="py-8 bg-[#f5f5f5] backdrop-blur-sm shadow-inner ring-1 ring-inset ring-gray-300/30">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            제 {currentSession}대 국회 활동 현황
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="전체 법안"
              value="1,245"
              changePeriod="+12%"
              descriptionPeriod="지난 달 대비"
              trendPeriod="up"
              changeGov="-2%"
              descriptionGov="전 정부 대비"
              trendGov="down"
              color="blue"
            />
            <StatCard
              title="처리 법안"
              value="487"
              changePeriod="+12%"
              descriptionPeriod="지난 달 대비"
              trendPeriod="up"
              changeGov="0%"
              descriptionGov="전 정부 대비"
              trendGov="neutral"
              color="green"
            />
            <StatCard
              title="계류 법안"
              value="758"
              changePeriod="+12%"
              descriptionPeriod="지난 달 대비"
              trendPeriod="up"
              changeGov="+12%"
              descriptionGov="전 정부 대비"
              trendGov="up"
              color="amber"
            />
            <StatCard
              title="의견 제출"
              value="3,892"
              changePeriod="+12%"
              descriptionPeriod="지난 달 대비"
              trendPeriod="up"
              changeGov="+12%"
              descriptionGov="전 정부 대비"
              trendGov="up"
              color="purple"
            />
          </div>
        </div>
      </div>
    </>
  );
}
