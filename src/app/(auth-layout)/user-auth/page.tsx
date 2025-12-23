"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Sparkles, User, Store, Phone, Apple } from "lucide-react";
import Image from "next/image";
import loginbg from "@/assets/login/login_bg.jpg";
import scroll_logo from "@/assets/navbar/sayarahub_fill.svg";
import { useLoginMutation, useRegisterMutation, useVerifyOtpMutation } from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { getRedirectPath, storeAuthData } from "@/lib/auth";

export default function UserAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [authMode, setAuthMode] = useState("signin");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [verifyToken, setVerifyToken] = useState("");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    agreeToTerms: false,
  });
  const [error, setError] = useState("");

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error on input change
  };

  const handleTabChange = (value: string) => {
    if (value === "garage-owner") {
      router.push("/garage-auth");
    }
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

      // Check if user is CAR_OWNER
      if (user.role !== "CAR_OWNER") {
        setError(
          "This login is for Car Owners only. Please use the correct portal."
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
            avatar: user.profilePhoto || undefined,
          },
          token,
        })
      );

      // Redirect to dashboard
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
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    try {
      const result = await register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: "CAR_OWNER"
      }).unwrap();

      setVerifyToken(result.verifyToken);
      setShowOtpForm(true);
      setError("");
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const result = await verifyOtp({
        resetToken: verifyToken,
        emailOtp: otp
      }).unwrap();

      console.log('OTP Verification Result:', result);
      
      // Backend returns nested data structure
      const { token, user } = result.data.data;

      // Store auth data
      storeAuthData(token, user);
      dispatch(
        setCredentials({
          user: {
            id: user.id,
            email: user.email,
            name: user.fullName,
            role: user.role as any,
            avatar: user.profilePhoto || undefined,
          },
          token,
        })
      );

      // Redirect to dashboard
      const redirectPath = getRedirectPath(user.role);
      router.push(redirectPath);
    } catch (error: any) {
      console.error("OTP verification error:", error);
      setError(error?.data?.message || "OTP verification failed. Please try again.");
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
                  value="car-owner"
                  onValueChange={handleTabChange}
                  className="w-full rounded-full"
                >
                  <TabsList className="grid w-full grid-cols-2 bg-white/90 backdrop-blur-sm rounded-full">
                    <TabsTrigger
                      value="car-owner"
                      className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white text-gray-700 rounded-full"
                    >
                      <User className="" />
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
                {authMode === "signin" && (
                  <div className="space-y-4">
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email or Phone Number
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="text"
                          placeholder="Enter your email or phone"
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
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
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
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="fullName"
                        className="text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your name"
                          value={formData.fullName}
                          onChange={(e) =>
                            handleInputChange("fullName", e.target.value)
                          }
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="signupEmail"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signupEmail"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phoneNumber"
                        className="text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phoneNumber"
                          type="tel"
                          placeholder="+971 50 123 4567"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="signupPassword"
                        className="text-sm font-medium text-gray-700"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signupPassword"
                          type="password"
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Social Sign Up */}
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full h-11 border-gray-300 hover:bg-gray-50"
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Sign Up with Google
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full h-11 border-gray-300 hover:bg-gray-50"
                      >
                        <Apple className="w-5 h-5 mr-2" />
                        Sign Up with Apple
                      </Button>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          handleInputChange("agreeToTerms", checked as boolean)
                        }
                        className="mt-1"
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm text-gray-600 leading-relaxed"
                      >
                        I agree to the{" "}
                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                          Terms & Conditions
                        </button>
                      </Label>
                    </div>

                    <Button
                      onClick={handleSignUp}
                      disabled={!formData.agreeToTerms || isRegistering}
                      className="w-full bg-black hover:bg-gray-800 text-white h-11 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isRegistering ? "Creating Account..." : "Create Account"}
                    </Button>
                  </div>
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
