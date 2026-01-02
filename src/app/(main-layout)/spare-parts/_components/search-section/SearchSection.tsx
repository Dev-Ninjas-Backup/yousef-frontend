"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchSectionProps {
  onSearch: (searchTerm: string) => void;
  onCategoryChange: (category: string) => void;
  onConditionChange: (condition: string) => void;
  currentSearch: string;
  currentCategory: string;
  currentCondition: string;
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "engine", label: "Engine Parts" },
  { value: "brakes", label: "Brakes" },
  { value: "suspension", label: "Suspension" },
  { value: "electrical", label: "Electrical" },
  { value: "transmission", label: "Transmission" },
  { value: "exhaust", label: "Exhaust" },
  { value: "cooling", label: "Cooling System" },
];

const conditions = [
  { value: "all", label: "All Conditions" },
  { value: "new", label: "New" },
  { value: "used", label: "Used" },
  { value: "refurbished", label: "Refurbished" },
];

export default function SearchSection({
  onSearch,
  onCategoryChange,
  onConditionChange,
  currentSearch,
  currentCategory,
  currentCondition,
}: SearchSectionProps) {
  const [searchInput, setSearchInput] = useState(currentSearch);

  const handleSearchSubmit = () => {
    console.log("Search button clicked, searchInput:", searchInput);
    onSearch(searchInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed, searchInput:", searchInput);
      handleSearchSubmit();
    }
  };

  const handleCategoryChange = (value: string) => {
    console.log("Category changed:", value);
    onCategoryChange(value);
  };

  const handleConditionChange = (value: string) => {
    console.log("Condition changed:", value);
    onConditionChange(value);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">
            Search Spare Parts
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search parts by name or description..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-12 border-gray-300"
              />
            </div>

            <div className="flex-1">
              <Select
                value={currentCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="h-12 border-gray-300">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Select
                value={currentCondition}
                onValueChange={handleConditionChange}
              >
                <SelectTrigger className="h-12 border-gray-300">
                  <SelectValue placeholder="Select condition" />
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
              className="bg-blue-600 hover:bg-blue-700 h-12 px-8"
            >
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
