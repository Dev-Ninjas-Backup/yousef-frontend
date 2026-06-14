"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Send, ClipboardList, PenLine } from "lucide-react";
import { useCreateCustomInquiryMutation } from "@/store/api/garageAdminApis/myGarage/garageInquiryApi";
import { useAppSelector } from "@/store/hooks";
import { toast } from "sonner";

interface InquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  garageOwnerId: string;
  garageName: string;
}

export default function InquiryModal({
  open,
  onOpenChange,
  garageOwnerId,
  garageName,
}: InquiryModalProps) {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [createInquiry, { isLoading }] = useCreateCustomInquiryMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<"CAR_PARTS" | "CAR_SERVICE" | "OTHERS">("CAR_SERVICE");
  const [otherSubject, setOtherSubject] = useState("");
  const [message, setMessage] = useState("");

  // Pre-fill user data if logged in
  useEffect(() => {
    if (currentUser && open) {
      const nameParts = currentUser.name ? currentUser.name.split(" ") : ["", ""];
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");
      setEmail(currentUser.email || "");
    }
  }, [currentUser, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (subject === "OTHERS" && !otherSubject.trim()) {
      toast.error("Please specify your custom subject.");
      return;
    }

    try {
      await createInquiry({
        FirstName: firstName,
        LastName: lastName,
        email,
        subject,
        message,
        othersubject: subject === "OTHERS" ? otherSubject : undefined,
        garageOwnerId,
      }).unwrap();

      toast.success("Inquiry sent successfully to the garage!");
      setMessage("");
      setOtherSubject("");
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit inquiry. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-6 rounded-2xl shadow-xl border border-gray-100">
        <DialogHeader className="pb-4 border-b border-gray-100">
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-600" />
            Send Service Inquiry
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-1">
            Send a structured request or question to <span className="font-semibold text-gray-800">{garageName}</span>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="firstName" className="text-xs font-bold text-gray-700">First Name <span className="text-red-500">*</span></Label>
              <Input
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-gray-50 border-gray-200 h-10 rounded-xl text-sm"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName" className="text-xs font-bold text-gray-700">Last Name <span className="text-red-500">*</span></Label>
              <Input
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-50 border-gray-200 h-10 rounded-xl text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-bold text-gray-700">Email Address <span className="text-red-500">*</span></Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border-gray-200 h-10 rounded-xl text-sm"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="subject" className="text-xs font-bold text-gray-700">Inquiry Subject <span className="text-red-500">*</span></Label>
            <Select
              value={subject}
              onValueChange={(val) => setSubject(val as "CAR_PARTS" | "CAR_SERVICE" | "OTHERS")}
            >
              <SelectTrigger id="subject" className="bg-gray-50 border-gray-200 h-10 rounded-xl text-sm">
                <SelectValue placeholder="Select Inquiry Subject" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                <SelectItem value="CAR_SERVICE" className="cursor-pointer">Car Service Request</SelectItem>
                <SelectItem value="CAR_PARTS" className="cursor-pointer">Car Parts Sourcing</SelectItem>
                <SelectItem value="OTHERS" className="cursor-pointer">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {subject === "OTHERS" && (
            <div className="space-y-1.5">
              <Label htmlFor="otherSubject" className="text-xs font-bold text-gray-700">Specify Subject <span className="text-red-500">*</span></Label>
              <div className="relative">
                <PenLine className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="otherSubject"
                  placeholder="What is your request about?"
                  value={otherSubject}
                  onChange={(e) => setOtherSubject(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-200 h-10 rounded-xl text-sm"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-xs font-bold text-gray-700">Message / Description <span className="text-red-500">*</span></Label>
            <Textarea
              id="message"
              placeholder="Describe what automotive services or parts you need..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-gray-50 border-gray-200 min-h-[100px] rounded-xl text-sm resize-none"
              required
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white flex gap-2 justify-center items-center h-11 rounded-xl text-sm font-semibold w-full transition-all duration-300"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {isLoading ? "Submitting Inquiry..." : "Submit Inquiry"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
