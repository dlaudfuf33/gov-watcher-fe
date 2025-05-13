"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { DemographicStat } from "@/types/DemographicStat.types";
import { useEffect, useState } from "react";
import { dashboardApi } from "@/api/dashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function GenderAgeChart() {
  const [stats, setStats] = useState<DemographicStat | null>(null);

  useEffect(() => {
    dashboardApi.getDemographicStats().then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) return <div className="p-4 text-center">로딩 중...</div>;

  const chartData = {
    labels: stats.labels,
    datasets: [
      {
        label: "남성",
        data: stats.male,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
      {
        label: "여성",
        data: stats.female,
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
    },
    scales: {
      x: { title: { display: true, text: "연령대" } },
      y: { title: { display: true, text: "인원 수" }, beginAtZero: true },
    },
  };

  return (
    <div className="bg-white shadow-xl ring-1 ring-gray-300/60 ring-offset-2 ring-offset-white rounded-2xl p-4 transition hover:shadow-2xl">
      <div className="w-full h-[260px] sm:h-[300px] md:h-[360px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
