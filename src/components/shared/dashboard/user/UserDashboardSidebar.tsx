"use client";

import Link from "next/link";
import { 
  MapPin, 
  Calendar, 
  UserCheck, 
  ChevronRight, 
  Check, 
  Settings, 
  Zap, 
  Crown,
  ClipboardCheck
} from "lucide-react";
import { useGetUserProfileQuery } from "@/store/api/userApi";
import { useGetMyProductsQuery } from "@/store/api/sparePartsApi";
import { useGetUserProductLimitQuery } from "@/store/api/userApis/products/userProducts";

interface UserDashboardSidebarProps {
  activePage: "dashboard" | "settings";
}

export default function UserDashboardSidebar({ activePage }: UserDashboardSidebarProps) {
  const { data: profileData, isLoading: isProfileLoading } = useGetUserProfileQuery();
  const { data: myProducts } = useGetMyProductsQuery();
  const { data: limitData, isLoading: isLimitLoading } = useGetUserProductLimitQuery();

  const user = profileData?.data;

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
  };

  const getInitials = (name?: string) => {
    if (!name) return "YS";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  if (isProfileLoading || isLimitLoading) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Get active plan info
  const getActivePlanDetails = () => {
    if (limitData?.hasGarageMonthly) {
      return {
        name: "Garage Monthly",
        price: "99 AED",
        period: "/mo",
        billingText: `Next billing: ${formatDate(user?.subscriptionEndsAt)}`,
        benefits: [
          "Priority visibility",
          "Highlighted contact details",
          "Unlimited listings",
          "Promotion available"
        ],
        badgeColor: "bg-orange-100 text-orange-700 border border-orange-200"
      };
    }

    if (limitData?.hasProductMonthly) {
      const planType = (limitData?.productMonthlyPlanType || user?.productMonthlyPlanType || "PRO").toUpperCase();
      const expiryDate = limitData?.productMonthlyEndsAt || user?.productMonthlyEndDate;
      
      if (planType === "BASIC") {
        return {
          name: "Basic Plan",
          price: "29 AED",
          period: "/mo",
          billingText: `Next billing: ${formatDate(expiryDate)}`,
          benefits: [
            "Up to 10 listings",
            "Standard visibility",
            "Promotion allowed",
            "Active for 60 days"
          ],
          badgeColor: "bg-blue-100 text-blue-700 border border-blue-200"
        };
      }

      if (planType === "PRO") {
        return {
          name: "Pro Seller",
          price: "59 AED",
          period: "/mo",
          billingText: `Next billing: ${formatDate(expiryDate)}`,
          benefits: [
            "Unlimited listings",
            "Higher ranking in search",
            '"Pro Seller" badge',
            "Promotion available"
          ],
          badgeColor: "bg-indigo-100 text-indigo-700 border border-indigo-200"
        };
      }

      if (planType === "GARAGE" || planType === "MONTHLY_GARAGE") {
        return {
          name: "Garage / Biz",
          price: "99 AED",
          period: "/mo",
          billingText: `Next billing: ${formatDate(expiryDate)}`,
          benefits: [
            "Unlimited listings",
            "Priority visibility & contact",
            "Active Seller Badge",
            "Promotion available"
          ],
          badgeColor: "bg-orange-100 text-orange-700 border border-orange-200"
        };
      }

      // Default product monthly fallback
      return {
        name: "Monthly Subscription",
        price: "Active",
        period: "",
        billingText: `Next billing: ${formatDate(expiryDate)}`,
        benefits: [
          "Premium listings",
          "Promotion available"
        ],
        badgeColor: "bg-green-100 text-green-700 border border-green-200"
      };
    }

    if (limitData && limitData.freeProductsRemaining > 0) {
      return {
        name: "Free Plan",
        price: "FREE",
        period: "",
        billingText: `${limitData.freeProductsRemaining} free listings left`,
        benefits: [
          `Only first ${limitData.freeProductsRemaining + limitData.freeProductsUsed} listings free`,
          "Standard visibility",
          "Promotion not allowed"
        ],
        badgeColor: "bg-green-100 text-green-700 border border-green-200"
      };
    }

    if (limitData && limitData.productCredits > 0) {
      return {
        name: "Pay Per Listing",
        price: "9 AED",
        period: "/Listing",
        billingText: `${limitData.productCredits} credits remaining`,
        benefits: [
          "Active for 45 days per listing",
          "Standard visibility",
          "Promotion available"
        ],
        badgeColor: "bg-amber-100 text-amber-700 border border-amber-200"
      };
    }

    // No active plans
    return {
      name: "No Active Plan",
      price: "0 AED",
      period: "",
      billingText: "Upgrade or buy pay-per listing credits",
      benefits: [
        "Standard visibility",
        "Upgrade to list your spare parts",
        "Promotion available on paid plans"
      ],
      badgeColor: "bg-gray-100 text-gray-700 border border-gray-200"
    };
  };

  const plan = getActivePlanDetails();

  // Calculate Progress details
  const getPlanProgress = () => {
    // 1. Subscription Plans (Garage/Product Monthly)
    if (limitData?.hasGarageMonthly || limitData?.hasProductMonthly) {
      const expiryDate = limitData?.hasGarageMonthly
        ? user?.subscriptionEndsAt
        : (limitData?.productMonthlyEndsAt || user?.productMonthlyEndDate);

      if (expiryDate) {
        const expiry = new Date(expiryDate).getTime();
        const now = new Date().getTime();
        const diffTime = expiry - now;
        const daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
        
        // Dynamically calculate subscription cycle duration if start & end dates are available
        const startDate = limitData?.hasGarageMonthly
          ? user?.subscriptionStartDate
          : user?.productMonthlyStartDate;

        let totalDays = 30; // default to 30 days
        if (startDate && expiryDate) {
          const start = new Date(startDate).getTime();
          const end = new Date(expiryDate).getTime();
          const diff = end - start;
          if (diff > 0) {
            totalDays = Math.round(diff / (1000 * 60 * 60 * 24));
          }
        } else {
          // Fallback based on plan type if dates are missing
          const planType = (limitData?.productMonthlyPlanType || user?.productMonthlyPlanType || "PRO").toUpperCase();
          if (planType === "BASIC") {
            totalDays = 60;
          }
        }
        
        const displayDaysLeft = Math.min(daysLeft, totalDays);
        const percentage = Math.max(0, Math.min(100, (displayDaysLeft / totalDays) * 100));

        return {
          show: true,
          label: `${displayDaysLeft} days remaining`,
          subLabel: `${totalDays} days total`,
          percent: percentage,
          barColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
        };
      }
    }

    // 2. Free Plan (Usage-bound)
    if (limitData && (limitData.freeProductsRemaining > 0 || limitData.freeProductsUsed > 0) && !limitData.hasGarageMonthly && !limitData.hasProductMonthly && !limitData.productCredits) {
      const used = limitData.freeProductsUsed || 0;
      const remaining = limitData.freeProductsRemaining || 0;
      const total = used + remaining;
      const percentage = total > 0 ? (used / total) * 100 : 0;

      return {
        show: true,
        label: `Used: ${used} / ${total} free listings`,
        subLabel: remaining === 0 ? "Exhausted" : `${remaining} left`,
        percent: percentage,
        barColor: remaining === 0 ? "bg-gradient-to-r from-rose-500 to-red-600" : "bg-gradient-to-r from-emerald-500 to-teal-500",
      };
    }

    return { show: false, label: "", subLabel: "", percent: 0, barColor: "" };
  };

  const progress = getPlanProgress();

  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Profile Card */}
      <div className="bg-gradient-to-br from-[#F5F3FF] via-[#FAF8FF] to-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center">
        {/* Avatar */}
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center">
            {user?.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt={user.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-600 text-white text-2xl font-bold flex items-center justify-center">
                {getInitials(user?.fullName)}
              </div>
            )}
          </div>
          <div className="absolute bottom-0 right-0 p-1.5 bg-[#1E1B4B] text-white rounded-full shadow-md border-2 border-white">
            <UserCheck className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {user?.fullName || "YS User"}
          </h2>
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
            {user?.role === "GARAGE_ADMIN" ? "Garage Admin" : "Individual Seller"}
          </span>
        </div>

        {/* Stats list */}
        <div className="w-full space-y-3.5 mb-6">
          {/* Active Listings */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#EDE9FE] text-[#7C3AED] rounded-lg">
                <ClipboardCheck className="w-4 h-4" />
              </div>
              <span className="text-gray-600 font-medium text-sm">Active Listings</span>
            </div>
            <span className="bg-[#DCFCE7] text-[#15803D] font-bold px-2.5 py-0.5 rounded-full text-xs">
              {myProducts?.length || 0}
            </span>
          </div>

          {/* Member Since */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#EDE9FE] text-[#7C3AED] rounded-lg">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-gray-600 font-medium text-sm">Member Since</span>
            </div>
            <span className="text-gray-700 font-semibold text-sm">
              {formatDate(user?.createdAt)}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#EDE9FE] text-[#7C3AED] rounded-lg">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-gray-600 font-medium text-sm">Location</span>
            </div>
            <span className="text-gray-700 font-semibold text-sm">
              {user?.emirate || user?.city || "UAE"}
            </span>
          </div>
        </div>

        {/* Bottom Card Navigation Button */}
        {activePage === "dashboard" ? (
          <Link
            href="/user/settings"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-blue-200 hover:bg-blue-50/30 text-blue-600 text-sm font-semibold rounded-xl transition-all shadow-sm active:scale-95"
          >
            <Settings className="w-4 h-4" />
            Account Settings
            <ChevronRight className="w-4 h-4 ml-auto text-blue-400" />
          </Link>
        ) : (
          <Link
            href="/user/dashboard"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-blue-200 hover:bg-blue-50/30 text-blue-600 text-sm font-semibold rounded-xl transition-all shadow-sm active:scale-95"
          >
            <UserCheck className="w-4 h-4" />
            View Profile
            <ChevronRight className="w-4 h-4 ml-auto text-blue-400" />
          </Link>
        )}
      </div>

      {/* Plan Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        {/* Plan Header */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
            Your Plan
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${plan.badgeColor}`}>
            Active
          </span>
        </div>

        {/* Plan details row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{plan.billingText}</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="flex items-baseline justify-end gap-0.5">
              <span className="text-xl font-extrabold text-blue-600">{plan.price}</span>
              {plan.period && <span className="text-[10px] text-gray-400">{plan.period}</span>}
            </div>
          </div>
        </div>

        {/* Plan Expiry / Usage Progress Bar */}
        {progress.show && (
          <div className="mb-5 bg-gray-50/80 border border-gray-100/80 rounded-xl p-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-gray-600 mb-1.5">
              <span>{progress.label}</span>
              <span className="text-gray-400 font-medium">{progress.subLabel}</span>
            </div>
            <div className="h-1.5 w-full bg-gray-200/60 rounded-full overflow-hidden">
              <div 
                className={`h-full ${progress.barColor} rounded-full transition-all duration-500`}
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </div>
        )}

        {/* Feature Checklist */}
        <div className="space-y-2.5 mb-6">
          {plan.benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-600">
              <Check className="w-4 h-4 text-green-500 shrink-0" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href="/user/dashboard#plans"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 border border-blue-200 bg-white hover:bg-blue-50/30 text-blue-600 text-xs font-semibold rounded-xl transition-all shadow-sm text-center"
          >
            <Settings className="w-3.5 h-3.5" />
            Manage Plan
          </Link>
          <Link
            href="/user/dashboard#plans"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md hover:shadow-blue-500/20 active:scale-95 text-center"
          >
            <Zap className="w-3.5 h-3.5" />
            Upgrade Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
