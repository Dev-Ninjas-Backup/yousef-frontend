"use client";

import { useState, useEffect, useRef } from "react";
import { useGetMyTicketsQuery, useReplyContactTicketMutation } from "@/store/api/contactApi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Clock,
  ShieldCheck,
  Info,
  Send,
  Tag,
  AlertCircle,
  Search,
} from "lucide-react";
import { toast } from "react-toastify";

export default function SupportTicketsList() {
  const { data: tickets = [], isLoading, error } = useGetMyTicketsQuery();
  const [replyContactTicket] = useReplyContactTicketMutation();
  
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-select first ticket on load
  useEffect(() => {
    if (tickets.length > 0 && !selectedTicketId) {
      setSelectedTicketId(tickets[0].id);
    }
  }, [tickets, selectedTicketId]);

  // Scroll only the chat container to the bottom without moving the browser window
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (selectedTicketId) {
      const timeoutId = setTimeout(scrollToBottom, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedTicketId, tickets]);

  const getSubjectLabel = (subject: string, othersubject?: string) => {
    if (subject === "OTHERS" && othersubject) return othersubject;
    return subject.replace("_", " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const handleSendReply = async () => {
    if (!selectedTicketId || !replyText.trim()) return;

    const ticketId = selectedTicketId;
    try {
      setSendingId(ticketId);
      const res = await replyContactTicket({ contactId: ticketId, content: replyText.trim() }).unwrap();
      toast.success(res.message || "Reply sent successfully");
      setReplyText("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send reply");
      console.error("Failed to send reply", err);
    } finally {
      setSendingId(null);
    }
  };

  if (isLoading) {
    return (
      <Card className="shadow-none">
        <CardContent className="p-6">
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || tickets.length === 0) {
    return null; // Hide the section if there are no tickets or if an error occurs
  }

  // Filter tickets by search query
  const filteredTickets = tickets.filter((t: any) => {
    const subjectLabel = getSubjectLabel(t.subject, t.othersubject);
    return (
      subjectLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const activeTicket = tickets.find((t: any) => t.id === selectedTicketId);
  const replies = activeTicket?.messages || [];
  const isClosed = activeTicket?.makeasClosed;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-lg text-gray-900">
          My Support Tickets History
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Ticket List Panel */}
        <div className="bg-white rounded-xl border border-gray-200 flex flex-col h-[580px] shadow-sm overflow-hidden">
          {/* Search bar */}
          <div className="p-4 border-b bg-gray-50/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tickets..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Scrollable list */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {filteredTickets.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs font-medium">No tickets found</p>
              </div>
            ) : (
              filteredTickets.map((ticket: any) => {
                const isSelected = selectedTicketId === ticket.id;
                const repliesCount = ticket.messages?.length || 0;
                const ticketClosed = ticket.makeasClosed;

                return (
                  <button
                    key={ticket.id}
                    onClick={() => {
                      setSelectedTicketId(ticket.id);
                      setReplyText("");
                    }}
                    className={`w-full text-left p-4 hover:bg-slate-50 flex flex-col gap-1.5 transition-all ${
                      isSelected
                        ? "bg-blue-50/60 border-l-4 border-blue-600 pl-3"
                        : "border-l-4 border-transparent"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-xs text-gray-950 truncate max-w-[150px]">
                        {getSubjectLabel(ticket.subject, ticket.othersubject)}
                      </h4>
                      <Badge className={`text-[8px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${
                        ticketClosed
                          ? "bg-gray-100 text-gray-600 border border-gray-200"
                          : repliesCount > 0
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-blue-100 text-blue-700 border border-blue-200"
                      }`}>
                        {ticketClosed ? "Closed" : repliesCount > 0 ? "Replied" : "Open"}
                      </Badge>
                    </div>

                    <p className="text-[11px] text-gray-600 line-clamp-1 leading-normal">
                      {ticket.message}
                    </p>

                    <div className="flex items-center gap-1.5 text-[9px] text-gray-400 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                      {repliesCount > 0 && (
                        <>
                          <span>•</span>
                          <span>{repliesCount} {repliesCount === 1 ? 'msg' : 'msgs'}</span>
                        </>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Selected Ticket Conversation Panel */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[580px]">
          {activeTicket ? (
            <div className="flex flex-col h-full bg-slate-50/10">
              {/* Detail Header */}
              <div className="p-4 border-b bg-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-blue-100 text-blue-800 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                    Support Ticket
                  </span>
                  {activeTicket.makeasClosed && (
                    <span className="bg-gray-100 border border-gray-200 text-gray-600 text-[9px] font-bold px-2 py-0.5 rounded">
                      Closed
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-gray-900 tracking-tight">
                  {getSubjectLabel(activeTicket.subject, activeTicket.othersubject)}
                </h3>
                <div className="flex items-center justify-between mt-2 text-[10px] text-gray-400">
                  <span>Ticket ID: {activeTicket.id.substring(0, 8)}...</span>
                  <span>Submitted: {new Date(activeTicket.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Chat messages viewport */}
              <div
                ref={chatContainerRef}
                className="flex-1 p-6 overflow-y-auto bg-[#F8FAFC] space-y-5 flex flex-col"
              >
                {/* Original inquiry from User */}
                <div className="flex items-start gap-3 max-w-[85%] self-start bg-white p-5 rounded-2xl rounded-tl-none border border-gray-150 shadow-sm">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-xs text-gray-900">
                        You (Support Request)
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap mt-1">
                      {activeTicket.message}
                    </p>
                    <p className="text-[9px] text-gray-400 pt-1 text-right">
                      {new Date(activeTicket.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Conversation replies */}
                {replies.map((reply: any, index: number) => {
                  const isReplyFromAdmin = reply.isFromAdmin;
                  return (
                    <div
                      key={reply.id || index}
                      className={`flex max-w-[85%] ${
                        isReplyFromAdmin ? "self-start" : "self-end"
                      }`}
                    >
                      <div
                        className={`p-5 rounded-2xl shadow-sm border text-sm leading-relaxed ${
                          isReplyFromAdmin
                            ? "bg-white border-gray-150 text-gray-800 rounded-tl-none"
                            : "bg-blue-600 border-blue-600 text-white rounded-tr-none"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-6 mb-1.5">
                          <span
                            className={`text-xs font-bold ${
                              isReplyFromAdmin ? "text-gray-900" : "text-blue-100"
                            }`}
                          >
                            {isReplyFromAdmin ? "SayaraHub Support Team" : "You (Reply)"}
                          </span>
                        </div>
                        <p className="whitespace-pre-wrap">{reply.content}</p>
                        <p
                          className={`text-[9px] mt-2 text-right ${
                            isReplyFromAdmin ? "text-gray-400" : "text-blue-200"
                          }`}
                        >
                          {new Date(reply.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Box */}
              {!isClosed ? (
                <div className="border-t p-4 bg-white space-y-3">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={3}
                    placeholder="Type your reply to the support team..."
                    className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none shadow-sm"
                  />
                  <div className="flex justify-end">
                    <button
                      disabled={!replyText.trim() || sendingId === activeTicket.id}
                      onClick={handleSendReply}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs disabled:opacity-50 transition-all shadow-sm active:scale-[0.98]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {sendingId === activeTicket.id ? "Sending..." : "Send Reply"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 border-t flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Info className="w-4 h-4 text-gray-400" />
                  <span>This support ticket has been closed. You cannot send replies.</span>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8">
              <div className="w-12 h-12 rounded-full bg-slate-50 border border-dashed flex items-center justify-center mb-3">
                <MessageSquare className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-xs font-medium">Select a support ticket to view conversation details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
