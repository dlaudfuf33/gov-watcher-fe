"use client";

import { getAllPoliticians } from "@/api/politicians/PoliticiansAPI";
import { Politician } from "@/types/politiciansType";
import PoliticianCard from "./PoliticianCard";

export default function PoliticiansCardGrid({
  politicians,
}: {
  politicians: Politician[];
}) {
  if (!politicians || politicians.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        🔍 표시할 국회의원이 없습니다.
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-12">
      {politicians.map((politician) => (
        <PoliticianCard key={politician.id} politician={politician} />
      ))}
    </section>
  );
}
