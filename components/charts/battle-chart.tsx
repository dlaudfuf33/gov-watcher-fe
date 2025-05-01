"use client";

import { useEffect, useRef } from "react";

interface BattleChartProps {
  agree: number;
  oppose: number;
}

export default function BattleChart({ agree, oppose }: BattleChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 20 * dpr;
    ctx.scale(dpr, dpr);

    const total = agree + oppose;
    if (total === 0) {
      // 데이터 없음 → 기본 회색 바
      ctx.fillStyle = "#e5e7eb"; // tailwind gray-200
      ctx.fillRect(0, 0, rect.width, canvas.height);
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#6b7280"; // gray-500
      ctx.fillText("데이터 없음", rect.width / 2, canvas.height / 2);
      return;
    }

    const agreePercent = (agree / total) * 100;
    const opposePercent = (oppose / total) * 100;

    const agreeGradient = ctx.createLinearGradient(
      0,
      0,
      (agreePercent / 100) * rect.width,
      0
    );
    agreeGradient.addColorStop(0, "#3b82f6");
    agreeGradient.addColorStop(1, "#4f46e5");

    const opposeGradient = ctx.createLinearGradient(
      (agreePercent / 100) * rect.width,
      0,
      rect.width,
      0
    );
    opposeGradient.addColorStop(0, "#ef4444");
    opposeGradient.addColorStop(1, "#e11d48");

    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = agreeGradient;
    ctx.fillRect(0, 0, (agreePercent / 100) * rect.width, canvas.height);

    ctx.fillStyle = opposeGradient;
    ctx.fillRect(
      (agreePercent / 100) * rect.width,
      0,
      (opposePercent / 100) * rect.width,
      canvas.height
    );

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(rect.width, 0);
    ctx.lineTo(rect.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.clip();

    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (agreePercent > 15) {
      ctx.fillStyle = "#ffffff";
      ctx.fillText(
        `${Math.round(agreePercent)}%`,
        (agreePercent / 200) * rect.width,
        canvas.height / 2
      );
    }

    if (opposePercent > 15) {
      ctx.fillStyle = "#ffffff";
      ctx.fillText(
        `${Math.round(opposePercent)}%`,
        (agreePercent / 100) * rect.width + (opposePercent / 200) * rect.width,
        canvas.height / 2
      );
    }

    const shimmer = () => {
      const shimmerGradient = ctx.createLinearGradient(0, 0, rect.width, 0);
      shimmerGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      shimmerGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.1)");
      shimmerGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = shimmerGradient;
      ctx.fillRect(0, 0, rect.width, canvas.height);
    };

    shimmer();
  }, [agree, oppose]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-5 rounded-full overflow-hidden shadow-inner"
    />
  );
}
