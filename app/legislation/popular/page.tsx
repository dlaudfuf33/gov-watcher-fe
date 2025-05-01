import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopularLegislationClient from "@/components/legislation/PopularLegislationClient";
import { legislationApi } from "@/api/legislation";

export async function generateMetadata(): Promise<Metadata> {
  const result = await legislationApi.getPopularLegislations({
    page: 1,
    limit: 10,
    sortBy: "views",
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
  const sortBy = "views";
  const { data, total } = await legislationApi.getPopularLegislations({
    page,
    limit,
    sortBy,
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
          initialSortBy={sortBy}
        />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
