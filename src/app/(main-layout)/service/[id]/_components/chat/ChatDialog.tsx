"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Mic, Check } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: number;
  text: string;
  sender: "user" | "garage";
  time: string;
  status?: "sent" | "delivered" | "read";
}

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  garageName: string;
}

export default function ChatDialog({
  open,
  onOpenChange,
  garageName,
}: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello!", sender: "user", time: "9:24", status: "read" },
    {
      id: 2,
      text: "I'd like to service my car (Toyota Camry 2019). Are you available today?",
      sender: "user",
      time: "9:30",
      status: "read",
    },
    { id: 3, text: "Hello!", sender: "garage", time: "9:34" },
    {
      id: 4,
      text: "Hello! 👋 Yes, we have a few slots open this afternoon. Would you like to book an appointment at 3:00 PM?",
      sender: "garage",
      time: "9:35",
    },
    {
      id: 5,
      text: "Yes, that works. Do you also offer oil change and inspection?",
      sender: "user",
      time: "9:39",
      status: "read",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      status: "sent",
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md h-[600px] p-0 gap-0">
        {/* Header */}
        <div className="border-b p-4 ">
          <h3 className="text-lg font-semibold text-center">{garageName}</h3>
          <p className="text-sm text-green-600 text-center">Active Now</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
          <div className="text-center">
            <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
              Today
            </span>
          </div>

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } gap-2`}
            >
              {message.sender === "garage" && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-yellow-400 text-white text-xs">
                    🧑🔧
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`max-w-[75%] ${
                  message.sender === "user" ? "bg-blue-100" : "bg-white"
                } rounded-2xl px-4 py-2 shadow-sm`}
              >
                <p className="text-sm text-gray-800">{message.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-xs text-gray-500">{message.time}</span>
                  {message.sender === "user" && message.status && (
                    <Check
                      className={`h-3 w-3 ${
                        message.status === "read"
                          ? "text-blue-500"
                          : "text-gray-400"
                      }`}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-yellow-400 text-white text-xs">
                  🧑🔧
                </AvatarFallback>
              </Avatar>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t p-4 ">
          <div className="flex items-center gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type you message"
              className="flex-1 rounded-full border-gray-300"
            />
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleSend}
              size="icon"
              className="bg-blue-600 hover:bg-blue-700 rounded-full"
            >
              <Mic className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
