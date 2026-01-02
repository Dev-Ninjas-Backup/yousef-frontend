import { apiSlice } from "../../apiSlice";

// Enums
enum SellerType {
  INDIVIDUAL = "INDIVIDUAL",
  VERIFIED_SUPPLIER = "VERIFIED_SUPPLIER",
}

enum PaymentPlan {
  MONTHLY = "MONTHLY",
  PAY_PER = "PAY_PER",
}

enum ProductStatus {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

// Product Interface
export interface Product {
  id: string;
  sellerId: string;
  createdById: string;
  partName: string;
  brand?: string;
  categoryId: string;
  condition: string;
  price: string;
  quantity: number;
  description?: string;
  photos: string[];
  status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED";
  isPromoted: boolean;
  promoCost: string | null;
  views: number;
  inquiries: number;
  createdAt: string;
  updatedAt: string;
  seller?: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    sellerType: string;
    isVerified: boolean;
    verificationImage: string | null;
    subscriptionPlan: string;
    subscriptionExpiresAt: string | null;
    freeProductsUsed: number;
    createdAt: string;
    updatedAt: string;
  };
  createdBy?: {
    id: string;
    email: string;
    fullName: string;
  };
}

// Create Product Request
interface CreateProductRequest {
  partName: string;
  categoryId: string;
  condition: string;
  price: number;
  quantity: number;
  sellerType: "INDIVIDUAL" | "VERIFIED_SUPPLIER";
  plan: "MONTHLY" | "PAY_PER";
  brand?: string;
  description?: string;
  isPromoted?: boolean;
  sellerName?: string;
  sellerEmail?: string;
  sellerPhoneNumber?: string;
  photos?: File[];
  verificationImage?: File;
}

// Response Interfaces
interface CreateProductResponse {
  success: boolean;
  message: string;
  data: Product;
}

interface GetProductsResponse {
  success: boolean;
  message: string;
  data: {
    products: Product[];
    total: number;
    page: number;
    limit: number;
  };
}

type GetProductResponse = Product;

interface PaymentResponse {
  url: string;
}

interface UserLimitResponse {
  userId: string;
  userEmail: string;
  freeProductsUsed: number;
  freeProductsRemaining: number;
  canAddFreeProduct: boolean;
  productCredits: number;
  promotionCredits: number;
  hasGarageMonthly: boolean;
  hasProductMonthly: boolean;
  productMonthlyEndsAt: string | null;
}

export const userProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create Product
    createUserProduct: builder.mutation<
      CreateProductResponse,
      CreateProductRequest
    >({
      query: (data) => {
        const formData = new FormData();

        // Required fields
        formData.append("partName", data.partName);
        formData.append("categoryId", data.categoryId);
        formData.append("condition", data.condition);
        formData.append("price", data.price.toString());
        formData.append("quantity", data.quantity.toString());
        formData.append("sellerType", data.sellerType);
        formData.append("plan", data.plan);

        // Optional fields
        if (data.brand) formData.append("brand", data.brand);
        if (data.description) formData.append("description", data.description);
        if (data.isPromoted !== undefined)
          formData.append("isPromoted", data.isPromoted.toString());
        if (data.sellerName) formData.append("sellerName", data.sellerName);
        if (data.sellerEmail) formData.append("sellerEmail", data.sellerEmail);
        if (data.sellerPhoneNumber)
          formData.append("sellerPhoneNumber", data.sellerPhoneNumber);

        // Photos (max 5)
        if (data.photos && data.photos.length > 0) {
          data.photos.forEach((photo) => {
            formData.append("photos", photo);
          });
        }

        // Verification image
        if (data.verificationImage) {
          formData.append("verificationImage", data.verificationImage);
        }

        return {
          url: "/products",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),

    // Get My Products
    getUserMyProducts: builder.query<Product[], void>({
      query: () => "/products/my-products",
      providesTags: ["Product"],
    }),

    // Get Single Product
    getUserProduct: builder.query<GetProductResponse, string>({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),

    // Update Product
    updateUserProduct: builder.mutation<
      CreateProductResponse,
      { id: string; data: Partial<CreateProductRequest> }
    >({
      query: ({ id, data }) => {
        const formData = new FormData();

        // Add all fields that are provided
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined) {
            if (key === "photos" && Array.isArray(value)) {
              value.forEach((photo) => {
                formData.append("photos", photo);
              });
            } else if (key === "verificationImage" && value instanceof File) {
              formData.append("verificationImage", value);
            } else {
              formData.append(key, value.toString());
            }
          }
        });

        return {
          url: `/products/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),

    // Delete Product
    deleteUserProduct: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // Create Promotion Payment
    createUserPromotionPayment: builder.mutation<PaymentResponse, void>({
      query: () => ({
        url: "/products/create-promotion-payment",
        method: "POST",
      }),
    }),
    createUserMonthlyPayment: builder.mutation<PaymentResponse, void>({
      query: () => ({
        url: "/products/create-monthly-payment",
        method: "POST",
      }),
    }),
    createUserPayPerPayment: builder.mutation<PaymentResponse, void>({
      query: () => ({
        url: "/products/create-payper-payment",
        method: "POST",
      }),
    }),

    // Get User Limit
    getUserProductLimit: builder.query<UserLimitResponse, void>({
      query: () => "/products/user/limit",
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateUserProductMutation,
  useGetUserMyProductsQuery,
  useGetUserProductQuery,
  useUpdateUserProductMutation,
  useDeleteUserProductMutation,
  useCreateUserPromotionPaymentMutation,
  useCreateUserMonthlyPaymentMutation,
  useCreateUserPayPerPaymentMutation,
  useGetUserProductLimitQuery,
} = userProductApi;