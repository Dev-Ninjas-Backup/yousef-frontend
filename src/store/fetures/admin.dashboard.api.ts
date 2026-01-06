import { apiSlice } from '../api/apiSlice';

// Types based on backend response
export interface DashboardOverview {
  userStats: {
    total: number;
    newLast30Days: number;
    percentageChange: number;
  };
  garageStats: {
    totalOwners: number;
    newLast30Days: number;
    pendingApproval: number;
    percentageChange: number;
  };
  PartsListing: {
    total: number;
    newLast30Days: number;
    percentageChange: number;
  };
  pendingAllTotal: {
    pendingApprovalCount: number;
  };
  messageStats: {
    unreadCount: number;
  };
  revenueStats: {
    totalRevenueLast30Days: number;
    prior30DaysRevenue: number;
    percentageGrowth: number;
  };
}

export interface RecentActivityItem {
  id: string;
  type: 'PRODUCT_SUBMISSION' | 'NEW_GARAGE' | 'NEW_USER';
  message: string;
  timestamp: string;
  timeAgo: string;
}

export interface PartsCategoryStats {
  success: boolean;
  data: {
    totalProducts: number;
    categoryStatistics: {
      categoryId: string;
      categoryName: string;
      productCount: number;
      percentage: number;
    }[];
  };
  message: string;
}

export interface RevenueTrend {
  month: string;
  revenue: number;
}

export const adminDashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query<DashboardOverview, void>({
      query: () => '/admin-dashboard-overview/monitor-platform',
      providesTags: ['Admin'],
    }),

    getRecentActivity: builder.query<RecentActivityItem[], void>({
      query: () => '/admin-dashboard-overview/recent-activity',
      providesTags: ['Admin'],
    }),

    getPartsCategory: builder.query<PartsCategoryStats, void>({
      query: () => '/admin-dashboard-overview/parts-category',
      providesTags: ['Product'],
    }),

    getRevenueTrends: builder.query<RevenueTrend[], void>({
      query: () => '/admin-dashboard-overview/revenue-trends',
      providesTags: ['Financials'],
    }),
  }),
});

export const {
  useGetDashboardOverviewQuery,
  useGetRecentActivityQuery,
  useGetPartsCategoryQuery,
  useGetRevenueTrendsQuery,
} = adminDashboardApi;
