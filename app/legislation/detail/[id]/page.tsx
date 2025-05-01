import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegislationDetailClient from "@/components/legislation/LegislationDetailClient";
import { legislationApi } from "@/api/legislation";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  const id = params.id;
  try {
    const res = await legislationApi.getLegislationDetail(id);
    return {
      title: `${res?.title} - 입법예고 상세`,
      description: res?.summary || "입법안 상세정보",
    };
  } catch {
    return {
      title: "입법안 상세정보",
      description: "해당 입법안 정보를 찾을 수 없습니다.",
    };
  }
}

export default async function LegislationDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const id = params.id;

  const [data] = await Promise.all([legislationApi.getLegislationDetail(id)]);

  if (!data) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <header>
        <Header />
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <LegislationDetailClient props={data} />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
