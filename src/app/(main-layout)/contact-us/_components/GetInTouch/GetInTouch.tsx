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
import { Send, Loader2 } from "lucide-react";
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

  return (
    <section id="get-in-touch" className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          className="text-center mb-10 md:mb-12 space-y-5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#333333]">
            {trans.form.title}
          </h2>
          <p className="text-gray-600 text-base sm:text-xl max-w-2xl mx-auto">
            {trans.form.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <h3 className="text-xl font-bold text-[#333333] mb-6">
            {trans.form.formTitle}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6 border rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">{trans.form.firstName}</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder={trans.form.firstName}
                  className="bg-[#F3F3F5]"
                  value={formData.FirstName}
                  onChange={(e) => handleInputChange("FirstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{trans.form.lastName}</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder={trans.form.lastName}
                  className="bg-[#F3F3F5]"
                  value={formData.LastName}
                  onChange={(e) => handleInputChange("LastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{trans.form.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={trans.form.emailPlaceholder}
                className="bg-[#F3F3F5]"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">{trans.form.subject}</Label>
              <Select value={formData.subject} onValueChange={handleSubjectChange}>
                <SelectTrigger id="subject" className="w-full bg-[#F3F3F5]">
                  <SelectValue placeholder={trans.form.subjectPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CAR_PARTS"> <span>{trans.form.subjects.carParts}</span></SelectItem>
                  <SelectItem value="CAR_SERVICE"> <span>{trans.form.subjects.carService}</span></SelectItem>
                  <SelectItem value="OTHERS"> <span>{trans.form.subjects.others}</span></SelectItem>
                </SelectContent>
              </Select>
            </div>

            {showOtherSubject && (
              <div className="space-y-2">
                <Label htmlFor="otherSubject">{trans.form.otherSubject}</Label>
                <Input
                  id="otherSubject"
                  type="text"
                  placeholder={trans.form.otherSubjectPlaceholder}
                  className="bg-[#F3F3F5]"
                  value={formData.othersubject}
                  onChange={(e) => handleInputChange("othersubject", e.target.value)}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="message">{trans.form.message}</Label>
              <Textarea
                id="message"
                placeholder={trans.form.messagePlaceholder}
                className="bg-[#F3F3F5] min-h-[120px]"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white flex gap-3 justify-center items-center px-8 py-4 md:py-6 rounded-lg text-sm w-full disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {isLoading ? "Sending..." : trans.form.sendButton}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default GetInTouch;
