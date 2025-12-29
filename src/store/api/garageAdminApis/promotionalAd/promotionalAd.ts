import { apiSlice } from "../../apiSlice";

interface PromotionalAdResponse {
  freeListingUsed: number;
  activeAds: number;
  pendingApproval: number;
}

export const promotionalAdApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPromotionalAdStats: builder.query<PromotionalAdResponse, void>({
      query: () => "/promotional-ad/stats",
      providesTags: ["PromotionalAd"],
    }),
  }),
});

export const { useGetPromotionalAdStatsQuery } = promotionalAdApi;
