import { Card, CardContent } from "@/components/ui/card";
import { useGetPaymentConfigQuery } from "@/store/fetures/setting.api";

const FAQSection = () => {
  const { data: configData } = useGetPaymentConfigQuery();
  const price = configData?.data?.monthlyGaragePrice || "99";

  const faqs = [
    {
      question: "How do I set up and manage my garage profile?",
      answer:
        "Navigate to the 'My Garage' tab from the sidebar menu. Here, you can edit your garage name, location, contact details, profile and banner photos, operating hours, and list of services offered. Keeping this updated helps customers locate and contact you.",
    },
    {
      question: "How does the product listing approval process work?",
      answer:
        "When you upload a new product or spare part, it undergoes a quick moderation review to ensure listings contain accurate photos, categories, and descriptions. Review is typically completed within a few hours.",
    },
    {
      question: "What listing plan do I have as a garage owner?",
      answer:
        `All registered Garage Partners use the Garage Partner Plan (AED ${price}/month). This tier provides you with unlimited product listings, premium search placement, a 'Verified' badge, and direct customer contact options.`,
    },
    {
      question: "How do I respond to customer inquiries?",
      answer:
        "Go to the 'Inquiries' tab in the sidebar. You can view all incoming messages, see which product the customer is asking about, check their contact info, and respond directly.",
    },
    {
      question: "How can I promote my listings for higher visibility?",
      answer:
        "You can create active advertisements or promote specific products through the 'Ad & Promotion' tab. Promoted listings appear at the top of customer search pages to drive higher sales inquiry volume.",
    },
    {
      question: "How do I manage my billing or cancel my plan?",
      answer:
        "Navigate to the 'Plans & Billing' section in your sidebar. From there, you can check your next billing date, manage your subscription plan, or request cancellation. Cancellations take effect at the end of the current billing cycle.",
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
