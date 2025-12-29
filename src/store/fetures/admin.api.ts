import { apiSlice } from '../api/apiSlice';
import { Garage, GarageQueryParams, GarageResponse } from './types';

export const adminApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Admin'] }).injectEndpoints({
  endpoints: (builder) => ({
    
    getGarages: builder.query<GarageResponse, GarageQueryParams>({
      query: (params) => ({
        url: '/garage-management/search',
        method: 'GET',
        params, 
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ userId }) => ({ type: 'Admin' as const, id: userId })),
              { type: 'Admin', id: 'LIST' },
            ]
          : [{ type: 'Admin', id: 'LIST' }],
    }),

    getGarageById: builder.query<{ success: boolean; data: Garage }, string>({
      query: (id) => `/garage-management/info/${id}`,
      providesTags: (result, error, id) => [{ type: 'Admin', id }],
    }),

    deleteGarage: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/garage-management/info/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Admin', id: 'LIST' },
        { type: 'Admin', id },
      ],
    }),


      updateGarageStatus: builder.mutation<any, { id: string; status: 'APPROVE' | 'PENDING' | 'DECLINE' }>({
            query: ({ id, status }) => ({
                url: `/garage-management/status/${id}`,
                method: 'PATCH',
                body: { garageStatus: status },
            }),
            // This invalidates the specific garage and the list to trigger a UI refresh
            invalidatesTags: (result, error, { id }) => [
                { type: 'Admin', id: 'LIST' },
                { type: 'Admin', id },
            ],
            }),


  }),

});

export const {
  useGetGaragesQuery,
  useGetGarageByIdQuery,
  useDeleteGarageMutation,
  useUpdateGarageStatusMutation,
} = adminApiSlice;