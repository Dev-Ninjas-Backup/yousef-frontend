"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  useGetAllNotificationsQuery,
  useToggleEmailNotificationMutation,
  useToggleSmsNotificationMutation,
  useToggleEmailPromotionalMutation,
  useChangePasswordMutation,
  useDeleteUserAccountMutation,
} from "@/store/api/accountSettingsApi";
import { logout } from "@/store/slices/authSlice";

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function useSettingsManagement() {
  const router = useRouter();
  const dispatch = useDispatch();

  // API hooks
  const { data: notifications, isLoading } = useGetAllNotificationsQuery();
  const [toggleEmailNotification] = useToggleEmailNotificationMutation();
  const [toggleSmsNotification] = useToggleSmsNotificationMutation();
  const [toggleEmailPromotional] = useToggleEmailPromotionalMutation();
  const [changePassword] = useChangePasswordMutation();
  const [deleteAccount] = useDeleteUserAccountMutation();

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleToggleNotification = async (
    type: "email" | "sms" | "promotional"
  ) => {
    try {
      let result;
      switch (type) {
        case "email":
          result = await toggleEmailNotification().unwrap();
          break;
        case "sms":
          result = await toggleSmsNotification().unwrap();
          break;
        case "promotional":
          result = await toggleEmailPromotional().unwrap();
          break;
      }
      toast.success(result.message);
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to update notification setting"
      );
    }
  };

  const handleChangePassword = async (passwordData: PasswordData) => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    try {
      const result = await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }).unwrap();

      toast.success(result.message);
      setShowPasswordForm(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const result = await deleteAccount().unwrap();
      toast.success(result.message);
      dispatch(logout());
      router.push("/");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete account");
    }
  };

  return {
    notifications,
    isLoading,
    showPasswordForm,
    setShowPasswordForm,
    handleToggleNotification,
    handleChangePassword,
    handleDeleteAccount,
  };
}