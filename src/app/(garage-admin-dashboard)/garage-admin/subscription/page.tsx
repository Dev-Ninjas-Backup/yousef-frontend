"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import CurrentPlanCard from "./_components/CurrentPlanCard/CurrentPlanCard";
import PlanCard from "./_components/PlanCard/PlanCard";
import PaymentMethodCard from "./_components/PaymentMethodCard/PaymentMethodCard";
import BillingSettings from "./_components/BillingSettings/BillingSettings";
import TransactionHistory from "./_components/TransactionHistory/TransactionHistory";
import CancelSubscription from "./_components/CancelSubscription/CancelSubscription";

export default function SubscriptionPage() {
  return (
    <div className="space-y-6 bg-[#F9FAFB] p-6 rounded-2xl">
      <CurrentPlanCard />

   
{/* 
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">Choose Your Plan</h3>
        <p className="text-sm text-gray-500 mb-4">Select a billing cycle that works for you</p>
        </div> */}
        <PlanCard />

      <PaymentMethodCard />

      <BillingSettings />

      <TransactionHistory />

      <CancelSubscription />
    </div>
  );
}
