// store/fetures/partsCategory.api.ts
import { apiSlice } from '../api/apiSlice';

export interface PartsCategory {
  id: string;
  name: string;
}

export interface PartsCategoryResponse {
  success: boolean;
  message: string;
  data: {
    data: PartsCategory[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface CreateUpdatePartsCategoryPayload {
  name: string;
}

export interface PartsCategoryQueryParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const partsCategoryApi = apiSlice.enhanceEndpoints({ addTagTypes: ['PartsCategory'] }).injectEndpoints({
  endpoints: (builder) => ({
    getPartsCategories: builder.query<PartsCategoryResponse, PartsCategoryQueryParams>({
      query: (params) => ({ url: '/parts-category', method: 'GET', params }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.data.map(({ id }) => ({ type: 'PartsCategory' as const, id })),
              { type: 'PartsCategory', id: 'LIST' },
            ]
          : [{ type: 'PartsCategory', id: 'LIST' }],
    }),

    createPartsCategory: builder.mutation<{ success: boolean; message: string; data: PartsCategory }, CreateUpdatePartsCategoryPayload>({
      query: (body) => ({ url: '/parts-category', method: 'POST', body }),
      invalidatesTags: [{ type: 'PartsCategory', id: 'LIST' }],
    }),

    updatePartsCategory: builder.mutation<{ success: boolean; message: string; data: PartsCategory }, { id: string; body: CreateUpdatePartsCategoryPayload }>({
      query: ({ id, body }) => ({ url: `/parts-category/${id}`, method: 'PATCH', body }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'PartsCategory', id },
        { type: 'PartsCategory', id: 'LIST' },
      ],
    }),

    deletePartsCategory: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({ url: `/parts-category/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => [
        { type: 'PartsCategory', id },
        { type: 'PartsCategory', id: 'LIST' },
      ],
    }),
  }),
});


export const {
  useGetPartsCategoriesQuery,
  useCreatePartsCategoryMutation,
  useUpdatePartsCategoryMutation,
  useDeletePartsCategoryMutation,
} = partsCategoryApi;
