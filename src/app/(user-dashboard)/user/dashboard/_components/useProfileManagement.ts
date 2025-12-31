"use client";

import { useState, useRef, useEffect } from "react";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "@/store/api/userApi";
import { toast } from "sonner";

interface FormData {
  fullName: string;
  bio: string;
  phoneNumber: string;
  address: string;
  city: string;
  emirate: string;
  userLat: string;
  userLng: string;
}

export function useProfileManagement() {
  const { data: profileData, isLoading, error } = useGetUserProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
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
  useEffect(() => {
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

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  return {
    profileData,
    isLoading,
    error,
    isUpdating,
    isEditing,
    setIsEditing,
    selectedFile,
    previewUrl,
    fileInputRef,
    formData,
    handleInputChange,
    handleFileSelect,
    handleSave,
    handleCancel,
    handleFileClick,
  };
}