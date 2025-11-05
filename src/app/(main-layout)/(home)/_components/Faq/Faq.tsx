import React from "react";
import { Accordion } from "@/components/ui/accordion";
import FaqItem from "./_components/FaqItem";
const faqData = [
  {
    id: "item-1",
    question: "What is this platform?",
    answer:
      "SayaraHub is an all-in-one automotive platform connecting you with trusted garages, mobile mechanics, emergency services, and a spare parts marketplace for all your vehicle needs.",
  },
  {
    id: "item-2",
    question: "Who is this platform designed for?",
    answer:
      "SayaraHub is designed for vehicle owners, fleet managers, and anyone seeking reliable automotive services, whether for routine maintenance, emergency repairs, or purchasing spare parts.",
  },
  {
    id: "item-3",
    question: "Can I book home or office car repair services?",
    answer:
      "Yes! You can book mobile mechanics who will come directly to your home or office location to perform repairs and maintenance at your convenience.",
  },
  {
    id: "item-4",
    question: "How does the spare-parts marketplace work?",
    answer:
      "Browse our marketplace to find spare parts from verified sellers. You can compare prices, check availability, and order parts directly through the app for delivery or pickup.",
  },
  {
    id: "item-5",
    question: "Are there any free services for new users?",
    answer:
      "New users can enjoy special promotions and discounts on their first service booking. Check the app regularly for exclusive offers and seasonal deals.",
  },
  {
    id: "item-6",
    question: "How does SayaraHub ensure safety and reliability?",
    answer:
      "All service providers are thoroughly verified and vetted. We feature real customer ratings and reviews, ensuring you can make informed decisions and trust the quality of service.",
  },
  {
    id: "item-7",
    question: "Who should I contact for help or feedback?",
    answer:
      "You can reach our customer support team through the in-app messaging feature, email us through our website's contact form, or call our helpline for immediate assistance.",
  },
];;

const Faq: React.FC = () => {
  return (
    <>
      <section className="w-full py-12 md:py-16 ">
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
              <FaqItem
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
