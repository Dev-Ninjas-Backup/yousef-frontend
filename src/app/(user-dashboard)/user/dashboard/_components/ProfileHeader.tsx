"use client";

import React from "react";
import Image from "next/image";
import { LuPencil, LuCamera } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import Avatar from "@/assets/avatar/avatar.png";

interface User {
  fullName?: string;
  email: string;
  role?: string;
  profilePhoto?: string;
}

interface ProfileHeaderProps {
  user: User;
  isEditing: boolean;
  previewUrl: string | null;
  isUpdating: boolean;
  onEditToggle: () => void;
  onCancel: () => void;
  onSave: () => void;
  onFileSelect: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileHeader({
  user,
  isEditing,
  previewUrl,
  isUpdating,
  onEditToggle,
  onCancel,
  onSave,
  onFileSelect,
  fileInputRef,
  onFileChange,
}: ProfileHeaderProps) {
  return (
    <div className="p-6 sm:p-8 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-300">
              <Image
                src={previewUrl || user.profilePhoto || Avatar}
                alt="Profile Picture"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Crect fill='%23E5E7EB' width='96' height='96'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='32' fill='%239CA3AF'%3E${
                    user.fullName?.charAt(0) || "U"
                  }%3C/text%3E%3C/svg%3E`;
                }}
              />
            </div>
            {isEditing && (
              <button
                onClick={onFileSelect}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <LuCamera className="w-4 h-4" />
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
              aria-label="Upload profile picture"
              title="Upload profile picture"
            />
          </div>

          {/* Name and Email */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {user.fullName || "User"}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              {user.email}
            </p>
            <p className="text-xs text-gray-500 mt-1 capitalize">
              {user.role?.toLowerCase().replace("_", " ")}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {!isEditing ? (
            <Button
              onClick={onEditToggle}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500"
            >
              <LuPencil className="w-4 h-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                onClick={onSave}
                disabled={isUpdating}
                className="bg-blue-600 hover:bg-blue-500"
              >
                {isUpdating ? "Saving..." : "Save"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}