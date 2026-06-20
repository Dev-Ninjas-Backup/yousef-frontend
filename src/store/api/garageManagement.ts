import { apiSlice } from "./apiSlice";

// Backend response interfaces based on service code
export interface GarageOwner {
  userId: string;
  ownerName: string;
  phone: string;
  Garage_Name: string;
  serviceCategories: string[];
  Contract: string;
  isDeleted: boolean;
  tradeLicense: string;
  garageLogo: string;
  garageStatus: "APPROVE" | "PENDING" | "DECLINE";
  isGarageVerified: boolean;
  createdAt: string;
  updatedAt: string;
  revenue: number;
  garages: GarageInfo[];
}

export interface GarageInfo {
  garageId: string;
  garageName: string;
  coverPhoto: string;
  profileImage: string;
  garagePhone: string;
  email: string;
  street: string;
  city: string;
  emirate: string;
  location: string;
  formattedAddress: string;
  placeId: string;
  garageLat: number;
  garageLng: number;
  description: string;
  certifications: string[];
  certificationFile?: string;
  weekdaysHours: string;
  weekendsHours: string;
  brandExpertise: string[];
  requestedBrandExpertise: string[];
  garageStatus: "PENDING" | "APPROVED" | "REJECTED";
  services: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SearchGarageResponse {
  success: boolean;
  message: string;
  data: GarageOwner[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface SearchGarageParams {
  page?: number;
  limit?: number;
  name?: string;
  status?: "APPROVE" | "PENDING" | "DECLINE";
}

export interface UpdateGarageStatusRequest {
  garageStatus: "APPROVE" | "PENDING" | "DECLINE";
}

export const garageManagementApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Search garages with pagination and filters
    searchGarages: builder.query<SearchGarageResponse, SearchGarageParams>({
      query: (params) => ({
        url: "/garage-management/search",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          name: params.name || undefined,
          status: params.status || undefined,
        },
      }),
      providesTags: ["Garage"],
    }),

    // Get all garages (admin endpoint)
    getAllGarages: builder.query<
      { success: boolean; data: GarageOwner[]; message: string },
      void
    >({
      query: () => "/garage-management/admin",
      providesTags: ["Garage"],
    }),

    // Get garage owner info by user ID (admin endpoint)
    getGarageOwnerById: builder.query<GarageOwner, string>({
      query: (id) => `/garage-management/info/${id}`,
      providesTags: (result, error, id) => [{ type: "Garage", id }],
    }),

    // Update garage owner status by user ID (with free trial)
    updateGarageOwnerStatus: builder.mutation<any, { userId: string }>({
      query: ({ userId }) => ({
        url: `/garage-management/user-garage-status/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Garage"],
    }),

    // Update individual garage status by garage ID
    updateGarageStatus: builder.mutation<
      any,
      { garageId: string; status: "APPROVE" | "PENDING" | "DECLINE" }
    >({
      query: ({ garageId, status }) => ({
        url: `/garage-management/garage-status/${garageId}`,
        method: "PATCH",
        body: { garageStatus: status },
      }),
      invalidatesTags: ["Garage"],
    }),

    // Delete garage
    deleteGarage: builder.mutation<any, string>({
      query: (id) => ({
        url: `/garage-management/info/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Garage"],
    }),

    // Approve brand expertise claims
    approveBrandExpertise: builder.mutation<
      any,
      { garageId: string; brands: string[] }
    >({
      query: ({ garageId, brands }) => ({
        url: `/garage-management/approve-brands/${garageId}`,
        method: "PATCH",
        body: { brands },
      }),
      invalidatesTags: ["Garage"],
    }),

    // Reject brand expertise claims
    rejectBrandExpertise: builder.mutation<
      any,
      { garageId: string; brands: string[]; reason?: string }
    >({
      query: ({ garageId, brands, reason }) => ({
        url: `/garage-management/reject-brands/${garageId}`,
        method: "PATCH",
        body: { brands, reason },
      }),
      invalidatesTags: ["Garage"],
    }),
  }),
});

export const {
  useSearchGaragesQuery,
  useLazySearchGaragesQuery,
  useGetAllGaragesQuery,
  useGetGarageOwnerByIdQuery,
  useUpdateGarageOwnerStatusMutation,
  useUpdateGarageStatusMutation,
  useDeleteGarageMutation,
  useApproveBrandExpertiseMutation,
  useRejectBrandExpertiseMutation,
} = garageManagementApi;
