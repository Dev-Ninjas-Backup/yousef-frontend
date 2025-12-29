"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  useCreateMonthlyPaymentMutation,
  useCreatePayPerPaymentMutation,
  useCreateProductMutation,
  useCreatePromotionPaymentMutation,
  useGetUserLimitQuery,
} from "@/store/api/garageAdminApis/products/products";
import { useGetCategoriesQuery } from "@/store/api/garageAdminApis/categoryApi";
import { toast } from "sonner";
import { Upload, X, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import PaymentMonthly from "./_components/PaymentMonthly";

export default function AddProductPage() {
  const router = useRouter();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [createPromotionPayment, { isLoading: isPaymentLoading }] =
    useCreatePromotionPaymentMutation();

  const [createPayPerPayment, { isLoading: isPayPerPaymentLoading }] =
    useCreatePayPerPaymentMutation();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const { data: userLimit, isLoading: userLimitLoading } =
    useGetUserLimitQuery();

  console.log(userLimit?.hasProductMonthly, "user limit ...........");

  const [formData, setFormData] = useState({
    partName: "",
    categoryId: "",
    condition: "New",
    price: "",
    quantity: "",
    sellerType: "INDIVIDUAL" as "INDIVIDUAL" | "VERIFIED_SUPPLIER",
    plan: "MONTHLY" as "MONTHLY" | "PAY_PER",
    brand: "",
    description: "",
    sellerName: "",
    sellerEmail: "",
    sellerPhoneNumber: "",
    isPromoted: false,
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [verificationImage, setVerificationImage] = useState<File | null>(null);
  const [verificationPreview, setVerificationPreview] = useState<string>("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (photos.length + files.length > 5) {
      toast.error("Maximum 5 photos allowed");
      return;
    }

    setPhotos([...photos, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreviews([...photoPreviews, ...previews]);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
    setPhotoPreviews(photoPreviews.filter((_, i) => i !== index));
  };

  const handleVerificationImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setVerificationImage(file);
      setVerificationPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.sellerType === "VERIFIED_SUPPLIER" && !verificationImage) {
      toast.error("Verification image is required for verified suppliers");
      return;
    }

    const price = Number(formData.price);
    if (!price || price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    const quantity = Number(formData.quantity);
    if (!quantity || quantity <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }

    try {
      await createProduct({
        partName: formData.partName,
        categoryId: formData.categoryId,
        condition: formData.condition,
        price,
        quantity,
        sellerType: formData.sellerType,
        plan: formData.plan,
        brand: formData.brand || undefined,
        description: formData.description || undefined,
        sellerName: formData.sellerName || undefined,
        sellerEmail: formData.sellerEmail || undefined,
        sellerPhoneNumber: formData.sellerPhoneNumber || undefined,
        photos: photos.length > 0 ? photos : undefined,
        verificationImage: verificationImage || undefined,
        isPromoted: formData.isPromoted,
      }).unwrap();

      toast.success("Product created successfully!");
      router.push("/garage-admin/my-products");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create product");
    }
  };

  const handleBuyPromotionCredit = async () => {
    try {
      const response = await createPromotionPayment().unwrap();
      window.location.href = response.url;
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create payment session");
    }
  };

  const hasPromotionCredit =
    userLimit?.promotionCredits && userLimit.promotionCredits > 0;
  const needsPayment = formData.isPromoted && !hasPromotionCredit;
  console.log(needsPayment, "payment need ");
  const needsMonthlySubscription =
    formData.plan === "MONTHLY" && userLimit?.hasProductMonthly;
  const needsPayPer =
    formData.plan === "PAY_PER" && userLimit?.productCredits! <= 0;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <p className="text-gray-600 mt-1">
          Fill in the details to list your product
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 space-y-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="partName">Part Name *</Label>
            <Input
              id="partName"
              value={formData.partName}
              onChange={(e) =>
                setFormData({ ...formData, partName: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="categoryId">Category *</Label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) =>
                setFormData({ ...formData, categoryId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoriesLoading ? (
                  <SelectItem value="loading" disabled>
                    <Spinner />
                  </SelectItem>
                ) : (
                  categoriesData?.data?.data?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="condition">Condition *</Label>
            <Select
              value={formData.condition}
              onValueChange={(value) =>
                setFormData({ ...formData, condition: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Used">Used</SelectItem>
                <SelectItem value="Refurbished">Refurbished</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price (AED) *</Label>
            <Input
              id="price"
              type="number"
              min="1"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="quantity">Quantity *</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="sellerType">Seller Type *</Label>
            <Select
              value={formData.sellerType}
              onValueChange={(value: "INDIVIDUAL" | "VERIFIED_SUPPLIER") =>
                setFormData({ ...formData, sellerType: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INDIVIDUAL">Individual</SelectItem>
                <SelectItem value="VERIFIED_SUPPLIER">
                  Verified Supplier
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="plan">Payment Plan *</Label>
            <Select
              value={formData.plan}
              onValueChange={(value: "MONTHLY" | "PAY_PER") =>
                setFormData({ ...formData, plan: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MONTHLY">Monthly</SelectItem>
                <SelectItem value="PAY_PER">Pay Per</SelectItem>
              </SelectContent>
            </Select>
            {userLimit?.hasProductMonthly && (
              <div className="mt-2 text-sm text-green-700">
                You are subscribed to the Product Monthly plan.
              </div>
            )}
            {needsMonthlySubscription && <PaymentMonthly />}
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
          />
        </div>

        <div className="border rounded-lg p-4 bg-blue-50">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="isPromoted"
              checked={formData.isPromoted}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isPromoted: checked as boolean })
              }
            />
            <div className="flex-1">
              <Label
                htmlFor="isPromoted"
                className="cursor-pointer font-semibold"
              >
                Promote this product
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Promoted products appear at the top of search results and get
                more visibility.
              </p>
              {userLimitLoading ? (
                <Spinner />
              ) : (
                userLimit && (
                  <p className="text-sm font-medium text-blue-700 mt-2">
                    Available promotion credits:{" "}
                    {userLimit.promotionCredits || 0}
                  </p>
                )
              )}
            </div>
          </div>
        </div>

        {needsPayment && (
          <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
            <p className="text-sm text-yellow-800 mb-3">
              You don't have promotion credits. Please buy credits to promote
              your product.
            </p>
            <Button
              type="button"
              onClick={handleBuyPromotionCredit}
              disabled={isPaymentLoading}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              {isPaymentLoading ? "Processing..." : "Buy Promotion Credit"}
            </Button>
          </div>
        )}

        <div className="border-t pt-6">
          <h3 className="font-semibold mb-4">Seller Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sellerName">Seller Name</Label>
              <Input
                id="sellerName"
                value={formData.sellerName}
                onChange={(e) =>
                  setFormData({ ...formData, sellerName: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="sellerEmail">Seller Email</Label>
              <Input
                id="sellerEmail"
                type="email"
                value={formData.sellerEmail}
                onChange={(e) =>
                  setFormData({ ...formData, sellerEmail: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="sellerPhoneNumber">Seller Phone Number</Label>
            <Input
              id="sellerPhoneNumber"
              value={formData.sellerPhoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, sellerPhoneNumber: e.target.value })
              }
            />
          </div>
        </div>

        {formData.sellerType === "VERIFIED_SUPPLIER" && (
          <div className="border-t pt-6">
            <Label>Verification Image *</Label>
            <input
              type="file"
              id="verificationImage"
              accept="image/*"
              onChange={handleVerificationImageChange}
              className="hidden"
            />
            <label
              htmlFor="verificationImage"
              className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-500 cursor-pointer block mt-2"
            >
              {verificationPreview ? (
                <div className="relative inline-block">
                  <Image
                    src={verificationPreview}
                    alt="Verification preview"
                    width={200}
                    height={200}
                    className="rounded object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setVerificationImage(null);
                      setVerificationPreview("");
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Upload verification document
                  </p>
                </>
              )}
            </label>
          </div>
        )}

        <div className="border-t pt-6">
          <Label>Product Photos (Max 5)</Label>
          <input
            type="file"
            id="photos"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
            className="hidden"
          />
          <label
            htmlFor="photos"
            className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-500 cursor-pointer block mt-2"
          >
            <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Click to upload photos</p>
          </label>

          {photoPreviews.length > 0 && (
            <div className="grid grid-cols-5 gap-3 mt-4">
              {photoPreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    width={150}
                    height={150}
                    className="rounded object-cover w-full h-32"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isLoading || needsPayment}
          >
            {isLoading ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
