"use client";

import { useState } from "react";
import { useGetPaymentConfigQuery } from "@/store/fetures/setting.api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Search,
  BookOpen,
  User,
  PlusCircle,
  Clock,
  MessageSquare,
  CreditCard,
  Settings,
  HelpCircle,
} from "lucide-react";

interface HelpArticle {
  id: string;
  title: string;
  category: string;
  icon: any;
  content: string;
}

const articles: HelpArticle[] = [
  {
    id: "profile",
    title: "How to set up and manage your garage profile",
    category: "Garage Profile",
    icon: User,
    content: "To update your business page, navigate to 'My Garage' from the sidebar. Here, you can upload your business logo, custom banner image, location coordinates, business hours, and phone number. Make sure to specify the car makes and types of services you specialize in, as our search engine uses this information to match you with nearby customers seeking those specific services.",
  },
  {
    id: "listings",
    title: "How to add, edit, and manage spare parts & products",
    category: "Product & Listings",
    icon: PlusCircle,
    content: "Navigate to the 'My Products' page and click the 'Add Product' button at the top right. Fill in all details: upload up to 5 clear photos of the spare part, select the category, specify the condition (New, Used, Rebuilt), set the price in AED, and select the stock availability. Click save to publish. You can edit or delete products at any time directly from the products table.",
  },
  {
    id: "approval",
    title: "How listing approval works",
    category: "Listing Approval",
    icon: Clock,
    content: "All product listings submitted by garage partners are reviewed by our administration team to ensure all details, categories, and photos meet our marketplace guidelines. This review is typically completed within 1 to 4 hours. You can track the status of your listings (Approved, Pending, or Inactive) directly from the status column in your products table.",
  },
  {
    id: "inquiries",
    title: "How to respond to customer inquiries",
    category: "Responding to Inquiries",
    icon: MessageSquare,
    content: "When a potential buyer is interested in a part you listed, they will send an inquiry. You will receive a notification immediately. Go to the 'Inquiries' section from the sidebar to view all customer messages. Each inquiry shows the specific product, customer name, date, and message. You can view their contact information or respond directly via the chat dashboard to finalize the deal.",
  },
  {
    id: "plans",
    title: "Subscription and plan information",
    category: "Plans & Billing",
    icon: CreditCard,
    content: "SayaraHub offers a unified 'Garage Partner Plan' at AED 99/month. This plan provides your business with unlimited product listings, premium search indexation, highlighted contacts, and a Verified Badge. You can manage your payment methods, check the trial progress, or cancel your active subscription plan at any time through the 'Plans & Billing' tab.",
  },
  {
    id: "account",
    title: "Notifications and account settings",
    category: "Account Settings",
    icon: Settings,
    content: "Under 'Profile & Settings', you can update your personal contact info, change your account password, and manage your notification preferences. Ensure your notification settings are enabled so you receive real-time email/push alerts when a customer sends an inquiry or when your listing status changes.",
  },
  {
    id: "support",
    title: "Support / Contact Help",
    category: "Support",
    icon: HelpCircle,
    content: "If you encounter technical issues, payment errors, or need assistance with your account verification, you can contact our dedicated merchant support team. Simply click 'Start Chat' under Customer Support on the Support & Help page, or email our support desk at support@sayarahub.com for 24/7 assistance.",
  },
];

const HelpCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticleId, setActiveArticleId] = useState(articles[0].id);
  const { data: configData } = useGetPaymentConfigQuery();
  const price = configData?.data?.monthlyGaragePrice || "99";

  const dynamicArticles = articles.map(article => {
    if (article.id === "plans") {
      return {
        ...article,
        content: `SayaraHub offers a unified 'Garage Partner Plan' at AED ${price}/month. This plan provides your business with unlimited product listings, premium search indexation, highlighted contacts, and a Verified Badge. You can manage your payment methods, check the trial progress, or cancel your active subscription plan at any time through the 'Plans & Billing' tab.`
      };
    }
    return article;
  });

  const filteredArticles = dynamicArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeArticle =
    filteredArticles.find((a) => a.id === activeArticleId) || filteredArticles[0];

  return (
    <Card className="shadow-none border border-gray-200 rounded-xl bg-white">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Help Center</h3>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          Browse our comprehensive guides and FAQs to find answers to common
          questions.
        </p>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full gap-2 py-5 border-gray-200 text-gray-700 hover:bg-gray-50">
              <BookOpen className="w-4 h-4" />
              View Help Center
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl w-[95vw] h-[85vh] flex flex-col p-0 gap-0 overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-xl">
            <DialogHeader className="p-6 border-b border-gray-100 flex flex-col gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-gray-900">
                    Merchant Help Center
                  </DialogTitle>
                  <p className="text-xs text-gray-500">
                    Guides and resources for SayaraHub Garage Partners
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search articles, topics, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white rounded-xl text-sm"
                />
              </div>
            </DialogHeader>

            <div className="flex-1 flex overflow-hidden min-h-0 flex-col md:flex-row">
              {/* Sidebar Tabs */}
              <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50 overflow-y-auto p-4 space-y-1 shrink-0 max-h-[25vh] md:max-h-none">
                <span className="hidden md:block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider px-3 mb-2">
                  Help Topics
                </span>
                {filteredArticles.length === 0 ? (
                  <p className="text-xs text-gray-500 px-3 py-4">No topics matched your search.</p>
                ) : (
                  filteredArticles.map((article) => {
                    const Icon = article.icon;
                    const isActive = activeArticle && article.id === activeArticle.id;
                    return (
                      <button
                        key={article.id}
                        onClick={() => setActiveArticleId(article.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-sm font-medium transition-all ${
                          isActive
                            ? "bg-purple-50 text-purple-700 border-l-4 border-purple-600 shadow-sm"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-purple-600" : "text-gray-400"}`} />
                        <span className="truncate">{article.category}</span>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Article Content Area */}
              <div className="flex-1 overflow-y-auto p-6 bg-white min-h-0">
                {filteredArticles.length > 0 && activeArticle ? (
                  <div className="space-y-6">
                    <div>
                      <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase shrink-0">
                        {activeArticle.category}
                      </span>
                      <h2 className="text-2xl font-extrabold text-gray-900 mt-3 leading-snug">
                        {activeArticle.title}
                      </h2>
                    </div>
                    <div className="h-px bg-gray-100" />
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                      {activeArticle.content}
                    </p>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <HelpCircle className="w-12 h-12 text-gray-300 mb-3" />
                    <h3 className="font-bold text-gray-900">No results found</h3>
                    <p className="text-sm text-gray-500 mt-1 max-w-sm">
                      We couldn't find any articles matching "{searchQuery}". Try searching for other terms like "listings", "plans", or "profile".
                    </p>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default HelpCenter;
