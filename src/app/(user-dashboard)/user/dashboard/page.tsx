"use client";

import { useState } from "react";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileForm from "./_components/ProfileForm";
import LoadingSpinner from "./_components/LoadingSpinner";
import ErrorMessage from "./_components/ErrorMessage";
import { useProfileManagement } from "./_components/useProfileManagement";
import ReviewForm from "./_components/ReviewForm";
import UserDashboardHeader from "@/components/shared/dashboard/user/UserDashboardHeader";
import UserDashboardSidebar from "@/components/shared/dashboard/user/UserDashboardSidebar";
import Link from "next/link";
import { Zap, Plus, FolderKanban, MessageSquare, ChevronRight, Crown, Check, Lock, Clock, AlertTriangle } from "lucide-react";
import { useGetUserProductLimitQuery } from "@/store/api/userApis/products/userProducts";
import { useCreateMonthlyPaymentMutation } from "@/store/api/garageAdminApis/products/products";
import { 
  useDowngradeProductPlanMutation,
  useCancelProductMonthlyMutation,
} from "@/store/api/garageAdminApis/subscription/subscription";
import { toast } from "sonner";

function UserDashboardContent() {
  const {
    profileData,
    isLoading,
    error,
    isUpdating,
    isEditing,
    setIsEditing,
    previewUrl,
    fileInputRef,
    formData,
    handleInputChange,
    handleFileSelect,
    handleSave,
    handleCancel,
    handleFileClick,
  } = useProfileManagement();

  const { data: limitData } = useGetUserProductLimitQuery();
  const [createMonthlyPayment, { isLoading: isPaymentLoading }] = useCreateMonthlyPaymentMutation();
  const [subscribingPlan, setSubscribingPlan] = useState<"BASIC" | "PRO" | null>(null);

  const [downgradeProductPlan, { isLoading: isDowngrading }] = useDowngradeProductPlanMutation();
  const [cancelProductMonthly, { isLoading: isCancelling }] = useCancelProductMonthlyMutation();
  const [showDowngradeModal, setShowDowngradeModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleDowngradeConfirm = async () => {
    try {
      await downgradeProductPlan({ planType: "BASIC" }).unwrap();
      toast.success("Downgrade requested. Your plan will switch to Basic on renewal.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to request downgrade");
    } finally {
      setShowDowngradeModal(false);
    }
  };

  const handleCancelConfirm = async () => {
    try {
      await cancelProductMonthly().unwrap();
      toast.success("Subscription will cancel at the end of the current cycle.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel subscription");
    } finally {
      setShowCancelModal(false);
    }
  };

  const handleSubscribe = async (planType: "BASIC" | "PRO") => {
    try {
      setSubscribingPlan(planType);
      const response = await createMonthlyPayment({ planType }).unwrap();
      if (response?.url) {
        window.location.href = response.url;
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create payment session");
    } finally {
      setSubscribingPlan(null);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  const user = profileData?.data;
  if (!user) return null;

  const activePlanType = (limitData?.productMonthlyPlanType || user?.productMonthlyPlanType || "PRO").toUpperCase();

  return (
    <div className="w-full pt-1 pb-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Left Column (Profile & Review Forms) */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <UserDashboardHeader activeTab="profile" />

          {/* Header */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              Profile Settings
            </h1>
            <p className="text-sm text-gray-500">
              Update your personal details, location, and write a review
            </p>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              Quick Actions
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Add Product Action */}
              <Link
                href="/user/my-products/add-product"
                className="flex items-center justify-between p-3.5 rounded-xl border border-gray-50 hover:border-amber-100 hover:bg-amber-50/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#FEF3C7] text-[#D97706] rounded-lg group-hover:bg-[#FDE68A] transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">Add Product</h4>
                    <p className="text-[10px] text-gray-400">List a new spare part</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-amber-600 transition-colors" />
              </Link>

              {/* Listings Action */}
              <Link
                href="/user/my-products"
                className="flex items-center justify-between p-3.5 rounded-xl border border-gray-50 hover:border-amber-100 hover:bg-amber-50/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#FEF3C7] text-[#D97706] rounded-lg group-hover:bg-[#FDE68A] transition-colors">
                    <FolderKanban className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">My Listings</h4>
                    <p className="text-[10px] text-gray-400">View & manage products</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-amber-600 transition-colors" />
              </Link>

              {/* Messages Action */}
              <Link
                href="/user/messages"
                className="flex items-center justify-between p-3.5 rounded-xl border border-gray-50 hover:border-amber-100 hover:bg-amber-50/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#FEF3C7] text-[#D97706] rounded-lg group-hover:bg-[#FDE68A] transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">Messages</h4>
                    <p className="text-[10px] text-gray-400">Check buyer conversations</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-amber-600 transition-colors" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <ProfileHeader
              user={user}
              isEditing={isEditing}
              previewUrl={previewUrl}
              isUpdating={isUpdating}
              onEditToggle={() => setIsEditing(true)}
              onCancel={handleCancel}
              onSave={handleSave}
              onFileSelect={handleFileClick}
              fileInputRef={fileInputRef}
              onFileChange={handleFileSelect}
            />
            <ProfileForm
              formData={formData}
              user={user}
              isEditing={isEditing}
              onInputChange={handleInputChange}
            />
          </div>

          {/* Subscription Plans Section */}
          <div id="plans" className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-500 fill-amber-500" />
                Subscription Plans
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Choose a plan to list more products, boost your visibility, and gain more customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Free Plan */}
              <div 
                className={`relative rounded-xl border p-5 flex flex-col justify-between transition-all ${
                  limitData?.hasProductMonthly
                    ? "border-gray-200 bg-gray-50/20 opacity-60"
                    : "border-emerald-500 bg-emerald-50/5 ring-1 ring-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-emerald-100">
                      Free
                    </span>
                    {!limitData?.hasProductMonthly && (
                      <span className="text-[10px] text-white font-bold bg-emerald-600 px-2 py-0.5 rounded-full border border-emerald-700 shadow-sm">
                        Active
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-950 text-base">Free Plan</h3>
                  <p className="text-xl font-black text-green-600 mt-1">FREE</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Active for 15 days per listing</p>
                  
                  <ul className="mt-4 space-y-2 text-xs text-gray-600 border-t pt-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Up to 3 listings total</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Standard visibility</span>
                    </li>
                    <li className="flex items-center gap-2 text-red-500 font-medium">
                      <span className="shrink-0 text-red-500 font-bold text-[10px]">✕</span>
                      <span>No promotion allowed</span>
                    </li>
                  </ul>
                </div>
                {limitData?.hasProductMonthly ? (
                  <div className="mt-6 flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-500 py-2.5 bg-gray-50 border border-gray-200 rounded-xl">
                    <Lock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Disabled on Monthly Plan</span>
                  </div>
                ) : limitData && limitData.freeProductsRemaining === 0 ? (
                  <div className="mt-6 flex items-center justify-center gap-1.5 text-xs font-semibold text-red-600 py-2.5 bg-red-50 border border-red-100 rounded-xl">
                    <span>No free listings left</span>
                  </div>
                ) : (
                  <div className="w-full mt-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20">
                    <Check className="w-3.5 h-3.5" />
                    <span>Current Plan</span>
                  </div>
                )}
              </div>

              {/* Basic Plan */}
              <div 
                className={`relative rounded-xl border p-5 flex flex-col justify-between transition-all ${
                  limitData?.hasProductMonthly && activePlanType === "BASIC"
                    ? "border-blue-500 bg-blue-50/5 ring-1 ring-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)] scale-[1.01]"
                    : (limitData?.hasProductMonthly && activePlanType !== "BASIC")
                    ? "border-gray-200 bg-gray-50/20 opacity-60"
                    : "border-gray-200 hover:border-blue-300 bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-blue-100">
                      Basic
                    </span>
                    {limitData?.hasProductMonthly && activePlanType === "BASIC" && (
                      <span className="text-[10px] text-white font-bold bg-blue-500 px-2 py-0.5 rounded-full border border-blue-600 shadow-sm">
                        Active
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-950 text-base">Basic Plan</h3>
                  <p className="text-xl font-black text-blue-600 mt-1">29 AED <span className="text-[10px] font-normal text-gray-400">/mo</span></p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Active for 15 days per listing</p>
                  {limitData?.hasProductMonthly && activePlanType === "BASIC" && (
                    <div className="mt-2.5 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg text-xs font-bold text-blue-700 flex items-center justify-between">
                      <span>Listings Used:</span>
                      <span>{limitData.basicListingsUsed || 0} / {limitData.basicListingsLimit || 10}</span>
                    </div>
                  )}

                  <ul className="mt-4 space-y-2 text-xs text-gray-600 border-t pt-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Up to 10 listings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Standard visibility</span>
                    </li>
                    <li className="flex items-center gap-2 text-red-500 font-medium">
                      <span className="shrink-0 text-red-500 font-bold text-[10px]">✕</span>
                      <span>No promotion included</span>
                    </li>
                  </ul>
                </div>
                {limitData?.hasProductMonthly && activePlanType === "BASIC" ? (
                  <div className="flex flex-col gap-1.5 w-full mt-6">
                    <div className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-500 text-white flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20">
                      <Check className="w-3.5 h-3.5" />
                      <span>Current Plan</span>
                    </div>
                    {limitData?.productMonthlyCancelAtPeriodEnd ? (
                      <p className="text-[10px] text-red-500 font-medium text-center mt-1">
                        Expires on {new Date(limitData.productMonthlyEndsAt || "").toLocaleDateString()} (Cancelled)
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowCancelModal(true)}
                        className="text-[11px] text-gray-500 hover:text-red-600 transition-colors font-medium text-center cursor-pointer mt-1"
                      >
                        Cancel Subscription
                      </button>
                    )}
                  </div>
                ) : (limitData?.hasProductMonthly && activePlanType !== "BASIC") ? (
                  limitData?.productMonthlyPendingPlanType === "BASIC" ? (
                    <div className="w-full mt-6 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-white flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20">
                      <Clock className="w-3.5 h-3.5 animate-pulse" />
                      <span>Downgrade Pending</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowDowngradeModal(true)}
                      disabled={isDowngrading}
                      className="w-full mt-6 py-2.5 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-sm hover:shadow-amber-500/10 transition-all active:scale-95 cursor-pointer"
                    >
                      {isDowngrading ? "Processing..." : "Downgrade to Basic"}
                    </button>
                  )
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSubscribe("BASIC")}
                    disabled={subscribingPlan !== null}
                    className={`w-full mt-6 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-blue-500/10 transition-all ${
                      subscribingPlan !== null ? "opacity-50 cursor-not-allowed" : "active:scale-95 cursor-pointer"
                    }`}
                  >
                    {subscribingPlan === "BASIC" ? "Processing..." : "Subscribe Now"}
                  </button>
                )}
              </div>

              {/* Pro Plan */}
              <div 
                className={`relative rounded-xl border p-5 flex flex-col justify-between transition-all ${
                  limitData?.hasProductMonthly && activePlanType === "PRO"
                    ? "border-indigo-500 bg-indigo-50/10 ring-2 ring-indigo-500/35 shadow-[0_0_25px_rgba(99,102,241,0.2)] scale-[1.02] z-10"
                    : limitData?.hasProductMonthly && activePlanType === "BASIC"
                    ? "border-indigo-200 hover:border-indigo-300 bg-indigo-50/5 hover:shadow-md cursor-pointer"
                    : "border-gray-200 hover:border-indigo-300 bg-white"
                }`}
              >
                <span className="absolute -top-2.5 right-4 bg-indigo-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm z-10">
                  Best Value
                </span>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-indigo-50 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-indigo-100">
                      Pro Seller
                    </span>
                    {limitData?.hasProductMonthly && activePlanType === "PRO" && (
                      <span className="text-[10px] text-white font-bold bg-indigo-600 px-2 py-0.5 rounded-full border border-indigo-700 shadow-sm">
                        Active
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-950 text-base">Pro Plan</h3>
                  <p className="text-xl font-black text-indigo-600 mt-1">59 AED <span className="text-[10px] font-normal text-gray-400">/mo</span></p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Active for 30 days per listing</p>

                  <ul className="mt-4 space-y-2 text-xs text-gray-600 border-t pt-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Unlimited listings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Higher ranking in search</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>"Pro Seller" badge & promo</span>
                    </li>
                  </ul>
                </div>
                {limitData?.hasProductMonthly && activePlanType === "PRO" ? (
                  <div className="flex flex-col gap-1.5 w-full mt-6">
                    <div className="w-full py-2.5 rounded-xl text-xs font-bold bg-indigo-600 text-white flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20">
                      <Check className="w-3.5 h-3.5" />
                      <span>Current Plan</span>
                    </div>
                    {limitData?.productMonthlyCancelAtPeriodEnd ? (
                      <p className="text-[10px] text-red-500 font-medium text-center mt-1">
                        Expires on {new Date(limitData.productMonthlyEndsAt || "").toLocaleDateString()} (Cancelled)
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowCancelModal(true)}
                        className="text-[11px] text-gray-500 hover:text-red-600 transition-colors font-medium text-center cursor-pointer mt-1"
                      >
                        Cancel Subscription
                      </button>
                    )}
                  </div>
                ) : limitData?.hasProductMonthly && activePlanType === "BASIC" ? (
                  <button
                    type="button"
                    onClick={() => handleSubscribe("PRO")}
                    disabled={subscribingPlan !== null}
                    className={`w-full mt-6 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-indigo-500/10 transition-all ${
                      subscribingPlan !== null ? "opacity-50 cursor-not-allowed" : "active:scale-95 cursor-pointer"
                    }`}
                  >
                    {subscribingPlan === "PRO" ? "Processing..." : "Upgrade Plan"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSubscribe("PRO")}
                    disabled={subscribingPlan !== null}
                    className={`w-full mt-6 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-indigo-500/10 transition-all ${
                      subscribingPlan !== null ? "opacity-50 cursor-not-allowed" : "active:scale-95 cursor-pointer"
                    }`}
                  >
                    {subscribingPlan === "PRO" ? "Processing..." : "Subscribe Now"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Downgrade Confirmation Modal */}
          {showDowngradeModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in p-4">
              <div className="bg-white rounded-2xl p-5 sm:p-6 w-full max-w-md shadow-2xl border border-gray-100 relative transform transition-all scale-100">
                <div className="flex items-center gap-3 mb-4 text-amber-600">
                  <div className="p-2.5 bg-amber-50 rounded-full shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Confirm Plan Downgrade</h3>
                </div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Your plan will downgrade to the <span className="font-bold text-blue-600">Basic Seller Plan</span> once your current Pro Plan billing cycle finishes. 
                  <br /><br />
                  You will not pay anything right now. The new amount of <span className="font-bold text-gray-900">29 AED/month</span> will be automatically charged on your next renewal date.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowDowngradeModal(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDowngradeConfirm}
                    disabled={isDowngrading}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-md shadow-amber-600/10"
                  >
                    {isDowngrading ? "Processing..." : "Confirm Downgrade"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Cancel Confirmation Modal */}
          {showCancelModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in p-4">
              <div className="bg-white rounded-2xl p-5 sm:p-6 w-full max-w-md shadow-2xl border border-gray-100 relative transform transition-all scale-100">
                <div className="flex items-center gap-3 mb-4 text-red-600">
                  <div className="p-2.5 bg-red-50 rounded-full shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Cancel Subscription</h3>
                </div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Are you sure you want to cancel your monthly listing plan? 
                  <br /><br />
                  Your plan will remain <span className="font-semibold text-emerald-600">fully active</span> until the end of the current billing cycle. After that, your premium listing access will end and no further amounts will be deducted.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handleCancelConfirm}
                    disabled={isCancelling}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-md shadow-red-600/10"
                  >
                    {isCancelling ? "Processing..." : "Yes, Cancel Plan"}
                  </button>
                </div>
              </div>
            </div>
          )}

          <ReviewForm />
        </div>

        {/* Right Column (Sidebar) */}
        <UserDashboardSidebar activePage="dashboard" />
      </div>
    </div>
  );
}

export default function UserDashboard() {
  return <UserDashboardContent />;
}
