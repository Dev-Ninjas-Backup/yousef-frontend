import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PerformanceSummarySkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Performance Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-1"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}