import { Skeleton } from "@/components/ui/skeleton";

export default function PoliticianCardSkeletonList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-12">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div key={idx} className="border p-4 rounded-md shadow bg-white">
          <Skeleton className="w-full h-40 mb-4" />
          <Skeleton className="h-6 w-2/3 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  );
}
