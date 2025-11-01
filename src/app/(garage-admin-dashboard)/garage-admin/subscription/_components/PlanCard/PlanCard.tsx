import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleCheckBig, CreditCard } from "lucide-react";

const PlanCard = () => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
          Choose Your Plan
        </h2>
        <p className="text-sm text-gray-500">
          Select a billing cycle that works for you
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Card className="border-2 shadow-none w-full max-w-[450px] border-gray-200 hover:border-blue-600 transition-colors">
          <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Monthly</h3>
                <p className="text-sm text-gray-500">Billed every month</p>
              </div>
             <CircleCheckBig className="w-5 h-5 text-green-600 shrink-0" />
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-sm text-gray-600">AED</span>
              <span className="text-4xl sm:text-5xl font-bold text-gray-900">100</span>
              <span className="text-sm text-gray-600">/month</span>
            </div>

            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <CircleCheckBig className="w-5 h-5 text-green-600 shrink-0" />
                All premium features
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <CircleCheckBig className="w-5 h-5 text-green-600 shrink-0" />
                Unlimited listings
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <CircleCheckBig className="w-5 h-5 text-green-600 shrink-0" />
                Priority support
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <CircleCheckBig className="w-5 h-5 text-green-600 shrink-0" />
                Cancel anytime
              </li>
            </ul>
          </CardContent>
        </Card>

        <Button className="w-full text-white max-w-[450px] bg-blue-600 hover:bg-blue-700 gap-2 mt-4 sm:mt-6 h-11 sm:h-12 text-sm sm:text-base font-medium">
          <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
          Activate Monthly Plan - AED 100
        </Button>
      </div>
    </div>
  );
};

export default PlanCard;
