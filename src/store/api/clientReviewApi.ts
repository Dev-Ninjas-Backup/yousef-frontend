import { apiSlice } from "./apiSlice";

export interface ReviewUser {
  id: string;
  fullName: string;
  email: string;
  profilePhoto: string | null;
  role: string;
  isActive: boolean;
}

export interface ClientReview {
  id: string;
  reviewText: string;
  rating: string;
  userId: string;
  createdAt: string;
  user: ReviewUser;
}

export interface CreateReviewDto {
  reviewText: string;
  rating: string;
}

export interface UpdateReviewDto {
  reviewText?: string;
  rating?: string;
}

export const clientReviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllClientReviews: builder.query<ClientReview[], void>({
      query: () => "/client-review",
      providesTags: ["ClientReview"],
    }),

    getClientReviewById: builder.query<ClientReview, string>({
      query: (id) => `/client-review/${id}`,
      providesTags: ["ClientReview"],
    }),

    createClientReview: builder.mutation<
      { message: string; data: ClientReview },
      CreateReviewDto
    >({
      query: (body) => ({
        url: "/client-review",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ClientReview"],
    }),

    updateClientReview: builder.mutation<
      ClientReview,
      { id: string; body: UpdateReviewDto }
    >({
      query: ({ id, body }) => ({
        url: `/client-review/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ClientReview"],
    }),

    deleteClientReview: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/client-review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ClientReview"],
    }),

    adminDeleteClientReview: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/client-review/${id}/admin`,
        method: "DELETE",
      }),
      invalidatesTags: ["ClientReview"],
    }),
  }),
});

export const {
  useGetAllClientReviewsQuery,
  useGetClientReviewByIdQuery,
  useCreateClientReviewMutation,
  useUpdateClientReviewMutation,
  useDeleteClientReviewMutation,
  useAdminDeleteClientReviewMutation,
} = clientReviewApi;
