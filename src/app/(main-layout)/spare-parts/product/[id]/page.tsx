"use client";

import { useGetProductByIdQuery } from "@/store/api/sparePartsApi";
import ProductDetailsContent from "./_components/ProductDetailsContent";
import { use } from "react";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: product, isLoading, error } = useGetProductByIdQuery(resolvedParams.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductDetailsContent 
        product={product} 
        isLoading={isLoading} 
        error={error}
        isModal={false}
      />
    </div>
  );
}