"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bution } from "@/types/Bution.types";

// Chart.js 등록
ChartJS.register(ArcElement, Tooltip, Legend);

interface PartyDistributionChartProps {
  butions: Bution[];
}

const centerTextPlugin = {
  id: "centerText",
  afterDraw(chart: any) {
    const {
      ctx,
      chartArea: { width, height },
    } = chart;
    ctx.save();
    const total = chart.data.datasets[0].data.reduce(
      (sum: number, val: number) => sum + val,
      0
    );
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${total} 석`, width / 2, height / 2);
    ctx.restore();
  },
};

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
          "#152484",
          "#e61e2b",
          "#0073cf",
          "#d7021c",
          "#ff720f",
          "#65666e",
          "#03d2c3",
          "#f68400",
        ].slice(0, data.length), // 데이터 개수에 맞춰 색상 잘라줌
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `의석수: ${context.raw}석`,
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-xl ring-1 ring-gray-300/60 ring-offset-2 ring-offset-white rounded-2xl p-4 transition hover:shadow-2xl">
      <div className="w-full h-[260px] sm:h-[300px] md:h-[360px]">
        <Doughnut
          data={chartData}
          options={options}
          plugins={[centerTextPlugin]}
        />
      </div>
    </div>
  );
}
