import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Info, Sparkles } from "lucide-react";

const CurrentPlanCard = () => {
  return (
    <div className="border rounded-xl bg-white">
      <Card className="bg-blue-600 text-white border-0">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-semibold text-xl">Current Plan</h3>
            </div>
            <Badge className="bg-white text-blue-600 hover:bg-white">
              Trial Active
            </Badge>
          </div>

          <p className="text-sm">You're on a Free Trial</p>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Trial Progress</span>
              <span>65 days remaining</span>
            </div>
            <Progress value={70} className="bg-blue-800" />
          </div>
          <div className="flex justify-between ">
            <p className="text-sm flex flex-col gap-2">
              Trial ends on{" "}
              <span className="font-semibold text-xl">January 1, 2026</span>
            </p>
            <Button className=" bg-white text-blue-600 hover:bg-gray-100 gap-2">
              <CreditCard className="w-4 h-4" />
              Upgrade Now
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
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
    </div>
  );
};

export default CurrentPlanCard;
