"use client";

import { useState } from "react";

export default function UserSettingsPage() {
  // Notification states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [promotionalEmails, setPromotionalEmails] = useState(false);

  const handleChangePassword = () => {
    console.log("Change password clicked");
    // Add change password logic here
  };

  const handleDeleteAccount = () => {
    console.log("Delete account clicked");
    // Add delete account logic here
  };

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
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    emailNotifications ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      emailNotifications ? "translate-x-6" : "translate-x-1"
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
                  onClick={() => setSmsNotifications(!smsNotifications)}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    smsNotifications ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      smsNotifications ? "translate-x-6" : "translate-x-1"
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
                  onClick={() => setPromotionalEmails(!promotionalEmails)}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    promotionalEmails ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      promotionalEmails ? "translate-x-6" : "translate-x-1"
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
              <button
                onClick={handleChangePassword}
                className="inline-flex items-center justify-center px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Change Password
              </button>
            </div>

            {/* Delete Account */}
            <div className="px-5 sm:px-6 py-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Delete Account
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Permanently delete your account and all associated data
              </p>
              <button
                onClick={handleDeleteAccount}
                className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}