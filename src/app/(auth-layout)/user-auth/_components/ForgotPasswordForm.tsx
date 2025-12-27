import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

interface ForgotPasswordFormProps {
  forgotEmail: string;
  setForgotEmail: (value: string) => void;
  error: string;
  isForgotLoading: boolean;
  handleForgotPassword: () => void;
  onBack: () => void;
}

export default function ForgotPasswordForm({
  forgotEmail,
  setForgotEmail,
  error,
  isForgotLoading,
  handleForgotPassword,
  onBack,
}: ForgotPasswordFormProps) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Reset Your Password
        </h3>
        <p className="text-sm text-gray-600">
          Enter your email address and we'll send you a reset code
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="forgotEmail" className="text-sm font-medium text-gray-700">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="forgotEmail"
            type="email"
            placeholder="Enter your email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 h-11">
          Back
        </Button>
        <Button
          onClick={handleForgotPassword}
          disabled={!forgotEmail || isForgotLoading}
          className="flex-1 bg-black hover:bg-gray-800 text-white h-11 font-medium disabled:opacity-50"
        >
          {isForgotLoading ? "Sending..." : "Send Reset Code"}
        </Button>
      </div>
    </div>
  );
}