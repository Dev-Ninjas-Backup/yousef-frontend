import Image from "next/image";
import { ShieldCheck, Users, Wrench, Clock } from "lucide-react";
import OurStory from "@/assets/about/Story/our_story.jpg";
import OurMission from "@/assets/about/Story/our_mission.jpg";
import OurVision from "@/assets/about/Story/our_vision.jpg";
import Empowering from "@/assets/about/Story/empowering.jpg";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified & Trusted",
    description:
      "Every garage on the platform is verified to ensure quality and reliability",
  },
  {
    icon: Users,
    title: "User-Centric",
    description: "Transparent with user reviews and service providers in one",
  },
  {
    icon: Wrench,
    title: "Instant Connection",
    description:
      "Easily navigate between garages, spare parts and towing services",
  },
  {
    icon: Clock,
    title: "Transparency First",
    description: "Honest reviews, real-time updates, and open communication",
  },
];

export default function StorySection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-700 text-sm md:text-xl leading-relaxed">
              <p>
                SayaraHub was founded in 2008 with a simple mission: to provide
                honest, reliable, and high-quality automotive service to the Los
                Angeles community. What started as a small two-bay garage has
                grown into a full-service automotive center trusted by thousands
                of customers.
              </p>
              <p>
                Our founder, Michael Rodriguez, brought over 25 years of
                automotive experience and a passion for customer service. He
                built the business on principles of transparency, quality
                workmanship, and treating every customer like family.
              </p>
              <p>
                Today, we're proud to serve over 10,000 customers annually with
                a team of ASE-certified master technicians, state-of-the-art
                diagnostic equipment, and a commitment to staying at the
                forefront of automotive technology.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src={OurStory}
              alt="Our Story - SayaraHub garage and team"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Our Mission */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={OurMission}
              alt="Car trunk"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <div className="text-gray-700 text-sm md:text-xl leading-relaxed">
              <p>
                To revolutionize the way car owners experience automotive
                services across the UAE. We aim to create a digital ecosystem
                where every car owner can effortlessly find trusted garages,
                certified mechanics, towing services, and genuine spare parts
                all in one place. Our mission is to eliminate the hassle,
                uncertainty, and time loss that come with traditional car
                maintenance.
              </p>
              <p className="mt-4">
                Through real-time location tracking, verified service providers,
                and transparent pricing, SayaraHub ensures that every customer
                receives reliable, quick, and quality-driven automotive support,
                anytime and anywhere.
              </p>
            </div>
          </div>
        </div>

        {/* Our Vision */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Vision
            </h2>
            <div className="space-y-4 text-gray-700 text-sm md:text-xl leading-relaxed">
              <p>
                To become the UAE's most trusted and comprehensive automotive
                platform connecting car owners, garages, and suppliers under one
                digital roof. We envision a future where every vehicle service,
                repair, or part purchase is just a few clicks away, supported by
                innovation, technology, and genuine customer care.
              </p>
              <p>
                Our goal is to empower both customers and service providers by
                fostering a transparent, efficient, and customer-first
                automotive community that drives the industry forward.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src={OurVision}
              alt="Car service"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Empowering Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-50 p-8 rounded-xl">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src={Empowering}
              alt="Tools"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Empowering Drivers and Garages Alike
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              We believe in supporting both sides of the journey. Drivers seek
              fast quality service and going garages the digital ways they need
              to grow. From secure communication to verified listings, every
              feature is designed with integrity and trust at its core.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
