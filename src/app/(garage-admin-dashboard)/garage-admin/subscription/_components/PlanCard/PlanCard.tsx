"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateMonthlySubscriptionMutation } from "@/store/api/garageAdminApis/subscription/subscription";
import { CircleCheckBig, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { openPaymentInNewTab } from "@/utils/paymentUtils";

const PlanCard = () => {
  const [createSubscription, { isLoading }] =
    useCreateMonthlySubscriptionMutation();

  const handleSubscribe = async () => {
    try {
      const response = await createSubscription().unwrap();
      console.log(response, "stripe response............");
      openPaymentInNewTab(response.url);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create subscription");
    }
  };
  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl border w-full">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1">
          Choose Your Plan
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Select a billing cycle that works for you
        </p>
      </div>
      <div className="flex flex-col items-center w-full">
        <Card className="border-2 shadow-none w-full border-gray-200 hover:border-blue-600 transition-colors">
          <CardContent className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                  Monthly
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Billed every month
                </p>
              </div>
              <CircleCheckBig className="w-5 h-5 text-green-600 flex-shrink-0" />
            </div>

            <div className="flex items-baseline gap-1 sm:gap-2">
              <span className="text-xs sm:text-sm text-gray-600">AED</span>
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                100
              </span>
              <span className="text-xs sm:text-sm text-gray-600">/month</span>
            </div>

            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CircleCheckBig className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                <span>All premium features</span>
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CircleCheckBig className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                <span>Unlimited listings</span>
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CircleCheckBig className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CircleCheckBig className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                <span>Cancel anytime</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Button
          onClick={handleSubscribe}
          className="w-full text-white bg-blue-600 hover:bg-blue-700 gap-2 mt-4 sm:mt-6 h-10 sm:h-11 md:h-12 text-xs sm:text-sm md:text-base font-medium"
        >
          <CreditCard className="w-4 h-4" />{" "}
          <span className="line-clamp-1">
            {isLoading ? "Processing..." : "Activate Monthly Plan - AED 100"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default PlanCard;
