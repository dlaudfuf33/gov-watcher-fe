"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="bg-white/70 backdrop-blur-sm py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mt-6 text-xl text-black">
            대한민국 국회의 입법예고 법안들을 간편하게 확인하세요. <br />
            중요한 법안 정보를 한눈에 파악하고 의견을 남길 수 있습니다.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/notices">
              <Button className="rounded-md px-8 py-6 text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/20">
                입법예고 보러가기
              </Button>
            </Link>
            <Link href="/politicians">
              <Button className="rounded-md px-8 py-6 text-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/20">
                국회의원 살펴보기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
