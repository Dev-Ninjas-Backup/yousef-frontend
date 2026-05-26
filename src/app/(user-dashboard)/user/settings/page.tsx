"use client";

import { 
  ShieldCheck
} from "lucide-react";
import NotificationsSection from "./_components/NotificationsSection";
import PasswordChangeForm from "./_components/PasswordChangeForm";
import DeleteAccountSection from "./_components/DeleteAccountSection";
import { useSettingsManagement } from "./_components/useSettingsManagement";
import UserDashboardHeader from "@/components/shared/dashboard/user/UserDashboardHeader";
import UserDashboardSidebar from "@/components/shared/dashboard/user/UserDashboardSidebar";

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
    <div className="w-full pt-1 pb-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Left Column (Settings) */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <UserDashboardHeader activeTab="settings" />

          {/* Header */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              Account Settings
            </h1>
            <p className="text-sm text-gray-500">
              Manage your notifications and preferences
            </p>
          </div>

          <NotificationsSection
            notifications={notifications}
            onToggleNotification={handleToggleNotification}
          />

          {/* Account Actions Section */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm">
            {/* Section Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-full shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Account Actions
                </h2>
                <p className="text-sm text-gray-500">
                  Manage your security and account preferences
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <PasswordChangeForm
                showForm={showPasswordForm}
                onToggleForm={setShowPasswordForm}
                onSubmit={handleChangePassword}
              />
              <DeleteAccountSection onDeleteAccount={handleDeleteAccount} />
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <UserDashboardSidebar activePage="settings" />
      </div>
    </div>
  );
}
