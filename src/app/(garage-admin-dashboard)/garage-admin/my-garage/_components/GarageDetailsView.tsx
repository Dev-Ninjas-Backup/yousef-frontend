import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  CircleCheckBig,
  Clock,
  FileText,
  Award,
  Car,
  Eye,
  Edit,
} from "lucide-react";

interface GarageDetailsViewProps {
  garage: any;
  onEdit: () => void;
  onBack: () => void;
}

export function GarageDetailsView({ garage, onEdit, onBack }: GarageDetailsViewProps) {
  const getStatusBadge = () => {
    switch (garage.status) {
      case "APPROVE":
        return "bg-green-600 text-white hover:bg-green-600";
      case "PENDING":
        return "bg-yellow-600 text-white hover:bg-yellow-600";
      case "REJECTED":
        return "bg-red-600 text-white hover:bg-red-600";
      default:
        return "bg-gray-600 text-white hover:bg-gray-600";
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Back to List
        </Button>
        <div className="flex items-center gap-3">
          <Badge className={`${getStatusBadge()} px-4 py-1.5 rounded-md`}>
            {garage.status}
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
      {garage.status === "APPROVE" && (
        <Card className="border border-gray-200 p-0">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CircleCheckBig className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-base text-gray-900">
                Your Garage is Live! It's now visible to customers on the platform.
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Eye className="w-4 h-4" />
              Public View
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent>
          {/* Cover & Profile Images */}
          <div className="relative">
            <div className="h-48 sm:h-64 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={garage.coverPhoto}
                alt={garage.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-12 left-6">
              <div className="w-24 h-24 bg-white rounded-lg shadow-lg p-2">
                <img
                  src={garage.profileImage}
                  alt={garage.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
          </div>

          {/* Garage Info */}
          <div className="pt-14">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {garage.name}
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
              {garage.address}, {garage.city}, {garage.emirate}
            </p>
            <div className="flex flex-wrap gap-2">
              {garage.services.map((service: string) => (
                <Badge key={service} variant="outline" className="bg-gray-50">
                  {service}
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
                  <p className="text-sm font-medium">{garage.garagePhone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium">{garage.email}</p>
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
                <p className="text-sm font-medium">{garage.weekdaysHours}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Weekends</p>
                <p className="text-sm font-medium">{garage.weekendsHours}</p>
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
            {garage.description || "No description provided."}
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
              {garage.certifications && garage.certifications.length > 0 ? (
                garage.certifications.map((cert: string) => (
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
                ))
              ) : (
                <p className="text-sm text-gray-500">No certifications added</p>
              )}
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
              {garage.brandExpertise && garage.brandExpertise.length > 0 ? (
                garage.brandExpertise.map((brand: string) => (
                  <Badge key={brand} variant="outline" className="bg-gray-50">
                    {brand}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray-500">No brand expertise added</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
