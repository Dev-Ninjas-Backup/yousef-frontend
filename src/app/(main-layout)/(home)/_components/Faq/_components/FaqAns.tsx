import React from "react";
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

const FaqAns: React.FC<FaqItemProps> = ({ id, question, answer }) => {
  return (
    <AccordionItem value={id} className="bg-[#E8F1FD80] rounded-2xl px-4">
      <AccordionTrigger className="text-left text-base md:text-lg font-semibold">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-sm md:text-base text-[#101010]">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FaqAns;
