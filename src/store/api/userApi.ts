import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    console.log("🔑 Auth Token:", token ? "Present" : "Missing");
    console.log("🌍 API Base URL:", process.env.NEXT_PUBLIC_API_URL);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export interface User {
  id: string;
  role: string;
  fullName: string;
  profilePhoto?: string;
  bio?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  emirate?: string;
  userLat?: string;
  userLng?: string;
  createdAt: string;
  updatedAt: string;
  serviceCategories?: string[];
  garages?: any[];
}

export interface UpdateProfileRequest {
  fullName?: string;
  bio?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  emirate?: string;
  userLat?: string;
  userLng?: string;
  file?: File;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User", "Profile"],
  endpoints: (builder) => ({
    // Get all users (admin only)
    getAllUsers: builder.query<
      { success: boolean; data: User[]; message: string },
      void
    >({
      query: () => ({
        url: "/user/all",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Get current user profile
    getUserProfile: builder.query<
      { success: boolean; data: User; message: string },
      void
    >({
      query: () => {
        console.log("🔍 Fetching user profile...");
        return {
          url: "/user/me/profile",
          method: "GET",
        };
      },
      transformErrorResponse: (response: any) => {
        console.error("❌ Profile API Error:", response);
        return response;
      },
      transformResponse: (response: any) => {
        console.log("✅ Profile API Success:", response);
        return response;
      },
      providesTags: ["Profile"],
    }),

    // Update user profile
    updateProfile: builder.mutation<
      { success: boolean; data: User; message: string },
      UpdateProfileRequest
    >({
      query: (data: UpdateProfileRequest) => {
        const formData = new FormData();

        if (data.fullName) formData.append("fullName", data.fullName);
        if (data.bio) formData.append("bio", data.bio);
        if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
        if (data.address) formData.append("address", data.address);
        if (data.city) formData.append("city", data.city);
        if (data.emirate) formData.append("emirate", data.emirate);
        if (data.userLat) formData.append("userLat", data.userLat);
        if (data.userLng) formData.append("userLng", data.userLng);
        if (data.file) formData.append("file", data.file);

        return {
          url: "/user/profile",
          method: "PATCH",
          body: formData,
        };
      },
      transformErrorResponse: (response: any) => {
        if (response.data?.error === "NoSuchBucket") {
          return {
            ...response,
            data: {
              ...response.data,
              message:
                "File upload service is temporarily unavailable. Please try again later or contact support.",
            },
          };
        }
        return response;
      },
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} = userApi;
