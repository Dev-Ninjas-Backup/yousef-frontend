"use client";
import React from "react";
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
import { Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { contactTranslations } from "@/translations/contact";

const GetInTouch: React.FC = () => {
  const { t } = useLanguage();
  const trans = t(contactTranslations);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-10 md:mb-12 space-y-5">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#333333]">
            {trans.form.title}
          </h2>
          <p className="text-gray-600 text-base sm:text-xl max-w-2xl mx-auto">
            {trans.form.subtitle}
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-[#333333] mb-6">
            {trans.form.formTitle}
          </h3>
          <form className="space-y-6 border rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">{trans.form.firstName}</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder={trans.form.firstName}
                  className="bg-[#F3F3F5]"
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
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">{trans.form.subject}</Label>
              <Select>
                <SelectTrigger id="subject" className="w-full bg-[#F3F3F5]">
                  <SelectValue placeholder={trans.form.subjectPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">{trans.form.subjects.general}</SelectItem>
                  <SelectItem value="support">{trans.form.subjects.support}</SelectItem>
                  <SelectItem value="partnership">{trans.form.subjects.partnership}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{trans.form.message}</Label>
              <Textarea
                id="message"
                placeholder={trans.form.messagePlaceholder}
                className="bg-[#F3F3F5] min-h-[120px]"
                required
              />
            </div>

            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white flex gap-3 justify-center items-center px-8 py-4 md:py-6 rounded-lg text-sm w-full "
            >
              <Send />
              {trans.form.sendButton}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
