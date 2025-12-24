"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Mail,
  Lock,
  Sparkles,
  User,
  Store,
  Phone,
  Upload,
  FileText,
  Building,
} from "lucide-react";
import Image from "next/image";
import loginbg from "@/assets/login/login_bg.jpg";
import scroll_logo from "@/assets/navbar/sayarahub_fill.svg";
import {
  useLoginMutation,
  useGarageRegisterMutation,
  useVerifyOtpMutation,
  useGoogleLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { getRedirectPath, storeAuthData } from "@/lib/auth";
import GarageSignupForm from "@/app/(auth-layout)/garage-auth/_components/GarageSignupForm";

export default function GarageAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [garageRegister, { isLoading: isRegistering }] =
    useGarageRegisterMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [googleLogin, { isLoading: isGoogleLoading }] =
    useGoogleLoginMutation();
  const [forgotPassword, { isLoading: isForgotLoading }] =
    useForgotPasswordMutation();
  const [resetPassword, { isLoading: isResetLoading }] =
    useResetPasswordMutation();
  const [authMode, setAuthMode] = useState("signin");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showForgotForm, setShowForgotForm] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [verifyToken, setVerifyToken] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [otp, setOtp] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    garageName: "",
    address: "",
    city: "",
    emirate: "",
    serviceCategories: [] as string[],
    garageLogo: null as File | null,
    tradeLicense: null as File | null,
    agreeToTerms: false,
  });
  const [error, setError] = useState("");

  const handleInputChange = (
    field: string,
    value: string | boolean | string[] | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error on input change
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleTabChange = (value: string) => {
    if (value === "car-owner") {
      router.push("/user-auth");
    }
  };

  const handleServiceToggle = (service: string) => {
    const currentServices = formData.serviceCategories;
    const updatedServices = currentServices.includes(service)
      ? currentServices.filter((s) => s !== service)
      : [...currentServices, service];
    handleInputChange("serviceCategories", updatedServices);
  };

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      const { token, user } = result.result.data;

      // Check if user is GARAGE_OWNER and verified
      if (user.role !== "GARAGE_OWNER") {
        setError(
          "This login is for Garage Owners only. Please use the correct portal."
        );
        return;
      }

      if (!user.isGarageVerified) {
        setError(
          "Your garage is not verified yet. Please wait for admin approval or contact support."
        );
        return;
      }

      // Store auth data
      storeAuthData(token, user);
      dispatch(
        setCredentials({
          user: {
            id: user.id,
            email: user.email,
            name: user.fullName,
            role: user.role as any,
            avatar: user.garageLogo || undefined,
          },
          token,
        })
      );

      // Always redirect to dashboard - modal will handle verification status
      const redirectPath = getRedirectPath(user.role);
      router.push(redirectPath);
    } catch (error: any) {
      console.error("Login error:", error);
      setError(
        error?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  const handleSignUp = async () => {
    // Validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (
      !formData.garageName ||
      !formData.address ||
      !formData.city ||
      !formData.emirate
    ) {
      setError("Please fill in all garage information");
      return;
    }

    if (formData.serviceCategories.length === 0) {
      setError("Please select at least one service category");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("confirmPassword", formData.confirmPassword);
      formDataToSend.append("garageName", formData.garageName);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("emirate", formData.emirate);
      formDataToSend.append(
        "serviceCategories",
        JSON.stringify(formData.serviceCategories)
      );
      formDataToSend.append("role", "GARAGE_OWNER");

      // Add files if selected
      if (formData.garageLogo) {
        formDataToSend.append("garageLogo", formData.garageLogo);
      }
      if (formData.tradeLicense) {
        formDataToSend.append("tradeLicense", formData.tradeLicense);
      }

      const result = await garageRegister(formDataToSend).unwrap();

      setVerifyToken(result.verifyToken);
      setShowOtpForm(true);
      setError("");
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(
        error?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setError("Please enter your email address");
      return;
    }

    try {
      const result = await forgotPassword({ email: forgotEmail }).unwrap();
      setResetToken(result.data.resetToken);
      setShowResetForm(true);
      setError("");
    } catch (error: any) {
      console.error("Forgot password error:", error);
      setError(
        error?.data?.message || "Failed to send reset email. Please try again."
      );
    }
  };

  const handleResetPassword = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await resetPassword({
        resetToken: resetToken,
        password: newPassword,
      }).unwrap();

      // Reset all states
      setShowForgotForm(false);
      setShowResetForm(false);
      setOtp("");
      setNewPassword("");
      setConfirmNewPassword("");
      setForgotEmail("");
      setError("");

      alert("Password reset successful! Please login with your new password.");
    } catch (error: any) {
      console.error("Reset password error:", error);
      setError(
        error?.data?.message || "Failed to reset password. Please try again."
      );
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const result = await verifyOtp({
        resetToken: verifyToken || "",
        emailOtp: otp,
      }).unwrap();

      const { token, user } = result.data?.data || {};

      if (!token || !user) {
        setError("Invalid response from server. Please try again.");
        return;
      }

      // Store auth data
      storeAuthData(token, user);
      dispatch(
        setCredentials({
          user: {
            id: user.id,
            email: user.email,
            name: user.fullName,
            role: user.role as any,
            avatar: user.garageLogo || undefined,
          },
          token,
        })
      );

      // Redirect to garage dashboard
      const redirectPath = getRedirectPath(user.role);
      router.push(redirectPath);
    } catch (error: any) {
      console.error("OTP verification error:", error);
      setError(
        error?.data?.message || "OTP verification failed. Please try again."
      );
    }
  };

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
                  <div className="space-y-4">
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label
                        htmlFor="businessEmail"
                        className="text-sm font-medium text-gray-700"
                      >
                        Business Email <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="businessEmail"
                          type="email"
                          placeholder="garage@business.com"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          setShowForgotForm(true);
                          setError("");
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <Button
                      onClick={handleSignIn}
                      disabled={
                        isLoading || !formData.email || !formData.password
                      }
                      className="w-full bg-black hover:bg-gray-800 text-white h-11 font-medium disabled:opacity-50"
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </div>
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
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Verify Your Email
                      </h3>
                      <p className="text-sm text-gray-600">
                        We've sent a 6-digit code to {formData.email}
                      </p>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label
                        htmlFor="otp"
                        className="text-sm font-medium text-gray-700"
                      >
                        Enter OTP
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
                      <Button
                        onClick={() => {
                          setShowOtpForm(false);
                          setOtp("");
                          setError("");
                        }}
                        variant="outline"
                        className="flex-1 h-11"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleVerifyOtp}
                        disabled={!otp || otp.length !== 6 || isVerifying}
                        className="flex-1 bg-black hover:bg-gray-800 text-white h-11 font-medium disabled:opacity-50"
                      >
                        {isVerifying ? "Verifying..." : "Verify OTP"}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Forgot Password Form */}
                {authMode === "signin" && showForgotForm && !showResetForm && (
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
                      <Label
                        htmlFor="forgotEmail"
                        className="text-sm font-medium text-gray-700"
                      >
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
                      <Button
                        onClick={() => {
                          setShowForgotForm(false);
                          setForgotEmail("");
                          setError("");
                        }}
                        variant="outline"
                        className="flex-1 h-11"
                      >
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
                )}

                {/* Reset Password Form */}
                {authMode === "signin" && showResetForm && (
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
                      <Label
                        htmlFor="resetOtp"
                        className="text-sm font-medium text-gray-700"
                      >
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
                      <Label
                        htmlFor="newPassword"
                        className="text-sm font-medium text-gray-700"
                      >
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
                      <Label
                        htmlFor="confirmNewPassword"
                        className="text-sm font-medium text-gray-700"
                      >
                        Confirm New Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirmNewPassword"
                          type="password"
                          placeholder="Confirm new password"
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => {
                          setShowResetForm(false);
                          setShowForgotForm(true);
                          setOtp("");
                          setNewPassword("");
                          setConfirmNewPassword("");
                          setError("");
                        }}
                        variant="outline"
                        className="flex-1 h-11"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleResetPassword}
                        disabled={
                          !otp ||
                          !newPassword ||
                          !confirmNewPassword ||
                          isResetLoading
                        }
                        className="flex-1 bg-black hover:bg-gray-800 text-white h-11 font-medium disabled:opacity-50"
                      >
                        {isResetLoading ? "Resetting..." : "Reset Password"}
                      </Button>
                    </div>
                  </div>
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
