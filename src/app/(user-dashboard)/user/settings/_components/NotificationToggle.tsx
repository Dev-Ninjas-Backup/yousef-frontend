interface NotificationToggleProps {
  title: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
}

export default function NotificationToggle({
  title,
  description,
  isEnabled,
  onToggle,
}: NotificationToggleProps) {
  return (
    <div className="px-5 sm:px-6 py-5">
      <div className="flex items-center justify-between">
        <div className="flex-1 pr-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <button
          onClick={onToggle}
          className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isEnabled ? "bg-blue-600" : "bg-gray-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isEnabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}