import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const BillingSettings = () => {
  return (
    <div className="space-y-4 border bg-white p-4 sm:p-6 rounded-xl">
      <h3 className="font-semibold text-gray-900">Billing Settings</h3>

      <Card className="border-none shadow-none p-0 mt-4 sm:mt-6">
        <CardContent className="p-0 shadow-none space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1">
              <p className="font-medium text-gray-900">Auto-renewal</p>
              <p className="text-sm text-gray-500">Automatically renew subscription at the end of each period</p>
            </div>
            <Switch defaultChecked className="self-start sm:self-center" />
          </div>

          <div className="border-t pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1">
                <p className="font-medium text-gray-900">Email notifications</p>
                <p className="text-sm text-gray-500">Receive billing and payment notifications via email</p>
              </div>
              <Switch defaultChecked className="self-start sm:self-center" />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1">
                <p className="font-medium text-gray-900">Billing email</p>
                <p className="text-sm text-gray-500 break-all">info@premiumautoparts.ae</p>
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">Change</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSettings;
