import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Phone,
  Building,
  Calendar,
  DollarSign,
  Car,
  Star,
  Award,
  Download,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { GarageOwner } from "@/store/api/garageManagement";

interface GarageOwnerDetailsModalProps {
  owner: GarageOwner | null;
  isOpen: boolean;
  onClose: () => void;
}

function isImage(url: string) {
  return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url.split("?")[0]);
}

function DocumentCard({ label, url }: { label: string; url: string }) {
  const [preview, setPreview] = useState(false);
  const image = isImage(url);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Thumbnail / Preview */}
      {image ? (
        <div
          className="relative w-full h-36 bg-gray-100 cursor-pointer"
          onClick={() => setPreview(!preview)}
        >
          <Image
            src={url}
            alt={label}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      ) : (
        <div className="w-full h-20 bg-gray-50 flex items-center justify-center">
          <span className="text-xs text-gray-400 uppercase">
            {url.split(".").pop()?.split("?")[0] ?? "file"}
          </span>
        </div>
      )}

      {/* Footer */}
      <div className="p-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-xs text-green-600 mt-0.5">Available</p>
        </div>
        <div className="flex gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new tab"
            className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href={url}
            download
            title="Download"
            className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Full preview toggle for images */}
      {image && preview && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setPreview(false)}
        >
          <div className="relative max-w-3xl max-h-[90vh] w-full mx-4">
            <Image
              src={url}
              alt={label}
              width={900}
              height={600}
              className="object-contain rounded-lg"
              unoptimized
            />
            <p className="text-white text-center text-sm mt-2">
              Click anywhere to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GarageOwnerDetailsModal({
  owner,
  isOpen,
  onClose,
}: GarageOwnerDetailsModalProps) {
  if (!owner) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            Garage Owner Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Owner Info Card */}
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {owner.ownerName}
                </h3>
                <Badge
                  className={`px-3 py-1 text-sm font-medium ${
                    owner.isGarageVerified
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                  }`}
                >
                  {owner.isGarageVerified ? "APPROVED" : "PENDING"}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Phone
                    </p>
                    <p className="font-medium text-gray-900">{owner.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Joined
                    </p>
                    <p className="font-medium text-gray-900">
                      {new Date(owner.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Info Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" />
                Business Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Car className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Garage Name
                  </p>
                  <p className="font-semibold text-gray-900">
                    {owner.Garage_Name}
                  </p>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Revenue
                  </p>
                  <p className="font-semibold text-gray-900">
                    ${owner.revenue.toLocaleString()}
                  </p>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Total Garages
                  </p>
                  <p className="font-semibold text-gray-900">
                    {owner.garages.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Categories */}
          {owner.serviceCategories && owner.serviceCategories.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Service Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {owner.serviceCategories.map((category, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="px-3 py-1 text-sm"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Documents */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Documents & Assets
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {owner.tradeLicense && (
                  <DocumentCard
                    label="Trade License"
                    url={owner.tradeLicense}
                  />
                )}
                {owner.garageLogo && (
                  <DocumentCard
                    label="Garage Logo"
                    url={owner.garageLogo}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
