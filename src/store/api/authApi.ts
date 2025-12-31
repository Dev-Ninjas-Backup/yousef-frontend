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
  garageName: string | null;
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
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: 'CAR_OWNER' | 'GARAGE_OWNER';
}

interface GarageRegisterRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  garageName: string;
  address: string;
  city: string;
  emirate: string;
  serviceCategories: string[];
  role: 'GARAGE_OWNER';
}

interface RegisterResponse {
  message: string;
  verifyToken: string;
}

interface VerifyOtpRequest {
  resetToken: string;
  emailOtp: string;
}

interface VerifyOtpResponse {
  statusCode: number;
  success: boolean;
  message: string;
  resetToken?: string; // For reset password flow
  data?: {
    success: boolean;
    message: string;
    data: {
      token: string;
      user: User;
    };
  };
}

interface GoogleLoginRequest {
  idToken: string;
}

interface GoogleLoginResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

interface ForgotPasswordRequest {
  email: string;
}

interface ForgotPasswordResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    resetToken: string;
  };
}

interface ResetPasswordRequest {
  resetToken: string;
  password: string;
}

interface ProfileResponse {
  message?: string;
  success?: boolean;
  data?: User;
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
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    garageRegister: builder.mutation<RegisterResponse, FormData>({
      query: (formData) => ({
        url: '/auth/register',
        method: 'POST',
        body: formData,
      }),
    }),
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (otpData) => ({
        url: '/auth/signup-verify-otp',
        method: 'POST',
        body: otpData,
      }),
    }),
    googleLogin: builder.mutation<GoogleLoginResponse, GoogleLoginRequest>({
      query: (googleData) => ({
        url: '/auth/google-login',
        method: 'POST',
        body: googleData,
      }),
    }),
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (emailData) => ({
        url: '/auth/forget-password',
        method: 'POST',
        body: emailData,
      }),
    }),
    resetPassword: builder.mutation<{ message: string }, ResetPasswordRequest>({
      query: (resetData) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: resetData,
      }),
    }),
    getProfile: builder.query<ProfileResponse, void>({
      query: () => '/user/me/profile',
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGarageRegisterMutation,
  useVerifyOtpMutation,
  useGoogleLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
} = authApi;