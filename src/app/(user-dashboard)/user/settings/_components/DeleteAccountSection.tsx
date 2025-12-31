import { useState } from "react";

interface DeleteAccountSectionProps {
  onDeleteAccount: () => void;
}

export default function DeleteAccountSection({
  onDeleteAccount,
}: DeleteAccountSectionProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="px-5 sm:px-6 py-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-1">
        Delete Account
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Permanently delete your account and all associated data
      </p>

      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete Account
        </button>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> This action cannot be undone. All your
              data will be permanently deleted.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onDeleteAccount}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Yes, Delete My Account
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}