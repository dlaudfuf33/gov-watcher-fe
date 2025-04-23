"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Compass,
  BarChart2,
} from "lucide-react";

export default function SortingOptions() {
  const [activeSort, setActiveSort] = useState<string>("bills");

  const sortOptions = [
    {
      id: "bills",
      label: "발의 법안 많은 순",
      icon: <ArrowUpCircle className="h-4 w-4 mr-2" />,
    },
    {
      id: "passRate",
      label: "통과율 높은 순",
      icon: <ArrowDownCircle className="h-4 w-4 mr-2" />,
    },
    {
      id: "career",
      label: "정치 경력 긴 순",
      icon: <Compass className="h-4 w-4 mr-2" />,
    },
    {
      id: "activity",
      label: "최근 활동 많은 순",
      icon: <BarChart2 className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {sortOptions.map((option) => (
        <Button
          key={option.id}
          variant={activeSort === option.id ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveSort(option.id)}
          className="flex items-center"
        >
          {option.icon}
          {option.label}
        </Button>
      ))}
    </div>
  );
}
