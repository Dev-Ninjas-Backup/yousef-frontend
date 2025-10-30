"use client";

import { useState } from "react";
import SparePartsHero from "./_components/spare-parts-hero/SparePartsHero";
import SearchSection from "./_components/search-section/SearchSection";
import ProductCard from "./_components/product-card/ProductCard";
import SellCTA from "./_components/sell-cta/SellCTA";
import FilterSidebar from "./_components/filter-sidebar/FilterSidebar";
import SellPartsForm from "./_components/sell-parts/SellPartsForm";
import PaymentDialog from "./_components/sell-parts/PaymentDialog";
import DuplicateDialog from "./_components/sell-parts/DuplicateDialog";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ProductImage from "@/assets/spareparts/product/productImage.jpg";

const products = [
  {
    id: 1,
    image: ProductImage,
    title: "Serpentine Belt Kit with Tensioner",
    price: 45.99,
    condition: "New" as const,
    seller: "Engine Parts Pro",
    isNew: true,
  },
  {
    id: 2,
    image: ProductImage,
    title: "Serpentine Belt Kit with Tensioner",
    price: 45.99,
    condition: "Used" as const,
    seller: "Engine Parts Pro",
    isNew: false,
  },
  {
    id: 3,
    image: ProductImage,
    title: "Serpentine Belt Kit with Tensioner",
    price: 45.99,
    condition: "New" as const,
    seller: "Engine Parts Pro",
    isNew: true,
  },
  {
    id: 4,
    image: ProductImage,
    title: "Serpentine Belt Kit with Tensioner",
    price: 45.99,
    condition: "New" as const,
    seller: "Engine Parts Pro",
    isNew: false,
  },
  {
    id: 5,
    image: ProductImage,
    title: "Serpentine Belt Kit with Tensioner",
    price: 45.99,
    condition: "Used" as const,
    seller: "Engine Parts Pro",
    isNew: false,
  },
  {
    id: 6,
    image: ProductImage,
    title: "Serpentine Belt Kit with Tensioner",
    price: 45.99,
    condition: "New" as const,
    seller: "Engine Parts Pro",
    isNew: true,
  },
  {
    id: 7,
    image: ProductImage,
    title: "Serpentine Belt Kit with Tensioner",
    price: 45.99,
    condition: "New" as const,
    seller: "Engine Parts Pro",
    isNew: false,
  },
  {
    id: 8,
    image: ProductImage,
    title: "Serpentine Belt Kit with Tensioner",
    price: 45.99,
    condition: "Used" as const,
    seller: "Engine Parts Pro",
    isNew: false,
  },
  {
    id: 9,
    image: ProductImage,
    title: "Serpentine Belt Kit with Tensioner",
    price: 45.99,
    condition: "New" as const,
    seller: "Engine Parts Pro",
    isNew: true,
  },
];

export default function SparePartsPage() {
  const [sellFormOpen, setSellFormOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [duplicateOpen, setDuplicateOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <SparePartsHero onSellClick={() => setSellFormOpen(true)} />
      <SearchSection />

      <section className="md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <FilterSidebar />

            <div className="flex-1">
              <div className="mb-6">
                <p className="text-gray-600">9 products found</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SellCTA onSellClick={() => setSellFormOpen(true)} />

      <Dialog open={sellFormOpen} onOpenChange={setSellFormOpen}>
        <DialogContent className="sm:max-w-4xl w-auto max-h-[90vh] overflow-y-auto scrollbar-hide">
          <DialogTitle className="sr-only">Sell Your Auto Parts</DialogTitle>
          <SellPartsForm
            onPayment={() => {
              setSellFormOpen(false);
              setPaymentOpen(true);
            }}
          />
        </DialogContent>
      </Dialog>

      <PaymentDialog open={paymentOpen} onOpenChange={setPaymentOpen} />
      <DuplicateDialog open={duplicateOpen} onOpenChange={setDuplicateOpen} />
    </div>
  );
}
