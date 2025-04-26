"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Politician } from "@/types/politiciansType";

interface PoliticianCardProps {
  politician: Politician;
}

export default function PoliticianCard({ politician }: PoliticianCardProps) {
  // 정당에 따른 배지 색상 설정
  const partyColorMap: Record<string, string> = {
    더불어민주당: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    국민의힘: "bg-red-100 text-red-800 hover:bg-red-200",
    정의당: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    기본소득당: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    무소속: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  };

  const partyColor =
    partyColorMap[politician.party] ||
    "bg-gray-100 text-gray-800 hover:bg-gray-200";

  return (
    <Card className="border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-transform duration-500 ease-out transform hover:-translate-y-1">
      <div className="relative h-60 bg-gray-100">
        <Image
          src={politician.profileImage || "/placeholder.svg"}
          alt={`${politician.name} 의원 프로필 사진`}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">{politician.name}</h3>
          <Badge className={partyColor}>{politician.party}</Badge>
        </div>
        <div className="text-sm text-gray-600 mb-4">
          <p>{politician.district}</p>
          <p>
            {politician.position} | {politician.term}대
          </p>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">최근 발의 법안</span>
          <span className="font-bold text-blue-600">
            {politician.recentBills}건
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/politicians/detail/${politician.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            자세히 보기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
