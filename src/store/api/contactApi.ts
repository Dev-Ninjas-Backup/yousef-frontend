import { apiSlice } from "./apiSlice";

export interface ContactFormData {
  FirstName: string;
  LastName: string;
  email: string;
  subject: "CAR_PARTS" | "CAR_SERVICE" | "LIMITED_TIME_OFFER" | "OTHERS";
  message: string;
  othersubject?: string;
  garageOwnerId?: string;
}

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/contact",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["SupportTicket"],
    }),

    getMyTickets: builder.query<any[], void>({
      query: () => "/contact/my-tickets",
      transformResponse: (response: any) => response.data || [],
      providesTags: ["SupportTicket"],
    }),

    replyContactTicket: builder.mutation<any, { contactId: string; content: string; attachment?: string }>({
      query: (data) => ({
        url: "/contact/reply",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SupportTicket"],
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetMyTicketsQuery,
  useReplyContactTicketMutation,
} = contactApi;