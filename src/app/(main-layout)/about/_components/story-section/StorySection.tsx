"use client";
import Image from "next/image";
import { ShieldCheck, Users, Wrench, Clock } from "lucide-react";
import OurStory from "@/assets/about/story/our_story.jpg";
import OurMission from "@/assets/about/story/our_mission.jpg";
import OurVision from "@/assets/about/story/our_vision.jpg";
import Empowering from "@/assets/about/story/empowering.jpg";
import { useLanguage } from "@/context/LanguageContext";
import { aboutTranslations } from "@/translations/about";

export default function StorySection() {
  const { t } = useLanguage();
  const trans = t(aboutTranslations);

  const features = [
    {
      icon: Users,
      title: trans.story.features.userCentric.title,
      description: trans.story.features.userCentric.description,
    },
    {
      icon: Wrench,
      title: trans.story.features.instant.title,
      description: trans.story.features.instant.description,
    },
    {
      icon: Clock,
      title: trans.story.features.transparency.title,
      description: trans.story.features.transparency.description,
    },
  ];
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {trans.story.ourStory}
            </h2>
            <div className="space-y-4 text-gray-700 text-sm md:text-xl leading-relaxed">
              {trans.story.storyContent.map((paragraph: any, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg h-[200px] md:h-[350px]">
            <Image
              src={OurStory}
              alt="Our Story - SayaraHub garage and team"
              width={600}
              height={200}
              className="w-full h-auto md:h-full object-cover"
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
              {trans.story.ourMission}
            </h2>
            <div className="text-gray-700 text-sm md:text-xl leading-relaxed">
              {trans.story.missionContent.map(
                (paragraph: any, index: number) => (
                  <p key={index} className={index > 0 ? "mt-4" : ""}>
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Our Vision */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {trans.story.ourVision}
            </h2>
            <div className="space-y-4 text-gray-700 text-sm md:text-xl leading-relaxed">
              {trans.story.visionContent.map(
                (paragraph: any, index: number) => (
                  <p key={index}>{paragraph}</p>
                ),
              )}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {trans.story.empowering}
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              {trans.story.empoweringContent}
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
