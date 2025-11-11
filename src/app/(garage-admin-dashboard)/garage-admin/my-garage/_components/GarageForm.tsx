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
  MapPin,
  Upload,
  Droplet,
  Wrench,
  Settings,
  Zap,
  PaintBucket,
  Stethoscope,
  Wind,
  LocateFixed,
} from "lucide-react";

interface GarageFormProps {
  onCancel: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export function GarageForm({ onCancel, onSave, initialData }: GarageFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      garageName: "",
      address: "",
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
    }
  );

  const services = [
    { id: "carWash", label: "Car Wash", icon: Droplet },
    { id: "towing", label: "Towing Service", icon: Wrench },
    { id: "generalRepair", label: "General Repair", icon: Settings },
    { id: "maintenance", label: "Maintenance", icon: Settings },
    { id: "acService", label: "AC Service", icon: Wind },
    { id: "electrical", label: "Electrical Systems", icon: Zap },
    { id: "bodyPaint", label: "Body & Paint", icon: PaintBucket },
    { id: "diagnostics", label: "Diagnostics", icon: Stethoscope },
    { id: "onSite", label: "On Site Service", icon: MapPin },
  ];

  const toggleService = (serviceId: string) => {
    setFormData((prev: any) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s: string) => s !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white my-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Garage</h1>
        <p className="text-sm text-gray-600 mt-1">
          Fill in the details to list your garage on the platform
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Photos</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="mb-4">Cover Photo *</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-500 cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-600">
                  Click to upload cover photo
                </p>
              </div>
            </div>
            <div>
              <Label className="mb-4">Profile Image *</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-500 cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-600">
                  Click to upload profile image
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="garageName" className="mb-4">
                Garage Name *
              </Label>
              <Input
                id="garageName"
                value={formData.garageName}
                onChange={(e) =>
                  setFormData({ ...formData, garageName: e.target.value })
                }
                placeholder="Premium Auto Care Center"
                className="border-0"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4">
                <Label htmlFor="address" className="mb-4">
                  Address *
                </Label>
                <div className="flex items-center relative gap-2">
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Sheikh Zayed Road, Al Quoz Industrial Area 3"
                    className="border-0"
                  />
                  {/* <MapPin className="absolute right-3 top-3 w-4 h-4 text-gray-400" /> */}
                  <LocateFixed className=" text-blue-500" />
                </div>
              </div>
              <div className="md:col-span-4">
                <Label htmlFor="city" className="mb-4">
                  City
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  readOnly
                  className="border-0"
                />
              </div>
              <div className="md:col-span-4">
                <Label htmlFor="emirate" className="mb-4">
                  Emirate *
                </Label>
                <Select
                  value={formData.emirate}
                  onValueChange={(value) =>
                    setFormData({ ...formData, emirate: value })
                  }
                >
                  <SelectTrigger className="w-full bg-gray-50">
                    <SelectValue placeholder="Select emirate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dubai">Dubai</SelectItem>
                    <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                    <SelectItem value="Sharjah">Sharjah</SelectItem>
                    <SelectItem value="Ajman">Ajman</SelectItem>
                    <SelectItem value="Ras Al Khaimah">
                      Ras Al Khaimah
                    </SelectItem>
                    <SelectItem value="Fujairah">Fujairah</SelectItem>
                    <SelectItem value="Umm Al Quwain">Umm Al Quwain</SelectItem>
                  </SelectContent>
                </Select>
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
              <Label htmlFor="phone" className="mb-4">
                Phone Number *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+971 50 123 4567"
                className="border-0"
              />
            </div>
            <div>
              <Label htmlFor="email" className="mb-4">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="info@premiumauto.ae"
                className="border-0"
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
              <Label htmlFor="weekdays" className="mb-4">
                Weekdays
              </Label>
              <Input
                id="weekdays"
                value={formData.weekdaysHours}
                onChange={(e) =>
                  setFormData({ ...formData, weekdaysHours: e.target.value })
                }
                className="border-0"
              />
            </div>
            <div>
              <Label htmlFor="weekends" className="mb-4">
                Weekends
              </Label>
              <Input
                id="weekends"
                value={formData.weekendsHours}
                onChange={(e) =>
                  setFormData({ ...formData, weekendsHours: e.target.value })
                }
                className="border-0"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Types Offered*</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.services.includes(service.id)
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <service.icon className="w-6 h-6 mx-auto mb-4" />
                  <p className="text-xs font-medium text-center">
                    {service.label}
                  </p>
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              {" "}
              <Button
                type="button"
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                + Add more service
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="description" className="mb-4">
                About Your Garage
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe your garage, services, and what makes you stand out..."
                rows={4}
                maxLength={210}
                className="border-0 bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.description.length}/210 characters
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="certifications" className="mb-4">
                  Certifications
                </Label>
                <Input
                  id="certifications"
                  value={formData.certifications}
                  onChange={(e) =>
                    setFormData({ ...formData, certifications: e.target.value })
                  }
                  placeholder="ASE Certified, ISO 9001:2015, RTA Approved"
                  className="border-0"
                />
              </div>
              <div>
                <Label htmlFor="brandExpertise" className="mb-4">
                  Brand Expertise
                </Label>
                <Input
                  id="brandExpertise"
                  value={formData.brandExpertise}
                  onChange={(e) =>
                    setFormData({ ...formData, brandExpertise: e.target.value })
                  }
                  placeholder="BMW, Mercedes-Benz, Audi, Toyota, Honda, Nissan"
                  className="border-0"
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
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Cancel
          </Button>
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Add garage
          </Button>
        </div>
      </form>
    </div>
  );
}
