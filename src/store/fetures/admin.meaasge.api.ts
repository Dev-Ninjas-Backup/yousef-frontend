import { AdminContactsResponse } from "@/app/(admin-dashboard)/admin/messages/page";
import { apiSlice } from "../api/apiSlice";


export interface AdminContact {
  id: string;
  FirstName: string;
  LastName: string;
  email: string;
  subject: string;
  message: string;
  othersubject?: string | null;
  createdAt: string;
  updatedAt: string;
  garageOwnerId?: string | null;
}



export interface AdminContactResponse {
  success: boolean;
  data: AdminContact;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ReplyAdminMessagePayload {
  contactId: string;
  content: string;
}

export interface BaseResponse {
  success: boolean;
  message: string;
}


export const adminMessageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getAdminContacts: builder.query<
        AdminContactsResponse,
        { page: number; limit: number }
        >({
        query: ({ page, limit }) => ({
            url: "/admin-message/admin",
            params: { page, limit },
        }),
        }),


    getAdminContactById: builder.query<
      AdminContactResponse,
      string
    >({
      query: (id) => `/admin-message/admin/${id}`,
      providesTags: ["Admin"],
    }),

    deleteAdminContact: builder.mutation<
      BaseResponse,
      string
    >({
      query: (id) => ({
        url: `/admin-message/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),

    replyAdminMessage: builder.mutation<
      BaseResponse,
      ReplyAdminMessagePayload
    >({
      query: (body) => ({
        url: "/admin-message/reply",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
  overrideExisting: false,
});


export const {
  useGetAdminContactsQuery,
  useGetAdminContactByIdQuery,
  useDeleteAdminContactMutation,
  useReplyAdminMessageMutation,
} = adminMessageApi;
