"use client";

import { motion } from "framer-motion";

interface BattleChartProps {
  agree: number;
  oppose: number;
}

export default function BattleChart({ agree, oppose }: BattleChartProps) {
  return (
    <div className="relative w-full h-[20vw] max-h-10 flex-shrink-0 bg-white border-2 border-[#381806]/40 rounded-lg overflow-hidden mb-6">
      {/* 찬성 영역 */}
      <motion.div
        className="absolute top-0 left-0 h-full bg-blue-400 text-sm font-bold flex items-center justify-end pr-2 gap-1 z-10 rounded-l-md"
        initial={{ width: 0 }}
        animate={{ width: `${agree}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.span className="text-xs md:text-sm font-bold text-white whitespace-nowrap">
          {agree}%
        </motion.span>
        <motion.img
          src="/characters/left-fighter.gif"
          alt="찬성 캐릭터"
          className="h-16 w-auto object-contain"
          animate={{ scale: 0.8 + (agree / 100) * 0.4 }}
          transition={{ type: "spring", stiffness: 50 }}
        />
      </motion.div>

      {/* 반대 영역 */}
      <motion.div
        className="absolute top-0 right-0 h-full bg-rose-400 text-sm font-bold flex items-center justify-start pl-2 gap-1 z-10 rounded-r-md"
        initial={{ width: 0 }}
        animate={{ width: `${oppose}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.img
          src="/characters/right-fighter.gif"
          alt="반대 캐릭터"
          className="h-16 w-auto object-contain"
          animate={{ scale: 0.8 + (oppose / 100) * 0.4 }}
          transition={{ type: "spring", stiffness: 50 }}
        />
        <span className="text-xs md:text-sm font-bold text-white whitespace-nowrap">
          {oppose}%
        </span>
      </motion.div>
    </div>
  );
}
