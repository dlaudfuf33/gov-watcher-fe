"use client";
import { ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { FilterSectionProps } from "@/types/SearchAndFilterSectionProps.types";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function FilterSection({
  selectedParties,
  setSelectedParties,
  selectedRegions,
  setSelectedRegions,
  selectedTerms,
  setSelectedTerms,
}: FilterSectionProps) {
  const parties = [
    "더불어민주당",
    "국민의힘",
    "정의당",
    "기본소득당",
    "녹색당",
    "무소속",
  ];
  const regions = [
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
    "세종특별자치시",
    "경기도",
    "강원도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주특별자치도",
  ];
  const terms = ["21대", "20대", "19대", "18대"];
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  const FilterBadges = () => (
    <div className="flex flex-wrap justify-center gap-2 mt-2">
      {selectedParties.map((party) => (
        <Badge
          key={party}
          className="flex items-center gap-1 bg-government-blue text-white hover:bg-government-blue/90"
        >
          {party}
          <button onClick={() => toggleParty(party)} className="ml-1 text-xs">
            ✕
          </button>
        </Badge>
      ))}
      {selectedRegions.map((region) => (
        <Badge
          key={region}
          className="flex items-center gap-1 bg-government-gray text-white hover:bg-government-gray/90"
        >
          {region}
          <button onClick={() => toggleRegion(region)} className="ml-1 text-xs">
            ✕
          </button>
        </Badge>
      ))}
      {selectedTerms.map((term) => (
        <Badge
          key={term}
          className="flex items-center gap-1 bg-government-gold text-black hover:bg-government-gold/90"
        >
          {term}
          <button onClick={() => toggleTerm(term)} className="ml-1 text-xs">
            ✕
          </button>
        </Badge>
      ))}
      {(selectedParties.length > 0 ||
        selectedRegions.length > 0 ||
        selectedTerms.length > 0) && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="h-6 px-2 border-government-gray text-government-gray hover:bg-government-light"
        >
          초기화
        </Button>
      )}
    </div>
  );

  // 모바일 화면용 필터 시트 컴포넌트임
  const MobileFilters = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-government-blue text-government-blue hover:bg-government-light"
        >
          <Filter className="h-4 w-4" />
          필터
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle className="text-government-blue">필터</SheetTitle>
          <SheetDescription>원하는 필터를 선택하세요</SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-4">
          <div>
            <h3 className="mb-2 text-sm font-medium text-government-blue">
              정당
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {parties.map((party) => (
                <Button
                  key={party}
                  variant={
                    selectedParties.includes(party) ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => toggleParty(party)}
                  className={cn(
                    "justify-start",
                    selectedParties.includes(party)
                      ? "bg-government-blue hover:bg-government-blue/90 text-white"
                      : "border-government-blue text-government-blue hover:bg-government-light"
                  )}
                >
                  {party}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-government-gray">
              지역구
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {regions.map((region) => (
                <Button
                  key={region}
                  variant={
                    selectedRegions.includes(region) ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => toggleRegion(region)}
                  className={cn(
                    "justify-start",
                    selectedRegions.includes(region)
                      ? "bg-government-gray hover:bg-government-gray/90 text-white"
                      : "border-government-gray text-government-gray hover:bg-government-light"
                  )}
                >
                  {region}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-government-gold">
              대수
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {terms.map((term) => (
                <Button
                  key={term}
                  variant={selectedTerms.includes(term) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleTerm(term)}
                  className={cn(
                    "justify-start",
                    selectedTerms.includes(term)
                      ? "bg-government-gold hover:bg-government-gold/90 text-black"
                      : "border-government-gold text-government-gold hover:bg-government-light"
                  )}
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={clearFilters}
            variant="outline"
            className="mt-2 border-government-red text-government-red hover:bg-government-light"
          >
            필터 초기화
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );

  // 데스크탑 화면용 필터 다이얼로그 컴포넌트임
  const PartyFilterDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "flex items-center gap-2 border-government-blue text-government-blue hover:bg-government-light",
            selectedParties.length > 0 && "bg-government-blue/10"
          )}
        >
          정당
          {selectedParties.length > 0 && (
            <Badge className="ml-2 bg-government-blue text-white">
              {selectedParties.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-government-blue">정당 선택</DialogTitle>
          <DialogDescription>원하는 정당을 선택하세요</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2 py-4">
          {parties.map((party) => (
            <Button
              key={party}
              variant={selectedParties.includes(party) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleParty(party)}
              className={cn(
                "justify-start",
                selectedParties.includes(party)
                  ? "bg-government-blue hover:bg-government-blue/90 text-white"
                  : "border-government-blue text-government-blue hover:bg-government-light"
              )}
            >
              {party}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );

  const RegionFilterDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "flex items-center gap-2 border-government-gray text-government-gray hover:bg-government-light",
            selectedRegions.length > 0 && "bg-government-gray/10"
          )}
        >
          지역구
          {selectedRegions.length > 0 && (
            <Badge className="ml-2 bg-government-gray text-white">
              {selectedRegions.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-government-gray">
            지역구 선택
          </DialogTitle>
          <DialogDescription>원하는 지역구를 선택하세요</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2 py-4">
          {regions.map((region) => (
            <Button
              key={region}
              variant={selectedRegions.includes(region) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleRegion(region)}
              className={cn(
                "justify-start",
                selectedRegions.includes(region)
                  ? "bg-government-gray hover:bg-government-gray/90 text-white"
                  : "border-government-gray text-government-gray hover:bg-government-light"
              )}
            >
              {region}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );

  const TermFilterDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "flex items-center gap-2 border-government-gold text-government-gold hover:bg-government-light",
            selectedTerms.length > 0 && "bg-government-gold/10"
          )}
        >
          대수
          <ChevronDown className="h-4 w-4" />
          {selectedTerms.length > 0 && (
            <Badge className="ml-2 bg-government-gold text-black">
              {selectedTerms.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-government-gold">대수 선택</DialogTitle>
          <DialogDescription>원하는 대수를 선택하세요</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2 py-4">
          {terms.map((term) => (
            <Button
              key={term}
              variant={selectedTerms.includes(term) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleTerm(term)}
              className={cn(
                "justify-start",
                selectedTerms.includes(term)
                  ? "bg-government-gold hover:bg-government-gold/90 text-black"
                  : "border-government-gold text-government-gold hover:bg-government-light"
              )}
            >
              {term}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row gap-2 justify-center">
          {isMobile ? (
            <MobileFilters />
          ) : (
            <div className="flex items-center gap-2">
              <PartyFilterDialog />
              <RegionFilterDialog />
              <TermFilterDialog />
            </div>
          )}
        </div>
        {(selectedParties.length > 0 ||
          selectedRegions.length > 0 ||
          selectedTerms.length > 0) && (
          <div className="flex justify-center mt-2">
            <FilterBadges />
          </div>
        )}
      </div>
    </div>
  );
}
