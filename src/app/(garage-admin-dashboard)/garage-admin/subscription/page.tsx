"use client";

import { useState, useEffect } from "react";
import { useGetUserProfileQuery } from "@/store/api/garageAdminApis/userProfileApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import CurrentPlanCard from "./_components/CurrentPlanCard/CurrentPlanCard";
import PlanCard from "./_components/PlanCard/PlanCard";
import CancelSubscription from "./_components/CancelSubscription/CancelSubscription";

export default function SubscriptionPage() {
  const { data: profileResponse, isLoading: profileLoading } = useGetUserProfileQuery();
  const garages = profileResponse?.data?.garages || [];
  const [selectedGarageId, setSelectedGarageId] = useState<string>("");

  useEffect(() => {
    if (garages.length > 0 && !selectedGarageId) {
      setSelectedGarageId(garages[0].id);
    }
  }, [garages, selectedGarageId]);

  if (profileLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (garages.length === 0) {
    return (
      <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm text-center space-y-4">
        <p className="text-slate-500">You need to create a garage before managing subscriptions.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:p-6 bg-[#F9FAFB] rounded-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Garage Subscription</h2>
          <p className="text-sm text-slate-500">Manage subscriptions for your garages individually.</p>
        </div>
        <div className="w-full sm:w-64">
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">Select Garage</label>
          <Select value={selectedGarageId} onValueChange={setSelectedGarageId}>
            <SelectTrigger className="bg-white border-slate-200 shadow-sm rounded-xl focus:ring-blue-500">
              <SelectValue placeholder="Select Garage" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {garages.map((garage: any) => (
                <SelectItem key={garage.id} value={garage.id} className="cursor-pointer">
                  {garage.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <CurrentPlanCard garageId={selectedGarageId} />
      <PlanCard garageId={selectedGarageId} />
      <CancelSubscription garageId={selectedGarageId} />
    </div>
  );
}
