export const dynamic = "force-static";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ParliamentStatsSection from "@/components/home/ParliamentStatsSection";
import { getParliamentStats } from "@/api/home/HomeAPI";
import CtaSection from "@/components/home/CtaSection";
import { Suspense } from "react";
import PoliticianVisualizationSection from "@/components/politicians/PoliticianVisualizationSection";
import BillVisualizationSection from "@/components/politicians/BillVisualizationSection";

export default async function Page() {
  const [parliamentStatsResponse] = await Promise.all([getParliamentStats()]);

  return (
    <>
      <section className="min-h-screen flex flex-col bg-[url(/mock/koreaguide1.jpg)] bg-cover bg-center bg-no-repeat bg-fixed">
        <header>
          <Header />
        </header>
        <main className="flex-grow">
          {/* 히어로 섹션 */}
          <section>
            <HeroSection />
          </section>

          <section className="bg-[#f5f5f5]">
            {/* 통계 카드 섹션 */}
            <ParliamentStatsSection
              currentSession={parliamentStatsResponse.data.currentSession}
              stats={parliamentStatsResponse.data.parliamentStat}
            />

            <section className="py-4 sm:py-6 lg:py-8 bg-[#f5f5f5]">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 통계 시각화 섹션 (예: 정당별 분포, 활동 등) */}
                  <Suspense fallback={<div>시각화 로딩 중...</div>}>
                    <PoliticianVisualizationSection />
                  </Suspense>
                  {/* 법안 카테고리별 분포 */}
                  <Suspense fallback={<div>시각화 로딩 중...</div>}>
                    <BillVisualizationSection />
                  </Suspense>
                </div>
              </div>
            </section>
          </section>

          {/* CTA 섹션 */}
          <CtaSection />
        </main>
        <footer>
          <Footer />
        </footer>
      </section>
    </>
  );
}
