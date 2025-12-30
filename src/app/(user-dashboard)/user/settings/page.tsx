"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  useGetAllNotificationsQuery,
  useToggleEmailNotificationMutation,
  useToggleSmsNotificationMutation,
  useToggleEmailPromotionalMutation,
  useChangePasswordMutation,
  useDeleteUserAccountMutation,
} from "@/store/api/accountSettingsApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";

export default function UserSettingsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // API hooks
  const { data: notifications, isLoading } = useGetAllNotificationsQuery();
  const [toggleEmailNotification] = useToggleEmailNotificationMutation();
  const [toggleSmsNotification] = useToggleSmsNotificationMutation();
  const [toggleEmailPromotional] = useToggleEmailPromotionalMutation();
  const [changePassword] = useChangePasswordMutation();
  const [deleteAccount] = useDeleteUserAccountMutation();

  // Password change states
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggleNotification = async (type: 'email' | 'sms' | 'promotional') => {
    try {
      let result;
      switch (type) {
        case 'email':
          result = await toggleEmailNotification().unwrap();
          break;
        case 'sms':
          result = await toggleSmsNotification().unwrap();
          break;
        case 'promotional':
          result = await toggleEmailPromotional().unwrap();
          break;
      }
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update notification setting");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    try {
      const result = await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }).unwrap();
      
      toast.success(result.message);
      setShowPasswordForm(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const result = await deleteAccount().unwrap();
      toast.success(result.message);
      dispatch(logout());
      router.push("/");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete account");
    }
  };

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
        {/* Notifications Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Notifications
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {/* Email Notifications */}
            <div className="px-5 sm:px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-gray-600">
                    Receive booking confirmations and updates via email
                  </p>
                </div>
                <button
                  onClick={() => handleToggleNotification('email')}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    notifications?.data?.isEmailNotification ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications?.data?.isEmailNotification ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* SMS Notifications */}
            <div className="px-5 sm:px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    SMS Notifications
                  </h3>
                  <p className="text-sm text-gray-600">
                    Get text messages for appointment reminders
                  </p>
                </div>
                <button
                  onClick={() => handleToggleNotification('sms')}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    notifications?.data?.isSmsNotification ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications?.data?.isSmsNotification ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Promotional Emails */}
            <div className="px-5 sm:px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    Promotional Emails
                  </h3>
                  <p className="text-sm text-gray-600">
                    Receive special offers and promotions
                  </p>
                </div>
                <button
                  onClick={() => handleToggleNotification('promotional')}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    notifications?.data?.isEmailPromotional ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications?.data?.isEmailPromotional ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Account Actions
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {/* Change Password */}
            <div className="px-5 sm:px-6 py-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Change Password
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Update your password to keep your account secure
              </p>
              
              {!showPasswordForm ? (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="inline-flex items-center justify-center px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Change Password
                </button>
              ) : (
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="New Password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Update Password
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Delete Account */}
            <div className="px-5 sm:px-6 py-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Delete Account
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Permanently delete your account and all associated data
              </p>
              
              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete Account
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Warning:</strong> This action cannot be undone. All your data will be permanently deleted.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleDeleteAccount}
                      className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Yes, Delete My Account
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}