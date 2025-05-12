import { Card, CardContent } from "@/components/ui/card";

export default function DeadlineSkeletonCard() {
  return (
    <Card className="overflow-hidden shadow-md animate-pulse">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex items-center justify-center p-4 bg-blue-50 md:w-24">
            <div className="w-12 h-8 bg-gray-300 rounded-md" />
          </div>
          <div className="flex-1 p-4 space-y-3">
            <div className="h-6 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-300 rounded w-1/3" />
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-gray-300 rounded" />
              <div className="h-8 w-24 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
