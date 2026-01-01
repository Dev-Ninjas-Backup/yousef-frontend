import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

interface ResetPasswordFormProps {
  forgotEmail: string;
  otp: string;
  setOtp: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  confirmNewPassword: string;
  setConfirmNewPassword: (value: string) => void;
  error: string;
  isResetLoading: boolean;
  handleResetPassword: () => void;
  onBack: () => void;
}

export default function ResetPasswordForm({
  forgotEmail,
  otp,
  setOtp,
  newPassword,
  setNewPassword,
  confirmNewPassword,
  setConfirmNewPassword,
  error,
  isResetLoading,
  handleResetPassword,
  onBack,
}: ResetPasswordFormProps) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Enter Reset Code & New Password
        </h3>
        <p className="text-sm text-gray-600">
          We've sent a 6-digit code to {forgotEmail}
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="resetOtp" className="text-sm font-medium text-gray-700">
          Reset Code
        </Label>
        <Input
          id="resetOtp"
          type="text"
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="text-center text-lg tracking-widest border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          maxLength={6}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
          New Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmNewPassword" className="text-sm font-medium text-gray-700">
          Confirm New Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="confirmNewPassword"
            type="password"
            placeholder="Confirm new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 h-11">
          Back
        </Button>
        <Button
          onClick={handleResetPassword}
          disabled={!otp || !newPassword || !confirmNewPassword || isResetLoading}
          className="flex-1 bg-black hover:bg-gray-800 text-white h-11 font-medium disabled:opacity-50"
        >
          {isResetLoading ? "Resetting..." : "Reset Password"}
        </Button>
      </div>
    </div>
  );
}