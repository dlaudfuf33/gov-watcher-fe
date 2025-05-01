"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DeadlineLegislationSkeleton() {
  return (
    <Card className="overflow-hidden bg-white shadow-md rounded-xl">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex items-center justify-center p-4 bg-gradient-to-br from-red-50 to-pink-50 md:w-24">
            <Skeleton className="w-14 h-8 rounded-md" />
          </div>
          <div className="flex-1 p-4 space-y-3">
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/3 rounded" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Skeleton className="h-4 w-8 rounded" />
                <Skeleton className="h-4 w-8 rounded" />
              </div>
              <Skeleton className="h-8 w-24 rounded" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
