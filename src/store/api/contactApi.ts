import { apiSlice } from "./apiSlice";

export interface ContactFormData {
  FirstName: string;
  LastName: string;
  email: string;
  subject: "CAR_PARTS" | "CAR_SERVICE" | "OTHERS";
  message: string;
  othersubject?: string;
  garageOwnerId?: string;
}

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation<any, ContactFormData>({
      query: (data) => ({
        url: "/contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SupportTicket"],
    }),

    getMyTickets: builder.query<any[], void>({
      query: () => "/contact/my-tickets",
      transformResponse: (response: any) => response.data || [],
      providesTags: ["SupportTicket"],
    }),

    replyContactTicket: builder.mutation<any, { contactId: string; content: string }>({
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