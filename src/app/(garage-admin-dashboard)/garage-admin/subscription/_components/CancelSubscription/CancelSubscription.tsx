"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useCancelSubscriptionMutation, useGetCurrentPlanQuery } from "@/store/api/garageAdminApis/subscription/subscription";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CancelSubscription = () => {
  const { data } = useGetCurrentPlanQuery();
  const [cancelSubscription, { isLoading }] = useCancelSubscriptionMutation();
  const [showDialog, setShowDialog] = useState(false);

  const handleCancel = async () => {
    try {
      const response = await cancelSubscription().unwrap();
      toast.success(response.message);
      setShowDialog(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel subscription");
    }
  };

  return (
    <>
      <Card className="border-red-200 bg-white w-full">
        <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
          <div className="bg-[#FFE2E2] p-2.5 sm:p-3 rounded-2xl flex-shrink-0">
            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 mb-1 sm:mb-2">
              Cancel Plan
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
              If you cancel, you'll continue to have access until the end of
              your billing period. You can reactivate anytime before it expires.
            </p>
            {data?.subscriptionCancelAtPeriodEnd ? (
              <Button
                disabled
                variant="outline"
                className="border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed w-full sm:w-auto text-xs sm:text-sm font-semibold"
              >
                Plan Cancelled
              </Button>
            ) : (
              <Button
                onClick={() => setShowDialog(true)}
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50 w-full sm:w-auto text-xs sm:text-sm"
              >
                Cancel Plan
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Cancel Plan?
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your plan? You'll lose
              access to premium features at the end of your billing period.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Keep Plan
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={isLoading}
            >
              {isLoading ? "Cancelling..." : "Yes, Cancel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CancelSubscription;
