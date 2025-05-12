"use client";

import { useRouter } from "next/navigation";
import ProposerCard from "@/components/legislation/ProposerCard";
import { ProposerGroup } from "@/types/notice.types";

interface ProposerGridProps {
  proposers: ProposerGroup[];
}

export default function ProposerGrid({ proposers }: ProposerGridProps) {
  const router = useRouter();

  return (
    <div className="border-t border-[#514332]/40 p-6">
      <h3 className="text-lg font-medium mb-3 text-gray-800">발의 의원</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {proposers.map((proposer) => (
          <ProposerCard
            key={proposer.id}
            id={proposer.id}
            name={proposer.name}
            monaCD={proposer.monaCD}
            party={proposer.party}
            imageUrl={proposer.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
