"use client";

import { Funnel, ChevronDown } from "lucide-react";
import { useState } from "react";

const categories = [
  "All Parts",
  "Engine Parts",
  "Brakes",
  "Suspension",
  "Electrical",
  "Filters",
  "Batteries",
  "Belts & Hoses",
  "Fluids",
];

const conditions = ["New", "Used - Like New", "Used - Good", "Refurbished"];

export default function FilterSidebar() {
  const [selectedCategory, setSelectedCategory] = useState("All Parts");
  const [isOpen, setIsOpen] = useState(false);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

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
        <div className="hidden lg:flex items-center gap-2 mb-4">
          <Funnel className="h-5 w-5 text-gray-700" />
          <h3 className="font-semibold text-lg text-gray-900">Filters</h3>
        </div>
        <hr className="hidden lg:block my-2" />
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Category</h4>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {category}
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
                  key={condition}
                  onClick={() => setIsOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
