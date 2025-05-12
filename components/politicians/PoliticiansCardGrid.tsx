"use client";

import { Politician } from "@/types/politiciansType";
import PoliticianCard from "./PoliticianCard";

export default function PoliticiansCardGrid({
  politicians,
}: {
  politicians: Politician[];
}) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-12">
      {politicians.map((politician) => (
        <PoliticianCard key={politician.id} politician={politician} />
      ))}
    </section>
  );
}
