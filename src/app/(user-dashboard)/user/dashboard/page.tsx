"use client";

import ProfileHeader from "./_components/ProfileHeader";
import ProfileForm from "./_components/ProfileForm";
import LoadingSpinner from "./_components/LoadingSpinner";
import ErrorMessage from "./_components/ErrorMessage";
import { useProfileManagement } from "./_components/useProfileManagement";
import ReviewForm from "./_components/ReviewForm";
import UserDashboardHeader from "@/components/shared/dashboard/user/UserDashboardHeader";
import UserDashboardSidebar from "@/components/shared/dashboard/user/UserDashboardSidebar";
import Link from "next/link";
import { Zap, Plus, FolderKanban, MessageSquare, ChevronRight } from "lucide-react";

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

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  const user = profileData?.data;
  if (!user) return null;

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
