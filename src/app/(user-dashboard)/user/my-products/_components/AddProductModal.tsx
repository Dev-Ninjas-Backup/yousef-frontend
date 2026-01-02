"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useCreateProductMutation } from "@/store/api/garageAdminApis/products/products";
import { useGetCategoriesQuery } from "@/store/api/garageAdminApis/categoryApi";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductModal({ open, onOpenChange }: AddProductModalProps) {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

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
      }).unwrap();

      toast.success("Product created successfully!");
      onOpenChange(false);

      // Reset form
      setFormData({
        partName: "",
        categoryId: "",
        condition: "New",
        price: "",
        quantity: "",
        sellerType: "INDIVIDUAL",
        plan: "MONTHLY",
        brand: "",
        description: "",
        sellerName: "",
        sellerEmail: "",
        sellerPhoneNumber: "",
      });
      setPhotos([]);
      setPhotoPreviews([]);
      setVerificationImage(null);
      setVerificationPreview("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create product");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add New Product
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                      Loading...
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
                <SelectTrigger>
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
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                  <SelectItem value="PAY_PER">Pay Per</SelectItem>
                </SelectContent>
              </Select>
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
              rows={3}
            />
          </div>

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

          <div>
            <Label htmlFor="sellerPhoneNumber">Seller Phone Number</Label>
            <Input
              id="sellerPhoneNumber"
              value={formData.sellerPhoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, sellerPhoneNumber: e.target.value })
              }
            />
          </div>

          {formData.sellerType === "VERIFIED_SUPPLIER" && (
            <div>
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
                className="border-2 border-dashed rounded-lg p-4 text-center hover:border-blue-500 cursor-pointer block"
              >
                {verificationPreview ? (
                  <div className="relative inline-block">
                    <Image
                      src={verificationPreview}
                      alt="Verification preview"
                      width={150}
                      height={150}
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
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Upload verification document
                    </p>
                  </>
                )}
              </label>
            </div>
          )}

          <div>
            <Label>Photos (Max 5)</Label>
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
              className="border-2 border-dashed rounded-lg p-4 text-center hover:border-blue-500 cursor-pointer block"
            >
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Click to upload photos</p>
            </label>

            {photoPreviews.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mt-2">
                {photoPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      width={100}
                      height={100}
                      className="rounded object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
