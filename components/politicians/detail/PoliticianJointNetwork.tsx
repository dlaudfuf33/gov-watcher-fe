"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network } from "lucide-react";
import { useEffect, useRef } from "react";

export default function PoliticianJointNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 캔버스 크기 설정
    const setCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.clientWidth;
      canvas.height = 500;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // 더미 데이터 - 실제로는 API에서 가져올 수 있음
    const nodes = [
      {
        id: "center",
        name: "김민수",
        party: "더불어민주당",
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 30,
      },
      {
        id: "1",
        name: "이지원",
        party: "더불어민주당",
        x: 0,
        y: 0,
        radius: 20,
      },
      {
        id: "2",
        name: "박서연",
        party: "더불어민주당",
        x: 0,
        y: 0,
        radius: 25,
      },
      { id: "3", name: "최준호", party: "국민의힘", x: 0, y: 0, radius: 15 },
      { id: "4", name: "정다은", party: "국민의힘", x: 0, y: 0, radius: 18 },
      { id: "5", name: "한승우", party: "정의당", x: 0, y: 0, radius: 22 },
      { id: "6", name: "송미영", party: "정의당", x: 0, y: 0, radius: 17 },
    ];

    const links = [
      { source: "center", target: "1", value: 8 },
      { source: "center", target: "2", value: 12 },
      { source: "center", target: "3", value: 5 },
      { source: "center", target: "4", value: 3 },
      { source: "center", target: "5", value: 7 },
      { source: "center", target: "6", value: 4 },
      { source: "1", target: "2", value: 3 },
      { source: "2", target: "5", value: 2 },
      { source: "3", target: "4", value: 4 },
    ];

    // 노드 위치 계산
    const angle = (2 * Math.PI) / (nodes.length - 1);
    const radius = Math.min(canvas.width, canvas.height) * 0.35;

    for (let i = 1; i < nodes.length; i++) {
      nodes[i].x = canvas.width / 2 + radius * Math.cos(angle * (i - 1));
      nodes[i].y = canvas.height / 2 + radius * Math.sin(angle * (i - 1));
    }

    // 정당에 따른 색상 설정
    const partyColors: Record<string, string> = {
      더불어민주당: "#1971c2",
      국민의힘: "#e03131",
      정의당: "#f08c00",
    };

    // 네트워크 그리기
    const drawNetwork = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 링크 그리기
      links.forEach((link) => {
        const source = nodes.find((node) => node.id === link.source);
        const target = nodes.find((node) => node.id === link.target);

        if (source && target) {
          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = "#e5e7eb";
          ctx.lineWidth = link.value / 2;
          ctx.stroke();
        }
      });

      // 노드 그리기
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
        ctx.fillStyle = partyColors[node.party] || "#6b7280";
        ctx.fill();

        ctx.font = "12px sans-serif";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.name, node.x, node.y);
      });
    };

    drawNetwork();
    window.addEventListener("resize", drawNetwork);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("resize", drawNetwork);
    };
  }, []);

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          🕸️공동 발의 네트워크
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-500 mb-4">
          이 의원과 함께 법안을 발의한 의원들의 네트워크를 시각화합니다. 원의
          크기는 발의 법안 수에 비례하며, 선의 굵기는 공동 발의 횟수를
          나타냅니다.
        </div>
        <div className="relative h-[500px] w-full">
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>
      </CardContent>
    </Card>
  );
}
