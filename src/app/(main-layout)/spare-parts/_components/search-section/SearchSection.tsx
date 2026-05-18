"use client";

import { useState } from "react";
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

interface SearchSectionProps {
  onSearch: (searchTerm: string) => void;
  onCategoryChange: (category: string) => void;
  onConditionChange: (condition: string) => void;
  currentSearch: string;
  currentCategory: string;
  currentCondition: string;
}

export default function SearchSection({
  onSearch,
  onCategoryChange,
  onConditionChange,
  currentSearch,
  currentCategory,
  currentCondition,
}: SearchSectionProps) {
  const { t } = useLanguage();
  const trans = t(sparePartsPageTranslations);
  const [searchInput, setSearchInput] = useState(currentSearch);

  // Fetch dynamic categories
  const { data: categoryData } = useGetCategoriesQuery();
  const apiCategories = categoryData?.data?.data || [];

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
