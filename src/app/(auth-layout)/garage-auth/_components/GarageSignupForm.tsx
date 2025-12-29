import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Phone, Lock, Building, MapPin, Upload } from "lucide-react";

interface GarageSignupFormProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  handleFileUpload: (field: string, file: File | null) => void;
  handleServiceToggle: (service: string) => void;
  handleSignUp: () => void;
  isRegistering: boolean;
  error: string;
}

const GarageSignupForm: React.FC<GarageSignupFormProps> = ({
  formData,
  handleInputChange,
  handleFileUpload,
  handleServiceToggle,
  handleSignUp,
  isRegistering,
  error
}) => {
  const serviceOptions = [
    { id: "Oil Change", label: "Oil Change" },
    { id: "Brake Repair", label: "Brake Repair" },
    { id: "AC Service", label: "AC Service" },
    { id: "Electrical", label: "Electrical" },
    { id: "Engine Repair", label: "Engine Repair" },
    { id: "Tire Service", label: "Tire Service" },
    { id: "Body Work", label: "Body Work" },
    { id: "Diagnostics", label: "Diagnostics" }
  ];

  const emirateOptions = [
    "Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"
  ];

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
          Full Name <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="fullName"
            type="text"
            placeholder="Your full name"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Phone Number <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="phone"
            type="tel"
            placeholder="+971 50 123 4567"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            type="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
          Confirm Password <span className="text-red-500">*</span>
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

      {/* Garage Name */}
      <div className="space-y-2">
        <Label htmlFor="garageName" className="text-sm font-medium text-gray-700">
          Garage Name <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="garageName"
            type="text"
            placeholder="Your garage name"
            value={formData.garageName}
            onChange={(e) => handleInputChange("garageName", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
          Address <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="address"
            type="text"
            placeholder="Garage address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* City & Emirate */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium text-gray-700">
            City <span className="text-red-500">*</span>
          </Label>
          <Input
            id="city"
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emirate" className="text-sm font-medium text-gray-700">
            Emirate <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.emirate} onValueChange={(value) => handleInputChange("emirate", value)}>
            <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Select emirate" />
            </SelectTrigger>
            <SelectContent>
              {emirateOptions.map((emirate) => (
                <SelectItem key={emirate} value={emirate}>
                  {emirate}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Service Categories */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">
          Service Categories <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {serviceOptions.map((service) => (
            <div key={service.id} className="flex items-center space-x-2">
              <Checkbox
                id={service.id}
                checked={formData.serviceCategories.includes(service.id)}
                onCheckedChange={() => handleServiceToggle(service.id)}
              />
              <Label htmlFor={service.id} className="text-sm text-gray-700">
                {service.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* File Uploads */}
      <div className="space-y-4">
        {/* Garage Logo */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Garage Logo (Optional)
          </Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
            <p className="text-xs text-gray-600 mb-2">
              {formData.garageLogo ? formData.garageLogo.name : "Upload Logo (JPG, PNG)"}
            </p>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload("garageLogo", e.target.files?.[0] || null)}
              className="hidden"
              id="garageLogo"
              title="Upload garage logo image"
              aria-label="Upload garage logo image"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById("garageLogo")?.click()}
            >
              Choose File
            </Button>
          </div>
        </div>

        {/* Trade License */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Trade License <span className="text-red-500">*</span>
          </Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
            <p className="text-xs text-gray-600 mb-2">
              {formData.tradeLicense ? formData.tradeLicense.name : "Upload Trade License (PDF, JPG, PNG)"}
            </p>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload("tradeLicense", e.target.files?.[0] || null)}
              className="hidden"
              id="tradeLicense"
              title="Upload trade license document"
              aria-label="Upload trade license document"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById("tradeLicense")?.click()}
            >
              Choose File
            </Button>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
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
};

export default GarageSignupForm;