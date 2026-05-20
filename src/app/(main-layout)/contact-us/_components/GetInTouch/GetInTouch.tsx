"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Loader2, MessageCircle, ShieldCheck, Lock, User2, Mail, PenLine, Truck, Handshake, Info, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { contactTranslations } from "@/translations/contact";
import { useCreateContactMutation, ContactFormData } from "@/store/api/contactApi";
import { toast } from "sonner";

const GetInTouch: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(contactTranslations);
  const [createContact, { isLoading }] = useCreateContactMutation();

  const [formData, setFormData] = useState<ContactFormData>({
    FirstName: "",
    LastName: "",
    email: "",
    subject: "CAR_PARTS",
    message: "",
    othersubject: ""
  });

  const [showOtherSubject, setShowOtherSubject] = useState(false);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubjectChange = (value: string) => {
    const subject = value as ContactFormData["subject"];
    setFormData(prev => ({ ...prev, subject }));
    setShowOtherSubject(subject === "OTHERS");
    if (subject !== "OTHERS") {
      setFormData(prev => ({ ...prev, othersubject: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.subject === "OTHERS" && !formData.othersubject?.trim()) {
      toast.error("Please specify the other subject");
      return;
    }

    try {
      const submitData = { ...formData };
      if (formData.subject !== "OTHERS") {
        delete submitData.othersubject;
      }

      await createContact(submitData).unwrap();
      toast.success("Message sent successfully! We'll get back to you soon.");

      // Reset form
      setFormData({
        FirstName: "",
        LastName: "",
        email: "",
        subject: "CAR_PARTS",
        message: "",
        othersubject: ""
      });
      setShowOtherSubject(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send message. Please try again.");
    }
  };

  const renderTitle = (title: string) => {
    if (title.includes("Touch")) {
      const parts = title.split("Touch");
      return <>{parts[0]}<span className="text-[#2563eb]">Touch</span>{parts[1]}</>;
    }
    return title;
  };

  return (
    <section id="get-in-touch" className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <motion.div
          className="text-center mb-10 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-[48px] font-bold text-[#111827]">
            {renderTitle(trans.form.title)}
          </h2>
          <p className="text-gray-500 text-[15px] sm:text-base max-w-lg mx-auto leading-relaxed">
            {trans.form.subtitle}
          </p>
        </motion.div>

        {/* Info Cards Row */}
        <motion.div 
          className="flex flex-col md:flex-row justify-center gap-4 sm:gap-6 mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Card 1 */}
          <div className="bg-[#f8fafc] rounded-2xl p-5 flex items-center gap-4 flex-1 border border-gray-100 transition-all duration-300 hover:bg-white hover:border-blue-100 hover:shadow-[0_8px_30px_rgb(37,99,235,0.06)] hover:-translate-y-1 group cursor-default select-none">
            <div className="w-12 h-12 rounded-xl bg-[#2563eb] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
              <MessageCircle className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <h4 className="text-gray-900 font-bold text-[14px] transition-colors duration-300 group-hover:text-blue-600">Quick Response</h4>
              <p className="text-gray-500 text-[12px] mt-0.5">We typically reply within 24 hours</p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-[#f8fafc] rounded-2xl p-5 flex items-center gap-4 flex-1 border border-gray-100 transition-all duration-300 hover:bg-white hover:border-blue-100 hover:shadow-[0_8px_30px_rgb(37,99,235,0.06)] hover:-translate-y-1 group cursor-default select-none">
            <div className="w-12 h-12 rounded-xl bg-[#2563eb] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
              <ShieldCheck className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <h4 className="text-gray-900 font-bold text-[14px] transition-colors duration-300 group-hover:text-blue-600">Real People</h4>
              <p className="text-gray-500 text-[12px] mt-0.5">Talk to our support team directly</p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-[#f8fafc] rounded-2xl p-5 flex items-center gap-4 flex-1 border border-gray-100 transition-all duration-300 hover:bg-white hover:border-blue-100 hover:shadow-[0_8px_30px_rgb(37,99,235,0.06)] hover:-translate-y-1 group cursor-default select-none">
            <div className="w-12 h-12 rounded-xl bg-[#2563eb] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
              <Lock className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <h4 className="text-gray-900 font-bold text-[14px] transition-colors duration-300 group-hover:text-blue-600">Your Privacy</h4>
              <p className="text-gray-500 text-[12px] mt-0.5">Your information is safe with us</p>
            </div>
          </div>
        </motion.div>

        {/* Main Form Container */}
        <motion.div
          className="max-w-[650px] mx-auto bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-8 sm:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="mb-8">
            <h3 className="text-[22px] font-bold text-[#111827] mb-2">
              {trans.form.formTitle}
            </h3>
            <p className="text-gray-500 text-[14px]">Fill out the form below and we&apos;ll get back to you shortly.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              {/* First Name */}
              <div className="space-y-1.5">
                <Label htmlFor="firstName" className="text-[#111827] font-semibold text-[13px]">{trans.form.firstName}</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User2 className="h-[18px] w-[18px] text-gray-400" />
                  </div>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    className="pl-10 bg-[#fafafa] border-gray-200 h-11 focus-visible:ring-blue-500 rounded-xl text-[14px]"
                    value={formData.FirstName}
                    onChange={(e) => handleInputChange("FirstName", e.target.value)}
                    required
                  />
                </div>
              </div>
              
              {/* Last Name */}
              <div className="space-y-1.5">
                <Label htmlFor="lastName" className="text-[#111827] font-semibold text-[13px]">{trans.form.lastName}</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User2 className="h-[18px] w-[18px] text-gray-400" />
                  </div>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    className="pl-10 bg-[#fafafa] border-gray-200 h-11 focus-visible:ring-blue-500 rounded-xl text-[14px]"
                    value={formData.LastName}
                    onChange={(e) => handleInputChange("LastName", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[#111827] font-semibold text-[13px]">{trans.form.email}</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-[18px] w-[18px] text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="pl-10 bg-[#fafafa] border-gray-200 h-11 focus-visible:ring-blue-500 rounded-xl text-[14px]"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <Label htmlFor="subject" className="text-[#111827] font-semibold text-[13px]">{trans.form.subject}</Label>
              <Select value={formData.subject} onValueChange={handleSubjectChange}>
                <SelectTrigger id="subject" className="w-full bg-[#fafafa] border-gray-200 h-11 rounded-xl text-[14px]">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                  <SelectItem value="CAR_PARTS" className="cursor-pointer"><span>{trans.form.subjects.carParts}</span></SelectItem>
                  <SelectItem value="CAR_SERVICE" className="cursor-pointer"><span>{trans.form.subjects.carService}</span></SelectItem>
                  <SelectItem value="OTHERS" className="cursor-pointer"><span>{trans.form.subjects.others}</span></SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Other Subject Input */}
            {showOtherSubject && (
              <motion.div 
                className="space-y-1.5"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <Label htmlFor="otherSubject" className="text-[#111827] font-semibold text-[13px]">{trans.form.otherSubject}</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <PenLine className="h-[18px] w-[18px] text-gray-400" />
                  </div>
                  <Input
                    id="otherSubject"
                    type="text"
                    placeholder="Please specify your subject"
                    className="pl-10 bg-[#fafafa] border-gray-200 h-11 focus-visible:ring-blue-500 rounded-xl text-[14px]"
                    value={formData.othersubject}
                    onChange={(e) => handleInputChange("othersubject", e.target.value)}
                    required
                  />
                </div>
              </motion.div>
            )}

            {/* Message */}
            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-[#111827] font-semibold text-[13px]">{trans.form.message}</Label>
              <div className="relative">
                <div className="absolute top-3.5 left-3.5 pointer-events-none">
                  <PenLine className="h-[18px] w-[18px] text-gray-400" />
                </div>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className="pl-10 pt-3.5 bg-[#fafafa] border-gray-200 min-h-[120px] focus-visible:ring-blue-500 rounded-xl resize-none text-[14px]"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex gap-2 justify-center items-center h-12 rounded-xl text-[15px] font-semibold w-full transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.99] shadow-lg shadow-blue-500/10 disabled:opacity-70 disabled:hover:scale-100"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {isLoading ? "Sending..." : trans.form.sendButton}
              </Button>
            </div>

            {/* Secure Note */}
            <div className="flex items-center justify-center gap-2 mt-4 text-gray-400">
              <Lock className="w-[12px] h-[12px]" />
              <span className="text-[11px] font-medium">Your information is secure and will only be used to respond to your inquiry.</span>
            </div>
          </form>
        </motion.div>

        {/* Bottom Features Banner */}
        <motion.div 
          className="max-w-[950px] mx-auto mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="bg-[#f8fafc] rounded-2xl p-6 lg:p-8 border border-gray-200/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 select-none">
            
            {/* Feature 1 */}
            <div className="flex items-center gap-3.5 flex-1 w-full justify-start pl-4 md:pl-0 p-2 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 group cursor-default">
              <div className="w-[38px] h-[38px] rounded-full bg-blue-100 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                <BadgeCheck className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <h5 className="font-bold text-[#111827] text-[13px] transition-colors duration-300 group-hover:text-blue-600">No Payments</h5>
                <p className="text-gray-500 text-[11px] mt-0.5">We don't handle payments.</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-[40px] bg-gray-200 shrink-0"></div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3.5 flex-1 w-full justify-start pl-4 md:pl-0 p-2 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 group cursor-default">
              <div className="w-[38px] h-[38px] rounded-full bg-blue-100 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                <Truck className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <h5 className="font-bold text-[#111827] text-[13px] transition-colors duration-300 group-hover:text-blue-600">No Deliveries</h5>
                <p className="text-gray-500 text-[11px] mt-0.5">We don't provide delivery.</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-[40px] bg-gray-200 shrink-0"></div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3.5 flex-1 w-full justify-start pl-4 md:pl-0 p-2 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 group cursor-default">
              <div className="w-[38px] h-[38px] rounded-full bg-blue-100 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                <Handshake className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <h5 className="font-bold text-[#111827] text-[13px] transition-colors duration-300 group-hover:text-blue-600">Direct Communication</h5>
                <p className="text-gray-500 text-[11px] mt-0.5">Connect and deal directly.</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-[40px] bg-gray-200 shrink-0"></div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3.5 flex-1 w-full justify-start pl-4 md:pl-0 p-2 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 group cursor-default">
              <div className="w-[38px] h-[38px] rounded-full bg-blue-100 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                <Info className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <h5 className="font-bold text-[#111827] text-[13px] transition-colors duration-300 group-hover:text-blue-600">No Guarantees</h5>
                <p className="text-gray-500 text-[11px] mt-0.5">We don't guarantee sellers or parts.</p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default GetInTouch;
