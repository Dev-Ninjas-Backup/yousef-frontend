"use client";

import { useGetProductByIdQuery } from "@/store/api/sparePartsApi";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProductDetailsContent from "../../../product/[id]/_components/ProductDetailsContent";
import { use } from "react";

export default function ProductModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const productId = resolvedParams?.id;

  console.log("Modal params:", resolvedParams);
  console.log("Product ID:", productId);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  const handleClose = () => {
    router.back();
  };

  if (!productId) {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl!">
          <div className="p-6 text-center">
            <p className="text-red-600">Invalid product ID</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-6xl w-full max-h-[90vh] overflow-y-auto p-0">
        <ProductDetailsContent
          product={product}
          isLoading={isLoading}
          error={error}
          isModal={true}
        />
      </DialogContent>
    </Dialog>
  );
}
