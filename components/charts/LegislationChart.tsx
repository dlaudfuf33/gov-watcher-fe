"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartData, ChartOptions, TooltipItem } from "chart.js";
import { CategoryStat } from "@/types/CategoryStat.types";

// Chart.js 등록
ChartJS.register(ArcElement, Tooltip, Legend);

interface LegislationChartProps {
  props: CategoryStat;
}

export default function LegislationChart({ props }: LegislationChartProps) {
  const stats = props.categories;
  const chartData: ChartData<"doughnut"> = {
    labels: stats.map((item) => item.label),
    datasets: [
      {
        data: stats.map((item) => item.value),
        backgroundColor: [
          "#3B82F6", // 파랑
          "#EF4444", // 빨강
          "#10B981", // 초록
          "#F59E0B", // 주황
          "#8B5CF6", // 보라
          "#EC4899", // 분홍
          "#6B7280", // 회색
        ],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          font: {
            size: 14 as number,
            weight: "bold" as const,
          },
          color: "#1f2937",
        },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"doughnut">) =>
            `${context.label}: ${context.raw}%`,
        },
      },
    },
  };

  return (
    <>
      <div className="bg-white shadow-xl ring-1 ring-gray-300/60 ring-offset-2 ring-offset-white rounded-2xl p-4 transition hover:shadow-2xl">
        <div className="flex justify-center items-center w-full h-[260px] sm:h-[300px] md:h-[360px]">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>
    </>
  );
}
