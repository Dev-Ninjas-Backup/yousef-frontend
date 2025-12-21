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
import { useLoginMutation } from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { getRedirectPath, storeAuthData } from "@/lib/auth";

export default function GarageAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [authMode, setAuthMode] = useState("signin");
  const [formData, setFormData] = useState({
    businessEmail: "",
    password: "",
    garageName: "",
    contactNumber: "",
    tradeLicense: null as File | null,
    garageLogo: null as File | null,
    serviceCategories: [] as string[],
    agreeToTerms: false,
  });
  const [error, setError] = useState("");

  const handleInputChange = (
    field: string,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error on input change
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
    if (!formData.businessEmail || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const result = await login({
        email: formData.businessEmail,
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

  const handleSignUp = () => {
    console.log("Garage Owner Sign up:", {
      ...formData,
      userType: "GARAGE_OWNER",
    });
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
                {authMode === "signin" && (
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
                        Business Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="businessEmail"
                          type="email"
                          placeholder="garage@business.com"
                          value={formData.businessEmail}
                          onChange={(e) =>
                            handleInputChange("businessEmail", e.target.value)
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
                        isLoading ||
                        !formData.businessEmail ||
                        !formData.password
                      }
                      className="w-full bg-black hover:bg-gray-800 text-white h-11 font-medium disabled:opacity-50"
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </div>
                )}

                {/* Sign Up Form */}
                {authMode === "signup" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="garageName"
                        className="text-sm font-medium text-gray-700"
                      >
                        Garage Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="garageName"
                          type="text"
                          placeholder="Your Garage Name"
                          value={formData.garageName}
                          onChange={(e) =>
                            handleInputChange("garageName", e.target.value)
                          }
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="signupBusinessEmail"
                        className="text-sm font-medium text-gray-700"
                      >
                        Business Email <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signupBusinessEmail"
                          type="email"
                          placeholder="garage@business.com"
                          value={formData.businessEmail}
                          onChange={(e) =>
                            handleInputChange("businessEmail", e.target.value)
                          }
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="contactNumber"
                        className="text-sm font-medium text-gray-700"
                      >
                        Contact Number <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="contactNumber"
                          type="tel"
                          placeholder="+971 50 123 4567"
                          value={formData.contactNumber}
                          onChange={(e) =>
                            handleInputChange("contactNumber", e.target.value)
                          }
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Trade License Upload */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Trade License
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Upload Trade License (PDF, JPG, PNG)
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          title="Upload Trade License"
                          aria-label="Upload Trade License"
                        />
                      </div>
                    </div>

                    {/* Garage Logo Upload */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Garage Logo (Optional)
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Upload Logo (JPG, PNG)
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          accept=".jpg,.jpeg,.png"
                          title="Upload Garage Logo"
                          aria-label="Upload Garage Logo"
                        />
                      </div>
                    </div>

                    {/* Service Categories */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700">
                        Select Service Categories{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: "mechanical", label: "Mechanical Repair" },
                          { id: "ac", label: "AC & Heating" },
                          { id: "electrical", label: "Electrical Systems" },
                          { id: "body", label: "Body & Paint" },
                          { id: "diagnostics", label: "Diagnostics" },
                          { id: "maintenance", label: "General Maintenance" },
                        ].map((service) => (
                          <div
                            key={service.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={service.id}
                              checked={formData.serviceCategories.includes(
                                service.id
                              )}
                              onCheckedChange={() =>
                                handleServiceToggle(service.id)
                              }
                            />
                            <Label
                              htmlFor={service.id}
                              className="text-sm text-gray-700"
                            >
                              {service.label}
                            </Label>
                          </div>
                        ))}
                      </div>
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
                        I confirm that all provided information is valid.
                      </Label>
                    </div>

                    <Button
                      onClick={handleSignUp}
                      disabled={!formData.agreeToTerms}
                      className="w-full bg-black hover:bg-gray-800 text-white h-11 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit
                    </Button>
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
