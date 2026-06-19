import { apiSlice } from "./apiSlice";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ReviewUser {
  id: string;
  fullName: string;
  profilePhoto: string | null;
}

export interface Review {
  id: string;
  garageId: string;
  userId: string;
  overallExperience: number;
  serviceQuality: number;
  timeliness: number;
  valueForMoney: number;
  comment: string;
  recommendation?: boolean;
  photos?: string[];
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  user: ReviewUser;
}

export interface ReviewListResponse {
  success: boolean;
  message: string;
  data: {
    reviews: Review[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface ReviewStatsResponse {
  success: boolean;
  message: string;
  data: {
    totalReviews: number;
    averageRatings: {
      overall: number;
      serviceQuality: number;
      timeliness: number;
      valueForMoney: number;
    };
    ratingDistribution: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    };
  };
}

export interface CreateReviewPayload {
  garageId: string;
  overallExperience: number;
  serviceQuality: number;
  timeliness: number;
  valueForMoney: number;
  comment: string;
  recommendation?: boolean;
}

export interface UpdateReviewPayload {
  id: string;
  overallExperience?: number;
  serviceQuality?: number;
  timeliness?: number;
  valueForMoney?: number;
  comment?: string;
  recommendation?: boolean;
}

export interface GetGarageReviewsParams {
  garageId: string;
  page?: number;
  limit?: number;
  rating?: number;
}

// ─── API Slice ────────────────────────────────────────────────────────────────

export const reviewApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getGarageReviews: builder.query<ReviewListResponse, GetGarageReviewsParams>({
      query: ({ garageId, page = 1, limit = 6, rating }) => ({
        url: `/review/garage/${garageId}`,
        params: {
          page,
          limit,
          ...(rating ? { rating } : {}),
        },
      }),
      providesTags: (result, error, { garageId }) => [
        { type: "Review", id: garageId },
      ],
    }),

    getGarageReviewStats: builder.query<ReviewStatsResponse, string>({
      query: (garageId) => `/review/garage/${garageId}/stats`,
      providesTags: (result, error, garageId) => [
        { type: "Review", id: `${garageId}-stats` },
      ],
    }),

    submitReview: builder.mutation<
      { success: boolean; message: string; data: Review },
      CreateReviewPayload
    >({
      query: ({ garageId, ...body }) => ({
        url: `/review/${garageId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { garageId }) => [
        { type: "Review", id: garageId },
        { type: "Review", id: `${garageId}-stats` },
        { type: "Garage", id: garageId },
      ],
    }),

    updateReview: builder.mutation<
      { success: boolean; message: string; data: Review },
      UpdateReviewPayload
    >({
      query: ({ id, ...body }) => ({
        url: `/review/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Review"],
    }),

    deleteReview: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useGetGarageReviewsQuery,
  useGetGarageReviewStatsQuery,
  useSubmitReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
