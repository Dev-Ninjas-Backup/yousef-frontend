"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SubscriptionSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      console.log("Payment successful, session:", sessionId);
    }
  }, [sessionId]);

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-[#F9FAFB]">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
            <p className="text-gray-600">
              Your subscription has been activated successfully.
            </p>
          </div>

          {sessionId && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Session ID</p>
              <p className="text-sm font-mono text-gray-700 break-all">{sessionId}</p>
            </div>
          )}

          <Button 
            onClick={() => router.push("/garage-admin/subscription")}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Go to Subscription
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
