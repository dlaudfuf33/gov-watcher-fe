"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function FilterSection() {
  const [selectedParties, setSelectedParties] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);

  const parties = [
    "더불어민주당",
    "국민의힘",
    "정의당",
    "기본소득당",
    "무소속",
  ];
  const regions = [
    "서울",
    "경기",
    "인천",
    "부산",
    "대구",
    "광주",
    "대전",
    "울산",
    "세종",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
  ];
  const terms = ["21대", "20대", "19대", "18대"];

  const toggleParty = (party: string) => {
    setSelectedParties((prev) =>
      prev.includes(party) ? prev.filter((p) => p !== party) : [...prev, party]
    );
  };

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  const toggleTerm = (term: string) => {
    setSelectedTerms((prev) =>
      prev.includes(term) ? prev.filter((t) => t !== term) : [...prev, term]
    );
  };

  const clearFilters = () => {
    setSelectedParties([]);
    setSelectedRegions([]);
    setSelectedTerms([]);
  };

  return (
    <div className="space-y-4 flex justify-end">
      <div className="flex flex-wrap gap-2 mb-4">
        {/* 드롭다운 필터 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              정당
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-24">
            {parties.map((party) => (
              <DropdownMenuCheckboxItem
                key={party}
                checked={selectedParties.includes(party)}
                onCheckedChange={() => toggleParty(party)}
              >
                {party}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              지역구
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-24">
            {regions.map((region) => (
              <DropdownMenuCheckboxItem
                key={region}
                checked={selectedRegions.includes(region)}
                onCheckedChange={() => toggleRegion(region)}
              >
                {region}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              대수
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-24">
            {terms.map((term) => (
              <DropdownMenuCheckboxItem
                key={term}
                checked={selectedTerms.includes(term)}
                onCheckedChange={() => toggleTerm(term)}
              >
                {term}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {selectedParties.length > 0 ||
        selectedRegions.length > 0 ||
        selectedTerms.length > 0 ? (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-red-500 hover:text-red-700"
          >
            필터 초기화
          </Button>
        ) : null}
      </div>

      {/* 태그형 필터 표시 */}
      <div className="flex flex-wrap gap-2">
        {selectedParties.map((party) => (
          <Badge
            key={party}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {party}
            <Button
              onClick={() => toggleParty(party)}
              className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
            >
              <Check className="h-3 w-3" />
            </Button>
          </Badge>
        ))}

        {selectedRegions.map((region) => (
          <Badge
            key={region}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {region}
            <Button
              onClick={() => toggleRegion(region)}
              className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
            >
              <Check className="h-3 w-3" />
            </Button>
          </Badge>
        ))}

        {selectedTerms.map((term) => (
          <Badge
            key={term}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {term}
            <Button
              onClick={() => toggleTerm(term)}
              className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
            >
              <Check className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
