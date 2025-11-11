"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Sparkles, User, Store } from "lucide-react";
import Image from "next/image";
import loginbg from "@/assets/login/login_bg.jpg";

import scroll_logo from "@/assets/navbar/sayarahub_fill.svg";

export default function SayaraHubLogin() {
  const [activeTab, setActiveTab] = useState("car-owner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log("Sign in:", { email, password, userType: activeTab });
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
                  Sign In to Your Account
                </h2>
                <p className="text-lg text-[#4A5565]">
                  Connect with trusted automotive services across the UAE
                </p>
              </div>

              {/* User Type Tabs */}
              <div className="mb-6 w-[300px] mx-auto">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 bg-white/90 backdrop-blur-sm">
                    <TabsTrigger
                      value="car-owner"
                      className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white text-gray-700"
                    >
                      <User className="" />
                      Car Owner
                    </TabsTrigger>
                    <TabsTrigger
                      value="garage-owner"
                      className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white text-gray-700"
                    >
                      <Store className="h-4 w-4" />
                      Garage Owner
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Login Form */}
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-xl">
                <div className="flex justify-center mb-6 ">
                  <div className="flex gap-1 bg-gray-200 rounded-full p-1 w-full justify-between">
                    <button className="px-4 py-2 w-1/2 bg-white text-gray-700 rounded-full text-sm font-medium shadow-sm">
                      Sign In
                    </button>
                    <button className="px-4 py-2 w-1/2  text-gray-500 rounded-md text-sm font-medium hover:text-gray-700">
                      Sign Up
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                    className="w-full bg-black hover:bg-gray-800 text-white h-11 font-medium"
                  >
                    Sign In
                  </Button>
                </div>
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
