export interface CategoryStat {
  total: number;
  categories: Category[];
}

export interface Category {
  label: string;
  value: number;
}
