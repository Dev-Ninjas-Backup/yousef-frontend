"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, User, Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import loginbg from "@/assets/login/login_bg.jpg";
import scroll_logo from "@/assets/navbar/sayarahub_fill.svg";
import { useUserAuth } from "./_components/useUserAuth";
import SignInForm from "./_components/SignInForm";
import SignUpForm from "./_components/SignUpForm";
import OtpForm from "./_components/OtpForm";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";
import ResetPasswordForm from "./_components/ResetPasswordForm";
import { useLanguage } from "@/context/LanguageContext";
import { authTranslations } from "@/translations/auth";

export default function UserAuth() {
  const { t } = useLanguage();
  const trans = t(authTranslations);
  
  const {
    authMode,
    setAuthMode,
    showOtpForm,
    showForgotForm,
    showResetForm,
    formData,
    error,
    otp,
    setOtp,
    forgotEmail,
    setForgotEmail,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    isLoading,
    isRegistering,
    isVerifying,
    isGoogleLoading,
    isForgotLoading,
    isResetLoading,
    handleInputChange,
    handleTabChange,
    handleSignIn,
    handleSignUp,
    handleVerifyOtp,
    handleForgotPassword,
    handleResetPassword,
    handleGoogleLogin,
    setShowOtpForm,
    setShowForgotForm,
    setShowResetForm,
    setError,
  } = useUserAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-7xl w-full mx-auto">
        <div className="relative w-full min-h-[600px] overflow-hidden shadow-2xl pb-20">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={loginbg}
              alt="Login Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gray-200/70" />
          </div>

          {/* Header with Logo */}
          <div className="relative z-10 py-3 bg-white/95 shadow-md">
            <Link href="/">
              <Image
                src={scroll_logo}
                alt="SayaraHub"
                width={150}
                height={40}
                className="h-8 md:h-10 w-auto ml-10 md:ml-20 cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-lg">
              {/* Welcome Message */}
              <div className="w-[280px] mx-auto mb-6">
                <div className="flex items-center justify-center gap-2 mb-4 bg-blue-100 text-blue-700 rounded-full px-4 py-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {trans.common.welcomeTo}
                  </span>
                </div>
              </div>

              <div className="text-center mb-8 text-black space-y-4">
                <h2 className="font-semibold text-3xl md:text-4xl">
                  {authMode === "signin"
                    ? trans.common.signInTitle
                    : trans.common.signUpTitle}
                </h2>
                <p className="text-lg text-[#4A5565]">
                  {trans.common.subtitle}
                </p>
              </div>

              {/* User Type Tabs */}
              <div className="mb-6 w-[300px] mx-auto">
                <Tabs
                  value="car-owner"
                  onValueChange={handleTabChange}
                  className="w-full rounded-full"
                >
                  <TabsList className="grid w-full grid-cols-2 bg-white/90 backdrop-blur-sm rounded-full">
                    <TabsTrigger
                      value="car-owner"
                      className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white text-gray-700 rounded-full"
                    >
                      <User className="h-4 w-4" />
                      {trans.common.carOwner}
                    </TabsTrigger>
                    <TabsTrigger
                      value="garage-owner"
                      className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white text-gray-700 rounded-full"
                    >
                      <Store className="h-4 w-4" />
                      {trans.common.garageOwner}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Auth Form */}
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-xl">
                {/* Sign In / Sign Up Toggle */}
                <div className="flex justify-center mb-6">
                  <div className="flex gap-1 bg-gray-200 rounded-full p-1 w-full justify-between">
                    <button
                      onClick={() => setAuthMode("signin")}
                      className={`px-4 py-2 w-1/2 rounded-full text-sm font-medium transition-all ${
                        authMode === "signin"
                          ? "bg-white text-gray-700 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {trans.common.signIn}
                    </button>
                    <button
                      onClick={() => setAuthMode("signup")}
                      className={`px-4 py-2 w-1/2 rounded-full text-sm font-medium transition-all ${
                        authMode === "signup"
                          ? "bg-white text-gray-700 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {trans.common.signUp}
                    </button>
                  </div>
                </div>

                {/* Sign In Form */}
                {authMode === "signin" && !showForgotForm && !showResetForm && (
                  <SignInForm
                    formData={formData}
                    error={error}
                    isLoading={isLoading}
                    handleInputChange={handleInputChange}
                    handleSignIn={handleSignIn}
                    onForgotPassword={() => {
                      setShowForgotForm(true);
                      setError("");
                    }}
                  />
                )}

                {/* Sign Up Form */}
                {authMode === "signup" && !showOtpForm && (
                  <SignUpForm
                    formData={formData}
                    error={error}
                    isRegistering={isRegistering}
                    isGoogleLoading={isGoogleLoading}
                    handleInputChange={handleInputChange}
                    handleSignUp={handleSignUp}
                    handleGoogleLogin={handleGoogleLogin}
                  />
                )}

                {/* OTP Verification Form */}
                {showOtpForm && (
                  <OtpForm
                    email={formData.email}
                    otp={otp}
                    setOtp={setOtp}
                    error={error}
                    isVerifying={isVerifying}
                    handleVerifyOtp={handleVerifyOtp}
                    onBack={() => {
                      setShowOtpForm(false);
                      setOtp("");
                      setError("");
                    }}
                  />
                )}

                {/* Forgot Password Form */}
                {authMode === "signin" && showForgotForm && !showResetForm && (
                  <ForgotPasswordForm
                    forgotEmail={forgotEmail}
                    setForgotEmail={setForgotEmail}
                    error={error}
                    isForgotLoading={isForgotLoading}
                    handleForgotPassword={handleForgotPassword}
                    onBack={() => {
                      setShowForgotForm(false);
                      setForgotEmail("");
                      setError("");
                    }}
                  />
                )}

                {/* Reset Password Form */}
                {authMode === "signin" && showResetForm && (
                  <ResetPasswordForm
                    forgotEmail={forgotEmail}
                    otp={otp}
                    setOtp={setOtp}
                    newPassword={newPassword}
                    setNewPassword={setNewPassword}
                    confirmNewPassword={confirmNewPassword}
                    setConfirmNewPassword={setConfirmNewPassword}
                    error={error}
                    isResetLoading={isResetLoading}
                    handleResetPassword={handleResetPassword}
                    onBack={() => {
                      setShowResetForm(false);
                      setShowForgotForm(true);
                      setOtp("");
                      setNewPassword("");
                      setConfirmNewPassword("");
                      setError("");
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="py-6 flex justify-between items-center text-xs text-gray-600">
          <p>{trans.common.copyright}</p>
          <div className="flex items-center gap-6">
            <button className="hover:text-gray-800">{trans.common.privacyPolicy}</button>
            <button className="hover:text-gray-800">{trans.common.termsConditions}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
