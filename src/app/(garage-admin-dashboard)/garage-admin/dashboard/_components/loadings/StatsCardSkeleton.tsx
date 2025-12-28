import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function StatsCardSkeletonItem() {
  return (
    <Card className={`p-6 relative overflow-hidden`}>
      <div className="flex items-start justify-between">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <Skeleton className="w-5 h-5 rounded" />
      </div>
      <div className="mt-4">
        <Skeleton className="h-9 w-20 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
    </Card>
  );
}

interface StatsCardSkeletonGroupProps {
  count?: number;
  colors?: string[];
}

export function StatsCardSkeleton({ count = 3 }: StatsCardSkeletonGroupProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <StatsCardSkeletonItem key={index} />
      ))}
    </>
  );
}
