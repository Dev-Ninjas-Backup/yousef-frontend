"use client";
import { Button } from "@/components/ui/button";
import TestimonialCard from "./_components/TestimonialCard/TestimonialCard";
import Marquee from "react-fast-marquee";
import emanuel from "@/assets/home/Testimonials/emanuel-avater.svg";
import sharif from "@/assets/home/Testimonials/polics-avater.svg";
import polich from "@/assets/home/Testimonials/polics-avater.svg";
import toha from "@/assets/home/Testimonials/mohammad.svg";

const testimonials = [
  {
    id: 1,
    name: "Emanuel",
    role: "Supervisor",
    avatar: "emanuel",
    rating: 5,
    text: "The SayaraHub website is so easy to use and beautifully designed. I could explore all the key features before even...",
  },
  {
    id: 2,
    name: "Ahamed Sharif",
    role: "Legacy Data Manager",
    avatar: "/avatars/ahamed.jpg",
    rating: 5,
    text: "موقع SayaraHub سهل الاستخدام للغاية وذو تصميم جميل. تمكنت من استكشاف جميع الميزات الرئيسية قبل تنزيل التطبيق. تجربة سلسة وموثوقة للغاية!",
  },
  {
    id: 3,
    name: "Abu Toha Mohammad",
    role: "Administrator",
    avatar: "/avatars/abu.jpg",
    rating: 5,
    text: "موقع SayaraHub سهل الاستخدام للغاية وذو تصميم جميل. تمكنت من استكشاف جميع الميزات الرئيسية قبل تنزيل التطبيق. تجربة سلسة وموثوقة للغاية!",
  },
  {
    id: 4,
    name: "Mohammad Kadir",
    role: "Legacy Data Manager",
    avatar: "/avatars/mohammad.jpg",
    rating: 4,
    text: "The SayaraHub website is so easy to use and beautifully designed. I could explore all the key features before even...",
  },
  {
    id: 5,
    name: "Harry ",
    role: "Legacy Data Manager",
    avatar: "/avatars/mohammad2.jpg",
    rating: 4,
    text: "The SayaraHub website is so easy to use and beautifully designed. I could explore all the key features before even...",
  },
];
export default function TestimonialsSection() {
  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 px-4 bg-[#E8F1FD] overflow-hidden">
      <div className="">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[40px] font-bold text-[#101010] mb-4">
            What Our beloved Clients Says?
          </h2>
          <p className="text-[#101010] max-w-2xl mx-auto text-xl">
            Real stories from car owners and garage partners who've made their
            car servicing journey smoother with our platform.
          </p>
        </div>

        <div className="relative mb-10">
          <div className="overflow-hidden">
            <Marquee className="flex gap-6 ">
              <div className="flex gap-6 hover:paused">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={`row1-${testimonial.id}-${index}`}
                    testimonial={testimonial}
                  />
                ))}
              </div>
            </Marquee>
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-[#0D6EFD] px-8 py-6 rounded-lg text-base font-semibold shadow-md "
          >
            Find Nearest Garage
          </Button>
        </div>
      </div>
    </section>
  );
}
