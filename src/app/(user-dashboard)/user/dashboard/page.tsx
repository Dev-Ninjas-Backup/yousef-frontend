"use client";

import ProfileHeader from "./_components/ProfileHeader";
import ProfileForm from "./_components/ProfileForm";
import LoadingSpinner from "./_components/LoadingSpinner";
import ErrorMessage from "./_components/ErrorMessage";
import { useProfileManagement } from "./_components/useProfileManagement";
import ReviewForm from "./_components/ReviewForm";

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
    <div className="w-full">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
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
        <ReviewForm />

      </div>
    </div>
  );
}

export default function UserDashboard() {
  return <UserDashboardContent />;
}
