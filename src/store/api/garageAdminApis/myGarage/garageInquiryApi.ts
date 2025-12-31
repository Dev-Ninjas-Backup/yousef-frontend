import { apiSlice } from "../../apiSlice";

interface InquiryMessage {
  content: string;
  isFromAdmin: boolean;
  createdAt: string;
}

interface Inquiry {
  id: string;
  FirstName: string;
  LastName: string;
  email: string;
  subject: "CAR_PARTS" | "CAR_SERVICE" | "OTHERS";
  message: string;
  createdAt: string;
  othersubject?: string;
  makeasClosed: boolean;
  messages: InquiryMessage[];
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

interface ReplyInquiryRequest {
  contactId: string;
  content: string;
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

    // POST reply to inquiry
    replyInquiry: builder.mutation<any, ReplyInquiryRequest>({
      query: (data) => ({
        url: "/Garage-admin-inquiries/reply-inquiry-message",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Inquiry"],
    }),
  }),
});

export const { useGetCustomInquiriesQuery, useCreateCustomInquiryMutation, useReplyInquiryMutation } =
  garageInquiryApi;
