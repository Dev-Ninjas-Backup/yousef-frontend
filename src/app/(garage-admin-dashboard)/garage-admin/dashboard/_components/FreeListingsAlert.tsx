import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Package } from "lucide-react";

export function FreeListingsAlert() {
  const used = 1;
  const total = 2;
  const remaining = total - used;
  const progress = (used / total) * 100;

  return (
    <Card className="p-6 bg-blue-50 border-blue-200">
      <div className="flex items-start gap-4">
        <div className="bg-blue-600 p-3 rounded-lg">
          <Package className="w-6 h-6 text-blue-100" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">
            Free Listings Available
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            You have{" "}
            <span className="font-semibold text-blue-700">
              {used} out of {total} free listings
            </span>{" "}
            remaining. After that, a fee of 20 AED will apply per listing.
          </p>
          <Progress value={progress} className="h-2 bg-blue-100 [&>div]:bg-blue-600" />
        </div>
      </div>
    </Card>
  );
}
