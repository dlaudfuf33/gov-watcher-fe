"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PartyDistribution() {
  const data = {
    labels: ["더불어민주당", "국민의힘", "정의당", "기본소득당", "무소속"],
    datasets: [
      {
        label: "의석수",
        data: [169, 115, 6, 1, 9],
        backgroundColor: [
          "#0050BB", // 더불어민주당 - 파랑
          "#E61E2B", // 국민의힘 - 빨강
          "#FFCC00", // 정의당 - 노랑
          "#7B4395", // 기본소득당 - 보라
          "#777777", // 무소속 - 회색
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `의석수: ${context.raw}석`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  // return <Bar data={data} options={options} height={300} />;
  return (
    <div className="w-full h-[260px] sm:h-[300px] md:h-[360px]">
      <Bar data={data} options={options} />
    </div>
  );
}
