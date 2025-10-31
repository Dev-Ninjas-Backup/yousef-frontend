import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MessageCircle,
  CircleCheckBig,
  Clock,
  FileText,
  Award,
  Car,
  Eye,
  Edit,
} from "lucide-react";
import MyGarageProfile from "@/assets/garage-admin/my-garage/my_garage_profile.jpg";
import MyGarageProfileCover from "@/assets/garage-admin/my-garage/my_garage_profile_cover.jpg";
import Image from "next/image";

interface GarageDetailsViewProps {
  garage: any;
  onEdit: () => void;
}

export function GarageDetailsView({ garage, onEdit }: GarageDetailsViewProps) {
  const services = [
    { id: "carWash", label: "Car Wash" },
    { id: "generalRepair", label: "General Repair" },
    { id: "maintenance", label: "Maintenance" },
    { id: "acService", label: "AC Service" },
  ];

  const certifications = ["ASE Certified", "ISO 9001:2015", "RTA Approved"];
  const brands = ["BMW", "Mercedes-Benz", "Audi", "Toyota", "Honda", "Nissan"];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-3">
          <Badge className="bg-green-600 text-white hover:bg-green-600 px-4 py-1.5 rounded-md">
            Approved
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Success Alert */}
      <Card className="border border-gray-200 p-0">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CircleCheckBig className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-base text-gray-900">
              Your Garage is Live! It's now visible to customers on the
              platform.
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Eye className="w-4 h-4" />
            Public View
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          {/* Cover & Profile Images */}
          <div className="relative">
            <div className="h-48 sm:h-64 bg-gray-200 rounded-lg overflow-hidden">
              {/* <div className="w-full h-full bg-gradient-to-r from-blue-400 to-cyan-400"></div> */}
              <Image
                src={MyGarageProfileCover}
                alt="Garage Profile Cover"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-12 left-6">
              <div className="w-24 h-24 bg-white rounded-lg shadow-lg p-2">
                {/* <div className="w-full h-full bg-orange-400 rounded"></div> */}
                <Image
                  src={MyGarageProfile}
                  alt="Garage Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Garage Info */}
          <div className="pt-14">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Premium Auto Care Center
            </h1>
            <p className="text-gray-600 flex items-center gap-2 mb-4">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Sheikh Zayed Road, Al Quoz Industrial Area 3, Dubai
            </p>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <Badge
                  key={service.id}
                  variant="outline"
                  className="bg-gray-50"
                >
                  {service.label}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact & Hours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">
                Contact Information
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium">+971 50 123 4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium">info@premiumauto.ae</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">WhatsApp</p>
                  <p className="text-sm font-medium">+971 50 123 4567</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Working Hours</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Weekdays</p>
                <p className="text-sm font-medium">8:00 AM - 8:00 PM</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Weekends</p>
                <p className="text-sm font-medium">9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Description</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Premium Auto Care Center offers comprehensive automotive services
            with over 15 years of experience. We specialize in European and
            Japanese vehicles, providing quality repairs and maintenance with
            genuine parts.
          </p>
        </CardContent>
      </Card>

      {/* Certifications & Brands */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Certifications</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <Badge
                  key={cert}
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {cert}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Brand Expertise</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <Badge key={brand} variant="outline" className="bg-gray-50">
                  {brand}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
