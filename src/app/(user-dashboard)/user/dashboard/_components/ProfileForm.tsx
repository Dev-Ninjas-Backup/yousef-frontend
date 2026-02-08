"use client";

import React, { useState } from "react";
import { LuMail, LuPhone, LuMapPin } from "react-icons/lu";
import { Loader2 } from "lucide-react";
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
import { toast } from "sonner";

interface FormData {
  fullName: string;
  bio: string;
  phoneNumber: string;
  address: string;
  city: string;
  emirate: string;
  userLat: string;
  userLng: string;
}

interface User {
  email: string;
}

interface ProfileFormProps {
  formData: FormData;
  user: User;
  isEditing: boolean;
  onInputChange: (field: string, value: string) => void;
}

export default function ProfileForm({
  formData,
  user,
  isEditing,
  onInputChange,
}: ProfileFormProps) {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const getCurrentLocation = async () => {
    if (!isEditing) return;
    
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsLoadingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          const address = data.display_name || `${latitude}, ${longitude}`;
          onInputChange("address", address);
          onInputChange("userLat", latitude.toString());
          onInputChange("userLng", longitude.toString());
          
          toast.success("Location fetched successfully");
        } catch (error) {
          toast.error("Failed to fetch address");
          onInputChange("address", `${latitude}, ${longitude}`);
          onInputChange("userLat", latitude.toString());
          onInputChange("userLng", longitude.toString());
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        setIsLoadingLocation(false);
        toast.error("Unable to retrieve your location");
      }
    );
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => onInputChange("fullName", e.target.value)}
            disabled={!isEditing}
            placeholder="Enter your full name"
          />
        </div>

        {/* Bio */}
        {/* <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => onInputChange("bio", e.target.value)}
            disabled={!isEditing}
            placeholder="Tell us about yourself"
            rows={3}
          />
        </div> */}

        {/* Email (Read-only) */}
        <div>
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <LuMail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              id="email"
              value={user.email}
              disabled
              className="pl-10 bg-gray-50"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <div className="relative">
            <LuPhone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => onInputChange("phoneNumber", e.target.value)}
              disabled={!isEditing}
              placeholder="+971 50 123 4567"
              className="pl-10"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <Label htmlFor="address">Address</Label>
          <div className="relative">
            {isLoadingLocation ? (
              <Loader2 className="absolute left-3 top-3 w-4 h-4 text-gray-400 animate-spin" />
            ) : (
              <LuMapPin 
                className={`absolute left-3 top-3 w-4 h-4 text-gray-400 ${
                  isEditing ? 'cursor-pointer hover:text-blue-600' : ''
                }`}
                onClick={getCurrentLocation}
              />
            )}
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => onInputChange("address", e.target.value)}
              disabled={!isEditing}
              placeholder="1234 Main Street"
              className="pl-10"
            />
          </div>
        </div>

        {/* City & Emirate */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* <div>
            <Label htmlFor="city">City</Label>
            <Select
              value={formData.city}
              onValueChange={(value) => onInputChange("city", value)}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dubai">Dubai</SelectItem>
                <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                <SelectItem value="sharjah">Sharjah</SelectItem>
                <SelectItem value="ajman">Ajman</SelectItem>
                <SelectItem value="rak">Ras Al Khaimah</SelectItem>
                <SelectItem value="fujairah">Fujairah</SelectItem>
                <SelectItem value="uaq">Umm Al Quwain</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          <div>
            <Label htmlFor="emirate">Emirate</Label>
            <Select
              value={formData.emirate}
              onValueChange={(value) => onInputChange("emirate", value)}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select emirate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dubai">Dubai</SelectItem>
                <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                <SelectItem value="sharjah">Sharjah</SelectItem>
                <SelectItem value="ajman">Ajman</SelectItem>
                <SelectItem value="ras-al-khaimah">Ras Al Khaimah</SelectItem>
                <SelectItem value="fujairah">Fujairah</SelectItem>
                <SelectItem value="umm-al-quwain">Umm Al Quwain</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
