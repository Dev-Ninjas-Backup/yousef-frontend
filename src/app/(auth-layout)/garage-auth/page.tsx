"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, User, Store } from "lucide-react";
import Image from "next/image";
import loginbg from "@/assets/login/login_bg.jpg";
import scroll_logo from "@/assets/navbar/sayarahub_fill.svg";
import { useGarageAuth } from "./_components/useGarageAuth";
import GarageSignInForm from "./_components/GarageSignInForm";
import GarageSignupForm from "./_components/GarageSignupForm";
import OtpForm from "../user-auth/_components/OtpForm";
import ForgotPasswordForm from "../user-auth/_components/ForgotPasswordForm";
import ResetPasswordForm from "../user-auth/_components/ResetPasswordForm";

export default function GarageAuth() {
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
    isForgotLoading,
    isResetLoading,
    handleInputChange,
    handleFileUpload,
    handleTabChange,
    handleServiceToggle,
    handleSignIn,
    handleSignUp,
    handleVerifyOtp,
    handleForgotPassword,
    handleResetPassword,
    setShowOtpForm,
    setShowForgotForm,
    setShowResetForm,
    setError,
  } = useGarageAuth();

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
            <Image
              src={scroll_logo}
              alt="SayaraHub"
              width={150}
              height={40}
              className="h-8 md:h-10 w-auto ml-10 md:ml-20"
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-lg">
              {/* Welcome Message */}
              <div className="w-[280px] mx-auto mb-6">
                <div className="flex items-center justify-center gap-2 mb-4 bg-blue-100 text-blue-700 rounded-full px-4 py-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Welcome to SayaraHub
                  </span>
                </div>
              </div>

              <div className="text-center mb-8 text-black space-y-4">
                <h2 className="font-semibold text-3xl md:text-4xl">
                  {authMode === "signin"
                    ? "Sign In to Your Account"
                    : "Create Your Account"}
                </h2>
                <p className="text-lg text-[#4A5565]">
                  Connect with trusted automotive services across the UAE
                </p>
              </div>

              {/* User Type Tabs */}
              <div className="mb-6 w-[300px] mx-auto">
                <Tabs
                  value="garage-owner"
                  onValueChange={handleTabChange}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 bg-white/90 backdrop-blur-sm rounded-full">
                    <TabsTrigger
                      value="car-owner"
                      className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white text-gray-700 rounded-full"
                    >
                      <User className="h-4 w-4" />
                      Car Owner
                    </TabsTrigger>
                    <TabsTrigger
                      value="garage-owner"
                      className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white text-gray-700 rounded-full"
                    >
                      <Store className="h-4 w-4" />
                      Garage Owner
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
                      Sign In
                    </button>
                    <button
                      onClick={() => setAuthMode("signup")}
                      className={`px-4 py-2 w-1/2 rounded-full text-sm font-medium transition-all ${
                        authMode === "signup"
                          ? "bg-white text-gray-700 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>

                {/* Sign In Form */}
                {authMode === "signin" && !showForgotForm && !showResetForm && (
                  <GarageSignInForm
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
                  <GarageSignupForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleFileUpload={handleFileUpload}
                    handleServiceToggle={handleServiceToggle}
                    handleSignUp={handleSignUp}
                    isRegistering={isRegistering}
                    error={error}
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
          <p>© 2025 SayaraHub. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button className="hover:text-gray-800">Privacy Policy</button>
            <button className="hover:text-gray-800">Terms & Conditions</button>
          </div>
        </div>
      </div>
    </div>
  );
}