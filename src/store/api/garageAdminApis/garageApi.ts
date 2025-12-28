import { apiSlice } from "../apiSlice";

interface User {
  id: string;
  email: string;
  fullName: string;
  bio: string | null;
  phone: string;
  profilePhoto: string | null;
  city: string;
  createdAt: string;
  updatedAt: string;
}

interface Garage {
  id: string;
  name: string;
  coverPhoto: string;
  profileImage: string;
  garagePhone: string;
  email: string;
  street: string;
  city: string;
  emirate: string;
  address: string;
  formattedAddress: string;
  placeId: string;
  garageLat: number;
  garageLng: number;
  description: string;
  certifications: string[];
  weekdaysHours: string;
  weekendsHours: string;
  brandExpertise: string[];
  status: string;
  userId: string;
  services: string[];
  createdAt: string;
  updatedAt: string;
  user?: User;
  averageRating: number;
  totalReviews: number;
  isApproved?: boolean;
  phone?: string;
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
interface SingleGarageResponse {
  success: boolean;
  message: string;
  data: Garage;
}

export const garageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET my garage
    getMyGarage: builder.query<Garage, void>({
      query: () => "/garages/my-garage",
      providesTags: ["Garage"],
    }),

    // GET single garage by ID
    getSingleGarage: builder.query<SingleGarageResponse, string>({
      query: (id) => `/garages/single-garage/${id}`,
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

    // PATCH update garage
    updateGarage: builder.mutation<Garage, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/garages/update-garage/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Garage"],
    }),

    // DELETE garage
    deleteGarage: builder.mutation<void, string>({
      query: (id) => ({
        url: `/garages/delete-garage/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Garage"],
    }),
  }),
});

export const {
  useGetMyGarageQuery,
  useGetSingleGarageQuery,
  useCreateGarageMutation,
  useUpdateGarageMutation,
  useDeleteGarageMutation,
} = garageApi;
