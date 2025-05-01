import { Card, CardContent } from "../ui/card";

export default function LegislationDetailSkeleton() {
  return (
    <Card className="bg-white shadow-xl mb-6 rounded-xl overflow-hidden border-none animate-pulse">
      <CardContent className="p-6 space-y-6">
        <div className="h-6 bg-gray-300 rounded w-1/4" />
        <div className="h-8 bg-gray-400 rounded w-2/3" />
        <div className="flex items-center gap-4">
          <div className="h-4 w-12 bg-gray-300 rounded" />
          <div className="h-4 w-12 bg-gray-300 rounded" />
          <div className="h-8 w-20 bg-gray-300 rounded" />
        </div>
        <div className="h-24 bg-gray-200 rounded" />
        <div className="h-6 bg-gray-300 rounded w-1/3" />
        <div className="h-32 bg-gray-100 rounded" />
      </CardContent>
    </Card>
  );
}
