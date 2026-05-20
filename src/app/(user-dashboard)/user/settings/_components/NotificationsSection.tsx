import { Bell, Mail, AlarmClock, Gift } from "lucide-react";
import NotificationToggle from "./NotificationToggle";

interface NotificationData {
  isEmailNotification?: boolean;
  isSmsNotification?: boolean;
  isEmailPromotional?: boolean;
}

interface NotificationsSectionProps {
  notifications: { data: NotificationData } | undefined;
  onToggleNotification: (type: "email" | "sms" | "promotional") => void;
}

export default function NotificationsSection({
  notifications,
  onToggleNotification,
}: NotificationsSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm">
      {/* Section Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-full shrink-0">
          <Bell className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            Notifications
          </h2>
          <p className="text-sm text-gray-500">
            Choose what you want to be notified about
          </p>
        </div>
      </div>

      {/* Grid of Toggle Cards */}
      <div className="grid grid-cols-1 gap-4">
        <NotificationToggle
          title="Email Notifications"
          description="Receive booking confirmations and updates via email"
          isEnabled={!!notifications?.data?.isEmailNotification}
          onToggle={() => onToggleNotification("email")}
          icon={Mail}
          iconBgClass="bg-blue-50"
          iconClass="text-blue-600"
        />

        <NotificationToggle
          title="Listing Expiry Alerts"
          badgeText="Recommended"
          description="Get reminders before your listings expire so you never miss a sale"
          isEnabled={!!notifications?.data?.isSmsNotification}
          onToggle={() => onToggleNotification("sms")}
          icon={AlarmClock}
          iconBgClass="bg-purple-50"
          iconClass="text-purple-600"
        />
        
        <NotificationToggle
          title="Promotions & Offers"
          description="Receive special offers and promotions"
          isEnabled={!!notifications?.data?.isEmailPromotional}
          onToggle={() => onToggleNotification("promotional")}
          icon={Gift}
          iconBgClass="bg-purple-50"
          iconClass="text-purple-600"
        />
      </div>
    </div>
  );
}