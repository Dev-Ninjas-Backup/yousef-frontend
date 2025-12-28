import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    "User",
    "Garage",
    "Booking",
    "Service",
    "Inquiry",
    "Message",
    "GarageAdminOverviewStats",
    "GarageAdminOverviewPerformanceSummary",
    "GarageAdminOverviewRecentActivity",
    "GarageAdminOverviewRecentListings",
    "GarageAdminOverviewAvailableListing",
    "SubscriptionCurrentPlan",
    "SubscriptionTransactionHistory",
  ],
  endpoints: () => ({}),
});
