"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { authTranslations } from "@/translations/auth";

interface SignInFormProps {
  formData: {
    email: string;
    password: string;
  };
  error: string;
  isLoading: boolean;
  handleInputChange: (field: string, value: string) => void;
  handleSignIn: () => void;
  onForgotPassword: () => void;
}

export default function SignInForm({
  formData,
  error,
  isLoading,
  handleInputChange,
  handleSignIn,
  onForgotPassword,
}: SignInFormProps) {
  const { t } = useLanguage();
  const trans = t(authTranslations);

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          {trans.user.signIn.emailLabel}
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="text"
            placeholder={trans.user.signIn.emailPlaceholder}
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          {trans.user.signIn.passwordLabel}
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            type="password"
            placeholder={trans.user.signIn.passwordPlaceholder}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onForgotPassword}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {trans.user.signIn.forgotPassword}
        </button>
      </div>

      <Button
        onClick={handleSignIn}
        disabled={isLoading || !formData.email || !formData.password}
        className="w-full bg-black hover:bg-gray-800 text-white h-11 font-medium disabled:opacity-50"
      >
        {isLoading ? trans.user.signIn.signingIn : trans.user.signIn.signInButton}
      </Button>
    </div>
  );
}
