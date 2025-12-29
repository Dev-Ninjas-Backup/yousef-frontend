"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Check } from "lucide-react";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PaymentDialog({
  open,
  onOpenChange,
}: PaymentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle className="sr-only">Complete Payment</DialogTitle>
        <div className="text-center py-6">
          <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CreditCard className="h-10 w-10 text-blue-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Complete Payment
          </h2>
          <p className="text-gray-600 mb-8">
            One-time platform registration fee
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700">Listing Fee</span>
              <span className="text-2xl font-bold text-gray-900">AED 20</span>
            </div>
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="h-4 w-4 text-green-600" />
                <span>Lifetime platform access</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="h-4 w-4 text-green-600" />
                <span>Dashboard & analytics</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-left">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" className="mt-2" />
              </div>
            </div>

            <div>
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="Name on card"
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Back
            </Button>
            <Button className="flex-1 bg-gray-900 hover:bg-gray-800">
              Pay AED 20
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
