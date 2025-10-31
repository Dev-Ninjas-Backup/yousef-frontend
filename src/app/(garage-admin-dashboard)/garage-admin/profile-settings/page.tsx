"use client";

import { Button } from "@/components/ui/button";
import GarageInformation from "./_components/GarageInformation/GarageInformation";
import GarageLogo from "./_components/GarageLogo/GarageLogo";
import NotificationSettings from "./_components/NotificationSettings/NotificationSettings";

export default function ProfileSettingsPage() {
  return (
    <div className="space-y-6 bg-[#F9FAFB] p-6 md:p-8 lg:p-10 rounded-2xl">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Profile & Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your garage information
        </p>
      </div>
    
        <GarageInformation />

        
      

      <div className="flex gap-3">
        <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
        <Button variant="outline">Cancel</Button>
      </div>

      <NotificationSettings />
    </div>
  );
}
