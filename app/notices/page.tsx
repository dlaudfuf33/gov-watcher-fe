import { getNoticeList } from "@/api/notices/NoticeListAPI";
import { getNoticeListFallback } from "@/api/notices/NoticeListFallback";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NoticesList from "@/components/notice/NoticesPage";

export default async function Page() {
  const results = await Promise.allSettled([getNoticeList()]);
  const { data } =
    results[0].status === "fulfilled"
      ? results[0].value
      : getNoticeListFallback();

  return (
    <section className="min-h-screen flex flex-col">
      <header>
        <Header />
      </header>
      <main className="">
        <NoticesList notices={data ?? []} />
      </main>
      <footer>
        <Footer />
      </footer>
    </section>
  );
}
