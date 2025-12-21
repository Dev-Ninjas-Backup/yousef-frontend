import { apiSlice } from './apiSlice';

interface LoginRequest {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  tradeLicense: string | null;
  garageLogo: string | null;
  profilePhoto: string | null;
  city: string;
  emirate: string;
  role: 'CAR_OWNER' | 'GARAGE_OWNER' | 'SUPER_ADMIN' | 'MEMBER';
  serviceCategories: string[];
  isVerified: boolean;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  isGarageVerified: boolean;
  hasPaid: boolean;
  subscriptionEndsAt: string | null;
  nextBillingDate: string | null;
  isMembership: boolean;
  trialStartDate: string;
  trialEndDate: string;
  isTrialActive: boolean;
  freeProductsListing: number;
  isEmailNotification: boolean;
  isCustomerInquiryAlerts: boolean;
  isSmsNotification: boolean;
  isEmailPromotional: boolean;
  ReviewAlerts: boolean;
  productApprovalAlerts: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  result: {
    success: boolean;
    message: string;
    data: {
      token: string;
      user: User;
    };
  };
  message: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'CAR_OWNER' | 'GARAGE_OWNER' | 'SUPER_ADMIN' | 'MEMBER';
  };
  token: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getProfile: builder.query<AuthResponse['user'], void>({
      query: () => '/auth/profile',
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
} = authApi;