import React from "react";
import Image from "next/image";

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  imagePosition: "left" | "right";
  phoneImage: string;
}

const StepCard: React.FC<StepCardProps> = ({
  stepNumber,
  title,
  description,
  imagePosition,
  phoneImage,
}) => {
  return (
    <div
      className={`flex flex-col ${
        imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"
      } items-center gap-8 md:gap-12 lg:gap-16`}
    >
      {/* Phone Image Section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-[#E8F1FD] p-[25px] rounded-3xl w-full max-w-md">
          <div className="relative h-[360px] md:h-[400px] lg:h-[450px] bg-[#DDEAFC] rounded-3xl overflow-hidden flex items-center justify-center">
            <div className="relative w-[280px] h-[560px] md:w-[300px] md:h-[600px] translate-y-[25%]">
              <Image
                src={phoneImage}
                alt={`${title} - Step ${stepNumber}`}
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex items-start gap-4 md:gap-6">
        <div className="shrink-0">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0066FF] text-white flex items-center justify-center text-xl md:text-2xl font-bold shadow-lg">
            {stepNumber}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl lg:text-[28px] font-bold text-[#333333] mb-3 md:mb-4">
            {title}
          </h3>
          <p className="text-base md:text-lg lg:text-xl text-[#666666] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
