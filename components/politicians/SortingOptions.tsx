"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Compass,
  BarChart2,
} from "lucide-react";

interface SortingOptionsProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortingOptions({
  value,
  onChange,
}: SortingOptionsProps) {
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
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {sortOptions.map((option) => (
        <Button
          key={option.id}
          variant={value === option.id ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(option.id)}
          className="flex items-center"
        >
          {option.icon}
          {option.label}
        </Button>
      ))}
    </div>
  );
}
