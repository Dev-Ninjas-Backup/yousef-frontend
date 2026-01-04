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
  recipientId: string;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
  isEdited: boolean;
  isDeleted: boolean;
  sender: User;
  files?: string[];
}

export interface Conversation {
  type: "private";
  chatId: string;
  participant: User;
  lastMessage: Message | null;
  unreadCount: number;
  updatedAt: string;
}

export interface TypingUser {
  userId: string;
  fullName: string;
  isTyping: boolean;
}

export interface UserStatus {
  userId: string;
  isOnline: boolean;
  lastSeen?: string;
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

    editMessage: builder.mutation<
      Message,
      { messageId: string; content: string }
    >({
      query: ({ messageId, content }) => ({
        url: `/private-chat/edit-message/${messageId}`,
        method: "PATCH",
        body: { content },
      }),
      invalidatesTags: ["Message"],
    }),

    deleteMessage: builder.mutation<void, string>({
      query: (messageId) => ({
        url: `/private-chat/delete-message/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Message"],
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
  useEditMessageMutation,
  useDeleteMessageMutation,
  useDeleteConversationMutation,
} = privateChatApi;
