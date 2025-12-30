import { apiSlice } from "../api/apiSlice";

export interface PlatformSetting {
  platformName: string;
  supportEmail: string;
  PlatformDescription: string;
}

export interface PaymentConfig {
  id?: string;
  sparePartsMonthly: string;
  perListingPrice: string;
  promotionalAdPrice: string;
  freePromotionalListings: string;
  freePromotionalListingStatus?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}


export const adminSettingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getPlatformSetting: builder.query<ApiResponse<PlatformSetting>, void>({
      query: () => "/admin-setting/get-platform-setting",
      providesTags: ["AdminSetting" as any],
    }),

    updatePlatformSetting: builder.mutation<ApiResponse<PlatformSetting>, PlatformSetting>({
      query: (settings) => ({
        url: "/admin-setting/platform-setting",
        method: "POST",
        body: settings,
      }),
      invalidatesTags: ["AdminSetting" as any],
    }),

    toggleAutoApproveGarages: builder.mutation<void, void>({
      query: () => ({
        url: "/admin-setting/auto-approve-garages",
        method: "PATCH",
      }),
      invalidatesTags: ["AdminSetting" as any],
    }),

    toggleAutoEmailNotification: builder.mutation<void, void>({
      query: () => ({
        url: "/admin-setting/auto-email-notification",
        method: "PATCH",
      }),
      invalidatesTags: ["AdminSetting" as any],
    }),

    getPaymentConfig: builder.query<ApiResponse<PaymentConfig>, void>({
      query: () => "/admin-setting/payment-config",
      providesTags: ["PaymentConfig" as any],
    }),

    updatePaymentConfig: builder.mutation<ApiResponse<PaymentConfig>, Partial<PaymentConfig>>({
      query: (config) => ({
        url: "/admin-setting/payment-config",
        method: "PATCH",
        body: config,
      }),
      invalidatesTags: ["PaymentConfig" as any],
    }),

    updateFreePromotionalStatus: builder.mutation<void, void>({
      query: () => ({
        url: "/admin-setting/free-promotional-listing-status",
        method: "PATCH",
      }),
      invalidatesTags: ["PaymentConfig" as any],
    }),
  }),
});

export const {
  useGetPlatformSettingQuery,
  useUpdatePlatformSettingMutation,
  useToggleAutoApproveGaragesMutation,
  useToggleAutoEmailNotificationMutation,
  useGetPaymentConfigQuery,
  useUpdatePaymentConfigMutation,
  useUpdateFreePromotionalStatusMutation,
} = adminSettingsApiSlice;