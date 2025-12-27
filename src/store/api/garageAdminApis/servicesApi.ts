import { apiSlice } from "../apiSlice";

interface ServicesResponse {
  id: string;
  serviceCategories: string[];
}

interface CreateServiceRequest {
  serviceCategory: string;
}

export const servicesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyServices: builder.query<ServicesResponse, void>({
      query: () => "/services/me",
      providesTags: ["Service"],
    }),

    createService: builder.mutation<{ serviceCategory: string }, CreateServiceRequest>({
      query: (body) => ({
        url: "/services",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const { useGetMyServicesQuery, useCreateServiceMutation } = servicesApi;
