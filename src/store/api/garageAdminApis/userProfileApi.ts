import { apiSlice } from "../apiSlice";

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
  status: "PENDING" | "APPROVE" | "REJECTED";
  userId: string;
  services: string[];
  createdAt: string;
  updatedAt: string;
}

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: string;
  garages: Garage[];
  // ... other fields
}

interface UserProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

export const userProfileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfileResponse, void>({
      query: () => "/user/me/profile",
      providesTags: ["User", "Garage"],
    }),
  }),
});

export const { useGetUserProfileQuery } = userProfileApi;
