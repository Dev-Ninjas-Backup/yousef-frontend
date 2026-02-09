"use client";

import { useState, useEffect } from "react";
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
import { useUpdateProductMutation } from "@/store/api/garageAdminApis/products/products";
import { useGetCategoriesQuery } from "@/store/api/garageAdminApis/categoryApi";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface EditProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: any;
}

export function EditProductModal({
  open,
  onOpenChange,
  product,
}: EditProductModalProps) {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const [formData, setFormData] = useState({
    partName: "",
    categoryId: "",
    condition: "New",
    price: "",
    quantity: "",
    brand: "",
    description: "",
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setFormData({
        partName: product.partName || "",
        categoryId: product.categoryId || "",
        condition: product.condition || "New",
        price: product.price || "",
        quantity: product.quantity?.toString() || "",
        brand: product.brand || "",
        description: product.description || "",
      });

      // Reset states when product changes
      setPhotos([]);
      setPhotoPreviews([]);

      // Set existing photos separately
      if (product.photos && product.photos.length > 0) {
        setExistingPhotos(product.photos);
      } else {
        setExistingPhotos([]);
      }
    }
  }, [product]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalPhotos = existingPhotos.length + photos.length + files.length;

    if (totalPhotos > 5) {
      toast.error("Maximum 5 photos allowed");
      return;
    }

    setPhotos([...photos, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreviews([...photoPreviews, ...previews]);
  };

  const removeExistingPhoto = (index: number) => {
    setExistingPhotos(existingPhotos.filter((_, i) => i !== index));
  };

  const removeNewPhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
    setPhotoPreviews(photoPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      // Build update data - only include changed fields
      const updateData: any = {};

      // Always include these if changed
      if (formData.partName !== product.partName)
        updateData.partName = formData.partName;
      if (formData.categoryId !== product.categoryId)
        updateData.categoryId = formData.categoryId;
      if (formData.condition !== product.condition)
        updateData.condition = formData.condition;
      if (price !== Number(product.price)) updateData.price = price;
      if (quantity !== product.quantity) updateData.quantity = quantity;

      // Optional fields
      if (formData.brand !== product.brand)
        updateData.brand = formData.brand || "";
      if (formData.description !== product.description)
        updateData.description = formData.description || "";

      // Photos - only if new photos added
      if (photos.length > 0) {
        updateData.photos = photos;
      }

      // If nothing changed
      if (Object.keys(updateData).length === 0 && photos.length === 0) {
        toast.info("No changes to update");
        return;
      }

      console.log("Sending update data:", updateData);
      console.log("Photos count:", photos.length);

      await updateProduct({
        id: product.id,
        data: updateData,
      }).unwrap();

      toast.success("Product updated successfully!");
      onOpenChange(false);
    } catch (error: any) {
      console.error("Update error:", error);
      const errorMsg =
        error?.data?.message || error?.message || "Failed to update product";
      toast.error(errorMsg);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Product</DialogTitle>
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

          <div>
            <Label>Product Photos (Max 5)</Label>

            {/* Existing Photos */}
            {existingPhotos.length > 0 && (
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">Current Photos:</p>
                <div className="grid grid-cols-5 gap-2">
                  {existingPhotos.map((photo, index) => (
                    <div key={`existing-${index}`} className="relative">
                      <Image
                        src={photo}
                        alt={`Existing ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingPhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Photos Upload */}
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
              <p className="text-sm text-gray-600">
                {existingPhotos.length > 0
                  ? "Add more photos (will replace existing)"
                  : "Click to upload photos"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {existingPhotos.length + photos.length} / 5 photos
              </p>
            </label>

            {/* New Photos Preview */}
            {photoPreviews.length > 0 && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">
                  New Photos to Upload:
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {photoPreviews.map((preview, index) => (
                    <div key={`new-${index}`} className="relative">
                      <Image
                        src={preview}
                        alt={`New ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded object-cover border-2 border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewPhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
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
              {isLoading ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
