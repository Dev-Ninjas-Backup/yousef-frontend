import { useState } from "react";
import { ShieldCheck, ChevronRight } from "lucide-react";

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordChangeFormProps {
  showForm: boolean;
  onToggleForm: (show: boolean) => void;
  onSubmit: (data: PasswordData) => void;
}

export default function PasswordChangeForm({
  showForm,
  onToggleForm,
  onSubmit,
}: PasswordChangeFormProps) {
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(passwordData);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleCancel = () => {
    onToggleForm(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="p-4 sm:p-5 bg-[#F8FAFC] border border-gray-100/80 rounded-xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 flex-1">
          {/* Icon Wrapper */}
          <div className="p-2.5 sm:p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 leading-tight">
              Change Password
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-normal">
              Update your password to keep your account secure
            </p>
          </div>
        </div>

        {/* Change Password Button */}
        {!showForm && (
          <button
            type="button"
            onClick={() => onToggleForm(true)}
            className="inline-flex items-center justify-center gap-1 px-4 py-2 border border-blue-200 bg-white hover:bg-blue-50 text-blue-600 text-sm font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shrink-0"
          >
            Change Password
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-5 pt-5 border-t border-gray-100">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
              Current Password
            </label>
            <input
              type="password"
              placeholder="Enter current password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  currentPassword: e.target.value,
                }))
              }
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update Password
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}