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
  id: string;
  partName: string;
  status: string;
  createdAt: string;
}
type RecentActivityResponse = Activity[];

// Category interface
interface Category {
  id: string;
  name: string;
}

// Main Activity interface
interface Listing {
  id: string;
  partName: string;
  photos: string[];
  brand: string;
  category: Category;
  price: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

// If you need the array type
type ListingsResponse = Listing[];

// 5. Available Listing Interface
interface AvailableListingResponse {
  totalFreeProducts: number;
  freeProductsUsed: number;
  freeProductsRemaining: number;
  remainingPercentage: number;
  hasFreeProductsLeft: boolean;
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
    // not used yet...........
    getRecentActivity: builder.query<RecentActivityResponse, void>({
      query: () => "/garage-admin-overview/recent-activity",
      providesTags: ["GarageAdminOverviewRecentActivity"],
    }),
    getRecentListings: builder.query<ListingsResponse, void>({
      query: () => "/garage-admin-overview/recent-listings",
      providesTags: ["GarageAdminOverviewRecentListings"],
    }),
    getAvailableListing: builder.query<AvailableListingResponse, void>({
      query: () => "/garage-admin-overview/available-listing",
      providesTags: ["GarageAdminOverviewAvailableListing"],
    }),
  }),
});

export const {
  useGetStatsQuery,
  useGetPerformanceSummaryQuery,
  useGetRecentActivityQuery,
  useGetRecentListingsQuery,
  useGetAvailableListingQuery,
} = overView;
