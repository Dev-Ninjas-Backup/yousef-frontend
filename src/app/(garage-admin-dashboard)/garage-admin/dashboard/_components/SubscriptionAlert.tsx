import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Info } from "lucide-react";

export function SubscriptionAlert() {
  const daysRemaining = 86;
  const totalDays = 365;
  const progress = ((totalDays - daysRemaining) / totalDays) * 100;

  return (
    <Card className="p-6 bg-yellow-50 border-yellow-200">
      <div className="flex items-start gap-4">
        <div className="bg-yellow-600 p-3 rounded-lg">
          <CreditCard className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-900">
              Platform Subscription Status
            </h3>
            <Info className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-sm text-gray-700 mb-1">
            You are currently enjoying a{" "}
            <span className="font-semibold text-yellow-600">
              3-month free trial
            </span>{" "}
            of the platform.
          </p>
          <p className="text-xs text-gray-600 mb-3">
            After the trial period ends, a monthly subscription fee of{" "}
            <span className="font-semibold text-yellow-600">AED 100</span> will
            be required to continue accessing all premium features and listing
            your garage on the platform.
          </p>
          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Trial Progress</span>
              <span className="font-semibold text-yellow-600">
                {daysRemaining} days remaining
              </span>
            </div>
            <Progress
              value={progress}
              className="h-2 bg-blue-100 [&>div]:bg-blue-600"
            />
          </div>
          <p className="text-xs text-gray-600 mb-4">
            You'll be notified before your free period expires. Keep your
            subscription active to continue receiving bookings, messages, and
            sales inquiries.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="border-yellow-600 text-yellow-700 hover:bg-yellow-100"
          >
            <CreditCard className="w-4 h-4" />
            Manage Subscription
          </Button>
        </div>
      </div>
    </Card>
  );
}
