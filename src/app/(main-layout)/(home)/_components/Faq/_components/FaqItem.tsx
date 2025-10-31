import React from "react";
import { Plus, Minus } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItemProps {
  id: string;
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ id, question, answer }) => {
  return (
    <AccordionItem
      value={id}
      className="bg-[#E8F1FD80] rounded-2xl px-4 border-0 transition-all duration-300"
    >
      <AccordionTrigger className="text-left text-base md:text-lg font-semibold hover:no-underline [&>svg]:hidden [&[data-state=open]>svg.minus]:block [&[data-state=closed]>svg.plus]:block">
        {question}
        <Plus className="plus h-5 w-5 shrink-0 transition-all duration-300 ease-in-out hidden" />
        <Minus className="minus h-5 w-5 shrink-0 transition-all duration-300 ease-in-out hidden" />
      </AccordionTrigger>
      <AccordionContent className="text-sm md:text-base text-[#101010] transition-all duration-300 ease-in-out">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FaqItem;
