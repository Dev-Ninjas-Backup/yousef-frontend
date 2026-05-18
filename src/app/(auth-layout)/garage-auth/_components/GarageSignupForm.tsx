"use client";
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Phone, Lock, Building, MapPin, Upload } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { authTranslations } from "@/translations/auth";

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
  const { t } = useLanguage();
  const trans = t(authTranslations);

  const serviceOptions = [
    { id: "Oil Change", label: "Oil Change" },
    { id: "Brake Repair", label: "Brake Repair" },
    { id: "AC Service", label: "AC Service" },
    { id: "Electrical Repair", label: "Electrical Repair" },
    { id: "Engine Repair", label: "Engine Repair" },
    { id: "Tire Service", label: "Tire Service" },
    { id: "Body Work", label: "Body Work" },
    { id: "Diagnostics", label: "Diagnostics" },
    { id: "Towing", label: "Towing" },
    { id: "Emergency Towing", label: "Emergency Towing" },
    { id: "Van Doorstep Repair", label: "Van Doorstep Repair" },
    { id: "Battery Replacement", label: "Battery Replacement" },
    { id: "Transmission Service", label: "Transmission Service" },
    { id: "Suspension Repair", label: "Suspension Repair" },
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

      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
          {trans.garage.signUp.fullNameLabel} <span className="text-red-500">{trans.garage.signUp.required}</span>
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="fullName"
            type="text"
            placeholder={trans.garage.signUp.fullNamePlaceholder}
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          {trans.garage.signUp.emailLabel} <span className="text-red-500">{trans.garage.signUp.required}</span>
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder={trans.garage.signUp.emailPlaceholder}
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
          {trans.garage.signUp.phoneLabel} <span className="text-red-500">{trans.garage.signUp.required}</span>
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="phone"
            type="tel"
            placeholder={trans.garage.signUp.phonePlaceholder}
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          {trans.garage.signUp.passwordLabel} <span className="text-red-500">{trans.garage.signUp.required}</span>
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            type="password"
            placeholder={trans.garage.signUp.passwordPlaceholder}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
          {trans.garage.signUp.confirmPasswordLabel} <span className="text-red-500">{trans.garage.signUp.required}</span>
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="confirmPassword"
            type="password"
            placeholder={trans.garage.signUp.confirmPasswordPlaceholder}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="garageName" className="text-sm font-medium text-gray-700">
          {trans.garage.signUp.garageNameLabel} <span className="text-red-500">{trans.garage.signUp.required}</span>
        </Label>
        <div className="relative">
          <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="garageName"
            type="text"
            placeholder={trans.garage.signUp.garageNamePlaceholder}
            value={formData.garageName}
            onChange={(e) => handleInputChange("garageName", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
          {trans.garage.signUp.addressLabel} <span className="text-red-500">{trans.garage.signUp.required}</span>
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="address"
            type="text"
            placeholder={trans.garage.signUp.addressPlaceholder}
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium text-gray-700">
            {trans.garage.signUp.cityLabel} <span className="text-red-500">{trans.garage.signUp.required}</span>
          </Label>
          <Input
            id="city"
            type="text"
            placeholder={trans.garage.signUp.cityPlaceholder}
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emirate" className="text-sm font-medium text-gray-700">
            {trans.garage.signUp.emirateLabel} <span className="text-red-500">{trans.garage.signUp.required}</span>
          </Label>
          <Select value={formData.emirate} onValueChange={(value) => handleInputChange("emirate", value)}>
            <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder={trans.garage.signUp.emiratePlaceholder} />
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

      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">
          {trans.garage.signUp.serviceCategoriesLabel} <span className="text-red-500">{trans.garage.signUp.required}</span>
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

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            {trans.garage.signUp.garageLogoLabel}
          </Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
            <p className="text-xs text-gray-600 mb-2">
              {formData.garageLogo ? formData.garageLogo.name : trans.garage.signUp.garageLogoPlaceholder}
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
              {trans.garage.signUp.chooseFile}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            {trans.garage.signUp.tradeLicenseLabel} <span className="text-red-500">{trans.garage.signUp.required}</span>
          </Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
            <p className="text-xs text-gray-600 mb-2">
              {formData.tradeLicense ? formData.tradeLicense.name : trans.garage.signUp.tradeLicensePlaceholder}
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
              {trans.garage.signUp.chooseFile}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
          className="mt-1"
        />
        <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
          {trans.garage.signUp.agreeTerms}{" "}
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            {trans.garage.signUp.termsConditions}
          </button>
        </Label>
      </div>

      <Button
        onClick={handleSignUp}
        disabled={!formData.agreeToTerms || isRegistering}
        className="w-full bg-black hover:bg-gray-800 text-white h-11 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRegistering ? trans.garage.signUp.creatingAccount : trans.garage.signUp.createAccountButton}
      </Button>
    </div>
  );
};

export default GarageSignupForm;
