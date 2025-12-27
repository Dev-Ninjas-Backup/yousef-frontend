import { apiSlice } from "../apiSlice";

interface Garage {
  id: string;
  name: string;
  address: string;
  garageLat: number;
  garageLng: number;
  coverPhoto: string;
  profileImage: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  emirate: string;
  formattedAddress: string;
  placeId: string;
  description: string;
  certifications: string;
  weekdaysHours: string;
  weekendsHours: string;
  brandExpertise: string;
  services: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateGarageRequest {
  name: string;
  address: string;
  garageLat: number;
  garageLng: number;
  coverPhoto: File;
  profileImage: File;
  phone: string;
  email: string;
  street: string;
  city: string;
  emirate: string;
  formattedAddress: string;
  placeId: string;
  description: string;
  certifications: string;
  weekdaysHours: string;
  weekendsHours: string;
  brandExpertise: string;
  services: string;
}

export const garageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET my garage
    getMyGarage: builder.query<Garage, void>({
      query: () => "/garages/my-garage",
      providesTags: ["Garage"],
    }),

    // POST create garage
    createGarage: builder.mutation<Garage, FormData>({
      query: (formData) => ({
        url: "/garages",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Garage"],
    }),

    // PUT update garage
    updateGarage: builder.mutation<Garage, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/garages/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Garage"],
    }),

    // DELETE garage
    deleteGarage: builder.mutation<void, string>({
      query: (id) => ({
        url: `/garages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Garage"],
    }),
  }),
});

export const {
  useGetMyGarageQuery,
  useCreateGarageMutation,
  useUpdateGarageMutation,
  useDeleteGarageMutation,
} = garageApi;
