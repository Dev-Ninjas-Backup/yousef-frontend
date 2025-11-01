import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Info, Sparkles } from "lucide-react";

const CurrentPlanCard = () => {
  return (
    <div className="border rounded-xl bg-white overflow-hidden w-[320px] md:w-full">
      <Card className="bg-blue-600 text-white border-0 shadow-none rounded-b-none">
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-semibold text-lg sm:text-xl">Current Plan</h3>
            </div>
            <Badge className="bg-white text-blue-600 hover:bg-white w-fit">
              Trial Active
            </Badge>
          </div>

          <p className="text-sm">You're on a Free Trial</p>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Trial Progress</span>
              <span>65 days remaining</span>
            </div>
            <Progress value={70} className="bg-blue-800 [&>div]:bg-[#2ECC71] [&>div]:rounded-full" />
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <p className="text-sm flex flex-col gap-2">
              Trial ends on{" "}
              <span className="font-semibold text-xl">January 1, 2026</span>
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 gap-2 w-full sm:w-auto">
              <CreditCard className="w-4 h-4" />
              Upgrade Now
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-blue-50 mt-5 border-blue-200 shadow-none rounded-t-none border-t-0">
        <CardContent className="p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm text-blue-900">
              After your trial ends, your subscription will automatically
              convert to a paid plan.
            </p>
            <p className="text-sm text-blue-900">
              Add a payment method now to ensure uninterrupted service.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentPlanCard;
