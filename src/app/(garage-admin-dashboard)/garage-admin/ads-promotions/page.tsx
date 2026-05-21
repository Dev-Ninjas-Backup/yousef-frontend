"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"; // kept for empty-state card
import { Plus } from "lucide-react";
import PromotionalAdCard from "./_components/PromotionalAdCard/PromotionalAdCard";
import PromotionsStat from "./_components/PromotionsStat/PromotionsStat";
import CreatePromotionalModal from "./_components/CreatePromotionalModal/CreatePromotionalModal";
import PreviewModal from "./_components/PreviewModal/PreviewModal";
import { promotionalAdApi } from "@/store/api/garageAdminApis/promotionalAd/promotionalAd";

export default function AdsPromotionsPage() {
  const { data: promotionalProducts, isLoading: promotionalProductsLoading } =
    promotionalAdApi.useGetPromotionalProductsQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<any>(null);

  if (promotionalProductsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-600">Loading promotional ads...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PromotionsStat />

      <Card className="bg-[#EFF6FF] border-[#BEDBFF] shadow-none">
        <CardContent className="">
          <p className="text-sm font-bold text-blue-900 mb-1">
            Promotional Pricing:
          </p>
          <p className="text-sm text-blue-800">
            Promote your listings for increased visibility. Choose 3-day (49 AED) or 7-day (99 AED) promotional slots. Your Garage Partner Plan includes unlimited listings with no per-listing fees.
          </p>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between py-3">
        <div>
          <h2 className="text-base font-bold text-gray-900">Promotional Ads</h2>
          <p className="text-sm text-gray-500">
            Manage your featured promotions and special offers
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {promotionalProducts && promotionalProducts.length > 0 ? (
          promotionalProducts.map((product) => (
            <PromotionalAdCard
              key={product.id}
              product={product}
              onPreview={() => setPreviewProduct(product)}
            />
          ))
        ) : (
          <Card className="shadow-none">
            <CardContent className="p-12 text-center">
              <p className="text-gray-600">No promotional ads found</p>
            </CardContent>
          </Card>
        )}
      </div>

      <CreatePromotionalModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />

      <PreviewModal
        open={!!previewProduct}
        onOpenChange={(open) => !open && setPreviewProduct(null)}
        product={previewProduct}
      />
    </div>
  );
}
