"use client";

import GarageInformation from "./_components/GarageInformation/GarageInformation";
import NotificationSettings from "./_components/NotificationSettings/NotificationSettings";

export default function ProfileSettingsPage() {
  return (
    <div className="space-y-6 bg-[#F9FAFB] rounded-2xl p-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Profile & Settings</h1>
        <p className="text-base text-gray-500 mt-1">
          Manage your garage information
        </p>
      </div>
      
      <GarageInformation />
      <NotificationSettings />
    </div>
  );
}
