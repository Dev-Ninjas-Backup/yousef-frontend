"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Info } from "lucide-react";
import { subscriptionApi } from "@/store/api/garageAdminApis/subscription/subscription";
import Link from "next/link";

export function SubscriptionAlert() {
  const { data, isLoading } = subscriptionApi.useGetCurrentPlanQuery();

  if (isLoading || !data) return null;

  const planType = data.planType;
  const isPaid = planType === "PAID";
  const isTrial = planType === "TRIAL";
  const hasNoPlan = planType === "NONE" || !planType;

  const calculateProgress = () => {
    if (!data?.startDate || !data?.endDate) return 0;
    const start = new Date(data.startDate).getTime();
    const end = new Date(data.endDate).getTime();
    const now = new Date().getTime();
    const totalDuration = end - start;
    const elapsed = now - start;
    return Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
  };

  // Define themes depending on plan state
  let theme = {
    card: "bg-yellow-50 border-yellow-200",
    iconContainer: "bg-yellow-600",
    textHighlight: "text-yellow-600",
    button: "border-yellow-600 text-yellow-700 hover:bg-yellow-100",
    progress: "bg-blue-100 [&>div]:bg-blue-600",
  };

  if (isPaid) {
    theme = {
      card: "bg-indigo-50 border-indigo-200",
      iconContainer: "bg-indigo-600",
      textHighlight: "text-indigo-600",
      button: "border-indigo-600 text-indigo-700 hover:bg-indigo-50",
      progress: "bg-indigo-100 [&>div]:bg-indigo-600",
    };
  } else if (hasNoPlan) {
    theme = {
      card: "bg-red-50 border-red-200",
      iconContainer: "bg-red-600",
      textHighlight: "text-red-600",
      button: "border-red-600 text-red-700 hover:bg-red-50",
      progress: "bg-red-100 [&>div]:bg-red-600",
    };
  }

  return (
    <Card className={`p-6 border ${theme.card}`}>
      <div className="flex items-start gap-4">
        <div className={`${theme.iconContainer} p-3 rounded-lg`}>
          <CreditCard className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-900">
              Platform Plans & Billing Status
            </h3>
            <Info className="w-4 h-4 text-gray-400" />
          </div>

          <div className="text-sm text-gray-700 mb-1">
            {hasNoPlan ? (
              <span>
                You currently do not have an active{" "}
                <span className={`font-semibold ${theme.textHighlight}`}>
                  subscription or trial
                </span>.
              </span>
            ) : (
              <span>
                You are currently enjoying a{" "}
                <span className={`font-semibold ${theme.textHighlight}`}>
                  {isPaid ? "subscription" : "free trial"}
                </span>{" "}
                of the platform.
              </span>
            )}
          </div>

          <p className="text-xs text-gray-600 mb-3">{data.message}</p>

          {!hasNoPlan && data.planType && (
            <div className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">
                  {isPaid ? "Subscription Progress" : "Trial Progress"}
                </span>
                <span className={`font-semibold ${theme.textHighlight}`}>
                  {data.daysRemaining} days remaining
                </span>
              </div>
              <Progress
                value={calculateProgress()}
                className={`h-2 ${theme.progress}`}
              />
            </div>
          )}

          <p className="text-xs text-gray-600 mb-4">
            {isPaid
              ? "Your subscription will automatically renew or end on the expiration date. Keep your billing active to continue receiving bookings, messages, and sales inquiries."
              : hasNoPlan
              ? "Please select and activate a platform plan to publish products, view analytics, and manage inquiries."
              : "You'll be notified before your free period expires. Keep your billing active to continue receiving bookings, messages, and sales inquiries."}
          </p>

          <Link href="/garage-admin/subscription">
            <Button
              variant="outline"
              size="sm"
              className={theme.button}
            >
              <CreditCard className="w-4 h-4" />
              Manage Plans & Billing
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
