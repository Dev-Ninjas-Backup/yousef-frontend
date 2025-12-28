"use client";

import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentCancel() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-[#F9FAFB]">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-red-100 p-4 rounded-full">
              <XCircle className="w-16 h-16 text-red-600" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Payment Cancelled</h1>
            <p className="text-gray-600">
              You cancelled the payment process. No charges were made.
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => router.push("/garage-admin/subscription")}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Back to Subscription
            </Button>
            <Button 
              onClick={() => router.back()}
              variant="outline"
              className="w-full"
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
