"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { serviceDetailsTranslations } from "@/translations/serviceDetails";

interface OperatingHoursProps {
  hours: {
    day: string;
    hours: string;
    status: "Open" | "Closed";
  }[];
}

export default function OperatingHours({ hours }: OperatingHoursProps) {
  const { t } = useLanguage();
  const trans = t(serviceDetailsTranslations);
  const [isOpen, setIsOpen] = useState(true);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todayIdx = new Date().getDay();
  const todayName = daysOfWeek[todayIdx];
  
  // Find today's hours string
  const todayHoursObj = hours.find((h) => h.day === todayName) || hours[0];
  const todayHoursStr = todayHoursObj?.hours || "Closed";

  const checkIfOpen = (hoursStr: string): boolean => {
    if (!hoursStr || hoursStr.toLowerCase() === "closed") return false;
    const match = hoursStr.match(
      /(\d{1,2}):?(\d{0,2})\s*(am|pm)?\s*-\s*(\d{1,2}):?(\d{0,2})\s*(am|pm)?/i
    );
    if (!match) return false;

    const parseTimeLocal = (h: string, m: string, p?: string): number => {
      let hour = parseInt(h);
      const min = parseInt(m || "0");
      if (p?.toLowerCase() === "pm" && hour !== 12) hour += 12;
      if (p?.toLowerCase() === "am" && hour === 12) hour = 0;
      return hour + min / 60;
    };

    const open = parseTimeLocal(match[1], match[2], match[3]);
    const close = parseTimeLocal(match[4], match[5], match[6]);
    
    const now = new Date();
    const current = now.getHours() + now.getMinutes() / 60;

    return current >= open && current < close;
  };

  const isCurrentlyOpen = checkIfOpen(todayHoursStr);

  // Rotate hours so today is at the top
  const rotatedHours = [...hours];
  const todayItemIndex = rotatedHours.findIndex(h => h.day === todayName);
  if (todayItemIndex !== -1) {
    const before = rotatedHours.slice(0, todayItemIndex);
    const after = rotatedHours.slice(todayItemIndex);
    rotatedHours.splice(0, rotatedHours.length, ...after, ...before);
  }

  return (
    <Card className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors text-left focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
            <Clock className={`w-5 h-5 ${isCurrentlyOpen ? "text-emerald-500" : "text-rose-500"}`} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {trans.operatingHours}
            </span>
            <span className={`text-base font-extrabold ${isCurrentlyOpen ? "text-emerald-600" : "text-rose-500"}`}>
              {isCurrentlyOpen ? "Open Now" : "Closed"}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {/* Accordion Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-slate-100"
          >
            <div className="p-5 space-y-3 bg-slate-50/30">
              {rotatedHours.map((hour, index) => {
                const isToday = hour.day === todayName;
                const isItemOpen = checkIfOpen(hour.hours);
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      isToday
                        ? "bg-blue-50/60 border-blue-100/80 shadow-sm"
                        : "bg-white border-slate-100/70"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isToday && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse mr-1" />
                      )}
                      <span className={`text-sm font-bold ${isToday ? "text-blue-900" : "text-slate-700"}`}>
                        {hour.day}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold ${isToday ? "text-blue-800" : "text-slate-500"}`}>
                        {hour.hours}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          hour.hours.toLowerCase() === "closed"
                            ? "bg-rose-50 text-rose-600 border-rose-100"
                            : isItemOpen
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {hour.hours.toLowerCase() === "closed" ? "Closed" : "Open"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
