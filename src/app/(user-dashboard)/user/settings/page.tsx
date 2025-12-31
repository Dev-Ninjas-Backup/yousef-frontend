"use client";

import NotificationsSection from "./_components/NotificationsSection";
import PasswordChangeForm from "./_components/PasswordChangeForm";
import DeleteAccountSection from "./_components/DeleteAccountSection";
import { useSettingsManagement } from "./_components/useSettingsManagement";

export default function UserSettingsPage() {
  const {
    notifications,
    isLoading,
    showPasswordForm,
    setShowPasswordForm,
    handleToggleNotification,
    handleChangePassword,
    handleDeleteAccount,
  } = useSettingsManagement();

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
          Account Settings
        </h1>
        <p className="text-sm text-gray-600">
          Manage your notifications and preferences
        </p>
      </div>

      <div className="space-y-6">
        <NotificationsSection
          notifications={notifications}
          onToggleNotification={handleToggleNotification}
        />

        {/* Account Actions Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Account Actions
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            <PasswordChangeForm
              showForm={showPasswordForm}
              onToggleForm={setShowPasswordForm}
              onSubmit={handleChangePassword}
            />
            <DeleteAccountSection onDeleteAccount={handleDeleteAccount} />
          </div>
        </div>
      </div>
    </div>
  );
}
