import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopularLegislationClient from "@/components/legislation/PopularLegislationClient";
import { legislationApi } from "@/api/legislation";

export async function generateMetadata(): Promise<Metadata> {
  const result = await legislationApi.getLegislations({
    isServer: true,
    page: 1,
    size: 10,
    primarySort: "POPULAR",
    secondarySort: "OPINIONS",
  });
  const title = result.data[0]?.title || "인기 입법예고안";
  return {
    title: `${title} - 정부야 모하니?`,
    description: "많은 의견과 관심을 받고 있는 입법예고안을 확인하세요.",
  };
}

export default async function Page() {
  const page = 1;
  const limit = 10;
  const primarySort = "POPULAR";
  const secondarySort = "OPINIONS";

  const { data, total } = await legislationApi.getLegislations({
    isServer: true,
    page: page,
    size: limit,
    primarySort: primarySort,
    secondarySort: secondarySort,
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <header>
        <Header />
      </header>
      <main className="flex-1 container mx-auto">
        <PopularLegislationClient
          initialData={data}
          total={total}
          initialPage={page}
          initialPrimarySort={primarySort}
          initialSecondarySort={secondarySort}
        />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
