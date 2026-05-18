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
import {
  Upload,
  LocateFixed,
  X,
  Plus,
  Pencil,
  Trash2,
  Check,
} from "lucide-react";
import {
  useCreateGarageMutation,
  useUpdateGarageMutation,
} from "@/store/api/garageAdminApis/myGarage/garageApi";
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from "@/store/api/garageAdminApis/myGarage/servicesApi";
import { useGetServiceCategoriesQuery } from "@/store/api/garageApi";
import { toast } from "sonner";
import Image from "next/image";
import { LocationForm } from "@/components/LocationForm";

interface CreateGarageFormProps {
  onCancel: () => void;
  onSave: (data: any) => void;
}

export function CreateGarageForm({ onCancel, onSave }: CreateGarageFormProps) {
  const [createGarage, { isLoading }] = useCreateGarageMutation();
  const { data: servicesData, isLoading: servicesLoading } =
    useGetServiceCategoriesQuery();
  const [createService, { isLoading: creatingService }] =
    useCreateServiceMutation();
  const [updateService, { isLoading: updatingService }] =
    useUpdateServiceMutation();
  const [deleteService, { isLoading: deletingService }] =
    useDeleteServiceMutation();
  const [newServiceName, setNewServiceName] = useState("");
  const [showAddService, setShowAddService] = useState(false);
  const [editingService, setEditingService] = useState<string | null>(null);
  const [editServiceName, setEditServiceName] = useState("");

  const [formData, setFormData] = useState<{
    name: string;
    address: string;
    street: string;
    city: string;
    emirate: string;
    phone: string;
    email: string;
    weekdaysHours: string;
    weekendsHours: string;
    services: string[];
    description: string;
    certifications: string;
    brandExpertise: string;
    garageLat: number;
    garageLng: number;
    formattedAddress: string;
    placeId: string;
  }>({
    name: "",
    address: "",
    street: "",
    city: "Dubai",
    emirate: "Dubai",
    phone: "",
    email: "",
    weekdaysHours: "8:00 AM - 8:00 PM",
    weekendsHours: "9:00 AM - 6:00 PM",
    services: [],
    description: "",
    certifications: "",
    brandExpertise: "",
    garageLat: 0,
    garageLng: 0,
    formattedAddress: "",
    placeId: "",
  });

  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [profilePreview, setProfilePreview] = useState<string>("");

  const toggleService = (serviceName: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceName)
        ? prev.services.filter((s) => s !== serviceName)
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

  const handleEditService = (service: string) => {
    setEditingService(service);
    setEditServiceName(service);
  };

  const handleUpdateService = async () => {
    if (!editServiceName.trim() || !editingService) return;
    try {
      await updateService({
        oldName: editingService,
        serviceCategory: editServiceName,
      }).unwrap();
      // update selected services if the edited one was selected
      if (formData.services.includes(editingService)) {
        setFormData((prev) => ({
          ...prev,
          services: prev.services.map((s) =>
            s === editingService ? editServiceName : s,
          ),
        }));
      }
      toast.success("Service updated!");
      setEditingService(null);
      setEditServiceName("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update service");
    }
  };

  const handleDeleteService = async (serviceName: string) => {
    try {
      await deleteService(serviceName).unwrap();
      setFormData((prev) => ({
        ...prev,
        services: prev.services.filter((s) => s !== serviceName),
      }));
      toast.success("Service deleted!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete service");
    }
  };

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPhoto(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleLocationChange = (locationData: any) => {
    setFormData((prev) => ({
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

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!coverPhoto || !profileImage) {
      toast.error("Please upload both cover photo and profile image");
      return;
    }

    if (!formData.garageLat || !formData.garageLng) {
      toast.error("Please select a valid address from Google Places");
      return;
    }

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
      formData.formattedAddress || formData.address,
    );
    apiFormData.append("placeId", formData.placeId || "");
    apiFormData.append("services", JSON.stringify(formData.services));
    apiFormData.append("coverPhoto", coverPhoto);
    apiFormData.append("profileImage", profileImage);

    try {
      await createGarage(apiFormData).unwrap();
      toast.success("Garage created successfully!");
      onSave(null);
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to create garage. Please try again.",
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
            <Label className="mb-4">Cover Photo *</Label>
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
            <Label className="mb-4">Profile Image *</Label>
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
                <div key={service} className="relative group">
                  {editingService === service ? (
                    <div className="flex flex-col gap-2 p-3 rounded-lg border-2 border-blue-500 bg-blue-50">
                      <input
                        autoFocus
                        value={editServiceName}
                        onChange={(e) => setEditServiceName(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleUpdateService()
                        }
                        placeholder="Edit service name"
                        title="Edit service name"
                        className="w-full text-sm bg-white border border-blue-300 rounded-md px-3 py-1.5 outline-none text-blue-700 focus:ring-2 focus:ring-blue-400"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleUpdateService}
                          disabled={updatingService}
                          className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-1.5 rounded-md transition-colors disabled:opacity-50"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingService(null)}
                          className="flex-1 flex items-center justify-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-1.5 rounded-md transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`w-full p-4 rounded-lg border-2 transition-all ${
                        formData.services.includes(service)
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <p className="text-sm font-medium text-center">
                        {service}
                      </p>
                    </button>
                  )}
                  {/* Edit/Delete buttons — show on hover */}
                  {editingService !== service && (
                    <div className="absolute -top-2 -right-2 hidden group-hover:flex gap-1">
                      <button
                        type="button"
                        onClick={() => handleEditService(service)}
                        className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shadow"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteService(service)}
                        disabled={deletingService}
                        className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
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
          {isLoading ? "Creating..." : "Add Garage"}
        </Button>
      </div>
    </form>
  );
}
