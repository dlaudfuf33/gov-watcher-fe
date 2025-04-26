"use client";

import StatCard from "@/components/home/StatCard";
import type { ParliamentStatsSectionProps } from "@/types/parliamentStats.types";

export default function ParliamentStatsSection({
  currentSession,
  stats,
}: ParliamentStatsSectionProps) {
  return (
    <>
      <div className="py-8 bg-[#f5f5f5] backdrop-blur-sm shadow-inner ring-1 ring-inset ring-gray-300/30">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            제 {currentSession ?? "?"}대 국회 활동 현황
          </h1>

          {Array.isArray(stats) && stats.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  changePeriod={stat.changePeriod}
                  changeGov={stat.changeGov}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-sm">
              📉 통계 정보를 불러올 수 없습니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
