import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  Star,
  Award,
  Calendar,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { GarageInfo } from "@/store/api/garageManagement";

interface GarageDetailsModalProps {
  garage: GarageInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function GarageDetailsModal({
  garage,
  isOpen,
  onClose,
}: GarageDetailsModalProps) {
  if (!garage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            {garage.garageName}
            <Badge
              className={`ml-auto px-3 py-1 text-sm font-medium ${
                garage.garageStatus === "APPROVED"
                  ? "bg-green-100 text-green-800 border-green-200"
                  : garage.garageStatus === "PENDING"
                  ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                  : "bg-red-100 text-red-800 border-red-200"
              }`}
            >
              {garage.garageStatus}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Images Section */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Gallery</h3>
                {garage.profileImage && (
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                    <Image
                      src={garage.profileImage}
                      alt={garage.garageName}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Profile Image
                    </p>
                  </div>
                )}
                {garage.coverPhoto && (
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={garage.coverPhoto}
                      alt={`${garage.garageName} cover`}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Cover Photo
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Details Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Phone
                      </p>
                      <p className="font-medium text-gray-900">
                        {garage.garagePhone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Email
                      </p>
                      <p className="font-medium text-gray-900">
                        {garage.email}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Location Details
                </h3>

                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">
                      {garage.formattedAddress}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {garage.city}, {garage.emirate}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Latitude:</span>
                      <span className="ml-2 font-medium">
                        {garage.garageLat}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Longitude:</span>
                      <span className="ml-2 font-medium">
                        {garage.garageLng}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Operating Hours */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Operating Hours
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">
                      Weekdays
                    </p>
                    <p className="text-sm text-gray-600">
                      {garage.weekdaysHours}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">
                      Weekends
                    </p>
                    <p className="text-sm text-gray-600">
                      {garage.weekendsHours}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {garage.description && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    About
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {garage.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Services & Expertise */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {garage.services.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-blue-600" />
                      Services
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {garage.services.map((service, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-3 py-1 text-xs bg-blue-50 text-blue-700 border-blue-200"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {garage.brandExpertise.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-blue-600" />
                      Brand Expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {garage.brandExpertise.map((brand, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-3 py-1 text-xs bg-purple-50 text-purple-700 border-purple-200"
                        >
                          {brand}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Certifications */}
            {garage.certifications.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    Certifications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {garage.certifications.map((cert, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="px-3 py-1 text-xs bg-green-50 text-green-700 border-green-200"
                      >
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Timestamps */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Timeline
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Created:</span>
                    <span className="ml-2 font-medium">
                      {new Date(garage.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Updated:</span>
                    <span className="ml-2 font-medium">
                      {new Date(garage.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
