import { apiSlice } from "./apiSlice";

export interface ExclusiveOffer {
  id: string;
  bannerImage: string;
  validUnit: string;
  title: string;
  description: string;
  originalPrice?: string | null;
  price?: string | null;
  brand?: string | null;
  garageId?: string | null;
}

export const exclusiveOfferApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExclusiveOffers: builder.query<ExclusiveOffer[], void>({
      query: () => "/exclusive-offer",
      transformResponse: (response: any) => response.data || [],
      providesTags: ["ExclusiveOffer"],
    }),
    getExclusiveOfferById: builder.query<ExclusiveOffer, string>({
      query: (id) => `/exclusive-offer/${id}`,
      transformResponse: (response: any) => response.data,
      providesTags: (result, error, id) => [{ type: "ExclusiveOffer", id }],
    }),
    createExclusiveOffer: builder.mutation<any, FormData>({
      query: (data) => ({
        url: "/exclusive-offer",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ExclusiveOffer"],
    }),
    updateExclusiveOffer: builder.mutation<any, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/exclusive-offer/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "ExclusiveOffer",
        { type: "ExclusiveOffer", id },
      ],
    }),
    deleteExclusiveOffer: builder.mutation<any, string>({
      query: (id) => ({
        url: `/exclusive-offer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ExclusiveOffer"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetExclusiveOffersQuery,
  useGetExclusiveOfferByIdQuery,
  useCreateExclusiveOfferMutation,
  useUpdateExclusiveOfferMutation,
  useDeleteExclusiveOfferMutation,
} = exclusiveOfferApi;
