"use client";

import { useState } from "react";
import SparePartsHero from "./_components/spare-parts-hero/SparePartsHero";
import SearchSection from "./_components/search-section/SearchSection";
import ProductCard from "./_components/product-card/ProductCard";
import SellCTA from "./_components/sell-cta/SellCTA";
import FilterSidebar from "./_components/filter-sidebar/FilterSidebar";
import Pagination from "./_components/pagination/Pagination";
import LoadingSpinner from "./_components/loading/LoadingSpinner";
import ErrorMessage from "./_components/error/ErrorMessage";
import SellPartsForm from "./_components/sell-parts/SellPartsForm";
import PaymentDialog from "./_components/sell-parts/PaymentDialog";
import DuplicateDialog from "./_components/sell-parts/DuplicateDialog";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSparePartsManagement } from "./_components/useSparePartsManagement";

export default function SparePartsPage() {
  const [sellFormOpen, setSellFormOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [duplicateOpen, setDuplicateOpen] = useState(false);

  const {
    products,
    pagination,
    isLoading,
    error,
    filters,
    handleSearch,
    handleCategoryFilter,
    handleConditionFilter,
    handlePageChange,
    clearFilters,
  } = useSparePartsManagement();

  console.log("Page.tsx - Current filters:", filters);
  console.log("Page.tsx - Products count:", products.length);

  return (
    <div className="min-h-screen">
      <SparePartsHero onSellClick={() => setSellFormOpen(true)} />
      
      <SearchSection
        onSearch={(searchTerm) => {
          console.log("Page.tsx - Search called with:", searchTerm);
          handleSearch(searchTerm);
        }}
        onCategoryChange={(category) => {
          console.log("Page.tsx - Category change called with:", category);
          handleCategoryFilter(category);
        }}
        onConditionChange={(condition) => {
          console.log("Page.tsx - Condition change called with:", condition);
          handleConditionFilter(condition);
        }}
        currentSearch={filters.search || ""}
        currentCategory={filters.category || ""}
        currentCondition={filters.condition || ""}
      />

      <section className="md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <FilterSidebar
              currentCategory={filters.category || ""}
              currentCondition={filters.condition || ""}
              onCategoryChange={handleCategoryFilter}
              onConditionChange={handleConditionFilter}
              onClearFilters={clearFilters}
            />

            <div className="flex-1">
              {isLoading ? (
                <LoadingSpinner />
              ) : error ? (
                <ErrorMessage />
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-gray-600">
                      {pagination?.total || 0} products found
                      {filters.search && (
                        <span className="ml-2">
                          for "{filters.search}"
                        </span>
                      )}
                    </p>
                  </div>

                  {products.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>

                      {pagination && pagination.totalPages > 1 && (
                        <Pagination
                          currentPage={pagination.page}
                          totalPages={pagination.totalPages}
                          onPageChange={handlePageChange}
                        />
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-500 text-lg mb-2">
                        No products found
                      </div>
                      <div className="text-gray-400">
                        Try adjusting your search or filters
                      </div>
                    </div>
                  )}
                </>
              )}
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


