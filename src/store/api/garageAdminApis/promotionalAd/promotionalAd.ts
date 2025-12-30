import { apiSlice } from "../../apiSlice";

interface PromotionalAdResponse {
  freeListingUsed: number;
  activeAds: number;
  pendingApproval: number;
}

enum ProductStatus {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

// Single Product Interface
interface Product {
  id: string;
  sellerId: string;
  createdById: string;
  partName: string;
  brand: string;
  categoryId: string;
  condition: string;
  price: string;
  quantity: number;
  description: string;
  photos: string[];
  status: ProductStatus | string;
  isPromoted: boolean;
  promoCost: string;
  views: number;
  inquiries: number;
  createdAt: string;
  updatedAt: string;
}
type PromotionalProductsResponse = Product[];

export const promotionalAdApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPromotionalAdStats: builder.query<PromotionalAdResponse, void>({
      query: () => "/promotional-ad/stats",
      providesTags: ["PromotionalAd"],
    }),
    getPromotionalProducts: builder.query<PromotionalProductsResponse, void>({
      query: () => "/promotional-ad/promoted-products",
      providesTags: ["PromotionalAd"],
    }),
  }),
});

export const { useGetPromotionalAdStatsQuery, useGetPromotionalProductsQuery } =
  promotionalAdApi;
