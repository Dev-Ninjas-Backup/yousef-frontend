"use client";

import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Package,
  Upload,
  ArrowRight,
  CloudUpload,
  User,
  ShieldCheck,
  AlertCircle,
  FileText,
  Tag,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface SellPartsFormProps {
  onPayment: () => void;
}

export default function SellPartsForm({ onPayment }: SellPartsFormProps) {
  const [sellerType, setSellerType] = useState<"individual" | "supplier">(
    "individual"
  );
  const [listingPlan, setListingPlan] = useState<
    "subscription" | "per-listing"
  >("subscription");
  const [promoteListin, setPromoteListing] = useState(false);
  const [isNegotiable, setIsNegotiable] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Sell Your Auto Parts
        </h2>
        <p className="text-gray-600 text-sm">
          Got spare parts to sell? List them on our marketplace and reach
          thousands of buyers
        </p>
      </div>

      <div className="bg-white rounded-xl p-6">
        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900">
            This platform only facilitates listings. We do not guarantee product
            quality or assume payment responsibility. All transactions are
            between buyers and sellers.
          </p>
        </div>

        {/* Seller Type */}
        <div className="mb-6">
          <Label className="flex items-center gap-2 mb-3">
            <User className="h-4 w-4" />
            Seller Type
          </Label>
          <RadioGroup
            value={sellerType}
            onValueChange={(value) =>
              setSellerType(value as "individual" | "supplier")
            }
            className="space-y-3"
          >
            <div className="border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
              <div className="flex items-start gap-3">
                <RadioGroupItem
                  value="individual"
                  id="individual"
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="individual"
                    className="flex items-center gap-2 cursor-pointer font-semibold"
                  >
                    <User className="h-4 w-4" />
                    Individual Seller
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Sell parts as an individual. Your name will be displayed on
                    listings.
                  </p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
              <div className="flex items-start gap-3">
                <RadioGroupItem
                  value="supplier"
                  id="supplier"
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="supplier"
                    className="flex items-center gap-2 cursor-pointer font-semibold"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Verified Supplier
                    <Badge className="bg-green-500 text-white text-xs">
                      Trusted
                    </Badge>
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Register as a supplier with documentation. Get "Verified
                    Supplier" badge after admin approval.
                  </p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Supplier Documentation */}
        {sellerType === "supplier" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <Label className="flex items-center gap-2 mb-3 text-green-900">
              <FileText className="h-4 w-4" />
              Supplier Documentation (Required for Verification)
            </Label>
            <p className="text-sm text-green-800 mb-4">
              Upload business license, trade license, or other official
              documentation to get verified as a supplier.
            </p>
            <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer bg-white">
              <Upload className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <p className="text-gray-700 font-medium mb-1">
                Upload Business Documents
              </p>
              <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
            </div>
            <div className="bg-white border border-green-200 rounded-lg p-3 mt-4 flex gap-2">
              <AlertCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-green-800">
                After uploading, your documents will be reviewed by our admin
                team. Once approved, you'll receive the "Verified Supplier"
                badge on all your listings.
              </p>
            </div>
          </div>
        )}

        {/* Listing Plan */}
        <div className="mb-6">
          <Label className="flex items-center gap-2 mb-3">
            <Tag className="h-4 w-4" />
            Listing Plan
          </Label>
          <RadioGroup
            value={listingPlan}
            onValueChange={(value) =>
              setListingPlan(value as "subscription" | "per-listing")
            }
            className="space-y-3"
          >
            <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4 cursor-pointer">
              <div className="flex items-start gap-3">
                <RadioGroupItem
                  value="subscription"
                  id="subscription"
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="subscription"
                    className="flex items-center gap-2 cursor-pointer font-semibold"
                  >
                    <Badge className="bg-blue-600 text-white text-xs">
                      Recommended
                    </Badge>
                    Monthly Subscription - 100 AED
                  </Label>
                  <p className="text-sm text-gray-700 mt-1">
                    Unlimited spare parts listings for 30 days. Best value for
                    sellers with multiple parts.
                  </p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors">
              <div className="flex items-start gap-3">
                <RadioGroupItem
                  value="per-listing"
                  id="per-listing"
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="per-listing"
                    className="cursor-pointer font-semibold"
                  >
                    Pay Per Listing
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    No subscription required. Use auto-renewal option below.
                  </p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="partName">Part Name</Label>
            <Input
              id="partName"
              placeholder="e.g., Brake Pads Front Set"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              placeholder="e.g., Bosch, ACDelco"
              className="mt-2"
            />
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
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              className="mt-2"
            />
            <div className="flex items-center gap-2 mt-2">
              <Checkbox
                id="negotiable"
                checked={isNegotiable}
                onCheckedChange={(checked) =>
                  setIsNegotiable(checked as boolean)
                }
              />
              <Label htmlFor="negotiable" className="text-sm cursor-pointer">
                Is the price negotiable?
              </Label>
            </div>
          </div>
          <div>
            <Label htmlFor="quantity">Quantity Available</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="1"
              className="mt-2"
            />
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Provide detailed information about the part, compatibility, condition, etc."
            rows={3}
            className="mt-2"
          />
        </div>

        <div className="mb-6">
          <Label>Upload Photos</Label>
          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-700 font-medium mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG up to 10MB (max 5 images)
            </p>
          </div>
        </div>

        {/* Promote Listing */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Checkbox
              id="promote"
              checked={promoteListin}
              onCheckedChange={(checked) =>
                setPromoteListing(checked as boolean)
              }
              className="mt-1"
            />
            <div className="flex-1">
              <Label
                htmlFor="promote"
                className="flex items-center gap-2 cursor-pointer font-semibold"
              >
                <Tag className="h-4 w-4" />
                Promote This Listing - 20 AED
                <Badge className="bg-yellow-500 text-white text-xs">
                  Featured
                </Badge>
              </Label>
              <p className="text-sm text-gray-700 mt-1">
                Get better visibility! Your listing will appear in the
                promotional carousel on the homepage and be highlighted in
                search results.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="yourName">Your Name</Label>
            <Input id="yourName" placeholder="John Doe" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="mt-2"
            />
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+971 XX XXX XXXX"
            className="mt-2"
          />
        </div>

        {/* Total Cost */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-900">Total Cost:</span>
            <span className="text-2xl font-bold text-blue-600">100 AED</span>
          </div>
          <p className="text-sm text-gray-700">
            ✓ Monthly subscription: 100 AED (unlimited listings)
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onPayment}
            className="flex-1 bg-blue-600 hover:bg-blue-700 h-11"
          >
            List Your Part
          </Button>
          <Button variant="outline" className="h-11">
            Save as Draft
          </Button>
        </div>

        <p className="text-center text-xs text-gray-600 mt-4">
          By listing your part, you agree to our seller terms and conditions
        </p>
      </div>
    </div>
  );
}
