import NotificationToggle from "./NotificationToggle";

interface NotificationData {
  isEmailNotification?: boolean;
  isEmailPromotional?: boolean;
}

interface NotificationsSectionProps {
  notifications: { data: NotificationData } | undefined;
  onToggleNotification: (type: "email" | "promotional") => void;
}

export default function NotificationsSection({
  notifications,
  onToggleNotification,
}: NotificationsSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-gray-200">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          Notifications
        </h2>
      </div>

      <div className="divide-y divide-gray-200">
        <NotificationToggle
          title="Email Notifications"
          description="Receive booking confirmations and updates via email"
          isEnabled={!!notifications?.data?.isEmailNotification}
          onToggle={() => onToggleNotification("email")}
        />
        
        <NotificationToggle
          title="Promotional Emails"
          description="Receive special offers and promotions"
          isEnabled={!!notifications?.data?.isEmailPromotional}
          onToggle={() => onToggleNotification("promotional")}
        />
      </div>
    </div>
  );
}