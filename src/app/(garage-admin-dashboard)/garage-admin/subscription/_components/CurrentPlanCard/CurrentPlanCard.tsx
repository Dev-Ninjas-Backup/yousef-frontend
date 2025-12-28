import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Info, Sparkles } from "lucide-react";
import { subscriptionApi } from "@/store/api/garageAdminApis/subscription/subscription";

const CurrentPlanCard = () => {
  const { data, isLoading } = subscriptionApi.useGetCurrentPlanQuery();
  const calculateProgress = () => {
    if (!data?.startDate || !data?.endDate) return 0;

    const start = new Date(data.startDate).getTime();
    const end = new Date(data.endDate).getTime();
    const now = new Date().getTime();

    const totalDuration = end - start;
    const elapsed = now - start;

    return Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
  };
  return (
    <div className="border rounded-xl bg-white overflow-hidden w-full">
      <Card className="bg-blue-600 text-white border-0 shadow-none rounded-b-none">
        <CardContent className="p-3 sm:p-4 md:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 flex-shrink-0" />
              <h3 className="font-semibold text-base sm:text-lg md:text-xl">
                Current Plan
              </h3>
            </div>
            <Badge className="bg-white text-blue-600 hover:bg-white w-fit text-xs sm:text-sm">
              {data?.planType}
            </Badge>
          </div>

          <p className="text-xs sm:text-sm">{data?.message}</p>

          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 text-xs sm:text-sm">
              <span>Trial Progress</span>
              <span>{data?.daysRemaining} days remaining</span>
            </div>
            <Progress
              value={calculateProgress()}
              className="bg-blue-800 [&>div]:bg-[#2ECC71] [&>div]:rounded-full h-2"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-2">
            <p className="text-xs sm:text-sm flex flex-col gap-1">
              Trial ends on{" "}
              <span className="font-semibold text-base sm:text-lg md:text-xl">
                January 1, 2026
              </span>
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 gap-2 w-full sm:w-auto text-xs sm:text-sm">
              <CreditCard className="w-4 h-4" />
              <span>Upgrade Now</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 mt-3 sm:mt-4 md:mt-5 border-blue-200 shadow-none rounded-t-none border-t-0">
        <CardContent className="p-3 sm:p-4 md:p-6 flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 min-w-0">
            <p className="text-xs sm:text-sm text-blue-900">
              After your trial ends, your subscription will automatically
              convert to a paid plan.
            </p>
            <p className="text-xs sm:text-sm text-blue-900">
              Add a payment method now to ensure uninterrupted service.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentPlanCard;
