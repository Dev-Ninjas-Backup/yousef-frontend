import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag, Package as PackageIcon, ShoppingCart, MessageSquare } from "lucide-react";

export function FrequentActions() {
  const actions = [
    { icon: Tag, label: "Create Promo Ad" },
    { icon: PackageIcon, label: "Add Spare Part" },
    { icon: ShoppingCart, label: "View Orders" },
    { icon: MessageSquare, label: "Check Messages" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
        <p className="text-sm text-gray-500">Frequently used features</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              className="flex items-center gap-2 px-4 py-2.5 text-sm border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <action.icon className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
