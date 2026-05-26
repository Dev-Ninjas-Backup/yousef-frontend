"use client";

import ProfileHeader from "./_components/ProfileHeader";
import ProfileForm from "./_components/ProfileForm";
import LoadingSpinner from "./_components/LoadingSpinner";
import ErrorMessage from "./_components/ErrorMessage";
import { useProfileManagement } from "./_components/useProfileManagement";
import ReviewForm from "./_components/ReviewForm";
import UserDashboardHeader from "@/components/shared/dashboard/user/UserDashboardHeader";
import UserDashboardSidebar from "@/components/shared/dashboard/user/UserDashboardSidebar";

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
