"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, Plus } from "lucide-react";
import { useUpdateGarageMutation } from "@/store/api/garageAdminApis/myGarage/garageApi";
import {
  useGetMyServicesQuery,
  useCreateServiceMutation,
} from "@/store/api/garageAdminApis/myGarage/servicesApi";
import { toast } from "sonner";
import Image from "next/image";
import { LocationForm } from "@/components/LocationForm";

interface EditGarageFormProps {
  onCancel: () => void;
  onSave: (data: any) => void;
  garage: any;
}

export function EditGarageForm({ onCancel, onSave, garage }: EditGarageFormProps) {
  const [updateGarage, { isLoading }] = useUpdateGarageMutation();
  const { data: servicesData, isLoading: servicesLoading } =
    useGetMyServicesQuery();
  const [createService, { isLoading: creatingService }] =
    useCreateServiceMutation();
  const [newServiceName, setNewServiceName] = useState("");
  const [showAddService, setShowAddService] = useState(false);

  const [formData, setFormData] = useState({
    name: garage?.name || "",
    address: garage?.address || "",
    street: garage?.street || "",
    city: garage?.city || "Dubai",
    emirate: garage?.emirate || "Dubai",
    phone: garage?.phone || garage?.garagePhone || "",
    email: garage?.email || "",
    weekdaysHours: garage?.weekdaysHours || "8:00 AM - 8:00 PM",
    weekendsHours: garage?.weekendsHours || "9:00 AM - 6:00 PM",
    services: garage?.services || [],
    description: garage?.description || "",
    certifications: garage?.certifications || "",
    brandExpertise: garage?.brandExpertise || "",
    garageLat: garage?.garageLat || 0,
    garageLng: garage?.garageLng || 0,
    formattedAddress: garage?.formattedAddress || "",
    placeId: garage?.placeId || "",
  });

  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>(garage?.coverPhoto || "");
  const [profilePreview, setProfilePreview] = useState<string>(garage?.profileImage || "");

  const toggleService = (serviceName: string) => {
    setFormData((prev: any) => ({
      ...prev,
      services: prev.services.includes(serviceName)
        ? prev.services.filter((s: string) => s !== serviceName)
        : [...prev.services, serviceName],
    }));
  };

  const handleAddService = async () => {
    if (!newServiceName.trim()) {
      toast.error("Please enter a service name");
      return;
    }
    try {
      await createService({ serviceCategory: newServiceName }).unwrap();
      toast.success("Service added successfully!");
      setNewServiceName("");
      setShowAddService(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add service");
    }
  };

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPhoto(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleLocationChange = (locationData: any) => {
    setFormData((prev: any) => ({
      ...prev,
      address: locationData.address,
      street: locationData.street,
      city: locationData.city,
      emirate: locationData.emirate,
      formattedAddress: locationData.formattedAddress,
      placeId: locationData.placeId,
      garageLat: locationData.garageLat,
      garageLng: locationData.garageLng,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiFormData = new FormData();

    apiFormData.append("name", formData.name);
    apiFormData.append("address", formData.address);
    apiFormData.append("street", formData.street);
    apiFormData.append("city", formData.city);
    apiFormData.append("emirate", formData.emirate);
    apiFormData.append("phone", formData.phone);
    apiFormData.append("email", formData.email);
    apiFormData.append("weekdaysHours", formData.weekdaysHours);
    apiFormData.append("weekendsHours", formData.weekendsHours);
    apiFormData.append("description", formData.description);
    apiFormData.append("certifications", formData.certifications);
    apiFormData.append("brandExpertise", formData.brandExpertise);
    apiFormData.append("garageLat", formData.garageLat.toString());
    apiFormData.append("garageLng", formData.garageLng.toString());
    apiFormData.append(
      "formattedAddress",
      formData.formattedAddress || formData.address
    );
    apiFormData.append("placeId", formData.placeId || "");
    apiFormData.append("services", JSON.stringify(formData.services));
    if (coverPhoto) apiFormData.append("coverPhoto", coverPhoto);
    if (profileImage) apiFormData.append("profileImage", profileImage);

    try {
      await updateGarage({ id: garage.id, formData: apiFormData }).unwrap();
      toast.success("Garage updated successfully!");
      onSave(null);
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to update garage. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Photos</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="mb-4">Cover Photo</Label>
            <input
              type="file"
              id="coverPhoto"
              accept="image/*"
              onChange={handleCoverPhotoChange}
              className="hidden"
            />
            <label
              htmlFor="coverPhoto"
              className="border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-500 cursor-pointer block"
            >
              {coverPreview ? (
                <div className="relative">
                  <Image
                    src={coverPreview}
                    alt="Cover preview"
                    width={200}
                    height={100}
                    className="mx-auto rounded"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setCoverPhoto(null);
                      setCoverPreview("");
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600">
                    Click to upload cover photo
                  </p>
                </>
              )}
            </label>
          </div>
          <div>
            <Label className="mb-4">Profile Image</Label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
            <label
              htmlFor="profileImage"
              className="border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-500 cursor-pointer block"
            >
              {profilePreview ? (
                <div className="relative">
                  <Image
                    src={profilePreview}
                    alt="Profile preview"
                    width={100}
                    height={100}
                    className="mx-auto rounded"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setProfileImage(null);
                      setProfilePreview("");
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600">
                    Click to upload profile image
                  </p>
                </>
              )}
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Garage Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Premium Auto Care Center"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-12">
              <LocationForm
                initialData={{
                  address: formData.address,
                  street: formData.street,
                  city: formData.city,
                  emirate: formData.emirate,
                  formattedAddress: formData.formattedAddress,
                  placeId: formData.placeId,
                  garageLat: formData.garageLat,
                  garageLng: formData.garageLng,
                }}
                onLocationChange={handleLocationChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+971 50 123 4567"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="info@premiumauto.ae"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Working Hours</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="weekdays">Weekdays</Label>
            <Input
              id="weekdays"
              value={formData.weekdaysHours}
              onChange={(e) =>
                setFormData({ ...formData, weekdaysHours: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="weekends">Weekends</Label>
            <Input
              id="weekends"
              value={formData.weekendsHours}
              onChange={(e) =>
                setFormData({ ...formData, weekendsHours: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Service Types Offered *</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowAddService(!showAddService)}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Service
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddService && (
            <div className="flex gap-2">
              <Input
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
                placeholder="Enter service name"
                onKeyDown={(e) => e.key === "Enter" && handleAddService()}
              />
              <Button
                type="button"
                onClick={handleAddService}
                disabled={creatingService}
              >
                {creatingService ? "Adding..." : "Add"}
              </Button>
            </div>
          )}
          {servicesLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {servicesData?.serviceCategories.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleService(service)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.services.includes(service)
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className="text-sm font-medium text-center">{service}</p>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description">About Your Garage</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe your garage..."
              rows={4}
              maxLength={210}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/210 characters
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="certifications">Certifications</Label>
              <Input
                id="certifications"
                value={formData.certifications}
                onChange={(e) =>
                  setFormData({ ...formData, certifications: e.target.value })
                }
                placeholder="ASE Certified, ISO 9001:2015"
              />
            </div>
            <div>
              <Label htmlFor="brandExpertise">Brand Expertise</Label>
              <Input
                id="brandExpertise"
                value={formData.brandExpertise}
                onChange={(e) =>
                  setFormData({ ...formData, brandExpertise: e.target.value })
                }
                placeholder="BMW, Mercedes-Benz, Audi"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Garage"}
        </Button>
      </div>
    </form>
  );
}