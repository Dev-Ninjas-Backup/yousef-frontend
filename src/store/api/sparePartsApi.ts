import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  condition: "new" | "used" | "refurbished";
  category: string;
  photos: string[];
  seller: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductsParams {
  search?: string;
  category?: string;
  condition?: string;
  limit?: number;
  page?: number;
}

export const sparePartsApi = createApi({
  reducerPath: "sparePartsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, ProductsParams>({
      query: (params) => ({
        url: "/products",
        params: {
          ...params,
          limit: params.limit || 10,
          page: params.page || 1,
        },
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery } = sparePartsApi;
