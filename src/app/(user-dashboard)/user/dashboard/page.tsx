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
  FolderKanban, 
  MessageSquare,
  Crown,
  ClipboardCheck
} from "lucide-react";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileForm from "./_components/ProfileForm";
import LoadingSpinner from "./_components/LoadingSpinner";
import ErrorMessage from "./_components/ErrorMessage";
import { useProfileManagement } from "./_components/useProfileManagement";
import ReviewForm from "./_components/ReviewForm";
import { useGetMyProductsQuery } from "@/store/api/sparePartsApi";

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

  const { data: myProducts } = useGetMyProductsQuery();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  const user = profileData?.data;
  if (!user) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
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

  return (
    <div className="w-full py-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Left Column (Profile & Review Forms) */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              Profile Settings
            </h1>
            <p className="text-sm text-gray-500">
              Update your personal details, location, and write a review
            </p>
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

          <ReviewForm />
        </div>

        {/* Right Column (Sidebar) */}
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
                {user?.fullName || "Yousef Saraj"}
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

            {/* Account Settings Button */}
            <Link
              href="/user/settings"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-blue-200 hover:bg-blue-50/30 text-blue-600 text-sm font-semibold rounded-xl transition-all shadow-sm active:scale-95"
            >
              <Settings className="w-4 h-4" />
              Account Settings
              <ChevronRight className="w-4 h-4 ml-auto text-blue-400" />
            </Link>
          </div>

          {/* Plan Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            {/* Plan Header */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
                Your Plan
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700">
                Active
              </span>
            </div>

            {/* Plan details row */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Pro Seller</h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Next billing: 12 May 2026</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-0.5">
                  <span className="text-xl font-extrabold text-blue-600">59 AED</span>
                  <span className="text-[10px] text-gray-400">/mo</span>
                </div>
              </div>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-2.5 mb-6">
              {[
                "Unlimited listings",
                "Higher ranking in search",
                '"Pro Seller" badge',
                "Promotion available",
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 border border-blue-200 bg-white hover:bg-blue-50/30 text-blue-600 text-xs font-semibold rounded-xl transition-all shadow-sm"
              >
                <Settings className="w-3.5 h-3.5" />
                Manage Plan
              </button>
              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md hover:shadow-blue-500/20 active:scale-95"
              >
                <Zap className="w-3.5 h-3.5" />
                Upgrade Plan
              </button>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              Quick Actions
            </h3>

            <div className="space-y-3">
              {/* Action 1 */}
              <Link
                href="/user/my-products"
                className="flex items-center justify-between p-3 rounded-xl border border-gray-50 hover:border-amber-100 hover:bg-amber-50/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#FEF3C7] text-[#D97706] rounded-lg group-hover:bg-[#FDE68A] transition-colors">
                    <FolderKanban className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">My Listings</h4>
                    <p className="text-[10px] text-gray-400">View and manage your products</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-amber-600 transition-colors" />
              </Link>

              {/* Action 2 */}
              <Link
                href="/user/messages"
                className="flex items-center justify-between p-3 rounded-xl border border-gray-50 hover:border-amber-100 hover:bg-amber-50/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#FEF3C7] text-[#D97706] rounded-lg group-hover:bg-[#FDE68A] transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">Messages</h4>
                    <p className="text-[10px] text-gray-400">Check your buyer conversations</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-amber-600 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  return <UserDashboardContent />;
}
