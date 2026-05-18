import { apiSlice } from "../../apiSlice";

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

    createService: builder.mutation<ServicesResponse, CreateServiceRequest>({
      query: (body) => ({
        url: "/services",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Service"],
    }),

    updateService: builder.mutation<
      ServicesResponse,
      { oldName: string; serviceCategory: string }
    >({
      query: ({ oldName, serviceCategory }) => ({
        url: `/services/${encodeURIComponent(oldName)}`,
        method: "PATCH",
        body: { serviceCategory },
      }),
      invalidatesTags: ["Service"],
    }),

    deleteService: builder.mutation<ServicesResponse, string>({
      query: (serviceName) => ({
        url: `/services/${encodeURIComponent(serviceName)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useGetMyServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
