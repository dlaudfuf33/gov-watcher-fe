"use client";

import { Button } from "@/components/ui/button";

interface ImminentBillCardProps {
  daysLeft: number;
  title: string;
  proposer: string;
  party: string;
  proposerImage: string;
}

export default function ImminentBillCard({
  daysLeft,
  title,
  proposer,
  party,
  proposerImage,
}: ImminentBillCardProps) {
  return (
    <div className="bg-gradient-to-tr from-[#f0f4ff]/70 to-white/70 backdrop-blur-md shadow-lg rounded-xl p-4 w-full text-sm border border-blue-100/50">
      <div className="text-sm text-red-500 font-medium mb-2">
        마감까지 {daysLeft}일 남음
      </div>
      <h3 className="font-bold text-base mb-2">{title}</h3>
      <div className="flex items-center gap-2 mb-4">
        <img
          src={proposerImage}
          alt="발의자"
          className="w-8 h-8 rounded-full border border-white shadow-sm"
        />
        <div>
          <div className="text-sm font-medium">{proposer}</div>
          <div className="text-xs text-gray-500">{party}</div>
        </div>
      </div>
      <Button className="w-full bg-blue-500 hover:bg-blue-600 shadow-md">
        의견 등록하기
      </Button>
    </div>
  );
}
