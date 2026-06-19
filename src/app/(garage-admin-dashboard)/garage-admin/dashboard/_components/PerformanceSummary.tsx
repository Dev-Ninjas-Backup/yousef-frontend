"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { overView } from "@/store/api/garageAdminApis/dashboard/overview";
import { Eye, MessageSquare, TrendingUp, Info } from "lucide-react";
import { PerformanceSummarySkeleton } from "./loadings/PerformanceSummarySkeleton";

interface PerformanceSummaryProps {
  garageId?: string;
}

export function PerformanceSummary({ garageId }: PerformanceSummaryProps) {
  const { data, isLoading } = overView.useGetPerformanceSummaryQuery(garageId);
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
            <div className="flex items-center gap-2 relative group">
              <stat.icon className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{stat.label}</span>
              {stat.label === "Conversion Rate" && (
                <div className="relative flex items-center">
                  <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 leading-relaxed font-normal normal-case">
                    Inquiry Message response rate: percentage of received inquiry messages that are opened or read by you within the last 30 days (Read Messages / Total Received Messages).
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
                  </div>
                </div>
              )}
            </div>
            <span className="font-semibold text-gray-900">{stat.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
