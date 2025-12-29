import { apiSlice } from "../../apiSlice";

interface Inquiry {
  id: string;
  FirstName: string;
  LastName: string;
  email: string;
  subject: "CAR_PARTS" | "CAR_SERVICE" | "OTHERS";
  message: string;
  createdAt: string;
  messages: any[];
}

interface CreateInquiryRequest {
  FirstName: string;
  LastName: string;
  email: string;
  subject: "CAR_PARTS" | "CAR_SERVICE" | "OTHERS";
  message: string;
  othersubject?: string;
  garageOwnerId: string;
}

interface CreateInquiryResponse {
  message: string;
  inquiryId: string;
}

export const garageInquiryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomInquiries: builder.query<Inquiry[], void>({
      query: () => "Garage-admin-inquiries/custom-inquiries",
      providesTags: ["Inquiry"],
    }),

    // POST create new inquiry (public endpoint)
    createCustomInquiry: builder.mutation<
      CreateInquiryResponse,
      CreateInquiryRequest
    >({
      query: (data) => ({
        url: "/Garage-admin-inquiries/create-custom-inquiries",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Inquiry"],
    }),
  }),
});

export const { useGetCustomInquiriesQuery, useCreateCustomInquiryMutation } =
  garageInquiryApi;
