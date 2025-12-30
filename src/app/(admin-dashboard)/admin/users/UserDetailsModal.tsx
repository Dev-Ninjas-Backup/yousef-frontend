"use client";

import { Loader2, X } from "lucide-react";
import { useGetUserByIdQuery } from "@/store/fetures/admin.user.api";

interface UserDetailsModalProps {
  userId: string | null;
  onClose: () => void;
}

export default function UserDetailsModal({
  userId,
  onClose,
}: UserDetailsModalProps) {
  const { data, isLoading, isError } = useGetUserByIdQuery(userId!, {
    skip: !userId,
  });

  if (!userId) return null;

  const user = data?.data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg relative">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            User Details
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {isLoading && (
            <div className="flex justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            </div>
          )}

          {isError && (
            <p className="text-sm text-red-600 text-center">
              Failed to load user details
            </p>
          )}

          {user && (
            <div className="space-y-4 text-sm">
              <Detail label="Name" value={user.fullName} />
              <Detail label="Email" value={user.email} />
              <Detail label="Phone" value={user.phone || "N/A"} />
              <Detail label="Role" value={user.role.replace("_", " ")} />
              <Detail label="Vehicles" value={user.vehicles} />
              <Detail
                label="Status"
                value={user.isActive ? "Active" : "Inactive"}
              />
              <Detail
                label="Joined"
                value={new Date(user.createdAt).toLocaleDateString()}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900 text-right">
        {value}
      </span>
    </div>
  );
}
