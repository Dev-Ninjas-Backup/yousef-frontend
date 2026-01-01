"use client";

import React from "react";
import { LuMail, LuPhone, LuMapPin } from "react-icons/lu";
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
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => onInputChange("bio", e.target.value)}
            disabled={!isEditing}
            placeholder="Tell us about yourself"
            rows={3}
          />
        </div>

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
          <Label htmlFor="address">Street Address</Label>
          <div className="relative">
            <LuMapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
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
          <div>
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
          </div>

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