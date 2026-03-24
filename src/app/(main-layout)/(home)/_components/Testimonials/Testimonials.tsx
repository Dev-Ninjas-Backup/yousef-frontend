"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TestimonialCard from "./_components/TestimonialCard/TestimonialCard";
import Marquee from "react-fast-marquee";
import { useLanguage } from "@/context/LanguageContext";
import { testimonialsTranslations } from "@/translations/testimonials";
import { useGetAllClientReviewsQuery } from "@/store/api/clientReviewApi";

const fallbackTestimonials = [
  {
    id: "1",
    name: "Emanuel",
    role: "Supervisor",
    avatar: "",
    rating: 5,
    text: "The SayaraHub website is so easy to use and beautifully designed. I could explore all the key features before even downloading the app!",
  },
  {
    id: "2",
    name: "Ahamed Sharif",
    role: "Legacy Data Manager",
    avatar: "",
    rating: 5,
    text: "موقع SayaraHub سهل الاستخدام للغاية وذو تصميم جميل. تمكنت من استكشاف جميع الميزات الرئيسية قبل تنزيل التطبيق. تجربة سلسة وموثوقة للغاية!",
  },
  {
    id: "3",
    name: "Abu Toha Mohammad",
    role: "Administrator",
    avatar: "",
    rating: 5,
    text: "موقع SayaraHub سهل الاستخدام للغاية وذو تصميم جميل. تمكنت من استكشاف جميع الميزات الرئيسية قبل تنزيل التطبيق. تجربة سلسة وموثوقة للغاية!",
  },
  {
    id: "4",
    name: "Mohammad Kadir",
    role: "Legacy Data Manager",
    avatar: "",
    rating: 4,
    text: "The SayaraHub website is so easy to use and beautifully designed. I could explore all the key features before even downloading the app!",
  },
  {
    id: "5",
    name: "Harry",
    role: "Legacy Data Manager",
    avatar: "",
    rating: 4,
    text: "The SayaraHub website is so easy to use and beautifully designed. I could explore all the key features before even downloading the app!",
  },
];

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const trans = t(testimonialsTranslations);
  const { data: apiReviews, isLoading } = useGetAllClientReviewsQuery();

  const reviews =
    apiReviews && apiReviews.length > 0
      ? apiReviews.map((r) => ({
          id: r.id,
          name: r.user?.fullName || "Anonymous",
          role: r.user?.role || "User",
          avatar: r.user?.profilePhoto || "",
          rating: Number(r.rating),
          text: r.reviewText,
        }))
      : fallbackTestimonials;

  return (
    <section className="py-20 px-4 bg-[#E8F1FD] overflow-hidden">
      <div className="">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[40px] font-bold text-[#101010] mb-4">
            {trans.title}
          </h2>
          <p className="text-[#101010] max-w-2xl mx-auto text-xl">
            {trans.subtitle}
          </p>
        </div>

        <div className="relative mb-10">
          <div className="overflow-hidden">
            {isLoading ? (
              <div className="flex gap-6 px-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="shrink-0 w-[380px] h-[180px] rounded-xl bg-blue-100 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <Marquee className="flex gap-6">
                <div className="flex gap-6 hover:paused">
                  {reviews.map((testimonial, index) => (
                    <TestimonialCard
                      key={`${testimonial.id}-${index}`}
                      testimonial={testimonial}
                    />
                  ))}
                </div>
              </Marquee>
            )}
          </div>
        </div>

        <div className="text-center">
          <Link href="/service">
            <Button
              size="lg"
              className="bg-[#0D6EFD] px-8 py-6 rounded-lg text-base font-semibold shadow-md"
            >
              {trans.findGarage}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
