import React from "react";
import StepCard from "./_components/StepCard";
import phoneImage1 from "@/assets/home/howItWorks/how-it-works-1.svg";
import phoneImage2 from "@/assets/home/howItWorks/how-it-works-2.svg";
import phoneImage3 from "@/assets/home/howItWorks/how-it-works-3.svg";

const stepsData = [
  {
    id: 1,
    title: "Find Nearby Garages Instantly",
    description:
      "Discover reliable garages around your area within seconds. Our smart location-based search helps you find the nearest workshops that match your car’s exact needs, from general servicing to emergency towing. You can view details, check ratings, contact garages directly, or navigate using live directions.",
    imagePosition: "right" as const,
    phoneImage: phoneImage1,
  },
  {
    id: 2,
    title: "View Complete Garage Details",
    description:
      "Get everything you need to know before choosing a garage, from available services and pricing to customer reviews and ratings. Each garage profile includes photos, operating hours, contact info, and directions, helping you make the right choice with full confidence.",
    imagePosition: "left" as const,
    phoneImage: phoneImage2,
  },
  {
    id: 3,
    title: "Connect Directly with the Garage",
    description:
      "Have questions or need quick assistance? Message or call the garage directly, no waiting, no hassle. Get instant responses about services, pricing, or availability and make your servicing process faster and smoother.",
    imagePosition: "right" as const,
    phoneImage: phoneImage3,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-25">
          <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-8">
            How <span className="text-[#0D6EFD]">Sayara</span>Hub Works
          </h2>
          <p className="text-base md:text-xl text-[#333333] max-w-2xl mx-auto">
            Getting started is simple. Follow these easy steps to access premium
            automotive services at your fingertips.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {stepsData.map((step) => (
            <StepCard
              key={step.id}
              stepNumber={step.id}
              title={step.title}
              description={step.description}
              imagePosition={step.imagePosition}
              phoneImage={step.phoneImage.src}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
