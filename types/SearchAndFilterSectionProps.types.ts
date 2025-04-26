import { Dispatch, SetStateAction } from "react";

export interface SearchAndFilterSectionProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedParties: string[];
  setSelectedParties: Dispatch<SetStateAction<string[]>>;
  selectedRegions: string[];
  setSelectedRegions: Dispatch<SetStateAction<string[]>>;
  selectedTerms: string[];
  setSelectedTerms: Dispatch<SetStateAction<string[]>>;
}

export interface FilterSectionProps {
  selectedParties: string[];
  setSelectedParties: Dispatch<SetStateAction<string[]>>;
  selectedRegions: string[];
  setSelectedRegions: Dispatch<SetStateAction<string[]>>;
  selectedTerms: string[];
  setSelectedTerms: Dispatch<SetStateAction<string[]>>;
}
