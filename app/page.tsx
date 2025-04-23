import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import LegislationChart from "@/components/charts/LegislationChart";
import PartyDistributionChart from "@/components/charts/PartyDistributionChart";
import PopularBills from "@/components/PopularBills";
import ImminentBillCard from "@/components/ImminentBillCard";
import HeroSection from "@/components/HeroSection";
import ParliamentStatsSection from "@/components/ParliamentStatsSection";

const bills = [
  {
    daysLeft: 1,
    title: "디지털 기본법 일부개정법률안",
    proposer: "김민수",
    party: "더불어민주당",
    proposerImage: "/mock/hong.jpg",
  },
  {
    daysLeft: 2,
    title: "청년기본법 일부개정법률안",
    proposer: "이지원",
    party: "국민의힘",
    proposerImage: "/mock/hong.jpg",
  },
  {
    daysLeft: 3,
    title: "국가재정법 일부개정법률안",
    proposer: "박준호",
    party: "더불어민주당",
    proposerImage: "/mock/hong.jpg",
  },
  {
    daysLeft: 4,
    title: "공직선거법 일부개정법률안",
    proposer: "최서연",
    party: "국민의힘",
    proposerImage: "/mock/hong.jpg",
  },
];

export default function Home() {
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
            <ParliamentStatsSection />

            {/* 정당별 의석수 분포 */}
            <section className="py-4 sm:py-6 lg:py-8 bg-[#f5f5f5]">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white shadow-xl ring-1 ring-gray-300/60 ring-offset-2 ring-offset-white rounded-2xl p-4 transition hover:shadow-2xl">
                    <h2 className="text-2xl font-bold mb-2 sm:mb-3 text-[#1d4ed8]">
                      정당별 의석수 분포
                    </h2>
                    <PartyDistributionChart />
                  </div>

                  {/* 법안 카테고리별 분포 */}
                  <div className="bg-white shadow-xl ring-1 ring-gray-200/60 ring-offset-2 ring-offset-white rounded-2xl p-4 transition hover:shadow-2xl">
                    <h2 className="text-2xl font-bold mb-2 sm:mb-3 text-[#dc2626]">
                      법안 카테고리별 분포
                    </h2>
                    <LegislationChart />
                  </div>
                </div>
              </div>
            </section>

            {/* 인기 법안 + 마감 임박 법안: 가로 정렬 섹션 */}
            <section className="bg-[#f5f5f5] backdrop-blur-sm py-16">
              <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                  {/* 인기 법안 */}
                  <div className="flex-[1.6] max-h-[700px] bg-gradient-to-br from-[#fef2f2] to-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-2xl border border-red-200 p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center text-[#b91c1c]">
                      🔥 인기 법안
                    </h2>
                    <PopularBills />
                  </div>

                  {/* 마감 임박 법안 */}
                  <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1">
                    {bills.map((bill, index) => (
                      <ImminentBillCard key={index} {...bill} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </section>

          {/* CTA 섹션 */}
          <section className="py-16 bg-gradient-to-r from-blue-600/90 to-red-600/90 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <div className="bg-gradient-to-br from-white/10 to-white/5 shadow-[0_8px_30px_rgba(255,255,255,0.2)] rounded-2xl p-8 max-w-4xl mx-auto text-white text-center border border-white/30">
                <h2 className="text-3xl font-bold mb-4">
                  국민의 목소리가 필요합니다
                </h2>
                <p className="mb-6 max-w-2xl mx-auto text-white/90">
                  여러분의 의견이 대한민국의 미래를 만듭니다. 법안에 대한 의견을
                  남기고 더 나은 사회를 함께 만들어가요.
                </p>
                <Button className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 shadow-lg shadow-white/20">
                  의견 등록하러 가기
                </Button>
              </div>
            </div>
          </section>
        </main>
        <footer>
          <Footer />
        </footer>
      </section>
    </>
  );
}
