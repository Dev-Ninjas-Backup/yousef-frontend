import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      title: "Promotional ad approved",
      description: 'Your "Brake Service Special" ad has been approved and is now live',
      time: "2 hours ago",
      icon: CheckCircle,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: 2,
      title: "Promotional ad pending",
      description: 'Your "Tire Service Package" ad is awaiting admin approval',
      time: "1 day ago",
      icon: Clock,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
        <p className="text-sm text-gray-500 mt-1">Latest updates and notifications</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className={`p-4 rounded-lg ${activity.bgColor} border border-transparent`}>
            <div className="flex items-start gap-3">
              <activity.icon className={`w-5 h-5 ${activity.iconColor} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">{activity.title}</p>
                <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
