import { apiSlice } from "../apiSlice";


interface Category {
  id: string;
  name: string;
}

interface CategoriesResponse {
  success: boolean;
  message: string;
  data: {
    data: Category[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => "/parts-category",
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
