import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, User, Phone, Apple } from "lucide-react";

interface SignUpFormProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
  };
  error: string;
  isRegistering: boolean;
  isGoogleLoading: boolean;
  handleInputChange: (field: string, value: string | boolean) => void;
  handleSignUp: () => void;
  handleGoogleLogin: () => void;
}

export default function SignUpForm({
  formData,
  error,
  isRegistering,
  isGoogleLoading,
  handleInputChange,
  handleSignUp,
  handleGoogleLogin,
}: SignUpFormProps) {
  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
          Full Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your name"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signupEmail" className="text-sm font-medium text-gray-700">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signupEmail"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
          Phone Number
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="+971 50 123 4567"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signupPassword" className="text-sm font-medium text-gray-700">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signupPassword"
            type="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
          Confirm Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Social Sign Up */}
      <div className="space-y-3">
        <Button
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
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
          {isGoogleLoading ? "Signing in..." : "Sign Up with Google"}
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
        <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
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
  );
}