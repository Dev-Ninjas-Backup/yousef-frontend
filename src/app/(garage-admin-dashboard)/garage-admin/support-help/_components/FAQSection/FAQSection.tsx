import { Card, CardContent } from "@/components/ui/card";

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I add a new product listing?",
      answer:
        'Click the "Add New Product" button and fill in all required details including product name, category, price, and description.',
    },
    {
      question: "When will my listing be approved?",
      answer:
        "Product listings are typically reviewed within 24-48 hours. You will receive a notification once approved.",
    },
    {
      question: "What are the fees for listing products?",
      answer:
        "You get 3 free listings. After that, each additional listing costs 20 AED.",
    },
    {
      question: "How do I respond to customer inquiries?",
      answer:
        "Go to the Inquiries tab to view and respond to all customer messages directly.",
    },
  ];

  return (
    <Card className="shadow-none">
      <CardContent className="p-6 space-y-4">
        <h3 className="font-semibold text-lg text-gray-900">
          Frequently Asked Questions
        </h3>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-2 p-2 bg-[#F9FAFB] rounded-xl">
              <h4 className="font-medium text-gray-900">{faq.question}</h4>
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FAQSection;
