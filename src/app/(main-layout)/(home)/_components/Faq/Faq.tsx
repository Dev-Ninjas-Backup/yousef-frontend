import React from "react";
import { Accordion } from "@/components/ui/accordion";
import FaqAns from "./_components/FaqAns";
const faqData = [
  {
    id: "item-1",
    question: "What is SayaraHub?",
    answer:
      "SayaraHub is a next-generation automotive platform that connects you with trusted garages, mobile mechanics, emergency services, and spare parts marketplace, all in one powerful app.",
  },
  {
    id: "item-2",
    question: "How do I book a service?",
    answer:
      "Simply select your emirate, choose the service type you need, and search for nearby garages. You can then view their ratings, get directions, or message them directly to book an appointment.",
  },
  {
    id: "item-3",
    question: "Is the app available for both iOS and Android?",
    answer:
      "Yes! SayaraHub is available for download on both the Apple App Store and Google Play Store.",
  },
  {
    id: "item-4",
    question: "How do I know if a garage is trustworthy?",
    answer:
      "All garages on SayaraHub are verified and rated by real customers. You can check their ratings, reviews, and service history before making a booking.",
  },
  {
    id: "item-5",
    question: "Can I get emergency roadside assistance?",
    answer:
      "Yes, SayaraHub provides emergency roadside assistance services. You can quickly connect with nearby mobile mechanics for urgent repairs and assistance.",
  },
  {
    id: "item-6",
    question: "How do I contact customer support?",
    answer:
      "You can reach our customer support team through the app's messaging feature or contact us directly through our website's contact form.",
  },
];

const Faq: React.FC = () => {
  return (
    <>
      <section className="w-full py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-[#101010] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base md:text-lg text-[#101010]">
              Clear answers to the most common questions about our staffing and
              workforce safety services.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4  ">
            {faqData.map((faq) => (
              <FaqAns
                key={faq.id}
                id={faq.id}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default Faq;
