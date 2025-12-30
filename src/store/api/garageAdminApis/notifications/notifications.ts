import { apiSlice } from "../../apiSlice";

interface ApprovedProduct {
  id: string;
  sellerId: string;
  createdById: string;
  partName: string;
  brand: string | null;
  categoryId: string;
  condition: string;
  price: number;
  quantity: number;
  description: string | null;
  photos: string[];
  status: "APPROVED";
  isPromoted: boolean;
  promoCost: number | null;
  views: number;
  inquiries: number;
  createdAt: string;
  updatedAt: string;
}

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApprovedProducts: builder.query<ApprovedProduct[], void>({
      query: () => "/notification/approved-products",
      providesTags: ["Notification"],
    }),
  }),
});

export const { useGetApprovedProductsQuery } = notificationApi;
