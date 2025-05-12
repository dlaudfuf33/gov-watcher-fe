import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { dashboardApi } from "@/api/dashboard";
import HomeMotionWrapper from "@/components/HomeMotionWrapper";
import HeroSection from "@/components/home/HeroSection";
import ParliamentStatsSection from "@/components/home/ParliamentStatsSection";
import PoliticianVisualizationSection from "@/components/politicians/PoliticianVisualizationSection";
import BillVisualizationSection from "@/components/politicians/BillVisualizationSection";
import CtaSection from "@/components/home/CtaSection";

export default async function Page() {
  const [parliamentStatsResponse] = await Promise.all([
    dashboardApi.getParliamentStats(),
  ]);

  return (
    <>
      <section className="min-h-screen flex flex-col bg-[url(/mock/koreaguide.jpg)] bg-cover bg-center bg-no-repeat bg-fixed">
        <header>
          <Header />
        </header>
        <main className="flex-grow">
          <HomeMotionWrapper>
            <HeroSection />
            <section className="bg-white">
              <section className="bg-[#f5f5f5]">
                <ParliamentStatsSection
                  currentSession={parliamentStatsResponse.data.currentSession}
                  stats={parliamentStatsResponse.data.parliamentStat}
                />

                <section className="py-4 sm:py-6 lg:py-8 bg-[#f5f5f5]">
                  <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <PoliticianVisualizationSection />
                      <BillVisualizationSection />
                    </div>
                  </div>
                </section>
              </section>
            </section>
            <CtaSection />
          </HomeMotionWrapper>
        </main>
        <footer>
          <Footer />
        </footer>
      </section>
    </>
  );
}
