"use client";

import { useState, useEffect } from "react";
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
  useCreateProductMutation,
  useGetUserLimitQuery,
  useCreatePromotionPaymentMutation,
  useCreateMonthlyPaymentMutation,
  useCreatePayPerPaymentMutation,
} from "@/store/api/garageAdminApis/products/products";
import { useGetCategoriesQuery } from "@/store/api/garageAdminApis/categoryApi";
import { useGetPaymentConfigQuery } from "@/store/fetures/setting.api";
import { useGetUserProfileQuery } from "@/store/api/userApi";
import { openPaymentInNewTab } from "@/utils/paymentUtils";
import { toast } from "sonner";
import {
  Upload,
  X,
  ArrowLeft,
  Check,
  Clock,
  Info,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  BadgeAlert,
  ShieldCheck,
  Lock,
} from "lucide-react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import PaymentMonthly from "./_components/PaymentMonthly";
import PaymentPayPer from "./_components/PaymentPayPer";
import PaymentPromotion from "./_components/PaymentPromotion";

type PlanCardType = "FREE" | "PAY_PER" | "MONTHLY_BASIC" | "MONTHLY_PRO" | "MONTHLY_GARAGE";

export default function AddProductPage() {
  const router = useRouter();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [createPromotionPayment, { isLoading: isPromoPaymentLoading }] =
    useCreatePromotionPaymentMutation();
  const [createMonthlyPayment, { isLoading: isMonthlyPaymentLoading }] =
    useCreateMonthlyPaymentMutation();
  const [createPayPerPayment, { isLoading: isPayPerPaymentLoading }] =
    useCreatePayPerPaymentMutation();

  const isPaymentProcessing =
    isPromoPaymentLoading || isMonthlyPaymentLoading || isPayPerPaymentLoading;

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const { data: userLimit, isLoading: userLimitLoading } =
    useGetUserLimitQuery();
  const { data: paymentConfigData } = useGetPaymentConfigQuery();
  const paymentConfig = paymentConfigData?.data;
  const { data: profileData } = useGetUserProfileQuery();

  const [selectedPlanCard, setSelectedPlanCard] = useState<PlanCardType>("FREE");
  const [promoDuration, setPromoDuration] = useState<"3" | "7">("7");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [formData, setFormData] = useState({
    partName: "",
    categoryId: "",
    condition: "New",
    price: "",
    quantity: "1",
    sellerType: "INDIVIDUAL" as "INDIVIDUAL" | "VERIFIED_SUPPLIER",
    plan: "PAY_PER" as "MONTHLY" | "PAY_PER",
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

  useEffect(() => {
    const savedData = localStorage.getItem("productFormData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
        // Sync selected plan card state
        if (parsed.plan === "MONTHLY") {
          setSelectedPlanCard("MONTHLY_PRO"); // default to best value
        } else if (parsed.isPromoted) {
          // If was promoted, can sync accordingly
        }
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
      localStorage.removeItem("productFormData");
    }
  }, []);

  useEffect(() => {
    setSelectedPlanCard("MONTHLY_GARAGE");
    setFormData((prev) => ({ ...prev, plan: "MONTHLY" }));
  }, [userLimit]);

  useEffect(() => {
    if (profileData?.data) {
      setFormData((prev) => ({
        ...prev,
        sellerName: profileData.data.fullName || "",
        sellerEmail: prev.sellerEmail || profileData.data.email || "",
        sellerPhoneNumber: prev.sellerPhoneNumber || profileData.data.phone || "",
      }));
    }
  }, [profileData]);

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

  const selectPlan = (planCard: PlanCardType) => {
    setSelectedPlanCard(planCard);
    if (planCard === "FREE") {
      setFormData((prev) => ({ ...prev, plan: "PAY_PER", isPromoted: false }));
    } else if (planCard === "PAY_PER") {
      setFormData((prev) => ({ ...prev, plan: "PAY_PER" }));
    } else {
      setFormData((prev) => ({ ...prev, plan: "MONTHLY" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast.error("You must agree to the terms and guidelines to publish a product.");
      return;
    }

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

    // Save form data to localStorage first so it's not lost in case of a page reload
    if (isAnyPaymentNeeded) {
      localStorage.setItem("productFormData", JSON.stringify(formData));
      
      try {
        if (needsMonthlySubscription) {
          const response = await createMonthlyPayment({ planType: selectedPlanCard }).unwrap();
          openPaymentInNewTab(response.url);
        } else if (needsPayPer) {
          const response = await createPayPerPayment().unwrap();
          openPaymentInNewTab(response.url);
        } else if (needsPromotionPayment) {
          const response = await createPromotionPayment({ duration: promoDuration }).unwrap();
          openPaymentInNewTab(response.url);
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to create payment session");
      }
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
        sellerEmail: formData.sellerEmail || profileData?.data?.email || undefined,
        sellerPhoneNumber: formData.sellerPhoneNumber || undefined,
        photos: photos.length > 0 ? photos : undefined,
        verificationImage: verificationImage || undefined,
        isPromoted: formData.isPromoted,
        listingPlan: selectedPlanCard,
        promotedDuration: promoDuration,
      }).unwrap();

      toast.success("Product created successfully!");
      localStorage.removeItem("productFormData");
      router.push("/garage-admin/my-products");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create product");
    }
  };

  // Determine if specific plan requires payment redirect
  const needsMonthlySubscription =
    ["MONTHLY_BASIC", "MONTHLY_PRO", "MONTHLY_GARAGE"].includes(selectedPlanCard) &&
    !(userLimit?.hasProductMonthly || userLimit?.hasGarageMonthly);

  const needsPayPer =
    selectedPlanCard === "PAY_PER" && (!userLimit || userLimit.productCredits <= 0);

  const hasPromotionCredit =
    userLimit?.promotionCredits && userLimit.promotionCredits > 0;

  const needsPromotionPayment =
    formData.isPromoted && !hasPromotionCredit && selectedPlanCard !== "FREE";

  const isAnyPaymentNeeded =
    needsMonthlySubscription || needsPayPer || needsPromotionPayment;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b">
        <div>
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-2 p-0 h-auto hover:bg-transparent text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to my products
          </Button>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Add New Product
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details to list your product in our premium marketplace
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Details Grid Card */}
        <div className="bg-white rounded-2xl border p-5 sm:p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
              1
            </span>
            Product Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <Label htmlFor="partName" className="font-semibold text-gray-700">
                Part Name *
              </Label>
              <Input
                id="partName"
                placeholder="Enter part name"
                value={formData.partName}
                onChange={(e) =>
                  setFormData({ ...formData, partName: e.target.value })
                }
                required
                className="mt-1.5 focus-visible:ring-indigo-500"
              />
            </div>

            <div>
              <Label htmlFor="brand" className="font-semibold text-gray-700">
                Brand
              </Label>
              <Input
                id="brand"
                placeholder="Enter brand"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                className="mt-1.5 focus-visible:ring-indigo-500"
              />
            </div>

            <div>
              <Label htmlFor="categoryId" className="font-semibold text-gray-700">
                Category *
              </Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  setFormData({ ...formData, categoryId: value })
                }
              >
                <SelectTrigger className="mt-1.5 w-full focus:ring-indigo-500">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <Label htmlFor="price" className="font-semibold text-gray-700">
                Price (AED) *
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="price"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                  className="pr-12 focus-visible:ring-indigo-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-400 text-sm font-semibold">AED</span>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="quantity" className="font-semibold text-gray-700">
                Quantity *
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                required
                className="mt-1.5 focus-visible:ring-indigo-500"
              />
            </div>

            <div>
              <Label htmlFor="condition" className="font-semibold text-gray-700">
                Condition *
              </Label>
              <Select
                value={formData.condition}
                onValueChange={(value) =>
                  setFormData({ ...formData, condition: value })
                }
              >
                <SelectTrigger className="mt-1.5 w-full focus:ring-indigo-500">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Used">Used</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sellerType" className="font-semibold text-gray-700">
                Seller Type *
              </Label>
              <Select
                value={formData.sellerType}
                onValueChange={(value: "INDIVIDUAL" | "VERIFIED_SUPPLIER") =>
                  setFormData({ ...formData, sellerType: value })
                }
              >
                <SelectTrigger className="mt-1.5 w-full focus:ring-indigo-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INDIVIDUAL">Garage</SelectItem>
                  <SelectItem value="VERIFIED_SUPPLIER">Supplier</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Description & User Guideline note layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border p-5 sm:p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                2
              </span>
              Description
            </h2>
            <Textarea
              id="description"
              placeholder="Describe your product, condition, features, compatibility and shipping info..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={6}
              className="focus-visible:ring-indigo-500 w-full resize-y mt-2"
              maxLength={2000}
            />
            <div className="text-xs text-gray-400 text-right">
              {formData.description.length} / 2000 characters
            </div>
          </div>

          <div className="bg-amber-50/50 rounded-2xl border border-amber-200 p-5 sm:p-6 flex flex-col justify-center space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-900 text-sm">SayaraHub Note</h4>
                <p className="text-xs text-amber-800/80 mt-1 leading-relaxed">
                  SayaraHub only connects buyers and sellers. All payments and transactions happen directly between users. We recommend meet-in-person and inspecting parts before purchase.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Photos Section */}
        <div className="bg-white rounded-2xl border p-5 sm:p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
              3
            </span>
            Product Photos
          </h2>
          <p className="text-sm text-gray-500">
            Upload clear photos of your spare part. High quality photos increase sales conversion. Max 5 photos.
          </p>

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
            className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-indigo-500 hover:bg-indigo-50/20 cursor-pointer block mt-2 transition-all group"
          >
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <span className="block text-sm font-semibold text-gray-700">Click to upload photos</span>
            <span className="block text-xs text-gray-400 mt-1">PNG, JPG or WEBP (Max 5 files)</span>
          </label>

          {photoPreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-6">
              {photoPreviews.map((preview, index) => (
                <div key={index} className="relative group rounded-xl overflow-hidden shadow-sm border bg-gray-50 aspect-square">
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-all shadow-md group-hover:opacity-100"
                    title="Remove photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact/Seller Information */}
        <div className="bg-white rounded-2xl border p-5 sm:p-6 shadow-sm space-y-5">
          <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                4
              </span>
              Seller Information
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Provide contact info so potential buyers can reach out to you directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <Label htmlFor="sellerName" className="font-semibold text-gray-700">
                Seller Name
              </Label>
              <Input
                id="sellerName"
                placeholder="Enter seller name"
                value={formData.sellerName}
                onChange={(e) =>
                  setFormData({ ...formData, sellerName: e.target.value })
                }
                disabled
                className="mt-1.5 focus-visible:ring-indigo-500 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <Label htmlFor="sellerEmail" className="font-semibold text-gray-700">
                Seller Email
              </Label>
              <Input
                id="sellerEmail"
                type="email"
                placeholder="Enter email address"
                value={formData.sellerEmail}
                onChange={(e) =>
                  setFormData({ ...formData, sellerEmail: e.target.value })
                }
                className="mt-1.5 focus-visible:ring-indigo-500"
              />
            </div>

            <div>
              <Label htmlFor="sellerPhoneNumber" className="font-semibold text-gray-700">
                Seller Phone Number *
              </Label>
              <Input
                id="sellerPhoneNumber"
                placeholder="e.g. +971501234567"
                required
                value={formData.sellerPhoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, sellerPhoneNumber: e.target.value })
                }
                className="mt-1.5 focus-visible:ring-indigo-500"
              />
            </div>
          </div>

          {formData.sellerType === "VERIFIED_SUPPLIER" && (
            <div className="border-t pt-5 mt-4 space-y-3">
              <div>
                <Label className="font-bold text-gray-800">Verification Document *</Label>
                <p className="text-xs text-gray-500">
                  Verified suppliers are required to upload a trade license or commercial registration document image.
                </p>
              </div>

              <input
                type="file"
                id="verificationImage"
                accept="image/*"
                onChange={handleVerificationImageChange}
                className="hidden"
              />
              
              <label
                htmlFor="verificationImage"
                className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-indigo-500 hover:bg-indigo-50/20 cursor-pointer block transition-all group"
              >
                {verificationPreview ? (
                  <div className="relative inline-block border rounded-lg overflow-hidden max-w-xs shadow-sm bg-gray-50">
                    <Image
                      src={verificationPreview}
                      alt="Verification preview"
                      width={300}
                      height={200}
                      className="object-contain max-h-48"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setVerificationImage(null);
                        setVerificationPreview("");
                      }}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-all shadow-md"
                      title="Remove verification document"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="py-2">
                    <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2 group-hover:scale-110 transition-transform duration-200" />
                    <span className="block text-sm font-semibold text-gray-700">Upload trade license / document</span>
                    <span className="block text-xs text-gray-400 mt-1">PNG, JPG or WEBP (Max 1 file)</span>
                  </div>
                )}
              </label>
            </div>
          )}
        </div>

        {/* Listing Plans Section */}
        <div className="bg-white rounded-2xl border p-5 sm:p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                5
              </span>
              Listing Plan
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Your product will be listed under the Garage Partner Plan
            </p>
          </div>

          {(userLimit?.hasProductMonthly || userLimit?.hasGarageMonthly) ? (
            <div className="bg-green-50/50 border border-green-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                    Active Plan
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">Garage Partner Plan</h3>
                </div>
                <p className="text-sm text-gray-600">
                  You have unlimited listings and priority search visibility included in your monthly subscription.
                </p>
              </div>
              <div className="bg-white border border-green-200 px-4 py-2.5 rounded-xl text-center shadow-sm shrink-0">
                <span className="block text-xs font-semibold text-gray-500 uppercase">Billing Cycle</span>
                <span className="font-extrabold text-green-600 text-sm">AED {paymentConfig?.monthlyGaragePrice || "99"}/mo</span>
              </div>
            </div>
          ) : (
            <div className="bg-red-50/50 border border-red-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                      Inactive Plan
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">Garage Partner Plan Required</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    You need an active monthly Garage Partner Plan subscription to list your products in the marketplace.
                  </p>
                </div>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Button
                  type="button"
                  onClick={() => router.push("/garage-admin/subscription")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 shadow-md shadow-indigo-100 w-full sm:w-auto"
                >
                  Go to Plans & Billing
                </Button>
                <span className="text-xs text-gray-500">
                  Activate your plan for AED {paymentConfig?.monthlyGaragePrice || "99"}/month to get unlimited listings.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Boost Your Product / Promotion Section */}
        <div className="bg-white rounded-2xl border p-5 sm:p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                    6
                  </span>
                  Promote This Product
                </h2>
                <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3" /> Boost Visibility
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Boost your product visibility and appear at the top of search results.
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-gray-50 border p-3 rounded-xl">
              <Checkbox
                id="isPromoted"
                checked={formData.isPromoted}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isPromoted: checked as boolean })
                }
                className="h-5 w-5 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <Label
                htmlFor="isPromoted"
                className="cursor-pointer font-bold text-sm text-gray-900"
              >
                Promote this product
              </Label>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Promo duration card options */}
            <div className="lg:col-span-2 space-y-4">
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${
                  !formData.isPromoted ? "opacity-40 pointer-events-none" : ""
                }`}
              >
                {/* 3 Days Option */}
                <div
                  onClick={() => setPromoDuration("3")}
                  className={`border rounded-xl p-4 flex flex-col justify-between cursor-pointer transition-all ${
                    promoDuration === "3" && formData.isPromoted
                      ? "border-2 border-indigo-600 bg-indigo-50/5 ring-1 ring-indigo-600"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-955 text-sm">3 Days Promotion</span>
                    <span className="font-black text-indigo-600 text-base">{paymentConfig?.promotionalAdPrice3Days || "49"} AED</span>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1.5 mt-3 pt-3 border-t">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Appear at top of search results</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Higher exposure to local buyers</span>
                    </li>
                  </ul>
                </div>

                {/* 7 Days Option */}
                <div
                  onClick={() => setPromoDuration("7")}
                  className={`border rounded-xl p-4 flex flex-col justify-between cursor-pointer transition-all relative ${
                    promoDuration === "7" && formData.isPromoted
                      ? "border-2 border-indigo-600 bg-indigo-50/5 ring-1 ring-indigo-600"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <span className="absolute -top-2 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase shadow-sm">
                    Recommended
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-955 text-sm">7 Days Promotion</span>
                    <span className="font-black text-indigo-600 text-base">{paymentConfig?.promotionalAdPrice7Days || "99"} AED</span>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1.5 mt-3 pt-3 border-t">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Maximum premium search visibility</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Best for quick selling of high value items</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* How Promotion Works Box */}
              {formData.isPromoted && (
                <div className="bg-gray-50 rounded-xl p-4 border text-xs text-gray-600 space-y-2">
                  <h4 className="font-bold text-gray-800 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-indigo-600" /> How Promotion Works
                  </h4>
                  <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>Select promotion duration (3 or 7 days)</li>
                    <li>Pay or consume 1 promotion credit</li>
                    <li>Your product gets a "Promoted" badge on active listing list</li>
                    <li>Your listing appears higher in searches</li>
                  </ol>
                </div>
              )}
            </div>

            {/* Promotion Status / Alert Panel */}
            <div className="bg-gray-50 border rounded-2xl p-5 flex flex-col justify-between">
              {/* No FREE lock panel needed — all garage owners have unlimited listings */}
                <div className="space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Your Promotion Status</h3>
                    
                    {formData.isPromoted ? (
                      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3.5 text-indigo-900 space-y-1 text-xs">
                        <p className="font-bold flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
                          Promotion Selected: {promoDuration} Days
                        </p>
                        <p className="text-[11px] text-indigo-800/80 font-medium">
                          Will consume 1 promotion credit. Will expire {promoDuration} days after approval.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-gray-100 border rounded-xl p-3.5 text-gray-700 text-xs">
                        <p className="font-semibold text-gray-500">No promotion selected.</p>
                      </div>
                    )}

                    <div className="pt-2 border-t text-xs">
                      {userLimitLoading ? (
                        <Spinner />
                      ) : (
                        <div className="flex items-center justify-between font-medium text-gray-700">
                          <span>Available promotion credits:</span>
                          <span className="font-extrabold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                            {userLimit?.promotionCredits || 0}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {needsPromotionPayment && (
                    <div className="pt-4 border-t">
                      <PaymentPromotion formData={formData} duration={promoDuration} />
                    </div>
                  )}
                </div>
            </div>
          </div>
        </div>

        {/* Terms Checkbox and Actions Row */}
        <div className="bg-white rounded-2xl border p-5 sm:p-6 shadow-sm space-y-6">
          <div className="flex items-start space-x-3 bg-indigo-50/40 p-4 rounded-xl border border-indigo-100">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              className="mt-0.5 h-4.5 w-4.5 border-gray-300 text-indigo-600 focus:ring-indigo-500 shrink-0"
            />
            <Label htmlFor="terms" className="cursor-pointer text-xs text-gray-600 leading-normal font-medium">
              I agree to the terms. By listing, you agree to SayaraHub's{" "}
              <a href="/terms-conditions" className="text-indigo-600 hover:underline font-bold">Terms of Service</a>{" "}
              and{" "}
              <a href="/community-guidelines" className="text-indigo-600 hover:underline font-bold">Community Guidelines</a>.
            </Label>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
              className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 px-6 font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || isPaymentProcessing || !agreedToTerms}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 shadow-md shadow-indigo-100 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isLoading || isPaymentProcessing ? (
                <>
                  <Spinner className="h-4 w-4" /> {isPaymentProcessing ? "Processing..." : "Creating..."}
                </>
              ) : isAnyPaymentNeeded ? (
                "Complete Payment to Publish"
              ) : (
                "Publish Product"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
