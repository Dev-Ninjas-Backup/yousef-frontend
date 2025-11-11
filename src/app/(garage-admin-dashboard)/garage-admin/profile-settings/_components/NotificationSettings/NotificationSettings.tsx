import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const NotificationSettings = () => {
  return (
    <Card className="shadow-none">
      <CardContent className="p-6 space-y-4">
        <h3 className="font-semibold text-gray-900">Notification Settings</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-500">
                Receive notifications via email
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="border-t border-gray-200" />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                Customer Inquiry Alerts
              </p>
              <p className="text-sm text-gray-500">
                Get notified of new inquiries
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="border-t border-gray-200" />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                Product Approval Updates
              </p>
              <p className="text-sm text-gray-500">
                Updates on listing approvals
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
