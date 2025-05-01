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
import { Bution } from "@/types/Bution.types";

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PartyDistributionChartProps {
  butions: Bution[];
}

export default function PartyDistributionChart({
  butions,
}: PartyDistributionChartProps) {
  const sortedButions = [...butions].sort((a, b) => b.total - a.total);

  const labels = sortedButions.map((b) => b.party);
  const data = sortedButions.map((b) => b.total);

  const chartData = {
    labels,
    datasets: [
      {
        label: "의석수",
        data,
        backgroundColor: [
          "#0050BB", // 더불어민주당 - 파랑
          "#E61E2B", // 국민의힘 - 빨강
          "#FFCC00", // 정의당 - 노랑
          "#7B4395", // 기본소득당 - 보라
          "#777777", // 무소속 - 회색
        ].slice(0, data.length), // 데이터 개수에 맞춰 색상 배열 잘라줌
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `의석수: ${context.raw}석`,
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "인원 수",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div className="bg-white shadow-xl ring-1 ring-gray-300/60 ring-offset-2 ring-offset-white rounded-2xl p-4 transition hover:shadow-2xl">
        <div className="w-full h-[260px] sm:h-[300px] md:h-[360px]">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </>
  );
}
