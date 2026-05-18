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
import { LayoutGrid, List, RotateCcw, Search, Users, MessageSquare, MessageSquareMore, MapPin, Handshake, MoveRight } from "lucide-react";
import { motion } from "framer-motion";

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
];

const featureCards = [
  {
    icon: Search,
    title: "Easy Search",
    description: "Find the parts you need quickly",
  },
  {
    icon: MessageSquare,
    title: "Direct Contact",
    description: "Talk to sellers instantly",
  },
  {
    icon: Users,
    title: "No Middleman",
    description: "You deal directly with sellers",
  },
  {
    icon: MapPin,
    title: "Local Deals",
    description: "Buy from sellers near you",
  },
];

const howItWorksSteps = [
  {
    number: "1",
    title: "Search Parts",
    description: "Browse thousands of parts listed by sellers.",
    icon: Search,
  },
  {
    number: "2",
    title: "Contact Seller",
    description: "Message or call the seller to ask questions.",
    icon: MessageSquareMore,
  },
  {
    number: "3",
    title: "Agree & Meet",
    description: "Agree on the price and close the deal your way.",
    icon: Handshake,
  },
];

export default function SparePartsPage() {
  const [sellFormOpen, setSellFormOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [duplicateOpen, setDuplicateOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const {
    products,
    pagination,
    isLoading,
    error,
    filters,
    handleSearch,
    handleCategoryFilter,
    handleConditionFilter,
    handleSortChange,
    handlePageChange,
    clearFilters,
  } = useSparePartsManagement();

  return (
    <div className="min-h-screen bg-gray-50">
      <SparePartsHero />

      <SearchSection
        onSearch={handleSearch}
        onCategoryChange={handleCategoryFilter}
        onConditionChange={handleConditionFilter}
        currentSearch={filters.search || ""}
        currentCategory={filters.category || ""}
        currentCondition={filters.condition || ""}
      />

      {/* Main Content */}
      <section className="">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter Sidebar */}
            <FilterSidebar
              currentCategory={filters.category || ""}
              currentCondition={filters.condition || ""}
              onCategoryChange={handleCategoryFilter}
              onConditionChange={handleConditionFilter}
              onClearFilters={clearFilters}
              products={products}
            />

            {/* Products Area */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-3 flex items-center justify-between mb-5">
                <p className="text-sm text-gray-600 font-medium">
                  <span className="text-gray-900 font-semibold">{pagination?.total ?? 0}</span> products found
                  {filters.search && (
                    <span className="text-gray-500 ml-1">for "{filters.search}"</span>
                  )}
                </p>

                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 hidden sm:block">Sort by:</span>
                    <select
                      value={filters.sortBy || "relevance"}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 cursor-pointer"
                    >
                      {sortOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 transition-colors ${
                        viewMode === "grid"
                          ? "bg-blue-600 text-white"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                      aria-label="Grid view"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 transition-colors ${
                        viewMode === "list"
                          ? "bg-blue-600 text-white"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                      aria-label="List view"
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              {isLoading ? (
                <LoadingSpinner />
              ) : error ? (
                <ErrorMessage />
              ) : products.length > 0 ? (
                <>
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                        : "flex flex-col gap-4"
                    }
                  >
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} viewMode={viewMode} />
                    ))}
                  </div>

                  {pagination && pagination.totalPages > 1 && (
                    <div className="mt-8">
                      <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              ) : (
                /* Empty State */
                <motion.div
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20 px-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Illustration */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center">
                      <div className="relative">
                        <Search className="h-14 w-14 text-blue-300" strokeWidth={1.5} />
                        {/* Small boxes */}
                        <div className="absolute -bottom-2 -right-4 w-6 h-5 bg-blue-100 rounded-md border border-blue-200" />
                        <div className="absolute -bottom-4 -right-1 w-4 h-3.5 bg-blue-100 rounded-md border border-blue-200" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-500 text-sm max-w-xs mb-6 leading-relaxed">
                    We couldn't find any products matching your search. Try adjusting your filters or search terms.
                  </p>

                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset Filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Feature Banner */}
          <motion.div
            className="bg-[#f8faff] rounded-2xl px-6 md:px-8 py-8 mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 shadow-md shadow-blue-900/5 border border-blue-100/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {featureCards.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div key={index} className="flex items-center gap-4 flex-1">
                  <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{feat.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{feat.description}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* How It Works */}
          <motion.div
            className="mt-24 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">How It Works</h2>
            <p className="text-gray-500 mb-12">Buying or selling spare parts is simple</p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
              {howItWorksSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-center w-full md:w-auto">
                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 md:p-6 text-left flex flex-row items-center gap-4 flex-1 md:w-[310px]">
                      {/* Big Icon on left */}
                      <div className="bg-[#f0f5ff] rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-7 h-7 text-blue-600" strokeWidth={1.75} />
                      </div>
                      
                      {/* Text content on right */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-bold">
                            {step.number}
                          </div>
                          <h4 className="font-bold text-gray-900 text-sm">{step.title}</h4>
                        </div>
                        <p className="text-[13px] text-gray-500 leading-relaxed pr-2">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {index < howItWorksSteps.length - 1 && (
                      <div className={`hidden md:flex mx-1 ${index === 0 ? "text-blue-600" : "text-gray-300"}`}>
                        <MoveRight className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Listings */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Recent Listings</h2>
                <p className="text-gray-500 text-sm">See what sellers are offering right now</p>
              </div>
              <button className="text-blue-600 font-semibold text-sm flex items-center hover:text-blue-700 transition">
                View all parts <span className="ml-1">→</span>
              </button>
            </div>

            <div className="relative group">
              {/* Horizontal Scroll Container */}
              <div className="flex overflow-x-auto gap-5 pb-6 snap-x snap-mandatory scrollbar-hide">
                {products && products.length > 0 ? (
                  // Show max 6 products from current fetch for demo purposes
                  products.slice(0, 6).map((product) => (
                    <div key={product.id} className="w-[280px] sm:w-[300px] flex-shrink-0 snap-start">
                      <ProductCard product={product} />
                    </div>
                  ))
                ) : (
                  <div className="w-full text-center py-10 text-gray-500 border border-dashed rounded-xl border-gray-300">
                    No recent listings available.
                  </div>
                )}
              </div>

              {/* Optional Right Scroll Button Overlay */}
              {products && products.length > 4 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 hidden md:flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 cursor-pointer text-blue-600 hover:bg-gray-50 transition z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <SellCTA />

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
