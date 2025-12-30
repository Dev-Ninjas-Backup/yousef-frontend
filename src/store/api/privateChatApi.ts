import { apiSlice } from "./apiSlice";

export interface User {
  id: string;
  fullName: string;
  profilePhoto: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  sender: User;
  files?: string[];
}

export interface Conversation {
  type: "private";
  chatId: string;
  participant: User;
  lastMessage: Message | null;
  updatedAt: string;
}

interface ConversationsResponse {
  success: boolean;
  data: Conversation[];
  message: string;
}

interface ConversationMessagesResponse {
  conversationId: string;
  participants: Array<{
    id: string;
    fullName: string;
    profilePhoto: string;
  }>;
  messages: Message[];
}

export const privateChatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<Conversation[], void>({
      query: () => "/private-chat",
      transformResponse: (response: ConversationsResponse) => response.data,
      providesTags: ["Message"],
    }),

    getMessages: builder.query<Message[], string>({
      query: (conversationId) => `/private-chat/${conversationId}`,
      transformResponse: (response: ConversationMessagesResponse) =>
        response.messages,
      providesTags: ["Message"],
    }),

    sendMessage: builder.mutation<
      Message,
      { recipientId: string; formData: FormData }
    >({
      query: ({ recipientId, formData }) => ({
        url: `/private-chat/send-message/${recipientId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Message"],
    }),

    markAsRead: builder.mutation<void, string>({
      query: (messageId) => ({
        url: `/private-chat/make-private-message-read/${messageId}`,
        method: "POST",
      }),
    }),

    deleteConversation: builder.mutation<void, string>({
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
