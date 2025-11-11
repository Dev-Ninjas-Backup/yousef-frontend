import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, MessageSquare, TrendingUp } from "lucide-react";

export function PerformanceSummary() {
  const stats = [
    { icon: Eye, label: "Total Views", value: "342" },
    { icon: MessageSquare, label: "This Month Inquiries", value: "8" },
    { icon: TrendingUp, label: "Conversion Rate", value: "23%" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Performance Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <stat.icon className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{stat.label}</span>
            </div>
            <span className="font-semibold text-gray-900">{stat.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
