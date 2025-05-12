"use client";

import { useEffect, useRef } from "react";

interface BattleChartProps {
  agree: number; // 퍼센트 값 (0~100)
  disagree: number; // 퍼센트 값 (0~100)
}

export default function BattleChart({ agree, disagree }: BattleChartProps) {
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

    if (agree === 0 && disagree === 0) {
      ctx.fillStyle = "#e5e7eb"; // gray-200
      ctx.fillRect(0, 0, rect.width, canvas.height);
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#6b7280"; // gray-500
      ctx.fillText("데이터 없음", rect.width / 2, canvas.height / 2);
      return;
    }

    const agreeWidth = (agree / 100) * rect.width;
    const disagreeWidth = (disagree / 100) * rect.width;

    // 배경
    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 0, rect.width, canvas.height);

    // 찬성: 좌 → 우
    const agreeGradient = ctx.createLinearGradient(0, 0, agreeWidth, 0);
    agreeGradient.addColorStop(0, "#3b82f6");
    agreeGradient.addColorStop(1, "#4f46e5");
    ctx.fillStyle = agreeGradient;
    ctx.fillRect(0, 0, agreeWidth, canvas.height);

    // 반대: 우 → 좌
    const disagreeGradient = ctx.createLinearGradient(
      rect.width - disagreeWidth,
      0,
      rect.width,
      0
    );
    disagreeGradient.addColorStop(0, "#ef4444");
    disagreeGradient.addColorStop(1, "#e11d48");
    ctx.fillStyle = disagreeGradient;
    ctx.fillRect(rect.width - disagreeWidth, 0, disagreeWidth, canvas.height);

    // 텍스트
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (agree >= 5) {
      ctx.fillStyle = "#ffffff";
      ctx.fillText(`${Math.round(agree)}%`, agreeWidth / 2, canvas.height / 2);
    }

    if (disagree >= 5) {
      ctx.fillStyle = "#ffffff";
      ctx.fillText(
        `${Math.round(disagree)}%`,
        rect.width - disagreeWidth / 2,
        canvas.height / 2
      );
    }
  }, [agree, disagree]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-5 rounded-full overflow-hidden shadow-inner"
    />
  );
}
