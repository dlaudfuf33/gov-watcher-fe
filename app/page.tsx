import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
import LegislationChart from "@/components/LegislationChart";
import PartyDistribution from "@/components/PartyDistribution";
import PopularBills from "@/components/PopularBills";
// bg-[#f5f5f5]
export default function Home() {
  const currentSession = 21;
  return (
    <div className="min-h-screen flex flex-col bg-[url(/mock/koreaguide1.jpg)] bg-cover bg-center bg-no-repeat bg-fixed">
      <Header />
      <main className="flex-grow">
        {/* 히어로 섹션 */}
        {/* <div className="bg-gradient-to-r from-blue-600/90 to-red-600/90 backdrop-blur-sm py-8"> */}
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
                <Link href="/notices">
                  <Button className="rounded-md px-8 py-6 text-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/20">
                    국회의원 살펴보기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f5f5f5]">
          {/* 통계 카드 섹션 */}
          <div className="py-8 bg-[#f5f5f5] backdrop-blur-sm shadow-inner ring-1 ring-inset ring-gray-300/30">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                제 {currentSession}대 국회 활동 현황
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="전체 법안"
                  value="1,245"
                  changePeriod="+12%"
                  descriptionPeriod="지난 달 대비"
                  trendPeriod="up"
                  changeGov="-2%"
                  descriptionGov="전 정부 대비"
                  trendGov="down"
                  color="blue"
                />
                <StatCard
                  title="처리 법안"
                  value="487"
                  changePeriod="+12%"
                  descriptionPeriod="지난 달 대비"
                  trendPeriod="up"
                  changeGov="0%"
                  descriptionGov="전 정부 대비"
                  trendGov="neutral"
                  color="green"
                />
                <StatCard
                  title="계류 법안"
                  value="758"
                  changePeriod="+12%"
                  descriptionPeriod="지난 달 대비"
                  trendPeriod="up"
                  changeGov="+12%"
                  descriptionGov="전 정부 대비"
                  trendGov="up"
                  color="amber"
                />
                <StatCard
                  title="의견 제출"
                  value="3,892"
                  changePeriod="+12%"
                  descriptionPeriod="지난 달 대비"
                  trendPeriod="up"
                  changeGov="+12%"
                  descriptionGov="전 정부 대비"
                  trendGov="up"
                  color="purple"
                />
              </div>
            </div>
          </div>

          {/* 정당별 의석수 분포 */}
          <div className="py-4 sm:py-6 lg:py-8 bg-[#f5f5f5]">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white shadow-xl ring-1 ring-gray-300/60 ring-offset-2 ring-offset-white rounded-2xl p-4 transition hover:shadow-2xl">
                  <h2 className="text-2xl font-bold mb-2 sm:mb-3 text-[#1d4ed8]">
                    정당별 의석수 분포
                  </h2>
                  <PartyDistribution />
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
          </div>

          {/* 인기 법안 + 마감 임박 법안: 가로 정렬 섹션 */}
          <div className="bg-[#f5f5f5] backdrop-blur-sm py-16">
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
                <div className="flex-1 max-h-[700px] h-full flex flex-col bg-gradient-to-br from-[#eff6ff] to-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-2xl border border-blue-200 p-6">
                  <h2 className="text-2xl font-bold mb-4 text-center text-[#1d4ed8]">
                    ⏰ 의견 마감 임박 법안
                  </h2>
                  <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1">
                    <div className="flex-[1]">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-tr from-[#f0f4ff]/70 to-white/70 backdrop-blur-md shadow-lg rounded-xl p-4 w-full text-sm border border-blue-100/50"
                        >
                          <div className="text-sm text-red-500 font-medium mb-2">
                            마감까지 {i}일 남음
                          </div>
                          <h3 className="font-bold text-base mb-2">
                            {i === 1
                              ? "디지털 기본법 일부개정법률안"
                              : i === 2
                              ? "청년기본법 일부개정법률안"
                              : i === 3
                              ? "국가재정법 일부개정법률안"
                              : "공직선거법 일부개정법률안"}
                          </h3>
                          <div className="flex items-center gap-2 mb-4">
                            <img
                              src={`/mock/hong.jpg`}
                              alt="발의자"
                              className="w-8 h-8 rounded-full border border-white shadow-sm"
                            />
                            <div>
                              <div className="text-sm font-medium">
                                {i === 1
                                  ? "김민수"
                                  : i === 2
                                  ? "이지원"
                                  : i === 3
                                  ? "박준호"
                                  : "최서연"}
                              </div>
                              <div className="text-xs text-gray-500">
                                {i === 1 || i === 3
                                  ? "더불어민주당"
                                  : "국민의힘"}
                              </div>
                            </div>
                          </div>
                          <Button className="w-full bg-blue-500 hover:bg-blue-600 shadow-md">
                            의견 등록하기
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="py-16 bg-gradient-to-r from-blue-600/90 to-red-600/90 backdrop-blur-sm">
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
