import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const BillingSettings = () => {
  return (
    <div className="space-y-4 border bg-white p-6 rounded-xl">
      <h3 className="font-semibold text-gray-900">Billing Settings</h3>

      <Card className="border-none shadow-none p-0 mt-6">
        <CardContent className="p-0 shadow-none space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Auto-renewal</p>
              <p className="text-sm text-gray-500">Automatically renew subscription at the end of each period</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email notifications</p>
                <p className="text-sm text-gray-500">Receive billing and payment notifications via email</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Billing email</p>
                <p className="text-sm text-gray-500">info@premiumautoparts.ae</p>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSettings;
