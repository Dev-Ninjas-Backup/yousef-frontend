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

const GetInTouch: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-10 md:mb-12 space-y-5">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#333333]">
            Get in Touch
          </h2>
          <p className="text-gray-600 text-base sm:text-xl max-w-2xl mx-auto">
            Have questions or need assistance? Fill out the form below or reach
            out to us directly, our team will get back to you as soon as
            possible.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-[#333333] mb-6">
            Send Us a Message
          </h3>
          <form className="space-y-6 border rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  className="bg-[#F3F3F5]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="bg-[#F3F3F5]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="bg-[#F3F3F5]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select>
                <SelectTrigger id="subject" className="w-full bg-[#F3F3F5]">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                className="bg-[#F3F3F5] min-h-[120px]"
                required
              />
            </div>

            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white flex gap-3 justify-center items-center px-8 py-4 md:py-6 rounded-lg text-sm w-full "
            >
              <Send />
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
