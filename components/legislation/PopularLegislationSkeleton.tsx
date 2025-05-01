import { Card, CardContent } from "@/components/ui/card";

export default function PopularLegislationSkeleton() {
  return Array.from({ length: 5 }).map((_, idx) => (
    <Card key={idx} className="bg-white animate-pulse shadow-md">
      <CardContent className="p-4 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4" />
        <div className="flex justify-between">
          <div className="h-4 bg-gray-300 rounded w-1/3" />
          <div className="h-4 bg-gray-300 rounded w-1/4" />
        </div>
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-4">
            <div className="h-4 w-8 bg-gray-300 rounded" />
            <div className="h-4 w-8 bg-gray-300 rounded" />
          </div>
          <div className="h-8 w-24 bg-gray-300 rounded" />
        </div>
      </CardContent>
    </Card>
  ));
}
