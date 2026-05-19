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
      } md:items-stretch items-center gap-8 md:gap-12 lg:gap-16`}
    >
      {/* Phone Image Section */}
      <div className="flex-1 flex md:items-stretch justify-center w-full select-none">
        <div className="bg-[#E8F1FD] p-4 md:p-[25px] rounded-3xl w-full max-w-md flex flex-col justify-center transition-all duration-500 hover:shadow-[0_20px_50px_rgba(13,110,253,0.06)] hover:-translate-y-1.5 group hover:bg-[#deebff] cursor-pointer">
          <div className="relative h-[360px] md:h-[400px] lg:h-[450px] bg-[#DDEAFC] rounded-3xl overflow-hidden flex items-center justify-center transition-colors duration-500 group-hover:bg-[#d0e3fc]">
            <div className="relative w-[200px] h-[400px] md:w-[250px] md:h-[400px] translate-y-[15%] transition-all duration-700 ease-out group-hover:scale-105 group-hover:translate-y-[10%]">
              <Image
                src={phoneImage}
                alt={`${title} - Step ${stepNumber}`}
                fill
                className="object-contain drop-shadow-2xl px-5"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 w-full bg-white border border-gray-100/80 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-sm transition-all duration-300 hover:-translate-y-1 flex flex-col justify-center">
        <div className="flex items-start gap-4 md:gap-6">
          <div className="shrink-0">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-[#0066FF] text-white flex items-center justify-center text-xl md:text-2xl font-bold shadow-md shadow-blue-500/20">
              {stepNumber}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl lg:text-[28px] font-bold text-[#333333] mb-3 md:mb-4 tracking-tight">
              {title}
            </h3>
            <p className="text-base md:text-lg lg:text-xl text-[#666666] leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
