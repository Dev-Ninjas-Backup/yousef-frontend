"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { LuPencil, LuMail, LuPhone, LuMapPin, LuCamera } from "react-icons/lu";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "@/store/api/userApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

import Avatar from "@/assets/avatar/avatar.png";

function UserDashboardContent() {
  const { data: profileData, isLoading, error } = useGetUserProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    phoneNumber: "",
    address: "",
    city: "",
    emirate: "",
    userLat: "",
    userLng: "",
  });

  // Update form data when profile loads
  React.useEffect(() => {
    if (profileData?.data) {
      const user = profileData.data;
      setFormData({
        fullName: user.fullName || "",
        bio: user.bio || "",
        phoneNumber: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        emirate: user.emirate || "",
        userLat: user.userLat || "",
        userLng: user.userLng || "",
      });
    }
  }, [profileData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSave = async () => {
    try {
      const updateData = {
        ...formData,
        ...(selectedFile && { file: selectedFile }),
      };

      await updateProfile(updateData).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="text-red-600">Failed to load profile</div>
      </div>
    );
  }

  const user = profileData?.data;
  if (!user) return null;

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Profile Header Section */}
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
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <LuCamera className="w-4 h-4" />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
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
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500"
                >
                  <LuPencil className="w-4 h-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
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

        {/* Form Section */}
        <div className="p-6 sm:p-8">
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your full name"
              />
            </div>

            {/* Bio */}
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                disabled={!isEditing}
                placeholder="Tell us about yourself"
                rows={3}
              />
            </div>

            {/* Email (Read-only) */}
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <LuMail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  value={user.email}
                  disabled
                  className="pl-10 bg-gray-50"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="relative">
                <LuPhone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  disabled={!isEditing}
                  placeholder="+971 50 123 4567"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address">Street Address</Label>
              <div className="relative">
                <LuMapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={!isEditing}
                  placeholder="1234 Main Street"
                  className="pl-10"
                />
              </div>
            </div>

            {/* City & Emirate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => handleInputChange("city", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dubai">Dubai</SelectItem>
                    <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                    <SelectItem value="sharjah">Sharjah</SelectItem>
                    <SelectItem value="ajman">Ajman</SelectItem>
                    <SelectItem value="rak">Ras Al Khaimah</SelectItem>
                    <SelectItem value="fujairah">Fujairah</SelectItem>
                    <SelectItem value="uaq">Umm Al Quwain</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="emirate">Emirate</Label>
                <Select
                  value={formData.emirate}
                  onValueChange={(value) => handleInputChange("emirate", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select emirate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dubai">Dubai</SelectItem>
                    <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                    <SelectItem value="sharjah">Sharjah</SelectItem>
                    <SelectItem value="ajman">Ajman</SelectItem>
                    <SelectItem value="ras-al-khaimah">
                      Ras Al Khaimah
                    </SelectItem>
                    <SelectItem value="fujairah">Fujairah</SelectItem>
                    <SelectItem value="umm-al-quwain">Umm Al Quwain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Coordinates (Optional) */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="userLat">Latitude (Optional)</Label>
                <Input
                  id="userLat"
                  value={formData.userLat}
                  onChange={(e) => handleInputChange("userLat", e.target.value)}
                  disabled={!isEditing}
                  placeholder="25.2048"
                />
              </div>

              <div>
                <Label htmlFor="userLng">Longitude (Optional)</Label>
                <Input
                  id="userLng"
                  value={formData.userLng}
                  onChange={(e) => handleInputChange("userLng", e.target.value)}
                  disabled={!isEditing}
                  placeholder="55.2708"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  return <UserDashboardContent />;
}
