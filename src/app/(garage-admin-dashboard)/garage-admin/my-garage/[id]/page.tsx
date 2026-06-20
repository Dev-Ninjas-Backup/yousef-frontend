"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useGetSingleGarageQuery,
  useDeleteGarageMutation,
} from "@/store/api/garageAdminApis/myGarage/garageApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Trash2, MapPin, Phone, Mail, Clock, Award, Wrench, Star } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { EditGarageModal } from "../_components/EditGarageModal";
import { DeleteGarageModal } from "../_components/DeleteGarageModal";
import { useGetGarageReviewsQuery } from "@/store/api/reviewApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function GarageDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data, isLoading } = useGetSingleGarageQuery(id);
  const garage = data?.data;
  const [deleteGarage, { isLoading: deleting }] = useDeleteGarageMutation();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: reviewsResponse } = useGetGarageReviewsQuery(
    { garageId: id, page: 1, limit: 5 },
    { skip: !id }
  );
  const reviews = reviewsResponse?.data?.reviews || [];

  const handleDelete = async () => {
    try {
      await deleteGarage(id).unwrap();
      toast.success("Garage deleted successfully!");
      setShowDeleteDialog(false);
      router.push("/garage-admin/my-garage");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete garage");
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!garage) return <div className="p-6">Garage not found</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button onClick={() => setShowEditDialog(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-64 bg-gray-200 relative">
          <img
            src={garage.coverPhoto}
            alt={garage.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <img
              src={garage.profileImage}
              alt={garage.name}
              className="w-24 h-24 rounded-lg border-4 border-white object-cover"
            />
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{garage.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={garage.status === "APPROVE" ? "default" : "secondary"}>
                  {garage.status}
                </Badge>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{garage.averageRating.toFixed(1)}</span>
                  <span className="text-gray-500 text-sm">({garage.totalReviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-600">{garage.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{garage.address}</p>
                  <p className="text-sm text-gray-600">{garage.city}, {garage.emirate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{garage.garagePhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{garage.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Working Hours</p>
                  {(() => {
                    if (garage.weekdaysHours && garage.weekdaysHours.startsWith("{")) {
                      try {
                        const parsed = JSON.parse(garage.weekdaysHours);
                        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        return (
                          <div className="space-y-1.5 mt-2 max-w-xs">
                            {days.map((day) => (
                              <div key={day} className="flex justify-between items-center text-sm border-b border-gray-100 pb-1 gap-8">
                                <span className="text-gray-500 font-medium">{day}</span>
                                <span className={`font-semibold ${parsed[day]?.toLowerCase() === "closed" ? "text-rose-500" : "text-gray-700"}`}>
                                  {parsed[day]}
                                </span>
                              </div>
                            ))}
                          </div>
                        );
                      } catch (e) {
                        console.error("Failed to parse weekdaysHours", e);
                      }
                    }
                    return (
                      <>
                        <p className="font-medium">Weekdays: {garage.weekdaysHours || "8:00 AM - 8:00 PM"}</p>
                        <p className="font-medium">Weekends: {garage.weekendsHours || "Closed"}</p>
                      </>
                    );
                  })()}
                </div>
              </div>

              {garage.certifications?.length > 0 && (
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Certifications</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {garage.certifications.map((cert: string, idx: number) => (
                        <Badge key={idx} variant="outline">{cert}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {garage.brandExpertise?.length > 0 && (
                <div className="flex items-start gap-3">
                  <Wrench className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Brand Expertise</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {garage.brandExpertise.map((brand: string, idx: number) => (
                        <Badge key={idx} variant="outline">{brand}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {garage.services?.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Services Offered</h3>
              <div className="flex flex-wrap gap-2">
                {garage.services.map((service: string) => (
                  <Badge key={service} className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Customer Reviews Section */}
          <div className="border-t border-slate-100 pt-6 mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg flex items-center gap-2 text-slate-800">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                Customer Reviews
              </h3>
              {reviews.length > 0 && (
                <span className="text-xs text-slate-500 font-semibold bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg">
                  Showing latest {reviews.length} reviews
                </span>
              )}
            </div>

            {reviews.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {reviews.map((review: any) => (
                  <div key={review.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8 shrink-0">
                        <AvatarImage src={review.user.profilePhoto || ""} alt={review.user.fullName} />
                        <AvatarFallback className="bg-blue-50 text-blue-600 font-bold text-xs">
                          {review.user.fullName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div>
                            <span className="text-sm font-semibold text-slate-850">
                              {review.user.fullName}
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-3 h-3 ${
                                      star <= review.overallExperience
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-200 fill-gray-200"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-slate-400">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic">No reviews yet for this garage.</p>
            )}
          </div>
        </div>
      </div>

      <EditGarageModal
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        garage={garage}
        onSuccess={() => router.refresh()}
      />

      <DeleteGarageModal
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        isDeleting={deleting}
      />
    </div>
  );
}
