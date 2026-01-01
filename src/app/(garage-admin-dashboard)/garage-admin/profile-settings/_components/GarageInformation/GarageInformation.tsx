"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Upload } from "lucide-react";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "@/store/api/userApi";
import { toast } from "sonner";

const GarageInformation = () => {
  const { data: profileData, isLoading } = useGetUserProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    emirate: "",
    bio: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  useEffect(() => {
    if (profileData?.data) {
      setFormData({
        fullName: profileData.data.fullName || "",
        phoneNumber: profileData.data.phone || "",
        email: profileData.data.email || "",
        address: profileData.data.address || "",
        city: profileData.data.city || "",
        emirate: profileData.data.emirate || "",
        bio: profileData.data.bio || "",
      });
      setPreviewImage(profileData.data.profilePhoto || "");
    }
  }, [profileData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      await updateProfile({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        emirate: formData.emirate,
        bio: formData.bio,
        file: profileImage || undefined,
      }).unwrap();

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <Card className="shadow-none">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-none">
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900">Garage Information</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="bg-[#F3F3F5] border-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="+971 50 123 4567"
              className="bg-[#F3F3F5] border-0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            value={formData.email}
            disabled
            className="bg-gray-100 border-0 cursor-not-allowed"
          />
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4 space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <Input
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Sheikh Zayed Road"
                className="bg-[#F3F3F5] border-0"
              />
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Dubai"
              className="bg-[#F3F3F5] border-0"
            />
          </div>

          <div className="col-span-12 md:col-span-4 space-y-2">
            <Label htmlFor="emirate">Emirate</Label>
            <Select
              value={formData.emirate}
              onValueChange={(value) =>
                setFormData({ ...formData, emirate: value })
              }
            >
              <SelectTrigger
                id="emirate"
                className="w-full bg-[#F3F3F5] border-0"
              >
                <SelectValue placeholder="Select emirate" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="Dubai">Dubai</SelectItem>
                <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                <SelectItem value="Sharjah">Sharjah</SelectItem>
                <SelectItem value="Ajman">Ajman</SelectItem>
                <SelectItem value="Ras Al Khaimah">Ras Al Khaimah</SelectItem>
                <SelectItem value="Fujairah">Fujairah</SelectItem>
                <SelectItem value="Umm Al Quwain">Umm Al Quwain</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Business Description</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Brief description of your garage and services..."
            rows={3}
            className="bg-[#F3F3F5] border-0"
          />
        </div>

        <div className="pt-4 border-t mt-10">
          <h3 className="font-semibold text-gray-900 mb-4 mt-6">
            Profile Photo
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-gray-600">
                  {formData.fullName.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>
            <div>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => document.getElementById("profileImage")?.click()}
              >
                <Upload className="w-4 h-4" />
                Upload Photo
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2 mt-10">
          <Button
            onClick={handleSubmit}
            disabled={isUpdating}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              if (profileData?.data) {
                setFormData({
                  fullName: profileData.data.fullName || "",
                  phoneNumber: profileData.data.phone || "",
                  email: profileData.data.email || "",
                  address: profileData.data.address || "",
                  city: profileData.data.city || "",
                  emirate: profileData.data.emirate || "",
                  bio: profileData.data.bio || "",
                });
                setPreviewImage(profileData.data.profilePhoto || "");
                setProfileImage(null);
              }
            }}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GarageInformation;
