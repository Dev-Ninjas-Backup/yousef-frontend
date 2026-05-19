import React from "react";
import { LucideIcon } from "lucide-react";

interface NotificationToggleProps {
  title: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
  icon: LucideIcon;
  badgeText?: string;
  iconBgClass?: string;
  iconClass?: string;
}

export default function NotificationToggle({
  title,
  description,
  isEnabled,
  onToggle,
  icon: Icon,
  badgeText,
  iconBgClass = "bg-blue-50",
  iconClass = "text-blue-600",
}: NotificationToggleProps) {
  return (
    <div className="p-4 sm:p-5 bg-[#F8FAFC] border border-gray-100/80 rounded-xl flex items-center justify-between gap-4 transition-all hover:shadow-sm">
      <div className="flex items-center gap-3 sm:gap-4 flex-1">
        {/* Icon Wrapper */}
        <div className={`p-2.5 sm:p-3 rounded-xl shrink-0 ${iconBgClass}`}>
          <Icon className={`w-5 h-5 ${iconClass}`} />
        </div>

        {/* Text Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-tight">
              {title}
            </h3>
            {badgeText && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-blue-100 text-blue-700">
                {badgeText}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-500 leading-normal">
            {description}
          </p>
        </div>
      </div>

      {/* Switch Button */}
      <button
        type="button"
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isEnabled ? "bg-blue-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
            isEnabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}