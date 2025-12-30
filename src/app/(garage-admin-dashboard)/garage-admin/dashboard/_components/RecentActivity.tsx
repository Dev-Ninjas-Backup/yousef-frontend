"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { overView } from "@/store/api/garageAdminApis/dashboard/overview";
import { CheckCircle, Clock, Package } from "lucide-react";

export function RecentActivity() {
  const { data, isLoading } = overView.useGetRecentActivityQuery();

  const getStatusConfig = (status: string) => {
    switch (status.toUpperCase()) {
      case "APPROVED":
        return {
          icon: CheckCircle,
          iconColor: "text-green-600",
          bgColor: "bg-green-50",
          label: "Approved",
        };
      case "PENDING":
        return {
          icon: Clock,
          iconColor: "text-yellow-600",
          bgColor: "bg-yellow-50",
          label: "Pending",
        };
      case "REJECTED":
        return {
          icon: Clock,
          iconColor: "text-red-600",
          bgColor: "bg-red-50",
          label: "Rejected",
        };
      default:
        return {
          icon: Package,
          iconColor: "text-gray-600",
          bgColor: "bg-gray-50",
          label: status,
        };
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60)
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    if (diffInDays < 7)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Spinner />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Recent Activity
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Latest updates and notifications
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 text-center py-8">
            No recent activity
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Recent Activity
        </CardTitle>
        <p className="text-sm text-gray-500 mt-1">
          Latest updates and notifications
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.map((activity) => {
          const statusConfig = getStatusConfig(activity.status);
          const IconComponent = statusConfig.icon;

          return (
            <div
              key={activity.id}
              className={`p-4 rounded-lg ${statusConfig.bgColor} border border-transparent hover:border-gray-200 transition-colors`}
            >
              <div className="flex items-start gap-3">
                <IconComponent
                  className={`w-5 h-5 ${statusConfig.iconColor} flex-shrink-0 mt-0.5`}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">
                    Part Request: {activity.partName}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Status:{" "}
                    <span className="font-medium">{statusConfig.label}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {formatTimeAgo(activity.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
