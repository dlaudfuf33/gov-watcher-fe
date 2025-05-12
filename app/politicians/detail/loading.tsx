import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Skeleton className="h-10 w-32" />
      </div>

      {/* 상단 프로필 섹션 스켈레톤 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 프로필 이미지 스켈레톤 */}
          <div className="md:w-1/4 flex flex-col items-center">
            <Skeleton className="w-48 h-48 rounded-full mb-4" />
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-8 w-32 mb-1" />
            <Skeleton className="h-4 w-40 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* 기본 정보 요약 스켈레톤 */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </div>

            {/* 연락처 및 SNS 요약 스켈레톤 */}
            <div className="mt-4 flex flex-wrap gap-3">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* 탭 스켈레톤 */}
      <Skeleton className="h-12 w-full mb-6" />

      {/* 콘텐츠 스켈레톤 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </div>
  );
}
