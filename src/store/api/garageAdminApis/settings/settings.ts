import { apiSlice } from "../../apiSlice";

// 1. Notification Settings Interface
export interface NotificationSettingsResponse {
  emailNotification: boolean;
  customerInquiryNotification: boolean;
  productApprovalNotification: boolean;
}

enum NotificationToggleEndpoint {
  Email = "/garage-admin-settings/email-notification",
  CustomerInquiry = "/garage-admin-settings/customer-inquiry-alert",
  ProductApproval = "/garage-admin-settings/product-approval-update",
}

export const garageAdminSettings = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationSettings: builder.query<NotificationSettingsResponse, void>({
      query: () => "/garage-admin-settings/notifications",
      providesTags: ["GarageAdminNotificationSettings"],
    }),

    toggleNotification: builder.mutation<
      void,
      { endpoint: NotificationToggleEndpoint }
    >({
      query: ({ endpoint }) => ({
        url: endpoint,
        method: "PATCH",
      }),
      invalidatesTags: ["GarageAdminNotificationSettings"],
    }),
  }),
});

export const {
  useGetNotificationSettingsQuery,
  useToggleNotificationMutation,
} = garageAdminSettings;

export { NotificationToggleEndpoint };
