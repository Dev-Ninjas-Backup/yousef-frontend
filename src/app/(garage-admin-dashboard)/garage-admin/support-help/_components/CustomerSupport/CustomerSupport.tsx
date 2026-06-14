"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquare, Send, Loader2, PenLine, Headphones } from "lucide-react";
import { useCreateContactMutation } from "@/store/api/contactApi";
import { useAppSelector } from "@/store/hooks";
import { toast } from "sonner";

const CustomerSupport = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [createContact, { isLoading }] = useCreateContactMutation();

  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState<"CAR_SERVICE" | "CAR_PARTS" | "OTHERS">("CAR_SERVICE");
  const [otherSubject, setOtherSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error("Please enter a message.");
      return;
    }

    if (subject === "OTHERS" && !otherSubject.trim()) {
      toast.error("Please specify your custom subject.");
      return;
    }

    // Split name
    const nameParts = currentUser?.name ? currentUser.name.split(" ") : ["Garage", "Owner"];
    const firstName = nameParts[0] || "Garage";
    const lastName = nameParts.slice(1).join(" ") || "Owner";

    try {
      await createContact({
        FirstName: firstName,
        LastName: lastName,
        email: currentUser?.email || "garage-owner@example.com",
        subject: subject,
        message: message,
        othersubject: subject === "OTHERS" ? otherSubject : undefined,
        garageOwnerId: currentUser?.id,
      }).unwrap();

      toast.success("Support message sent to admin successfully! We will contact you via email.");
      setMessage("");
      setOtherSubject("");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send message to admin. Please try again.");
    }
  };

  return (
    <Card className="shadow-none">
      <CardContent className="space-y-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Customer Support</h3>
        </div>

        <p className="text-base text-gray-600">
          Chat with our support team for help with listings, verification, or
          any other questions.
        </p>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 gap-2 py-5 text-white">
              <MessageSquare className="w-4 h-4" />
              Start Chat
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg p-6 rounded-2xl shadow-xl border border-gray-100">
            <DialogHeader className="pb-4 border-b border-gray-100">
              <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Headphones className="w-5 h-5 text-blue-600" />
                Contact Admin Support
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mt-1">
                Submit a message directly to the SayaraHub support and administration team. We will review your message and reply via email.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label htmlFor="subject" className="text-xs font-bold text-gray-700">Support Subject <span className="text-red-500">*</span></Label>
                <Select
                  value={subject}
                  onValueChange={(val) => setSubject(val as "CAR_PARTS" | "CAR_SERVICE" | "OTHERS")}
                >
                  <SelectTrigger id="subject" className="bg-gray-50 border-gray-200 h-10 rounded-xl text-sm">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                    <SelectItem value="CAR_SERVICE" className="cursor-pointer">Car Service Query</SelectItem>
                    <SelectItem value="CAR_PARTS" className="cursor-pointer">Car Parts Sourcing Query</SelectItem>
                    <SelectItem value="OTHERS" className="cursor-pointer">Others / Profile / Account Support</SelectItem>
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
                      placeholder="What is your support query about?"
                      value={otherSubject}
                      onChange={(e) => setOtherSubject(e.target.value)}
                      className="pl-10 bg-gray-50 border-gray-200 h-10 rounded-xl text-sm"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs font-bold text-gray-700">Support Message <span className="text-red-500">*</span></Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue or query in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-gray-50 border-gray-200 min-h-[120px] rounded-xl text-sm resize-none"
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
                  {isLoading ? "Sending Message..." : "Send Support Request"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default CustomerSupport;
