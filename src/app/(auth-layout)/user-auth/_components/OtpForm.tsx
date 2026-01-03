import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLanguage, t } from "@/components/GoogleTranslationAPI";

interface OtpFormProps {
  email: string;
  otp: string;
  setOtp: (value: string) => void;
  error: string;
  isVerifying: boolean;
  handleVerifyOtp: () => void;
  onBack: () => void;
}

export default function OtpForm({
  email,
  otp,
  setOtp,
  error,
  isVerifying,
  handleVerifyOtp,
  onBack,
}: OtpFormProps) {
  const lang = useLanguage();

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t('Verify Your Email', lang)}
        </h3>
        <p className="text-sm text-gray-600">
          {t("We've sent a 6-digit code to", lang)} {email}
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
          {t('Enter OTP', lang)}
        </Label>
        <Input
          id="otp"
          type="text"
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="text-center text-lg tracking-widest border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          maxLength={6}
        />
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 h-11">
          {t('Back', lang)}
        </Button>
        <Button
          onClick={handleVerifyOtp}
          disabled={!otp || otp.length !== 6 || isVerifying}
          className="flex-1 bg-black hover:bg-gray-800 text-white h-11 font-medium disabled:opacity-50"
        >
          {isVerifying ? t('Verifying...', lang) : t('Verify OTP', lang)}
        </Button>
      </div>
    </div>
  );
}