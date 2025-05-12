import { Skeleton } from "@/components/ui/skeleton";

export default function PoliticianCardSkeletonList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-12">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="border-2 border-gray-200 overflow-hidden rounded-lg bg-white hover:shadow-md transition"
        >
          {/* 프로필 이미지 자리 */}
          <div className="relative h-60 w-full bg-gray-100">
            <Skeleton className="absolute inset-0 w-full h-full animate-pulse" />
          </div>

          {/* 카드 본문 */}
          <div className="p-4 space-y-3">
            {/* 이름 + 정당 배지 */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            {/* 지역구, 직책/대수 */}
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />

            {/* 최근 발의법안 수 */}
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="p-4 pt-0">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
