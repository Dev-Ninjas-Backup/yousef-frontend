import Image from "next/image";
import React from "react";

const steps = [
  {
    number: 1,
    title: "Install The App",
    description:
      "Download and install the app from the App Store or Google Play to get started. Create your profile in just a few taps and access all nearby garages instantly.",
  },
  {
    number: 2,
    title: "Search Nearby Garage",
    description:
      "Find trusted garages near your location with smart filters for services, ratings, and availability helping you choose the best option in seconds.",
  },
  {
    number: 3,
    title: "Get Right Direction On Map",
    description:
      "Once you select a garage, get real-time navigation with accurate map directions to reach your destination quickly and hassle-free.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-3 md:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mt-4 md:mt-6 px-4">
            Sayarahub is a smart automotive platform designed for car owners and
            service providers across the UAE. It focuses on user convenience,
            trusted connections, and high-quality vehicle care — all in one
            place.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex flex-col items-center text-center relative"
              >
                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 bg-pink-100 rounded-full flex items-center justify-center text-gray-800 text-2xl sm:text-3xl font-semibold mb-6 md:mb-8">
                  {step.number}
                </div>

                {index < steps.length - 1 && (
                  <>
                    {/* Desktop Dashed Line (Horizontal) */}
                    <div
                      className="hidden md:block absolute top-7 left-1/2 w-full h-0.5 border-t-2 border-dashed border-gray-300 -z-0"
                      style={{
                        left: "50%",
                        right: "auto",
                        width: "calc(100% + 2rem)",
                      }}
                    />
                  </>
                )}

                {index < steps.length && (
                  <>
                    <div
                      className="md:hidden absolute left-1/2 w-0.5 h-16 translate-x-1/ border-l-2 border-dashed border-gray-300 z-0"
                      style={{ top: "1rem" }}
                    />
                  </>
                )}

                {/* Content */}
                <h3 className="text-lg sm:text-xl md:text-xl font-bold text-gray-900 mb-3 md:mb-4 px-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xs px-4">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
