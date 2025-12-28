import { apiSlice } from "../../apiSlice";

interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  fileUrl: string | null;
  isRead: boolean;
  createdAt: string;
}

interface Conversation {
  conversationId: string;
  recipientName: string;
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
}

export const privateChatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<{ conversations: Conversation[] }, void>({
      query: () => "/private-chat",
      providesTags: ["Message"],
    }),

    getMessages: builder.query<{ messages: ChatMessage[] }, string>({
      query: (conversationId) => `/private-chat/${conversationId}`,
      providesTags: ["Message"],
    }),

    sendMessage: builder.mutation<
      { message: string; messageId: string },
      { recipientId: string; formData: FormData }
    >({
      query: ({ recipientId, formData }) => ({
        url: `/private-chat/send-message/${recipientId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Message"],
    }),

    markAsRead: builder.mutation<{ message: string }, string>({
      query: (messageId) => ({
        url: `/private-chat/make-private-message-read/${messageId}`,
        method: "POST",
      }),
      invalidatesTags: ["Message"],
    }),

    deleteConversation: builder.mutation<{ message: string }, string>({
      query: (conversationId) => ({
        url: `/private-chat/${conversationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Message"],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useMarkAsReadMutation,
  useDeleteConversationMutation,
} = privateChatApi;
