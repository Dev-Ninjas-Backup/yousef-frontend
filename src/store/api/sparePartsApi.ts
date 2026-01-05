import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  id: string;
  partName: string;
  description: string;
  price: number;
  quantity: number;
  condition: "NEW" | "USED" | "REFURBISHED";
  brand: string;
  photos: string[];
  status: "PENDING" | "APPROVED" | "REJECTED";
  isPromoted: boolean;
  views: number;
  seller: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    sellerType: "INDIVIDUAL" | "VERIFIED_SUPPLIER";
  };
  createdBy: {
    id: string;
    email: string;
    fullName: string;
  };
  category: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
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
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
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
    getMyProducts: builder.query<Product[], void>({
      query: () => "/products/my-products",
      providesTags: ["Product"],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetMyProductsQuery, useGetProductByIdQuery } = sparePartsApi;
