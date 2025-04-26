"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProposerCardProps {
  id: string;
  name: string;
  party: string;
  imageUrl?: string;
}

export default function ProposerCard({
  id,
  name,
  party,
  imageUrl,
}: ProposerCardProps) {
  const router = useRouter();

  // 정당별 색상 정의
  const partyColorMap: Record<
    string,
    { bg: string; border: string; hover: string }
  > = {
    더불어민주당: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      hover: "hover:bg-blue-100",
    },
    국민의힘: {
      bg: "bg-red-50",
      border: "border-red-200",
      hover: "hover:bg-red-100",
    },
    기본값: {
      bg: "bg-gray-50",
      border: "border-gray-200",
      hover: "hover:bg-gray-100",
    },
  };

  const style = partyColorMap[party] || partyColorMap["기본값"];

  return (
    <div
      className={`flex flex-col items-center p-2 rounded-lg border ${style.bg} ${style.border} ${style.hover} transition-colors cursor-pointer`}
      onClick={() => router.push(`/politicians/${id}`)}
    >
      <div
        className="w-16 h-16 
      flex items-center justify-center mb-1 
      rounded-full bg-white 
      overflow-hidden border border-gray-300"
      >
        <Image
          src={imageUrl || "/placeholder.svg?height=48&width=48"}
          alt={name}
          width={64}
          height={64}
          className="rounded-full"
        />
      </div>
      <span className="text-xs font-medium text-center truncate w-full">
        {name}
      </span>
      <span className="text-xs text-gray-500 truncate w-full text-center">
        {party}
      </span>
    </div>
  );
}
