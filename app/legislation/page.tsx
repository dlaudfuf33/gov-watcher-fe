"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopularLegislationSection from "@/components/legislation/PopularLegislationSection";
import DeadlineLegislationSection from "@/components/legislation/DeadlineLegislationSection";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Page() {
  const router = useRouter();

  const handleViewMore = (section: string) => {
    router.push(`/legislation/${section}`);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <header>
        <Header />
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            className="space-y-12"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <PopularLegislationSection
                onViewMore={() => handleViewMore("popular")}
              />
            </motion.div>
            <motion.div variants={item}>
              <DeadlineLegislationSection
                onViewMore={() => handleViewMore("deadline")}
              />
            </motion.div>
          </motion.div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </section>
  );
}
