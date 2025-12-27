import { apiSlice } from "../api/apiSlice";
import { Product, ProductQueryParams, ProductResponse } from "./types";

export const adminApiSlice = apiSlice.enhanceEndpoints({ 
  addTagTypes: ['Admin', 'Product'] 
}).injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, ProductQueryParams>({
      query: (params) => ({
        url: '/products',
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    getProductById: builder.query<{ data: Product }, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

// Inside adminApiSlice.ts
approveProduct: builder.mutation<
  any,
  { id: string; status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED" }
>({
  query: (data) => {
    // We extract the id and status separately from the 'data' object
    const { id, status } = data; 
    
    return {
      url: `/spareparts-financials/parts/approve/${id}`, // Now only the string id goes here
      method: "PATCH",
      body: { status }, // The status goes into the body
    };
  },
  invalidatesTags: (result, error, { id }) => [
    { type: 'Product', id: 'LIST' },
    { type: 'Product', id },
  ],
}),


    deleteProduct: builder.mutation<any, string>({
      query: (id) => ({
        url: `/spareparts-financials/parts/remove/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Product', id: 'LIST' },
        { type: 'Product', id },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useApproveProductMutation,
  useDeleteProductMutation,
} = adminApiSlice;