"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { overView } from "@/store/api/garageAdminApis/dashboard/overview";
import { Eye, MessageSquare, TrendingUp } from "lucide-react";
import { PerformanceSummarySkeleton } from "./loadings/PerformanceSummarySkeleton";

export function PerformanceSummary() {
  const { data, isLoading } = overView.useGetPerformanceSummaryQuery();
  const stats = [
    { icon: Eye, label: "Total Views", value: data?.totalViews },
    {
      icon: MessageSquare,
      label: "This Month Inquiries",
      value: data?.monthlyInquiries,
    },
    {
      icon: TrendingUp,
      label: "Conversion Rate",
      value: data?.conversationRate,
    },
  ];
  if (isLoading) {
    return <PerformanceSummarySkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Performance Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between py-1"
          >
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
