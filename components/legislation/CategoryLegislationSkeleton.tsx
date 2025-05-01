import { Card, CardContent } from "@/components/ui/card";

export default function CategoryLegislationSkeleton() {
  return (
    <Card className="bg-white animate-pulse shadow-md rounded-lg overflow-hidden">
      <CardContent className="p-4 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-2/3" />
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/6" />
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-4">
            <div className="h-4 w-8 bg-gray-200 rounded" />
            <div className="h-4 w-8 bg-gray-200 rounded" />
          </div>
          <div className="h-8 w-24 bg-gray-200 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
