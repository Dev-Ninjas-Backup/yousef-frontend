"use client";
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Phone, Lock, Building, MapPin, Upload, Eye, EyeOff, Compass } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { authTranslations } from "@/translations/auth";
import { toast } from "sonner";
import Link from 'next/link';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [isDetecting, setIsDetecting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (error) {
      toast.error(error);
      
      const newErrors: Record<string, string> = {};
      const lowerError = error.toLowerCase();
      let targetStep = step;

      if (lowerError.includes("email")) {
        newErrors.email = error;
        targetStep = 1;
      }
      if (lowerError.includes("phone")) {
        newErrors.phone = error;
        targetStep = 1;
      }
      if (lowerError.includes("password")) {
        newErrors.password = error;
        targetStep = 1;
      }
      if (lowerError.includes("name") && !lowerError.includes("garage")) {
        newErrors.fullName = error;
        targetStep = 1;
      }
      if (lowerError.includes("garage name") || lowerError.includes("garagename")) {
        newErrors.garageName = error;
        targetStep = 2;
      }
      if (lowerError.includes("address")) {
        newErrors.address = error;
        targetStep = 2;
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors((prev) => ({ ...prev, ...newErrors }));
        setStep(targetStep);
        scrollToFirstError(newErrors);
      } else {
        const formCard = document.getElementById("garage-signup-card");
        if (formCard) {
          formCard.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  }, [error]);

  const onFieldChange = (field: string, value: any) => {
    handleInputChange(field, value);
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const onFileChange = (field: string, file: File | null) => {
    handleFileUpload(field, file);
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const onServiceChange = (serviceId: string) => {
    handleServiceToggle(serviceId);
    if (errors.serviceCategories) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.serviceCategories;
        return next;
      });
    }
  };

  const onTermsChange = (checked: boolean) => {
    handleInputChange("agreeToTerms", checked);
    if (errors.agreeToTerms) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.agreeToTerms;
        return next;
      });
    }
  };

  const scrollToFirstError = (fields: Record<string, string>) => {
    const errorKeys = Object.keys(fields);
    if (errorKeys.length === 0) return;

    const firstKey = errorKeys[0];
    setTimeout(() => {
      const element = document.getElementById(firstKey);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
    }, 50);
  };

  const stepTitles = t({
    en: {
      account: "Account Info",
      details: "Garage Details",
      documents: "Documents",
      next: "Next",
      back: "Back",
      pleaseFillRequired: "Please fill in all required fields",
      passwordMismatch: "Passwords do not match",
      selectService: "Please select at least one service category",
    },
    ar: {
      account: "بيانات الحساب",
      details: "تفاصيل الورشة",
      documents: "المستندات",
      next: "التالي",
      back: "السابق",
      pleaseFillRequired: "يرجى ملء جميع الحقول المطلوبة",
      passwordMismatch: "كلمات المرور غير متطابقة",
      selectService: "يرجى اختيار فئة خدمة واحدة على الأقل",
    }
  });

  const steps = [
    { title: stepTitles.account },
    { title: stepTitles.details },
    { title: stepTitles.documents },
  ];

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
    { id: "Mobile Van Repair Service", label: "Mobile Van Repair Service (repair at customer's doorstep)" },
    { id: "Battery Replacement", label: "Battery Replacement" },
    { id: "Transmission Service", label: "Transmission Service" },
    { id: "Suspension Repair", label: "Suspension Repair" },
  ];

  const emirateOptions = [
    "Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"
  ];

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) newErrors.fullName = t({ en: "Full name is required", ar: "الاسم الكامل مطلوب" });
    if (!formData.email) {
      newErrors.email = t({ en: "Email address is required", ar: "البريد الإلكتروني مطلوب" });
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t({ en: "Please enter a valid email", ar: "يرجى إدخال بريد إلكتروني صحيح" });
    }
    if (!formData.phone) newErrors.phone = t({ en: "Phone number is required", ar: "رقم الهاتف مطلوب" });
    if (!formData.password) newErrors.password = t({ en: "Password is required", ar: "كلمة المرور مطلوبة" });
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t({ en: "Please confirm your password", ar: "يرجى تأكيد كلمة المرور" });
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t({ en: "Passwords do not match", ar: "كلمات المرور غير متطابقة" });
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error(stepTitles.pleaseFillRequired);
      scrollToFirstError(newErrors);
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.garageName) newErrors.garageName = t({ en: "Garage name is required", ar: "اسم الورشة مطلوب" });
    if (!formData.address) newErrors.address = t({ en: "Address is required", ar: "العنوان مطلوب" });
    if (!formData.city) newErrors.city = t({ en: "City is required", ar: "المدينة مطلوبة" });
    if (!formData.emirate) newErrors.emirate = t({ en: "Emirate is required", ar: "الإمارة مطلوبة" });
    if (formData.serviceCategories.length === 0) {
      newErrors.serviceCategories = t({ en: "Select at least one service category", ar: "اختر فئة خدمة واحدة على الأقل" });
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error(stepTitles.pleaseFillRequired);
      scrollToFirstError(newErrors);
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = t({ en: "You must agree to the terms and conditions", ar: "يجب الموافقة على الشروط والأحكام" });
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error(t({ en: "Please agree to the terms and conditions", ar: "يرجى الموافقة على الشروط والأحكام" }));
      scrollToFirstError(newErrors);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          if (data && data.address) {
            const addressVal = data.display_name || "";
            const cityVal = data.address.city || data.address.town || data.address.suburb || "";
            const stateVal = data.address.state || "";
            
            onFieldChange("address", addressVal);
            if (cityVal) onFieldChange("city", cityVal);
            
            const matchedEmirate = emirateOptions.find(
              (e) =>
                addressVal.toLowerCase().includes(e.toLowerCase()) ||
                stateVal.toLowerCase().includes(e.toLowerCase())
            );
            if (matchedEmirate) {
              onFieldChange("emirate", matchedEmirate);
            }
            toast.success("Location auto-detected successfully!");
          } else {
            toast.error("Could not resolve address for your coordinates.");
          }
        } catch (err) {
          console.error(err);
          toast.error("Failed to fetch address details.");
        } finally {
          setIsDetecting(false);
        }
      },
      (err) => {
        console.error(err);
        toast.error("Location access denied or timed out.");
        setIsDetecting(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const onSubmitSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep3()) {
      handleSignUp();
    }
  };

  const tipText = t({
    en: "Click the map icon on the right of the address field to auto-detect your location.",
    ar: "انقر على رمز الخريطة الموجود على يمين حقل العنوان لتحديد موقعك تلقائيًا."
  });

  return (
    <div id="garage-signup-card" className="space-y-4 w-full">
      {/* Step Indicator */}
      <div className="mb-6 select-none border-b pb-4">
        <div className="flex items-center justify-between relative px-4">
          {/* Progress Line Container */}
          <div className="absolute top-[18px] left-[72px] right-[72px] h-[2px] bg-gray-200 z-0">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{
                width: step === 1 ? "0%" : step === 2 ? "50%" : "100%",
              }}
            />
          </div>

          {steps.map((s, idx) => {
            const stepNum = idx + 1;
            const isActive = step === stepNum;
            const isCompleted = step > stepNum;
            return (
              <div key={idx} className="flex flex-col items-center z-10 relative w-28 text-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white ring-4 ring-blue-100 shadow-md"
                      : isCompleted
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-400 border-2 border-gray-200"
                  }`}
                >
                  {isCompleted ? "✓" : stepNum}
                </div>
                <span
                  className={`text-[9px] font-bold mt-1.5 transition-colors duration-300 tracking-wide uppercase ${
                    isActive ? "text-blue-600" : isCompleted ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Account Info */}
      {step === 1 && (
        <div className="space-y-4">
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
                onChange={(e) => onFieldChange("fullName", e.target.value)}
                className={`pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 ${errors.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1 select-none font-medium animate-pulse">{errors.fullName}</p>
            )}
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
                onChange={(e) => onFieldChange("email", e.target.value)}
                className={`pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 select-none font-medium animate-pulse">{errors.email}</p>
            )}
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
                onChange={(e) => onFieldChange("phone", e.target.value)}
                className={`pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1 select-none font-medium animate-pulse">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              {trans.garage.signUp.passwordLabel} <span className="text-red-500">{trans.garage.signUp.required}</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={trans.garage.signUp.passwordPlaceholder}
                value={formData.password}
                onChange={(e) => onFieldChange("password", e.target.value)}
                className={`pl-10 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1 select-none font-medium animate-pulse">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              {trans.garage.signUp.confirmPasswordLabel} <span className="text-red-500">{trans.garage.signUp.required}</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder={trans.garage.signUp.confirmPasswordPlaceholder}
                value={formData.confirmPassword}
                onChange={(e) => onFieldChange("confirmPassword", e.target.value)}
                className={`pl-10 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 ${errors.confirmPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1 select-none font-medium animate-pulse">{errors.confirmPassword}</p>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Garage Details */}
      {step === 2 && (
        <div className="space-y-4">
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
                onChange={(e) => onFieldChange("garageName", e.target.value)}
                className={`pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 ${errors.garageName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
            </div>
            {errors.garageName && (
              <p className="text-xs text-red-500 mt-1 select-none font-medium animate-pulse">{errors.garageName}</p>
            )}
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
                onChange={(e) => onFieldChange("address", e.target.value)}
                className={`pl-10 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 ${errors.address ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isDetecting}
                className="absolute right-3 top-3 text-blue-600 hover:text-blue-750 transition-colors focus:outline-none disabled:opacity-50"
                title="Detect my current location"
              >
                {isDetecting ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                ) : (
                  <Compass className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.address && (
              <p className="text-xs text-red-500 mt-1 select-none font-medium animate-pulse">{errors.address}</p>
            )}
            <p className="text-[10px] text-gray-400 mt-1 select-none">
              💡 {tipText}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 items-start">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                {trans.garage.signUp.cityLabel} <span className="text-red-500">{trans.garage.signUp.required}</span>
              </Label>
              <Input
                id="city"
                type="text"
                placeholder={trans.garage.signUp.cityPlaceholder}
                value={formData.city}
                onChange={(e) => onFieldChange("city", e.target.value)}
                className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 ${errors.city ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.city && (
                <p className="text-xs text-red-500 mt-1 select-none font-medium animate-pulse">{errors.city}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="emirate" className="text-sm font-medium text-gray-700">
                {trans.garage.signUp.emirateLabel} <span className="text-red-500">{trans.garage.signUp.required}</span>
              </Label>
              <Select value={formData.emirate} onValueChange={(value) => onFieldChange("emirate", value)}>
                <SelectTrigger id="emirate" className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 ${errors.emirate ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}>
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
              {errors.emirate && (
                <p className="text-xs text-red-500 mt-1 select-none font-medium animate-pulse">{errors.emirate}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              {trans.garage.signUp.serviceCategoriesLabel} <span className="text-red-500">{trans.garage.signUp.required}</span>
            </Label>
            <div id="serviceCategories" className={`grid grid-cols-2 sm:grid-cols-3 gap-3 p-2.5 border rounded-lg bg-gray-50/50 ${errors.serviceCategories ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}>
              {serviceOptions.map((service) => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={service.id}
                    checked={formData.serviceCategories.includes(service.id)}
                    onCheckedChange={() => onServiceChange(service.id)}
                  />
                  <Label htmlFor={service.id} className="text-xs text-gray-700 cursor-pointer">
                    {service.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.serviceCategories && (
              <p className="text-xs text-red-500 mt-1 select-none font-medium animate-pulse">{errors.serviceCategories}</p>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Documents & Terms */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              {trans.garage.signUp.garageLogoLabel}
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors bg-gray-50/30">
              <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
              <p className="text-xs text-gray-600 mb-2 truncate px-4">
                {formData.garageLogo ? formData.garageLogo.name : trans.garage.signUp.garageLogoPlaceholder}
              </p>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => onFileChange("garageLogo", e.target.files?.[0] || null)}
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
              {trans.garage.signUp.tradeLicenseLabel} <span className="text-gray-400 font-normal">({t({ en: "Optional", ar: "اختياري" })})</span>
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors bg-gray-50/30">
              <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
              <p className="text-xs text-gray-600 mb-2 truncate px-4">
                {formData.tradeLicense ? formData.tradeLicense.name : trans.garage.signUp.tradeLicensePlaceholder}
              </p>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => onFileChange("tradeLicense", e.target.files?.[0] || null)}
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

          <div className="flex flex-col pt-2">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => onTermsChange(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="agreeToTerms" className="text-xs text-gray-600 leading-relaxed cursor-pointer select-none">
                {trans.garage.signUp.agreeTerms}{" "}
                <Link href="/terms" target="_blank" className="text-blue-600 hover:text-blue-700 font-semibold">
                  {trans.garage.signUp.termsConditions}
                </Link>
              </Label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-xs text-red-500 mt-2 select-none font-medium animate-pulse">{errors.agreeToTerms}</p>
            )}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-100 mt-6">
        {step > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="w-1/2 border-gray-300 text-gray-700 font-semibold h-11 rounded-lg hover:bg-gray-50 active:scale-95 transition-all"
          >
            {stepTitles.back}
          </Button>
        )}
        {step < 3 ? (
          <Button
            type="button"
            onClick={handleNext}
            className={`bg-black hover:bg-gray-800 text-white font-semibold h-11 rounded-lg active:scale-95 transition-all ${step === 1 ? 'w-full' : 'w-1/2'}`}
          >
            {stepTitles.next}
          </Button>
        ) : (
          <Button
            onClick={onSubmitSignUp}
            disabled={!formData.agreeToTerms || isRegistering}
            className="w-1/2 bg-black hover:bg-gray-800 text-white h-11 font-semibold disabled:opacity-50 disabled:cursor-not-allowed rounded-lg active:scale-95 transition-all"
          >
            {isRegistering ? trans.garage.signUp.creatingAccount : trans.garage.signUp.createAccountButton}
          </Button>
        )}
      </div>
    </div>
  );
};

export default GarageSignupForm;
