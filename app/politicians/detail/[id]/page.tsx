import PoliticianDetailClient from "@/components/politicians/detail/PoliticianDetailClient";
import { notFound } from "next/navigation";
import { politicianApi } from "@/api/politicians";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
interface PoliticianDetailPageProps {
  params: number;
}

export default async function PoliticianDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const id = params.id;

  const [politicianDetail] = await Promise.all([
    politicianApi.getPoliticianById({ isServer: true, politicianID: id }),
  ]);

  console.log(politicianDetail);

  // 모든 데이터를 클라이언트 컴포넌트에 전달
  return (
    <>
      <section className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
        <header>
          <Header />
        </header>
        <main className="flex-1">
          <PoliticianDetailClient politicianDetail={politicianDetail} />
        </main>
        <footer>
          <Footer />
        </footer>
      </section>
    </>
  );
}
