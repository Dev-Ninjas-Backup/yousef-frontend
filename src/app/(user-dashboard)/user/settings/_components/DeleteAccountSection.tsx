import { useState } from "react";
import { ShieldAlert, Trash2 } from "lucide-react";

interface DeleteAccountSectionProps {
  onDeleteAccount: () => void;
}

export default function DeleteAccountSection({
  onDeleteAccount,
}: DeleteAccountSectionProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="p-4 sm:p-5 bg-[#FFF5F5] border border-red-100/80 rounded-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1">
          {/* Icon Wrapper */}
          <div className="p-2.5 sm:p-3 bg-red-100 text-red-600 rounded-xl shrink-0 mt-1 sm:mt-0">
            <ShieldAlert className="w-5 h-5" />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-red-100/80 text-red-700">
                Danger Zone
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 leading-tight">
              Delete Account
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-normal">
              Permanently delete your account and all associated data
            </p>
          </div>
        </div>

        {/* Delete Account Button */}
        {!showConfirm && (
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-red-200 bg-white hover:bg-red-50 text-red-600 text-sm font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shrink-0 self-start sm:self-center"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        )}
      </div>

      {showConfirm && (
        <div className="mt-5 pt-5 border-t border-red-200/50 space-y-4">
          <div className="p-4 bg-white border border-red-200 rounded-xl">
            <p className="text-sm text-red-800 leading-relaxed">
              <strong>Warning:</strong> This action cannot be undone. All your
              data, listings, and preferences will be permanently deleted.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onDeleteAccount}
              className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Yes, Delete My Account
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}