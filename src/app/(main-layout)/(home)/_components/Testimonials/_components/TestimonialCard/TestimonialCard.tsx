import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Rating from "../Rating/Rating";
interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Card className="relative border p-0 border-[#B0D7FF] bg-[#E8F1FD] hover:shadow-lg transition-all duration-300 shrink-0 max-w-[420px] overflow-hidden group">
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #E8F2FE 0%, #9BCAFE 100%)",
        }}
      ></div>

      <CardContent className="p-6 relative z-10">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-extrabold text-[#101010] text-lg md:text-xl  transition-colors duration-300">
              {testimonial.name}
            </h4>
            <p className="text-sm md:text-base text-[#575757]  transition-colors duration-300">
              {testimonial.role}
            </p>
          </div>
        </div>
        <Rating rating={testimonial.rating} />
        <p className="mt-3 text-[#575757] text-sm md:text-lg leading-relaxed  transition-colors duration-300">
          {testimonial.text}
        </p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
