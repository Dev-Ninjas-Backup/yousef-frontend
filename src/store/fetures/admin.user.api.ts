import { apiSlice } from "../api/apiSlice";

export interface User {
  id: string;
  role: string;
  fullName: string;
  phone: string;
  profilePhoto: string;
  bio: string;
  email: string;
  isActive: boolean;
  garageStatus: string;
  isGarageVerified: boolean;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  isDeleted: boolean;
  vehicles: number;
}

export interface AllUsersResponse {
  success: boolean;
  message: string;
  data: {
    data: User[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface SingleUserResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface UserSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}

export const adminApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Admin'] }).injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<AllUsersResponse, UserSearchParams>({
      query: (params = {}) => ({
        url: '/user-management',
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          search: params.search || undefined,
          role: params.role || undefined,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.data.map(({ id }) => ({ type: 'Admin' as const, id })),
              { type: 'Admin', id: 'USER_LIST' },
            ]
          : [{ type: 'Admin', id: 'USER_LIST' }],
    }),

    getUserById: builder.query<SingleUserResponse, string>({
      query: (id) => `/user-management/user/${id}`,
      providesTags: (result, error, id) => [{ type: 'Admin', id }],
    }),

    deleteUser: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/user-management/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Admin', id: 'USER_LIST' },
        { type: 'Admin', id },
      ],
    }),
  }),
});

export const {

  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
} = adminApiSlice;