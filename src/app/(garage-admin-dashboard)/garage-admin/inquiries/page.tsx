"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useGetCustomInquiriesQuery, useReplyInquiryMutation } from "@/store/api/garageAdminApis/myGarage/garageInquiryApi";
import {
  Search,
  Send,
  Mail,
  User,
  MessageSquare,
  Tag,
  AlertCircle,
  RotateCcw,
  SlidersHorizontal,
  Info
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const formatSubject = (subject: string | null | undefined) => {
  if (!subject) return "";
  return subject
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function InquiriesPage() {
  return (
    <Suspense fallback={
      <div className="p-6 space-y-6 bg-gray-50 rounded-xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    }>
      <InquiriesContent />
    </Suspense>
  );
}

function InquiriesContent() {
  const { data: inquiries = [], error, isLoading } = useGetCustomInquiriesQuery();
  const [replyInquiry, { isLoading: isReplying }] = useReplyInquiryMutation();

  const searchParams = useSearchParams();
  const inquiryIdParam = searchParams.get("inquiryId");
  const emailParam = searchParams.get("email");
  const [hasInitialized, setHasInitialized] = useState(false);

  // Selected Inquiry State
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Reset selected ID when data or filters change
  useEffect(() => {
    setSelectedId(null);
  }, [subjectFilter, statusFilter, dateFilter, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSubjectFilter("all");
    setStatusFilter("all");
    setDateFilter("All Time");
    setSortOrder("desc");
  };

  // Filtered and Sorted Inquiries
  const processedInquiries = useMemo(() => {
    const filtered = inquiries.filter((inquiry) => {
      const customerName = `${inquiry.FirstName} ${inquiry.LastName}`;
      const matchesSearch =
        customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inquiry.message.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      const matchesSubject =
        subjectFilter === "all" || inquiry.subject === subjectFilter;
      if (!matchesSubject) return false;

      const isReplied = inquiry.messages && inquiry.messages.length > 0;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "new" && !isReplied) ||
        (statusFilter === "replied" && isReplied);
      if (!matchesStatus) return false;

      if (dateFilter !== "All Time") {
        const msgDate = new Date(inquiry.createdAt);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - msgDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (dateFilter === "Today" && diffDays > 1) return false;
        if (dateFilter === "This Week" && diffDays > 7) return false;
        if (dateFilter === "This Month" && diffDays > 30) return false;
        if (dateFilter === "This Year" && diffDays > 365) return false;
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? bTime - aTime : aTime - bTime;
    });
  }, [inquiries, searchQuery, subjectFilter, statusFilter, dateFilter, sortOrder]);

  // Find Currently Selected Inquiry
  const selectedInquiry = useMemo(() => {
    return inquiries.find((inq) => inq.id === selectedId) || null;
  }, [inquiries, selectedId]);

  // Handle URL parameter initialization and selection
  useEffect(() => {
    if (processedInquiries.length > 0 && !hasInitialized) {
      let targetId: string | null = null;
      if (inquiryIdParam) {
        const match = inquiries.find((inq) => inq.id === inquiryIdParam);
        if (match) targetId = match.id;
      }
      if (!targetId && emailParam) {
        const match = inquiries.find((inq) => inq.email.toLowerCase() === emailParam.toLowerCase());
        if (match) targetId = match.id;
      }

      if (targetId) {
        setSelectedId(targetId);
      } else {
        setSelectedId(processedInquiries[0].id);
      }
      setHasInitialized(true);
    }
  }, [processedInquiries, inquiries, inquiryIdParam, emailParam, hasInitialized]);

  // Automatically select the first item on load/filter changes if initialized
  useEffect(() => {
    if (processedInquiries.length > 0 && !selectedId && hasInitialized) {
      setSelectedId(processedInquiries[0].id);
    }
  }, [processedInquiries, selectedId, hasInitialized]);

  const handleSendReply = async () => {
    if (!selectedId || !replyText.trim()) return;

    try {
      await replyInquiry({
        contactId: selectedId,
        content: replyText,
      }).unwrap();

      toast.success("Reply sent successfully!");
      setReplyText("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send reply. Please try again.");
    }
  };

  const getSubjectBadgeColor = (subject: string) => {
    const colors: Record<string, string> = {
      CAR_PARTS: "bg-blue-100 text-blue-700 border border-blue-200",
      CAR_SERVICE: "bg-green-100 text-green-700 border border-green-200",
      OTHERS: "bg-purple-100 text-purple-700 border border-purple-200",
    };
    return colors[subject] || "bg-gray-100 text-gray-700 border border-gray-200";
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 bg-gray-50 rounded-xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6 bg-gray-50 rounded-xl">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error loading inquiries. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Customer Inquiries</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage customer messages, inquiries, and send replies directly.
        </p>
      </div>

      {/* Tabs / Filter Controls */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="new">New / Unreplied</option>
              <option value="replied">Replied</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "desc" | "asc")}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all cursor-pointer"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>

            <button
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                showFiltersPanel
                  ? "bg-blue-50 border-blue-200 text-blue-600"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Advanced Filters
            </button>
          </div>
        </div>

        {/* Collapsible Advanced Filters */}
        {showFiltersPanel && (
          <div className="pt-3 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-down">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Subject Type</label>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium px-3 py-2.5 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="all">All Subjects</option>
                <option value="CAR_SERVICE">Car Service</option>
                <option value="CAR_PARTS">Car Parts</option>
                <option value="OTHERS">Others</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date Received</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium px-3 py-2.5 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="All Time">All Time</option>
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
              </select>
            </div>

            <div className="sm:col-span-2 flex justify-between items-center pt-2">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-semibold transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Split-pane content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column list (1/3) */}
        <div className="bg-white rounded-2xl border flex flex-col h-[600px] shadow-sm overflow-hidden">
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {processedInquiries.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-medium">No inquiries found</p>
                {(searchQuery || subjectFilter !== "all" || statusFilter !== "all" || dateFilter !== "All Time") && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-blue-600 hover:underline mt-2 font-semibold"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              processedInquiries.map((inq) => {
                const isReplied = inq.messages && inq.messages.length > 0;
                const isSelected = selectedId === inq.id;
                const displaySubject =
                  inq.subject === "OTHERS" && inq.othersubject
                    ? inq.othersubject
                    : formatSubject(inq.subject);

                return (
                  <button
                    key={inq.id}
                    onClick={() => setSelectedId(inq.id)}
                    className={`w-full text-left p-4 hover:bg-gray-50 flex flex-col gap-1 transition-all ${
                      isSelected
                        ? "bg-blue-50/70 border-l-4 border-blue-600 pl-3"
                        : "border-l-4 border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-sm text-gray-900 truncate">
                        {inq.FirstName} {inq.LastName}
                      </h3>
                      <span className="text-[10px] text-gray-400 font-medium shrink-0">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Tag className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <p className="text-xs font-semibold text-blue-600 truncate">
                          {displaySubject}
                        </p>
                      </div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                        isReplied
                          ? "bg-gray-100 text-gray-600"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {isReplied ? "Replied" : "New"}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-1 mt-2 font-normal">
                      {inq.message}
                    </p>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right column details (2/3) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border flex flex-col shadow-sm overflow-hidden min-h-[600px]">
          {selectedInquiry ? (
            <div className="flex flex-col h-full bg-slate-50/10">
              {/* Card Header */}
              <div className="p-6 border-b bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getSubjectBadgeColor(selectedInquiry.subject)}>
                    {selectedInquiry.subject.replace("_", " ")}
                  </Badge>
                  {selectedInquiry.messages && selectedInquiry.messages.length > 0 ? (
                    <span className="bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      Replied
                    </span>
                  ) : (
                    <span className="bg-blue-100 border border-blue-200 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      New Inquiry
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                  {selectedInquiry.subject === "OTHERS" && selectedInquiry.othersubject
                    ? selectedInquiry.othersubject
                    : formatSubject(selectedInquiry.subject)}
                </h2>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800 flex items-center gap-1 inline-flex">
                      <User className="w-3.5 h-3.5" />
                      {selectedInquiry.FirstName} {selectedInquiry.LastName}
                    </span>
                    <span className="text-gray-300 mx-2">|</span>
                    <span className="text-blue-600 flex items-center gap-1 inline-flex hover:underline cursor-pointer">
                      <Mail className="w-3.5 h-3.5" />
                      {selectedInquiry.email}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 font-medium">
                    Received: {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Inquiry Message Body */}
              <div className="p-6 overflow-y-auto max-h-[300px]">
                <div className="bg-gray-50 border border-gray-150 p-4 rounded-xl shadow-inner text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-bold mb-2">Original Message</p>
                  {selectedInquiry.message}
                </div>

                {/* Conversation Thread */}
                {selectedInquiry.messages && selectedInquiry.messages.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Reply History</h4>
                    <div className="space-y-3">
                      {selectedInquiry.messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-xl border leading-relaxed text-sm whitespace-pre-wrap ${
                            msg.isFromAdmin
                              ? "bg-blue-50/50 border-blue-100 shadow-sm"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-bold text-gray-700">
                              {msg.isFromAdmin ? "You (Garage Admin)" : `${selectedInquiry.FirstName} ${selectedInquiry.LastName}`}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {new Date(msg.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm">{msg.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Reply Form */}
              <div className="border-t p-6 bg-white space-y-4">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                  placeholder="Write your response to the customer..."
                  className="w-full p-4 bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none shadow-inner"
                />
                <div className="flex justify-end">
                  <button
                    disabled={!replyText.trim() || isReplying}
                    onClick={handleSendReply}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm disabled:opacity-50 transition-all duration-200 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    {isReplying ? "Sending..." : "Send Reply"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 flex-1">
              <div className="w-16 h-16 rounded-full bg-slate-50 border border-dashed flex items-center justify-center mb-3">
                <MessageSquare className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-sm font-medium">Select a customer inquiry to view details and send reply</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
