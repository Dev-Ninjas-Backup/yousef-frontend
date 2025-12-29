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
      <AccordionTrigger className="text-left text-base md:text-lg font-semibold hover:no-underline [&>svg]:hidden group">
        {question}
        <Plus className="h-5 w-5 shrink-0 transition-transform duration-300 ease-in-out group-data-[state=closed]:block group-data-[state=open]:hidden" />
        <Minus className="h-5 w-5 shrink-0 transition-transform duration-300 ease-in-out group-data-[state=open]:block group-data-[state=closed]:hidden" />
      </AccordionTrigger>
      <AccordionContent className="text-sm md:text-base text-[#101010] transition-all duration-300 ease-in-out">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FaqItem;
