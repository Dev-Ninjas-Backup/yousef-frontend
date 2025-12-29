import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const BillingSettings = () => {
  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 border bg-white p-3 sm:p-4 md:p-6 rounded-xl w-full">
      <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900">Billing Settings</h3>

      <Card className="border-none shadow-none p-0 mt-0">
        <CardContent className="p-0 shadow-none space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex-1">
              <p className="font-medium text-xs sm:text-sm md:text-base text-gray-900">Auto-renewal</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Automatically renew subscription at the end of each period</p>
            </div>
            <Switch defaultChecked className="self-start sm:self-center flex-shrink-0" />
          </div>

          <div className="border-t pt-4 sm:pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="flex-1">
                <p className="font-medium text-xs sm:text-sm md:text-base text-gray-900">Email notifications</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Receive billing and payment notifications via email</p>
              </div>
              <Switch defaultChecked className="self-start sm:self-center flex-shrink-0" />
            </div>
          </div>

          <div className="border-t pt-4 sm:pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-xs sm:text-sm md:text-base text-gray-900">Billing email</p>
                <p className="text-xs sm:text-sm text-gray-500 break-all mt-1">info@premiumautoparts.ae</p>
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs sm:text-sm flex-shrink-0">Change</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSettings;
