import { get } from "http";
import { apiSlice } from "../../apiSlice";

// 1. Stats Interface
interface StatsResponse {
  totalProducts: number;
  activeListings: number;
  pendingApproval: number;
  totalViews: number;
  totalInquiries: number;
}
// 2. Performance Summary Interface
interface PerformanceSummaryResponse {
  totalViews: number;
  monthlyInquiries: number;
  conversationRate: number;
}
// 3. Recent Activity Interface
interface Activity {
  type: string;
  productName: string;
  timestamp: string;
}
interface RecentActivityResponse {
  activities: Activity[];
}
// 4. Recent Listings Interface
interface Listing {
  id: string;
  partName: string;
  status: string;
  createdAt: string;
}
interface RecentListingsResponse {
  listings: Listing[];
}
// 5. Available Listing Interface
interface AvailableListingResponse {
  totalAllowed: number;
  used: number;
  remaining: number;
}

export const overView = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<StatsResponse, void>({
      query: () => "/garage-admin-overview/stats",
      providesTags: ["GarageAdminOverviewStats"],
    }),
    getPerformanceSummary: builder.query<PerformanceSummaryResponse, void>({
      query: () => "/garage-admin-overview/performance-summary",
      providesTags: ["GarageAdminOverviewPerformanceSummary"],
    }),
  }),
});

export const { useGetStatsQuery, useGetPerformanceSummaryQuery } = overView;
