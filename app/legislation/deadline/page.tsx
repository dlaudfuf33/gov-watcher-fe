import { Metadata } from "next";
import { legislationApi } from "@/api/legislation";
import DeadlineLegislationClient from "@/components/legislation/DeadlineLegislationClient";

export async function generateMetadata(): Promise<Metadata> {
  const page = 1;
  const size = 10;
  const primarySort = "DEADLINE";
  const { data } = await legislationApi.getLegislations({
    isServer: true,
    page,
    size,
    primarySort,
  });

  const topTitle = data?.[0]?.title ?? "마감 임박 입법예고안";

  return {
    title: `⏰ ${topTitle} - 정부야 모하니?`,
    description: "마감이 임박한 입법예고안들을 지금 확인해보세요.",
  };
}

export default async function Page() {
  const page = 1;
  const size = 10;
  const primarySort = "DEADLINE";
  const secondarySort = "NONE";

  const { data, total } = await legislationApi.getLegislations({
    isServer: true,
    page,
    size,
    primarySort,
  });

  return (
    <DeadlineLegislationClient
      initialData={data}
      total={total}
      initialPage={page}
      initialPrimarySort={primarySort}
      initalsecondarySort={secondarySort}
    />
  );
}
