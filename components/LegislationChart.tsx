"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Chart.js 등록
ChartJS.register(ArcElement, Tooltip, Legend);

export default function LegislationChart() {
  const data = {
    labels: ["경제", "복지", "교육", "환경", "국방", "외교", "기타"],
    datasets: [
      {
        data: [35, 25, 15, 10, 8, 5, 2],
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

  const options = {
    responsive: true,
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
          label: (context: any) => `${context.label}: ${context.raw}%`,
        },
      },
    },
  };

  return (
    <div className="w-full h-[360px] sm:h-[400px] md:h-[440px] flex items-center justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
}
