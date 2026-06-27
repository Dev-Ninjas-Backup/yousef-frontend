"use client";

import React, { useState } from "react";
import {
  useGetExclusiveOffersQuery,
  useCreateExclusiveOfferMutation,
  useUpdateExclusiveOfferMutation,
  useDeleteExclusiveOfferMutation,
  ExclusiveOffer,
} from "@/store/api/exclusiveOfferApi";
import { useGetGaragesQuery, GarageData } from "@/store/api/garageApi";
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Calendar,
  Search,
  Image as ImageIcon,
  Tag,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function ExclusiveOffersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<ExclusiveOffer | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validUnit, setValidUnit] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [garageId, setGarageId] = useState("none");
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  // Fetch API
  const { data: offers = [], isLoading, refetch } = useGetExclusiveOffersQuery(undefined, {
    pollingInterval: 30000,
  });

  const { data: garagesData } = useGetGaragesQuery({ limit: 200 } as any);
  const garages: GarageData[] = garagesData?.data?.data || [];

  const [createOffer, { isLoading: isCreating }] = useCreateExclusiveOfferMutation();
  const [updateOffer, { isLoading: isUpdating }] = useUpdateExclusiveOfferMutation();
  const [deleteOffer] = useDeleteExclusiveOfferMutation();

  const handleOpenCreate = () => {
    setTitle("");
    setDescription("");
    setValidUnit("Valid until 12/31/2026");
    setOriginalPrice("");
    setPrice("");
    setBrand("");
    setGarageId("none");
    setBannerFile(null);
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (offer: ExclusiveOffer) => {
    setSelectedOffer(offer);
    setTitle(offer.title);
    setDescription(offer.description);
    setValidUnit(offer.validUnit);
    setOriginalPrice(offer.originalPrice || "");
    setPrice(offer.price || "");
    setBrand(offer.brand || "");
    setGarageId(offer.garageId || "none");
    setBannerFile(null);
    setIsEditOpen(true);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !validUnit.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!bannerFile) {
      toast.error("Please upload a banner image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("validUnit", validUnit);
      if (originalPrice) formData.append("originalPrice", originalPrice);
      if (price) formData.append("price", price);
      if (brand) formData.append("brand", brand);
      if (garageId !== "none") formData.append("garageId", garageId);
      formData.append("bannerImage", bannerFile);

      await createOffer(formData).unwrap();
      toast.success("Exclusive offer published successfully!");
      setIsCreateOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to publish exclusive offer.");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOffer) return;

    if (!title.trim() || !description.trim() || !validUnit.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("validUnit", validUnit);
      formData.append("originalPrice", originalPrice);
      formData.append("price", price);
      formData.append("brand", brand);
      formData.append("garageId", garageId === "none" ? "" : garageId);
      if (bannerFile) {
        formData.append("bannerImage", bannerFile);
      }

      await updateOffer({ id: selectedOffer.id, data: formData }).unwrap();
      toast.success("Exclusive offer updated successfully!");
      setIsEditOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update exclusive offer.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this exclusive offer?")) {
      try {
        await deleteOffer(id).unwrap();
        toast.success("Exclusive offer deleted successfully.");
        refetch();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete exclusive offer.");
      }
    }
  };

  const filteredOffers = offers.filter(
    (o) =>
      o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.brand && o.brand.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Exclusive Offers</h1>
          <p className="text-sm text-gray-500 mt-1">
            Publish and manage exclusive limited-time deals and famous brand promotions.
          </p>
        </div>
        <Button
          onClick={handleOpenCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2 h-11 px-5 font-semibold transition-all shadow-md shadow-blue-500/10 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          Add Exclusive Offer
        </Button>
      </div>

      {/* Search Filter */}
      <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-3">
        <Search className="w-5 h-5 text-gray-400 shrink-0" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title, description or brand..."
          className="w-full bg-transparent border-0 text-sm focus:outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Main Grid / List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium">Loading exclusive offers...</p>
        </div>
      ) : filteredOffers.length > 0 ? (
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/75 border-b text-gray-400 text-[11px] font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Offer details</th>
                  <th className="px-6 py-4">Brand</th>
                  <th className="px-6 py-4">Pricing</th>
                  <th className="px-6 py-4">Validity</th>
                  <th className="px-6 py-4">Associated Garage</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredOffers.map((offer) => {
                  const garageObj = garages.find((g) => g.id === offer.garageId);
                  return (
                    <tr key={offer.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Details Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-12 rounded-lg overflow-hidden border border-gray-150 shrink-0 bg-gray-50 flex items-center justify-center relative">
                            {offer.bannerImage ? (
                              <img
                                src={offer.bannerImage}
                                alt={offer.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="w-5 h-5 text-gray-300" />
                            )}
                          </div>
                          <div className="space-y-0.5">
                            <h3 className="font-semibold text-gray-900 line-clamp-1">{offer.title}</h3>
                            <p className="text-xs text-gray-400 line-clamp-1">{offer.description}</p>
                          </div>
                        </div>
                      </td>

                      {/* Brand Column */}
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {offer.brand || "—"}
                      </td>

                      {/* Pricing Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {offer.originalPrice && (
                            <span className="line-through text-gray-400 text-xs">
                              {offer.originalPrice} AED
                            </span>
                          )}
                          <span className="font-bold text-green-600">
                            {offer.price ? `${offer.price} AED` : "Free"}
                          </span>
                        </div>
                      </td>

                      {/* Validity Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                          <Calendar className="w-3.5 h-3.5 text-gray-450" />
                          <span>{offer.validUnit}</span>
                        </div>
                      </td>

                      {/* Garage Column */}
                      <td className="px-6 py-4 text-xs font-semibold text-gray-600">
                        {garageObj ? (
                          <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-100">
                            {garageObj.name}
                          </span>
                        ) : (
                          <span className="bg-gray-50 text-gray-500 px-2.5 py-1 rounded-full border border-gray-200">
                            General Brand Offer
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenEdit(offer)}
                            className="h-8 w-8 text-gray-500 hover:text-blue-600 rounded-lg"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(offer.id)}
                            className="h-8 w-8 text-gray-500 hover:text-red-650 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-white border border-dashed rounded-xl py-20 gap-3 text-gray-400">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <Tag className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-sm font-semibold text-gray-650">No exclusive offers found</p>
          <p className="text-xs text-gray-400 max-w-xs text-center">
            Publish famous brand discount vouchers or specific garage offers to show them on the home page.
          </p>
        </div>
      )}

      {/* CREATE DIALOG */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-xl rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-900">Publish New Exclusive Offer</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit} className="space-y-4 pt-2">
            <div className="space-y-1">
              <Label htmlFor="title" className="font-semibold text-xs text-gray-700">Offer Title*</Label>
              <Input
                id="title"
                placeholder="e.g. 25% Off Premium Michelin Tyres"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="description" className="font-semibold text-xs text-gray-700">Description*</Label>
              <Textarea
                id="description"
                placeholder="Detailed description of the offer, terms and conditions..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="brand" className="font-semibold text-xs text-gray-700">Brand Name (Optional)</Label>
                <Input
                  id="brand"
                  placeholder="e.g. Michelin, Toyota"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="validUnit" className="font-semibold text-xs text-gray-700">Validity String*</Label>
                <Input
                  id="validUnit"
                  placeholder="e.g. Valid until 12/31/2026"
                  value={validUnit}
                  onChange={(e) => setValidUnit(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="originalPrice" className="font-semibold text-xs text-gray-700">Original Price (AED, Optional)</Label>
                <Input
                  id="originalPrice"
                  type="text"
                  placeholder="e.g. 500"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="price" className="font-semibold text-xs text-gray-700">Discounted Price (AED, Optional)</Label>
                <Input
                  id="price"
                  type="text"
                  placeholder="e.g. 375"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="garageSelect" className="font-semibold text-xs text-gray-700">Link to Garage (Optional)</Label>
              <Select value={garageId} onValueChange={setGarageId}>
                <SelectTrigger id="garageSelect" className="w-full">
                  <SelectValue placeholder="Select a garage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (General Brand Offer)</SelectItem>
                  {garages.map((g) => (
                    <SelectItem key={g.id} value={g.id}>
                      {g.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="bannerFile" className="font-semibold text-xs text-gray-700">Banner Image File*</Label>
              <Input
                id="bannerFile"
                type="file"
                accept="image/*"
                onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
                required
              />
            </div>

            <DialogFooter className="pt-4 border-t gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateOpen(false)}
                className="rounded-xl font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isCreating}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold min-w-[120px]"
              >
                {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish Offer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* EDIT DIALOG */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-xl rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-900">Edit Published Exclusive Offer</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4 pt-2">
            <div className="space-y-1">
              <Label htmlFor="edit-title" className="font-semibold text-xs text-gray-700">Offer Title*</Label>
              <Input
                id="edit-title"
                placeholder="e.g. 25% Off Premium Michelin Tyres"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="edit-description" className="font-semibold text-xs text-gray-700">Description*</Label>
              <Textarea
                id="edit-description"
                placeholder="Detailed description of the offer, terms and conditions..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="edit-brand" className="font-semibold text-xs text-gray-700">Brand Name (Optional)</Label>
                <Input
                  id="edit-brand"
                  placeholder="e.g. Michelin, Toyota"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="edit-validUnit" className="font-semibold text-xs text-gray-700">Validity String*</Label>
                <Input
                  id="edit-validUnit"
                  placeholder="e.g. Valid until 12/31/2026"
                  value={validUnit}
                  onChange={(e) => setValidUnit(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="edit-originalPrice" className="font-semibold text-xs text-gray-700">Original Price (AED, Optional)</Label>
                <Input
                  id="edit-originalPrice"
                  type="text"
                  placeholder="e.g. 500"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="edit-price" className="font-semibold text-xs text-gray-700">Discounted Price (AED, Optional)</Label>
                <Input
                  id="edit-price"
                  type="text"
                  placeholder="e.g. 375"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="edit-garageSelect" className="font-semibold text-xs text-gray-700">Link to Garage (Optional)</Label>
              <Select value={garageId} onValueChange={setGarageId}>
                <SelectTrigger id="edit-garageSelect" className="w-full">
                  <SelectValue placeholder="Select a garage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (General Brand Offer)</SelectItem>
                  {garages.map((g) => (
                    <SelectItem key={g.id} value={g.id}>
                      {g.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="edit-bannerFile" className="font-semibold text-xs text-gray-700">Banner Image File (Optional, select to replace)</Label>
              <Input
                id="edit-bannerFile"
                type="file"
                accept="image/*"
                onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
              />
              {selectedOffer?.bannerImage && !bannerFile && (
                <p className="text-[10px] text-gray-400 mt-1">
                  Current banner: <a href={selectedOffer.bannerImage} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">View Image</a>
                </p>
              )}
            </div>

            <DialogFooter className="pt-4 border-t gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditOpen(false)}
                className="rounded-xl font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold min-w-[120px]"
              >
                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
