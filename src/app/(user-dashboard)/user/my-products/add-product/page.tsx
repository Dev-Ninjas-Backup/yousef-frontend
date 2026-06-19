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

type PlanCardType = "FREE" | "PAY_PER" | "MONTHLY_BASIC" | "MONTHLY_PRO";

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
  const [promoDuration, setPromoDuration] = useState<"7" | "30">("30");
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
    garageId: "",
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
    if (userLimit) {
      if (userLimit.hasProductMonthly) {
        const activePlan = (userLimit.productMonthlyPlanType || profileData?.data?.productMonthlyPlanType || "PRO").toUpperCase();
        if (activePlan === "BASIC") {
          setSelectedPlanCard("MONTHLY_BASIC");
          setFormData((prev) => ({ ...prev, plan: "MONTHLY" }));
        } else {
          setSelectedPlanCard("MONTHLY_PRO");
          setFormData((prev) => ({ ...prev, plan: "MONTHLY" }));
        }
      } else if (userLimit.freeProductsRemaining > 0) {
        setSelectedPlanCard("FREE");
        setFormData((prev) => ({ ...prev, plan: "PAY_PER" }));
      } else {
        setSelectedPlanCard("PAY_PER");
        setFormData((prev) => ({ ...prev, plan: "PAY_PER" }));
      }
    }
  }, [userLimit, profileData]);

  useEffect(() => {
    if (profileData?.data) {
      setFormData((prev) => ({
        ...prev,
        sellerName: profileData.data.fullName || "",
        sellerEmail: prev.sellerEmail || profileData.data.email || "",
        sellerPhoneNumber: prev.sellerPhoneNumber || profileData.data.phone || "",
        garageId: prev.garageId || profileData.data.garages?.[0]?.id || "",
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
          const cleanPlanType = selectedPlanCard.replace("MONTHLY_", "");
          const response = await createMonthlyPayment({ planType: cleanPlanType }).unwrap();
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
        garageId: formData.garageId || undefined,
      }).unwrap();

      toast.success("Product created successfully!");
      localStorage.removeItem("productFormData");
      router.push("/user/my-products");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create product");
    }
  };

  const freeProductsUsed = userLimit?.freeProductsUsed || 0;
  const freeProductsLeft = userLimit?.freeProductsRemaining || 0;

  const activePlanType = (userLimit?.productMonthlyPlanType || profileData?.data?.productMonthlyPlanType || "PRO").toUpperCase();

  const isFreeDisabled = freeProductsLeft === 0 || !!userLimit?.hasProductMonthly;
  const isPayPerDisabled = !!userLimit?.hasProductMonthly;
  const isBasicDisabled = !!userLimit?.hasProductMonthly && activePlanType !== "BASIC";

  // Determine if specific plan requires payment redirect
  const needsMonthlySubscription =
    ["MONTHLY_BASIC", "MONTHLY_PRO"].includes(selectedPlanCard) &&
    (!userLimit?.hasProductMonthly ||
      (selectedPlanCard === "MONTHLY_PRO" && activePlanType === "BASIC"));

  const needsPayPer =
    selectedPlanCard === "PAY_PER" && (!userLimit || userLimit.productCredits <= 0);

  const promoPrice = promoDuration === "7"
    ? Number(paymentConfig?.promotionalAdPrice3Days || 49)
    : Number(paymentConfig?.promotionalAdPrice7Days || 99);

  const userCredits = userLimit?.promotionCredits || 0;
  const promoDeduction = Math.min(promoPrice, userCredits);
  const remainingPromoCost = promoPrice - promoDeduction;

  const needsPromotionPayment =
    formData.isPromoted && remainingPromoCost > 0 && selectedPlanCard !== "FREE";

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

            {profileData?.data?.garages && profileData.data.garages.length > 0 && (
              <div>
                <Label htmlFor="garageId" className="font-semibold text-gray-700">
                  Select Garage
                </Label>
                <Select
                  value={formData.garageId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, garageId: value })
                  }
                >
                  <SelectTrigger className="mt-1.5 w-full focus:ring-indigo-500">
                    <SelectValue placeholder="Select a garage" />
                  </SelectTrigger>
                  <SelectContent>
                    {profileData.data.garages.map((garage) => (
                      <SelectItem key={garage.id} value={garage.id}>
                        {garage.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
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
                  <SelectItem value="Refurbished">Refurbished</SelectItem>
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
                  <SelectItem value="INDIVIDUAL">Individual</SelectItem>
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                  5
                </span>
                Choose Your Listing Plan
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Choose how you want to list your product in our marketplace
              </p>
            </div>
            
            {freeProductsLeft > 0 && (
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold self-start border border-green-200">
                <Info className="w-4 h-4" />
                <span>You have {freeProductsLeft} free listings left</span>
              </div>
            )}
          </div>

          {/* Listing Plans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            {/* Free Plan Card */}
            <div
              onClick={() => !isFreeDisabled && selectPlan("FREE")}
              className={`relative rounded-2xl border p-5 transition-all flex flex-col justify-between cursor-pointer ${
                isFreeDisabled
                  ? "opacity-50 cursor-not-allowed bg-gray-50 border-gray-200"
                  : selectedPlanCard === "FREE"
                  ? "border-2 border-green-500 bg-green-50/5 ring-1 ring-green-500 shadow-sm"
                  : "border-gray-200 hover:border-green-300 hover:bg-green-50/10"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                      Free Plan
                    </span>
                    {!userLimit?.hasProductMonthly && freeProductsLeft > 0 && (
                      <span className="bg-green-100 text-green-800 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5" /> Current plan
                      </span>
                    )}
                  </div>
                  <input
                    type="radio"
                    name="listingPlan"
                    checked={selectedPlanCard === "FREE"}
                    disabled={isFreeDisabled}
                    onChange={() => selectPlan("FREE")}
                    className="h-4.5 w-4.5 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-900">First {paymentConfig?.freePromotionalListings || "3"} Listings Only</h3>
                  <p className="text-2xl font-extrabold text-green-600 mt-1">FREE</p>
                  <p className="text-xs text-gray-750 font-bold">Use your free listings</p>
                  <p className="text-xs text-gray-500 mt-0.5">Active for 30 days</p>
                </div>

                <ul className="mt-5 space-y-2.5 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span>Only for first {paymentConfig?.freePromotionalListings || "3"} products</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span>Standard visibility</span>
                  </li>
                  <li className="flex items-center gap-2 text-red-500 font-medium">
                    <X className="w-4.5 h-4.5 shrink-0" />
                    <span>Promotion not allowed</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 border-t pt-4">
                {freeProductsLeft === 0 && !userLimit?.hasProductMonthly ? (
                  <p className="text-xs font-semibold text-red-500 flex items-center gap-1.5">
                    <BadgeAlert className="w-4 h-4" /> No free listings remaining
                  </p>
                ) : userLimit?.hasProductMonthly ? (
                  <p className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> Disabled on Monthly Plan
                  </p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-gray-700">
                      <span>You have {freeProductsLeft} free listings left</span>
                      <span>{freeProductsUsed} of {paymentConfig?.freePromotionalListings || "3"} used</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(freeProductsUsed / Number(paymentConfig?.freePromotionalListings || 3)) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pay Per Listing Card */}
            <div
              onClick={() => !isPayPerDisabled && selectPlan("PAY_PER")}
              className={`relative rounded-2xl border p-5 transition-all flex flex-col justify-between cursor-pointer ${
                isPayPerDisabled
                  ? "opacity-50 cursor-not-allowed bg-gray-50 border-gray-200"
                  : selectedPlanCard === "PAY_PER"
                  ? "border-2 border-amber-500 bg-amber-50/5 ring-1 ring-amber-500 shadow-sm"
                  : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/10"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                    Pay Per Listing
                  </span>
                  <input
                    type="radio"
                    name="listingPlan"
                    checked={selectedPlanCard === "PAY_PER"}
                    disabled={isPayPerDisabled}
                    onChange={() => selectPlan("PAY_PER")}
                    className="h-4.5 w-4.5 text-amber-600 focus:ring-amber-500 border-gray-300"
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-900">Single Product Listing</h3>
                  <p className="text-2xl font-extrabold text-amber-600 mt-1">{paymentConfig?.perListingPrice || "9"} AED <span className="text-sm font-normal text-gray-500">/ Listing</span></p>
                  <p className="text-xs text-gray-500 mt-1">Active for 45 days</p>
                </div>

                <ul className="mt-5 space-y-2.5 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span>Active for 45 days</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span>Standard visibility</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span>Promotion available</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-1.5 text-xs text-amber-800">
                {isPayPerDisabled ? (
                  <p className="font-semibold text-gray-500 flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> Disabled on Monthly Plan
                  </p>
                ) : (
                  <>
                    <p className="font-bold flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> Expiry reminders:
                    </p>
                    <ul className="list-disc list-inside pl-1 space-y-0.5 font-medium">
                      <li>15 days left (on Day 15)</li>
                      <li>3 days before expiry</li>
                      <li>1 day before expiry</li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Monthly Plans Nested Container */}
            <div className="relative border border-blue-200 bg-blue-50/20 rounded-3xl p-5 flex flex-col justify-between">
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
                Monthly Plans
              </span>

              <div className="space-y-4 pt-2">
                {/* Basic Card */}
                <div
                  onClick={() => !isBasicDisabled && selectPlan("MONTHLY_BASIC")}
                  className={`relative rounded-2xl border p-4 bg-white transition-all flex items-start gap-3 ${
                    isBasicDisabled
                      ? "opacity-50 cursor-not-allowed bg-gray-50 border-gray-200"
                      : selectedPlanCard === "MONTHLY_BASIC"
                      ? "border-2 border-blue-500 shadow-sm ring-1 ring-blue-500"
                      : "border-gray-200 hover:border-blue-300 cursor-pointer"
                  }`}
                >
                  <input
                    type="radio"
                    name="listingPlan"
                    checked={selectedPlanCard === "MONTHLY_BASIC"}
                    disabled={isBasicDisabled}
                    onChange={() => selectPlan("MONTHLY_BASIC")}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 shrink-0"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-gray-900 text-sm">Basic</span>
                        {userLimit?.hasProductMonthly && activePlanType === "BASIC" && (
                          <span className="bg-green-100 text-green-800 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Check className="w-2.5 h-2.5" /> Current plan
                          </span>
                        )}
                      </div>
                      <span className="text-blue-600 font-extrabold text-sm">{paymentConfig?.monthlyBasicPrice || "29"} AED/month</span>
                    </div>
                    <ul className="text-[10px] text-gray-600 space-y-0.5 pt-1.5 border-t">
                      <li className="flex items-center gap-1">✓ Up to 10 listings</li>
                      <li className="flex items-center gap-1">✓ Active for 60 days</li>
                      <li className="flex items-center gap-1">✓ Standard visibility</li>
                      <li className="flex items-center gap-1 text-red-500 font-medium">✗ No promotion included</li>
                    </ul>
                  </div>
                </div>

                {/* Pro Card */}
                <div
                  onClick={() => selectPlan("MONTHLY_PRO")}
                  className={`relative rounded-2xl border p-4 bg-white transition-all cursor-pointer flex items-start gap-3 ${
                    selectedPlanCard === "MONTHLY_PRO"
                      ? "border-2 border-indigo-600 shadow-sm ring-1 ring-indigo-600"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  {userLimit?.hasProductMonthly && activePlanType === "BASIC" ? (
                    <span className="absolute -top-2 right-4 bg-orange-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase shadow-sm">
                      ⚡ Upgrade Available
                    </span>
                  ) : (
                    <span className="absolute -top-2 right-4 bg-indigo-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">
                      ⭐ Best Value
                    </span>
                  )}
                  <input
                    type="radio"
                    name="listingPlan"
                    checked={selectedPlanCard === "MONTHLY_PRO"}
                    onChange={() => selectPlan("MONTHLY_PRO")}
                    className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 shrink-0"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-gray-900 text-sm">Pro</span>
                        {userLimit?.hasProductMonthly && activePlanType === "PRO" && (
                          <span className="bg-green-100 text-green-800 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Check className="w-2.5 h-2.5" /> Current plan
                          </span>
                        )}
                      </div>
                      <span className="text-indigo-600 font-extrabold text-sm">{paymentConfig?.monthlyProPrice || "59"} AED/month</span>
                    </div>
                    <ul className="text-[10px] text-gray-600 space-y-0.5 pt-1.5 border-t">
                      <li className="flex items-center gap-1">✓ Unlimited listings</li>
                      <li className="flex items-center gap-1">✓ Active for 60 days</li>
                      <li className="flex items-center gap-1">✓ Higher ranking in search</li>
                      <li className="flex items-center gap-1">✓ "Pro Seller" badge</li>
                      <li className="flex items-center gap-1">✓ Promotion available</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-blue-100/60 rounded-xl p-3 text-[11px] text-blue-900 space-y-1 border border-blue-200">
                <p className="font-bold flex items-center gap-1 text-[11px]">
                  <Clock className="w-3.5 h-3.5" /> IMPORTANT Expiry reminders:
                </p>
                <ul className="list-disc list-inside space-y-0.5 font-medium pl-1 text-[10px]">
                  <li>Day 60 (10 days left)</li>
                  <li>3 days before expiry</li>
                  <li>1 day before expiry</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Conditional Plan Payment Inline Triggers */}
          {needsMonthlySubscription && (
            <div className="pt-2">
              <PaymentMonthly formData={formData} planType={selectedPlanCard} />
            </div>
          )}
          {needsPayPer && !userLimit?.hasProductMonthly && (
            <div className="pt-2">
              <PaymentPayPer formData={formData} />
            </div>
          )}

          {/* Info Box: How Listing Works */}
          <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5 mt-6">
            <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-blue-600" /> How Listing Works
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-gray-600">
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900">1. First {paymentConfig?.freePromotionalListings || "3"} listings are FREE</h4>
                <p>No promotion can be applied to free listings. Valid for 30 days.</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900">2. Pay per listing</h4>
                <p>Costs {paymentConfig?.perListingPrice || "9"} AED per listing. Active for 45 days.</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900">3. Monthly plans</h4>
                <p>Basic ({paymentConfig?.monthlyBasicPrice || "29"} AED) and Pro ({paymentConfig?.monthlyProPrice || "59"} AED) plans for unlimited/higher volume.</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900">4. Expiry reminders</h4>
                <p>We'll notify you automatically before any of your listings expire.</p>
              </div>
            </div>
          </div>
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
                disabled={selectedPlanCard === "FREE"}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isPromoted: checked as boolean })
                }
                className="h-5 w-5 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <Label
                htmlFor="isPromoted"
                className={`cursor-pointer font-bold text-sm ${
                  selectedPlanCard === "FREE" ? "text-gray-400" : "text-gray-900"
                }`}
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
                  !formData.isPromoted || selectedPlanCard === "FREE"
                    ? "opacity-40 pointer-events-none"
                    : ""
                }`}
              >
                {/* 7 Days Option */}
                <div
                  onClick={() => setPromoDuration("7")}
                  className={`border rounded-xl p-4 flex flex-col justify-between cursor-pointer transition-all ${
                    promoDuration === "7" && formData.isPromoted
                      ? "border-2 border-indigo-600 bg-indigo-50/5 ring-1 ring-indigo-600"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-955 text-sm">7 Days Promotion</span>
                    <span className="font-black text-indigo-600 text-base">{paymentConfig?.promotionalAdPrice3Days || "49"} AED</span>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1.5 mt-3 pt-3 border-t">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Appear at top of search</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Higher exposure</span>
                    </li>
                  </ul>
                </div>

                {/* 30 Days Option */}
                <div
                  onClick={() => setPromoDuration("30")}
                  className={`border rounded-xl p-4 flex flex-col justify-between cursor-pointer transition-all relative ${
                    promoDuration === "30" && formData.isPromoted
                      ? "border-2 border-indigo-600 bg-indigo-50/5 ring-1 ring-indigo-600"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <span className="absolute -top-2 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase shadow-sm">
                    Recommended
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-955 text-sm">30 Days Promotion</span>
                    <span className="font-black text-indigo-600 text-base">{paymentConfig?.promotionalAdPrice7Days || "99"} AED</span>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1.5 mt-3 pt-3 border-t">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Appear at top of search</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Higher exposure</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Maximum visibility</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Best for quick selling</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* How Promotion Works Box */}
              {formData.isPromoted && selectedPlanCard !== "FREE" && (
                <div className="bg-gray-50 rounded-xl p-4 border text-xs text-gray-600 space-y-2">
                  <h4 className="font-bold text-gray-800 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-indigo-600" /> How Promotion Works
                  </h4>
                  <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>Select promotion duration (7 or 30 days)</li>
                    <li>Pay or consume 1 promotion credit</li>
                    <li>Your product gets a "Promoted" badge on active listing list</li>
                    <li>Your listing appears higher in searches</li>
                  </ol>
                </div>
              )}
            </div>

            {/* Promotion Status / Alert Panel */}
            <div className="bg-gray-50 border rounded-2xl p-5 flex flex-col justify-between">
              {selectedPlanCard === "FREE" ? (
                <div className="flex flex-col items-center justify-center text-center h-full space-y-3 py-4">
                  <Lock className="w-8 h-8 text-gray-400" />
                  <div>
                    <h4 className="font-bold text-gray-800 text-xs">Promotion not available for free listings.</h4>
                    <p className="text-[10px] text-gray-500 mt-1 leading-normal">
                      Choose a paid per listing plan or subscribe to a monthly plan to enable premium promotion.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Your Promotion Status</h3>
                    
                    {formData.isPromoted ? (
                      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3.5 text-indigo-900 space-y-2 text-xs">
                        <p className="font-bold flex items-center gap-1.5 border-b pb-1.5 border-indigo-100">
                          <span className="h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
                          Promotion Selected: {promoDuration} Days
                        </p>
                        <div className="space-y-1.5 text-[11px] font-medium text-indigo-800">
                          <div className="flex justify-between">
                            <span>Promotion Cost:</span>
                            <span>{promoPrice} AED</span>
                          </div>
                          {promoDeduction > 0 && (
                            <div className="flex justify-between text-emerald-700 font-semibold">
                              <span>Credit Deduction:</span>
                              <span>-{promoDeduction} AED</span>
                            </div>
                          )}
                          <div className="flex justify-between border-t pt-1.5 border-indigo-200 font-extrabold text-indigo-950">
                            <span>Total to Pay:</span>
                            <span>{remainingPromoCost} AED</span>
                          </div>
                        </div>
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
                            {userLimit?.promotionCredits || 0} AED
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {needsPromotionPayment && (
                    <div className="pt-4 border-t">
                      <PaymentPromotion 
                        formData={formData} 
                        duration={promoDuration} 
                        availableCredits={userCredits}
                        deduction={promoDeduction}
                        remainingCost={remainingPromoCost}
                        price={promoPrice}
                      />
                    </div>
                  )}
                </div>
              )}
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
              <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Terms of Service</a>{" "}
              and{" "}
              <a href="/legal" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Community Guidelines</a>.
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
