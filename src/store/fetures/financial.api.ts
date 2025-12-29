import { apiSlice } from "../api/apiSlice";

export interface RevenueByType {
  type: string;
  amount: number;
}

export interface FinancialOverview {
  thisMonthRevenue: number;
  revenueByType: RevenueByType[];
}

export interface RevenueTransactionChart {
  month: string;
  revenue: number;
}

export interface Transaction {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  type: string;
  method: string;
  status: string;
  source?: string;
  paymentMethod?: string;
  userInformation?: string;
  updatedAt?: string;
  productID?: string;
}


export const financialsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getFinancialOverview: builder.query<FinancialOverview, void>({
      query: () => "/spareparts-financials/financial-overview",
      providesTags: ["Financials" as any], 
    }),

    getRevenueChartData: builder.query<RevenueTransactionChart[], void>({
      query: () => "/spareparts-financials/revenue-transactions",
      providesTags: ["Financials" as any],
    }),

    getRecentTransactions: builder.query<Transaction[], void>({
      query: () => "/spareparts-financials/recent-transactions",
      providesTags: ["Financials" as any],
    }),

    getLast30DaysData: builder.query<Transaction[], void>({
      query: () => "/spareparts-financials/last-30-all-data",
      providesTags: ["Financials" as any],
    }),
  }),
});

export const {
  useGetFinancialOverviewQuery,
  useGetRevenueChartDataQuery,
  useGetRecentTransactionsQuery,
  useGetLast30DaysDataQuery,
} = financialsApiSlice;