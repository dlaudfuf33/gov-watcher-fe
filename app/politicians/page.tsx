import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PoliticianHome from "@/components/politicians/PoliticiansHome";

export default function Page() {
  return (
    <div className="bg-[#f5f5f5]">
      <header>
        <Header />
      </header>
      <main>
        <PoliticianHome />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
