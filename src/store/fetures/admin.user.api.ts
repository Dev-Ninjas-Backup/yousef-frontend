import { apiSlice } from "../api/apiSlice";
import { AllUsersResponse, SingleUserResponse } from "./types";

export const adminApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Admin'] }).injectEndpoints({
  endpoints: (builder) => ({
 

    getAllUsers: builder.query<AllUsersResponse, void>({
      query: () => '/user-management',
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Admin' as const, id })),
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