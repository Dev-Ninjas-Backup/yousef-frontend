import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Settings, MessageSquare } from "lucide-react";

export function QuickActions() {
  const actions = [
    { icon: Plus, label: "Add New Garage" },
    { icon: Settings, label: "Manage Listings" },
    { icon: MessageSquare, label: "View Inquiries" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action) => (
          <button
            key={action.label}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <action.icon className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">{action.label}</span>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
