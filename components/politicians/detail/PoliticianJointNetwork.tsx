"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";
import { Network } from "vis-network/standalone";
import "vis-network/styles/vis-network.css";
import NetworkControls from "@/components/politicians/detail/NetworkControls";
import { PoliticianNetworkData } from "@/types/PoliticianJointNetwork.types";

interface PoliticianNetworkDataProps {
  politicianNetworkData: PoliticianNetworkData;
}

const partyColors = {
  더불어민주당: {
    background: "#1971c2",
    border: "#0a4b8c",
    hover: "#2a8bd8",
  },
  국민의힘: { background: "#e03131", border: "#a01c1c", hover: "#f45151" },
  정의당: { background: "#f08c00", border: "#b36600", hover: "#ffaa33" },
};

function getNetworkOptions() {
  // 기본 노드 설정 (원의 형태, 텍스트 색상/폰트 지정)
  const nodeConfig = {
    shape: "circle", // 원형 노드
    font: {
      color: "#ffffff", // 글자색 흰색
      size: 16, // 기본 폰트 크기
      face: "Arial", // 폰트 패밀리
      bold: {
        // 볼드 스타일 텍스트
        color: "#ffffff",
        size: 16,
        face: "Arial",
      },
    },
  };

  // 네트워크(노드/선/물리/인터랙션) 옵션 설정
  const options = {
    nodes: {
      ...nodeConfig, // 기본 노드 설정 복사
      borderWidth: 2, // 노드 테두리 두께
      shadow: {
        // 노드 그림자 설정
        enabled: true,
        color: "rgba(0,0,0,0.3)", // 그림자 색
        size: 10, // 그림자 크기
      },
      scaling: {
        // 노드 크기 스케일링
        min: 15, // 최소 크기
        max: 40, // 최대 크기
        label: {
          enabled: true, // 텍스트도 크기 변동 적용
          min: 14,
          max: 24,
        },
      },
    },
    edges: {
      width: 2, // 기본 선 두께
      color: {
        // 선 색상 설정
        color: "rgba(209, 213, 219, 0.5)", // 기본 흐릿한 회색
        highlight: "#6549e3", // 하이라이트 시 흰색
        hover: "#ffffff", // 호버 시 흰색
      },
      smooth: {
        // 선 부드럽게 연결
        enabled: true,
        type: "dynamic",
        forceDirection: "none",
        roundness: 0.5, // 곡선 정도
      },
      hoverWidth: 3, // 호버 시 선 두께 증가
      selectionWidth: 3, // 선택 시 선 두께 증가
    },
    groups: {
      // 정당별 그룹 색상 매핑
      더불어민주당: { color: partyColors.더불어민주당 },
      국민의힘: { color: partyColors.국민의힘 },
      정의당: { color: partyColors.정의당 },
    },
    physics: {
      enabled: true, // 물리 엔진 활성화
      stabilization: { iterations: 200 }, // 초기 안정화 연산 200회
      barnesHut: {
        // 물리 모델 (Barnes-Hut 알고리즘)
        gravitationalConstant: -5000, // 중력 상수 (음수: 밀어냄)
        centralGravity: 0.5, // 중앙 끌림 강도
        springLength: 250, // 스프링 기본 길이
        springConstant: 0.4, // 스프링 탄성 계수
        damping: 0.05, // 감쇠 (진동 줄임)
      },
    },
    interaction: {
      hover: true, // 마우스 올리면 노드 강조
      tooltipDelay: 200, // 툴팁 딜레이(ms)
      hideEdgesOnDrag: false, // 드래그 중에는 선 숨김
      multiselect: false, // 다중 선택 비활성화
      navigationButtons: false, // 네비게이션 버튼 비활성화
      keyboard: { enabled: false }, // 키보드 컨트롤 비활성화
      zoomView: true, // 마우스 줌 인/아웃 가능
    },
  };

  return options;
}

export default function PoliticianJointNetwork({
  politicianNetworkData,
}: PoliticianNetworkDataProps) {
  const networkRef = useRef<HTMLDivElement>(null);
  const networkInstanceRef = useRef<Network | null>(null);
  // 네트워크에 사용할 노드 목록 정의
  const nodes = [
    {
      id: politicianNetworkData.centerPolitician.id,
      label: politicianNetworkData.centerPolitician.name,
      group: politicianNetworkData.centerPolitician.party,
      district: politicianNetworkData.centerPolitician.district,
      bills: politicianNetworkData.centerPolitician.bills,
      size: (politicianNetworkData.centerPolitician.bills ?? 0) + 10,
    },
    ...politicianNetworkData.connectedPoliticians.map((p) => ({
      id: p.id,
      label: p.name,
      group: p.party,
      district: p.district,
      bills: p.bills,
      size: (p.bills ?? 0) + 10,
    })),
  ];
  const edges = politicianNetworkData.edges;

  const centerNode = nodes.find(
    (n) => n.id === politicianNetworkData.centerPolitician.id
  );

  const initializeNetwork = () => {
    if (!networkRef.current) return;

    // 네트워크 인스턴스 생성
    const network = new Network(
      networkRef.current,
      {
        nodes,
        edges,
      },
      getNetworkOptions()
    );
    networkInstanceRef.current = network;

    // 노드에 마우스를 올렸을 때 연결 강조
    network.on("hoverNode", (params) => {
      const nodeId = params.node;
      const connectedNodes = network.getConnectedNodes(nodeId);
      // 연결된 노드와 엣지 강조
      network.selectNodes([nodeId, ...connectedNodes]);
      // 연결된 엣지 가져오기
      const connectedEdges = network.getConnectedEdges(nodeId);
      network.selectEdges(connectedEdges);
    });

    // 마우스를 떼었을 때 강조 초기화
    network.on("blurNode", () => {
      network.unselectAll();
    });

    // 네트워크 인스턴스 정리
    return () => {
      network.destroy();
    };
  };

  useEffect(() => {
    const cleanup = initializeNetwork();
    return cleanup;
  }, []);

  // 네트워크를 확대하는 함수
  const handleZoomIn = () => {
    if (networkInstanceRef.current) {
      const currentScale = networkInstanceRef.current.getScale();
      networkInstanceRef.current.moveTo({
        scale: currentScale * 1.2,
      });
    }
  };

  // 네트워크를 축소하는 함수
  const handleZoomOut = () => {
    if (networkInstanceRef.current) {
      const currentScale = networkInstanceRef.current.getScale();
      networkInstanceRef.current.moveTo({
        scale: currentScale / 1.2,
      });
    }
  };

  // 네트워크를 초기 위치로 리셋하는 함수
  const handleReset = () => {
    if (networkInstanceRef.current) {
      networkInstanceRef.current.fit({
        animation: true,
      });
    }
  };

  // 네트워크를 전체 화면으로 전환하는 함수
  const handleFullscreen = () => {
    if (networkRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        networkRef.current.requestFullscreen();
      }
    }
  };

  return (
    <Card className="border-gray-200 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-rose-600 dark:to-gray-950">
      <CardHeader className="pb-2 border-b">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg flex items-center">
            🕸️ 공동 발의 네트워크
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="lg:col-span-3 relative h-[500px] w-full">
            <div ref={networkRef} className="w-full h-full bg-gray-800"></div>

            <NetworkControls
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onReset={handleReset}
              onFullscreen={handleFullscreen}
            />
          </div>

          <div className="border-t lg:border-t-0 lg:border-l p-4 bg-white dark:bg-gray-950">
            {(() => {
              if (!centerNode) return null;
              return (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="text-xl font-bold">{centerNode.label}</h3>
                      <Badge
                        className={`${
                          centerNode.group === "더불어민주당"
                            ? "bg-[#1971c2]"
                            : centerNode.group === "국민의힘"
                            ? "bg-[#e03131]"
                            : "bg-[#f08c00]"
                        } `}
                      >
                        {centerNode.group}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-500">지역구</span>
                      <span className="font-medium">{centerNode.district}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-500">발의 법안 수</span>
                      <span className="font-medium">{centerNode.bills}건</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-500">공동발의 관계</span>
                      <span className="font-medium">
                        {
                          politicianNetworkData.edges.filter(
                            (e) =>
                              e.from === centerNode.id || e.to === centerNode.id
                          ).length
                        }
                        명
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="font-medium mb-2">주요 공동발의 의원</h4>
                    <div className="space-y-2">
                      {politicianNetworkData.edges
                        .filter(
                          (e) =>
                            e.from === centerNode.id || e.to === centerNode.id
                        )
                        .sort((a, b) => b.value - a.value)
                        .slice(0, 3)
                        .map((edge, idx) => {
                          const connectedId =
                            edge.from === centerNode.id ? edge.to : edge.from;
                          const connectedNode =
                            politicianNetworkData.connectedPoliticians.find(
                              (n) => n.id === connectedId
                            );

                          return connectedNode ? (
                            <div
                              key={idx}
                              className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded-md"
                            >
                              <div className="flex items-center gap-2">
                                <span>{connectedNode.name}</span>
                              </div>
                              <Badge variant="outline">{edge.value}건</Badge>
                            </div>
                          ) : null;
                        })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        <div className="p-4 text-sm text-gray-500 border-t">
          <p>
            이 네트워크는 의원들 간의 공동발의 관계를 시각화합니다. 원의 크기는
            발의 법안 수에 비례하며, 선의 굵기는 공동 발의 횟수를 나타냅니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
