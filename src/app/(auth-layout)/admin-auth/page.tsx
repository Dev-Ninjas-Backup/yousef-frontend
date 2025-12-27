"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Shield, Eye, EyeOff, AlertCircle } from "lucide-react";
import Image from "next/image";
import loginbg from "@/assets/login/login_bg.jpg";
import scroll_logo from "@/assets/navbar/sayarahub_fill.svg";
import { useLoginMutation } from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { getRedirectPath, storeAuthData } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AdminAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error on input change
  };

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password
      }).unwrap();

      const { token, user } = result.result.data;
      
      // Check if user is SUPER_ADMIN
      if (user.role !== 'SUPER_ADMIN') {
        setError("Access denied. This portal is for Super Administrators only.");
        return;
      }

      // Store auth data
      storeAuthData(token, user);
      dispatch(setCredentials({ user: {
        id: user.id,
        email: user.email,
        name: user.fullName,
        role: user.role as any,
        avatar: user.profilePhoto || undefined
      }, token }));

      // Redirect to admin dashboard
      const redirectPath = getRedirectPath(user.role);
      router.push(redirectPath);
      
    } catch (error: any) {
      console.error("Admin login error:", error);
      setError(error?.data?.message || "Authentication failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="max-w-6xl w-full mx-auto">
        <div className="relative w-full min-h-[700px] overflow-hidden shadow-2xl">
          {/* Background with overlay */}
          <div className="absolute inset-0">
            <Image
              src={loginbg}
              alt="Admin Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/70 to-black/90" />
          </div>

          {/* Header with Logo */}
          <div className="relative z-10 py-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
            <div className="flex items-center justify-between px-10 md:px-20">
              <Image
                src={scroll_logo}
                alt="SayaraHub"
                width={150}
                height={40}
                className="h-8 md:h-10 w-auto brightness-0 invert"
              />
              <div className="flex items-center gap-2 text-white/80">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">Admin Portal</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">
              {/* Admin Badge */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-6 bg-red-500/20 text-red-400 rounded-full px-6 py-3 border border-red-500/30">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm font-semibold tracking-wide">
                    SUPER ADMIN ACCESS
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Admin Portal
                </h1>
                <p className="text-lg text-gray-300">
                  Secure access to SayaraHub administration
                </p>
              </div>

              {/* Login Form */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
                <div className="space-y-6">
                  {/* Security Notice */}
                  <div className="flex items-start gap-3 p-4 bg-amber-500/20 border border-amber-500/30 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-amber-200">
                      <p className="font-medium mb-1">Restricted Access</p>
                      <p className="text-amber-300/80">This portal is for authorized administrators only. All access attempts are logged.</p>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <p className="text-sm text-red-300">{error}</p>
                    </div>
                  )}

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail" className="text-sm font-medium text-gray-200">
                      Administrator Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="adminEmail"
                        type="email"
                        placeholder="admin@sayarahub.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="adminPassword" className="text-sm font-medium text-gray-200">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="adminPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your secure password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-11 pr-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-300 transition-colors"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                        className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500/20"
                        disabled={isLoading}
                      />
                      Remember this device
                    </label>
                    <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                      Need Help?
                    </button>
                  </div>

                  {/* Sign In Button */}
                  <Button
                    onClick={handleSignIn}
                    disabled={isLoading || !formData.email || !formData.password}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Authenticating...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Access Admin Portal
                      </div>
                    )}
                  </Button>

                  {/* Security Info */}
                  <div className="text-center pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-400">
                      Protected by enterprise-grade security
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Session timeout: 30 minutes
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Security Notice */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  By accessing this portal, you agree to comply with all security policies and regulations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="py-6 flex justify-between items-center text-xs text-gray-400 px-4">
          <p>© 2025 SayaraHub Admin Portal. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button className="hover:text-gray-300 transition-colors">Security Policy</button>
            <button className="hover:text-gray-300 transition-colors">Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}