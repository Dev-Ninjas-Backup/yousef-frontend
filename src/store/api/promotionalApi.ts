import { apiSlice } from "./apiSlice";

export interface PromotionalProduct {
  id: string;
  partName: string;
  brand: string;
  condition: string;
  price: string;
  quantity: number;
  description: string;
  photos: string[];
  status: string;
  isPromoted: boolean;
  views: number;
  inquiries: number;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  sellerId: string;
}

export interface FeaturedGarage {
  id: string;
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
  weekdaysHours: string;
  weekendsHours: string;
  brandExpertise: string[];
  garageStatus: string;
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

export interface FeaturedGaragesResponse {
  garages: FeaturedGarage[];
  total: number;
}

export const promotionalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPromotionalProducts: builder.query<PromotionalProduct[], void>({
      query: () => '/promotional-and-featured/promotional',
      providesTags: ['Product'],
    }),
    getFeaturedGarages: builder.query<FeaturedGaragesResponse, void>({
      query: () => '/promotional-and-featured/featured',
      providesTags: ['Garage'],
    }),
  }),
});

export const {
  useGetPromotionalProductsQuery,
  useGetFeaturedGaragesQuery,
} = promotionalApi;