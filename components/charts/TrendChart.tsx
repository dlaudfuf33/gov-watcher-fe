"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

import { DailyOpinionStats } from "@/types/DailyOpinionStats.types";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

interface TrendChartProps {
  stats: DailyOpinionStats[];
}

export default function TrendChart({ stats }: TrendChartProps) {
  const chartData = {
    labels: stats.map((s) => s.date),
    datasets: [
      {
        label: "찬성",
        data: stats.map((s) => s.agree),
        fill: false,
        borderColor: "#3B82F6",
        tension: 0.4,
      },
      {
        label: "반대",
        data: stats.map((s) => s.oppose),
        fill: false,
        borderColor: "#EF4444",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { color: "#374151", font: { size: 12 } },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
