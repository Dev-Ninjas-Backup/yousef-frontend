import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export interface NotificationSettings {
  isEmailNotification: boolean;
  isSmsNotification: boolean;
  isEmailPromotional: boolean;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const accountSettingsApi = createApi({
  reducerPath: "accountSettingsApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["NotificationSettings"],
  endpoints: (builder) => ({
    // Get all notifications
    getAllNotifications: builder.query<
      { success: boolean; data: NotificationSettings; message: string },
      void
    >({
      query: () => ({
        url: "/account-setting/all-notifications",
        method: "GET",
      }),
      providesTags: ["NotificationSettings"],
    }),

    // Toggle email notification
    toggleEmailNotification: builder.mutation<
      { success: boolean; data: { isEmailNotification: boolean }; message: string },
      void
    >({
      query: () => ({
        url: "/account-setting/toggle-email-notification",
        method: "PATCH",
      }),
      invalidatesTags: ["NotificationSettings"],
    }),

    // Toggle SMS notification
    toggleSmsNotification: builder.mutation<
      { success: boolean; data: { isSmsNotification: boolean }; message: string },
      void
    >({
      query: () => ({
        url: "/account-setting/toggle-sms-notification",
        method: "PATCH",
      }),
      invalidatesTags: ["NotificationSettings"],
    }),

    // Toggle email promotional
    toggleEmailPromotional: builder.mutation<
      { success: boolean; data: { isEmailPromotional: boolean }; message: string },
      void
    >({
      query: () => ({
        url: "/account-setting/toggle-email-promotional",
        method: "PATCH",
      }),
      invalidatesTags: ["NotificationSettings"],
    }),

    // Change password
    changePassword: builder.mutation<
      { success: boolean; data: null; message: string },
      ChangePasswordRequest
    >({
      query: (data) => ({
        url: "/account-setting/change-password",
        method: "PATCH",
        body: data,
      }),
    }),

    // Soft delete user account
    deleteUserAccount: builder.mutation<
      { success: boolean; data: null; message: string },
      void
    >({
      query: () => ({
        url: "/account-setting/delete-user",
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useToggleEmailNotificationMutation,
  useToggleSmsNotificationMutation,
  useToggleEmailPromotionalMutation,
  useChangePasswordMutation,
  useDeleteUserAccountMutation,
} = accountSettingsApi;