"use client";

import { Treemap, Tooltip, ResponsiveContainer } from "recharts";
import { CategoryStat } from "@/types/CategoryStat.types";

const COLOR_PALETTE = [
  "#3B82F6",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#6B7280",
  "#22C55E",
  "#EAB308",
  "#6366F1",
  "#F43F5E",
  "#0EA5E9",
  "#A855F7",
  "#F97316",
  "#14B8A6",
];

interface LegislationChartProps {
  props: CategoryStat;
}

export default function LegislationChart({ props }: LegislationChartProps) {
  const rawStats = props.categories
    ? props.categories.map((item) => ({
        name: item.label || "기타",
        size: item.value,
      }))
    : [];

  const topStats = rawStats.sort((a, b) => b.size - a.size).slice(0, 15);
  const othersSum = rawStats
    .slice(15)
    .reduce((sum, item) => sum + item.size, 0);
  const stats =
    othersSum > 0 ? [...topStats, { name: "기타", size: othersSum }] : topStats;

  if (stats.length === 0) {
    return (
      <div className="bg-white shadow-xl ring-1 ring-gray-300/60 ring-offset-2 ring-offset-white rounded-2xl p-4 transition hover:shadow-2xl">
        <div className="w-full h-[260px] sm:h-[300px] md:h-[360px] flex items-center justify-center text-gray-500">
          표시할 데이터가 없습니다.
        </div>
      </div>
    );
  }

  const total = stats.reduce((sum, item) => sum + item.size, 0);
  return (
    <div className="bg-white shadow-xl ring-1 ring-gray-300/60 ring-offset-2 ring-offset-white rounded-2xl p-4 transition hover:shadow-2xl">
      <div className="w-full h-[260px] sm:h-[300px] md:h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={stats}
            dataKey="size"
            nameKey="name"
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent />}
          >
            <Tooltip
              formatter={(value, name) => {
                const percentage = (((value as number) / total) * 100).toFixed(
                  1
                );
                return [`${value}건 (${percentage}%)`, `정당or위원회: ${name}`];
              }}
              labelFormatter={() => ""}
            />
          </Treemap>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CustomizedContent(props: any) {
  const { x, y, width, height, name, size, index, colors, rank, root } = props;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: COLOR_PALETTE[index % COLOR_PALETTE.length],
          stroke: "#fff",
        }}
      />
      {width > 60 && height > 20 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="#fff"
          fontSize="12"
        >
          {name && name.length > 6 ? name.slice(0, 10) + "..." : name || ""}
        </text>
      )}
    </g>
  );
}
