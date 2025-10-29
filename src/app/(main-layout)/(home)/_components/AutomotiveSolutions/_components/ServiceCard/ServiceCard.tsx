import React from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow max-w-[382px]">
      <CardHeader className="pb-3">
        <div className="flex justify-center mb-2">
          <div className="w-20 h-20 flex items-center justify-center">
            <Image 
              src={icon} 
              alt={title} 
              width={80} 
              height={80} 
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>
        <CardTitle className="text-2xl font-semibold text-[#333333]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-[#333333]">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;