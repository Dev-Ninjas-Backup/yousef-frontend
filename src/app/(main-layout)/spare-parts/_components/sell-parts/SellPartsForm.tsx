"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Package, Upload, ArrowRight, CloudUpload } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SellPartsFormProps {
  onPayment: () => void;
}

export default function SellPartsForm({ onPayment }: SellPartsFormProps) {
  const [isNegotiable, setIsNegotiable] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Sell Your Auto Parts</h2>
        <p className="text-gray-600">Got spare parts to sell? List them on our marketplace and reach thousands of buyers</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Free Listings Info */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 rounded-lg p-3">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Free Listings Available</h3>
              <p className="text-sm text-gray-600 mb-3">You have 1 out of 3 free listings remaining. After that, a fee of 20 AED will apply per listing.</p>
              <Progress value={33} className="h-2" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="partName">Part Name</Label>
            <Input id="partName" placeholder="e.g., Brake Pads Front Set" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input id="brand" placeholder="e.g., Bosch, ACDelco" className="mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engine">Engine Parts</SelectItem>
                <SelectItem value="brakes">Brakes</SelectItem>
                <SelectItem value="suspension">Suspension</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="condition">Condition</Label>
            <Select>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="like-new">Like New</SelectItem>
                <SelectItem value="used-good">Used - Good</SelectItem>
                <SelectItem value="refurbished">Refurbished</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="price">Price ($)</Label>
            <Input id="price" type="number" placeholder="0.00" className="mt-2" />
            <div className="flex items-center gap-2 mt-2">
              <Checkbox id="negotiable" checked={isNegotiable} onCheckedChange={(checked) => setIsNegotiable(checked as boolean)} />
              <Label htmlFor="negotiable" className="text-sm cursor-pointer">Is the price negotiable?</Label>
            </div>
          </div>
          <div>
            <Label htmlFor="quantity">Quantity Available</Label>
            <Input id="quantity" type="number" placeholder="1" className="mt-2" />
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Provide detailed information about the part, compatibility, condition, etc." rows={4} className="mt-2" />
        </div>

        <div className="mb-6">
          <Label>Upload Photos</Label>
          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer">
            <CloudUpload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-700 font-medium mb-1">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500">PNG, JPG up to 10MB (max 5 images)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="yourName">Your Name</Label>
            <Input id="yourName" placeholder="John Doe" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" className="mt-2" />
          </div>
        </div>

        <div className="mb-8">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="(555) 123-4567" className="mt-2" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={onPayment} className="flex-1 bg-blue-600 hover:bg-blue-700 h-12">
            Pay & List Your Part
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-12">
            <CloudUpload className="mr-2 h-4 w-4" />
            Save as Draft
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          By listing your part, you agree to our seller terms and conditions
        </p>
      </div>
    </div>
  );
}
