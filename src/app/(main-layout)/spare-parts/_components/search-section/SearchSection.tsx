"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { sparePartsPageTranslations } from "@/translations/spareParts";
import { useGetCategoriesQuery } from "@/store/api/garageAdminApis/categoryApi";
import { useGetActiveSellersQuery } from "@/store/api/sparePartsApi";

interface SearchSectionProps {
  onSearch: (searchTerm: string) => void;
  onCategoryChange: (category: string) => void;
  onConditionChange: (condition: string) => void;
  onUserChange: (userId: string) => void;
  currentSearch: string;
  currentCategory: string;
  currentCondition: string;
  currentUserId: string;
}

export default function SearchSection({
  onSearch,
  onCategoryChange,
  onConditionChange,
  onUserChange,
  currentSearch,
  currentCategory,
  currentCondition,
  currentUserId,
}: SearchSectionProps) {
  const { t } = useLanguage();
  const trans = t(sparePartsPageTranslations);
  const [searchInput, setSearchInput] = useState(currentSearch);

  // Fetch dynamic categories
  const { data: categoryData } = useGetCategoriesQuery();
  const apiCategories = categoryData?.data?.data || [];

  // Fetch active sellers for dropdown
  const { data: sellersData } = useGetActiveSellersQuery();
  const apiSellers = sellersData?.data || [];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sellerSearch, setSellerSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
        const selected = apiSellers.find((s) => s.id === currentUserId);
        if (selected) {
          setSellerSearch(selected.fullName);
        } else {
          setSellerSearch("");
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currentUserId, apiSellers]);

  useEffect(() => {
    const selected = apiSellers.find((s) => s.id === currentUserId);
    if (selected) {
      setSellerSearch(selected.fullName);
    } else {
      setSellerSearch("");
    }
  }, [currentUserId, apiSellers]);

  const handleFocus = () => {
    setDropdownOpen(true);
    if (currentUserId) {
      setSellerSearch("");
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUserChange("");
    setSellerSearch("");
    setDropdownOpen(false);
  };

  const selectedSeller = apiSellers.find((s) => s.id === currentUserId);
  const sellerButtonLabel = selectedSeller ? selectedSeller.fullName : "All Sellers";

  const filteredSellers = sellerSearch.trim() === ""
    ? []
    : apiSellers.filter((seller) =>
        seller.fullName.toLowerCase().includes(sellerSearch.toLowerCase())
      );

  const conditions = [
    { value: "all", label: trans.search.conditions.all },
    { value: "New", label: trans.search.conditions.new },
    { value: "Used", label: trans.search.conditions.used },
    { value: "Refurbished", label: trans.search.conditions.refurbished },
  ];

  const handleSearchSubmit = () => {
    onSearch(searchInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <section id="search-section" className="relative z-20 -mt-10 md:-mt-12 mb-10 w-full">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="max-w-5xl mx-auto bg-white rounded-xl md:rounded-2xl shadow-lg p-3 md:p-4 border border-gray-100"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search Input with icon */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder={trans.search.placeholder}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full h-12 pl-10 pr-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* User/Seller Select (Autocomplete Input) */}
            <div className="w-full lg:w-48 flex-shrink-0 relative" ref={dropdownRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search seller..."
                  value={sellerSearch}
                  onFocus={handleFocus}
                  onChange={(e) => {
                    setSellerSearch(e.target.value);
                    setDropdownOpen(true);
                  }}
                  className="w-full h-12 pl-9 pr-8 border border-gray-200 text-gray-600 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                {(sellerSearch || currentUserId) && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100 transition"
                  >
                    <span className="text-xs">✕</span>
                  </button>
                )}
              </div>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-2 space-y-1 min-w-[200px]">
                  {/* Sellers list */}
                  <div className="max-h-48 overflow-y-auto space-y-0.5 scrollbar-thin">
                    <div
                      onClick={() => {
                        onUserChange("");
                        setDropdownOpen(false);
                        setSellerSearch("");
                      }}
                      className={`cursor-pointer p-2 rounded text-xs transition-colors flex items-center ${
                        !currentUserId
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      All Sellers
                    </div>
                    {filteredSellers.map((seller) => (
                      <div
                        key={seller.id}
                        onClick={() => {
                          onUserChange(seller.id);
                          setSellerSearch(seller.fullName);
                          setDropdownOpen(false);
                        }}
                        className={`cursor-pointer p-2 rounded text-xs transition-colors truncate ${
                          currentUserId === seller.id
                            ? "bg-blue-50 text-blue-600 font-semibold"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        title={seller.fullName}
                      >
                        {seller.fullName}
                      </div>
                    ))}
                    {sellerSearch.trim() !== "" && filteredSellers.length === 0 && (
                      <p className="text-[11px] text-gray-400 italic p-2 text-center">No sellers found</p>
                    )}
                    {sellerSearch.trim() === "" && (
                      <p className="text-[11px] text-gray-400 italic p-2 text-center">Type name to search...</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Category Select */}
            <div className="w-full lg:w-48 flex-shrink-0">
              <Select value={currentCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="h-12 border-gray-200 text-gray-600 bg-white">
                  <SelectValue placeholder={trans.search.categoryPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{trans.search.categories.all}</SelectItem>
                  {apiCategories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Condition Select */}
            <div className="w-full lg:w-48 flex-shrink-0">
              <Select value={currentCondition} onValueChange={onConditionChange}>
                <SelectTrigger className="h-12 border-gray-200 text-gray-600 bg-white">
                  <SelectValue placeholder={trans.search.conditionPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition.value} value={condition.value}>
                      {condition.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleSearchSubmit}
              className="bg-blue-600 hover:bg-blue-700 h-12 px-8 rounded-lg font-semibold w-full lg:w-auto"
            >
              Search
              <Search className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
