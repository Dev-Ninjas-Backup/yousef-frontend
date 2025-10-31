"use client";

import CurrentPlanCard from "./_components/CurrentPlanCard/CurrentPlanCard";
import PlanCard from "./_components/PlanCard/PlanCard";
import PaymentMethodCard from "./_components/PaymentMethodCard/PaymentMethodCard";
import BillingSettings from "./_components/BillingSettings/BillingSettings";
import TransactionHistory from "./_components/TransactionHistory/TransactionHistory";
import CancelSubscription from "./_components/CancelSubscription/CancelSubscription";

export default function SubscriptionPage() {
  return (
    <div className="space-y-4 sm:space-y-6 bg-[#F9FAFB] p-4 sm:p-6 rounded-2xl">
      <CurrentPlanCard />
      <PlanCard />
      <PaymentMethodCard />
      <BillingSettings />
      <TransactionHistory />
      <CancelSubscription />
    </div>
  );
}
