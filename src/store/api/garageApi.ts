import { apiSlice } from "./apiSlice";

export interface GarageSearchParams {
  page?: number;
  limit?: number;
  emirate?: string;
  serviceName?: string;
  search?: string;
}

export interface GarageData {
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
  services: string[];
  createdAt: string;
  updatedAt: string;
  averageRating: number;
  totalReviews: number;
  user: {
    id: string;
    email: string;
    fullName: string;
    bio: string;
    phone: string;
    profilePhoto: string;
    city: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface GaragesResponse {
  success: boolean;
  message: string;
  data: {
    data: GarageData[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface ServiceCategoriesResponse {
  serviceCategories: string[];
  total: number;
}

export interface SingleGarageResponse {
  success: boolean;
  message: string;
  data: GarageData;
}

export const garageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGarages: builder.query<GaragesResponse, GarageSearchParams>({
      query: (params = {}) => ({
        url: '/garages',
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          emirate: params.emirate || undefined,
          serviceName: params.serviceName || undefined,
          search: params.search || undefined,
        },
      }),
      providesTags: ['Garage'],
    }),
    getGarageById: builder.query<SingleGarageResponse, string>({
      query: (id) => `/garages/single-garage/${id}`,
      providesTags: (result, error, id) => [{ type: 'Garage', id }],
    }),
    getServiceCategories: builder.query<ServiceCategoriesResponse, void>({
      query: () => '/services',
      providesTags: ['Service'],
    }),
  }),
});

export const {
  useGetGaragesQuery,
  useGetGarageByIdQuery,
  useGetServiceCategoriesQuery,
} = garageApi;