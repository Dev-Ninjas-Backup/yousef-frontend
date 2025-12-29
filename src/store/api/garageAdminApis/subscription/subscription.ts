import { apiSlice } from "../../apiSlice";

// 1. Current Plan Interface
interface CurrentPlanResponse {
  planType: "TRIAL" | "PAID" | "NONE";
  status: string;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  message: string;
}
// 2. Create Subscription Interface
interface CreateSubscriptionResponse {
  url: string;
}
// 4. Cancel Subscription Interface
interface CancelSubscriptionResponse {
  message: string;
  effectiveDate: string;
}

// 5 Translation interface
interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  profilePhoto: string | null;
}

interface Transaction {
  sessionId: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  paymentType: string;
  createdAt: string;
  userId: string;
  user: User;
}

type TransactionHistoryResponse = Transaction[];



export const subscriptionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentPlan: builder.query<CurrentPlanResponse, void>({
      query: () => "/subscription/current-plan",
      providesTags: ["SubscriptionCurrentPlan"],
    }),
    createMonthlySubscription: builder.mutation<
      CreateSubscriptionResponse,
      void
    >({
      query: () => ({
        url: "/subscription/monthly-subscription",
        method: "POST",
      }),
      invalidatesTags: ["SubscriptionCurrentPlan"],
    }),

    getTransactionHistory: builder.query<TransactionHistoryResponse, void>({
      query: () => "/subscription/transaction-history",
      providesTags: ["SubscriptionTransactionHistory"],
    }),

    cancelSubscription: builder.mutation<CancelSubscriptionResponse, void>({
      query: () => ({
        url: "/subscription/cancel-subscription",
        method: "PATCH",
      }),
      invalidatesTags: [
        "SubscriptionCurrentPlan",
        "SubscriptionTransactionHistory",
      ],
    }),

  
  }),
});

export const {
  useGetCurrentPlanQuery,
  useCreateMonthlySubscriptionMutation,
  useGetTransactionHistoryQuery,
  useCancelSubscriptionMutation,
} = subscriptionApi;
