"use client";

import { Funnel, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FilterSidebarProps {
  currentCategory: string;
  currentCondition: string;
  onCategoryChange: (category: string) => void;
  onConditionChange: (condition: string) => void;
  onClearFilters: () => void;
}

const categories = [
  { id: "engine", label: "Engine Parts" },
  { id: "brakes", label: "Brakes" },
  { id: "suspension", label: "Suspension" },
  { id: "electrical", label: "Electrical" },
  { id: "transmission", label: "Transmission" },
  { id: "exhaust", label: "Exhaust" },
  { id: "cooling", label: "Cooling System" },
];

const conditions = [
  { id: "new", label: "New" },
  { id: "used", label: "Used" },
  { id: "refurbished", label: "Refurbished" },
];

export default function FilterSidebar({
  currentCategory,
  currentCondition,
  onCategoryChange,
  onConditionChange,
  onClearFilters,
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasActiveFilters = currentCategory !== "all" || currentCondition !== "all";

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full bg-white rounded-lg p-4 shadow-sm mb-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Funnel className="h-5 w-5 text-gray-700" />
          <span className="font-semibold text-gray-900">Filters</span>
        </div>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Filter Sidebar */}
      <aside className={`w-full lg:w-64 bg-white rounded-lg p-6 shadow-sm h-fit lg:sticky lg:top-4 ${
        isOpen ? "block" : "hidden lg:block"
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Funnel className="h-5 w-5 text-gray-700" />
            <h3 className="font-semibold text-lg text-gray-900">Filters</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              Clear All
            </button>
          )}
        </div>
        <hr className="my-2" />
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Category</h4>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    console.log("Category clicked:", category.id);
                    onCategoryChange(category.id);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    currentCategory === category.id
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <hr className="my-2" />
          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Condition</h4>
            <div className="space-y-1">
              {conditions.map((condition) => (
                <button
                  key={condition.id}
                  onClick={() => {
                    console.log("Condition clicked:", condition.id);
                    onConditionChange(condition.id);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    currentCondition === condition.id
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {condition.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
