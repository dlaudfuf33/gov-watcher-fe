import { Metadata } from "next";
import DeadlineLegislationPage from "@/components/legislation/DeadlineLegislationClient";
import { legislationApi } from "@/api/legislation";
import DeadlineLegislationClient from "@/components/legislation/DeadlineLegislationClient";

export async function generateMetadata(): Promise<Metadata> {
  const page = 1;
  const limit = 10;
  const sortBy = "daysLeft";
  const { data } = await legislationApi.getDeadlineLegislations({
    page,
    limit,
    sortBy,
  });

  const topTitle = data?.[0]?.title ?? "마감 임박 입법예고안";

  return {
    title: `⏰ ${topTitle} - 정부야 모하니?`,
    description: "마감이 임박한 입법예고안들을 지금 확인해보세요.",
  };
}

export default async function Page() {
  const page = 1;
  const limit = 10;
  const sortBy = "daysLeft";

  const { data, total } = await legislationApi.getDeadlineLegislations({
    page,
    limit,
    sortBy,
  });

  return (
    <DeadlineLegislationClient
      initialData={data}
      total={total}
      initialPage={page}
      initialSortBy={sortBy}
    />
  );
}
