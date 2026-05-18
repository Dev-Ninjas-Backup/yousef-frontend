"use client";

import { 
  Funnel, ChevronDown, ChevronUp, ShieldCheck, 
  Cog, Disc, Layers, Zap, Settings, Wind, Thermometer, Box,
  Circle, Lightbulb, Battery, Speaker, Fan, Droplet, Filter, 
  CarFront, AlignJustify, PaintBucket, Key, Gauge, Activity, Shield, Wrench
} from "lucide-react";
import { useState } from "react";
import { useGetCategoriesQuery } from "@/store/api/garageAdminApis/categoryApi";
import { Product } from "@/store/api/sparePartsApi";

interface FilterSidebarProps {
  currentCategory: string;
  currentCondition: string;
  onCategoryChange: (category: string) => void;
  onConditionChange: (condition: string) => void;
  onClearFilters: () => void;
  products: Product[];
}

const conditions = [
  { id: "New", label: "New" },
  { id: "Used", label: "Used" },
  { id: "Refurbished", label: "Refurbished" },
];

// Fuzzy Keyword Icon Mapping
const getIconForCategory = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  
  if (name.includes("engine") || name.includes("motor") || name.includes("cylinder") || name.includes("block")) return Cog;
  if (name.includes("brake") || name.includes("pad") || name.includes("rotor") || name.includes("caliper")) return Disc;
  if (name.includes("suspension") || name.includes("shock") || name.includes("strut") || name.includes("spring")) return Layers;
  if (name.includes("electric") || name.includes("wire") || name.includes("sensor") || name.includes("ignition")) return Zap;
  if (name.includes("transmission") || name.includes("gear") || name.includes("clutch") || name.includes("drivetrain") || name.includes("axle")) return Settings;
  if (name.includes("exhaust") || name.includes("muffler") || name.includes("pipe") || name.includes("emission") || name.includes("catalytic")) return Wind;
  if (name.includes("cooling") || name.includes("radiator") || name.includes("pump") || name.includes("thermostat") || name.includes("hose")) return Thermometer;
  if (name.includes("tyre") || name.includes("tire") || name.includes("wheel") || name.includes("rim") || name.includes("alloy")) return Circle;
  if (name.includes("light") || name.includes("lamp") || name.includes("bulb") || name.includes("headlight") || name.includes("tail")) return Lightbulb;
  if (name.includes("battery") || name.includes("power") || name.includes("alternator") || name.includes("starter")) return Battery;
  if (name.includes("audio") || name.includes("sound") || name.includes("speaker") || name.includes("stereo") || name.includes("radio")) return Speaker;
  if (name.includes("ac ") || name.includes("a/c") || name.includes("air condition") || name.includes("climate") || name.includes("compressor") || name.includes("hvac") || name.includes("heater")) return Fan;
  if (name.includes("fluid") || name.includes("oil") || name.includes("lubricant") || name.includes("chemical") || name.includes("washer") || name.includes("grease")) return Droplet;
  if (name.includes("filter") || name.includes("purifier")) return Filter;
  if (name.includes("body") || name.includes("panel") || name.includes("bumper") || name.includes("door") || name.includes("hood") || name.includes("fender") || name.includes("mirror") || name.includes("glass") || name.includes("window")) return CarFront;
  if (name.includes("interior") || name.includes("seat") || name.includes("dashboard") || name.includes("carpet") || name.includes("trim") || name.includes("mat")) return AlignJustify;
  if (name.includes("paint") || name.includes("color") || name.includes("spray") || name.includes("polish")) return PaintBucket;
  if (name.includes("key") || name.includes("lock") || name.includes("security") || name.includes("alarm")) return Key;
  if (name.includes("steering") || name.includes("rack") || name.includes("pinion")) return Gauge;
  if (name.includes("performance") || name.includes("tuning") || name.includes("turbo") || name.includes("supercharger")) return Activity;
  if (name.includes("safety") || name.includes("airbag") || name.includes("belt")) return Shield;
  if (name.includes("car spare parts") || name.includes("general") || name.includes("other") || name.includes("hardware") || name.includes("tool")) return Wrench;
  
  return Box; // default fallback
};

export default function FilterSidebar({
  currentCategory,
  currentCondition,
  onCategoryChange,
  onConditionChange,
  onClearFilters,
  products,
}: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [conditionOpen, setConditionOpen] = useState(true);

  // Fetch dynamic categories
  const { data: categoryData } = useGetCategoriesQuery();
  const apiCategories = categoryData?.data?.data || [];

  const hasActiveFilters =
    (currentCategory && currentCategory !== "all") ||
    (currentCondition && currentCondition !== "all");

  const selectedCategories = currentCategory && currentCategory !== "all" ? [currentCategory] : [];
  const selectedConditions = currentCondition && currentCondition !== "all" ? [currentCondition] : [];

  const toggleCategory = (name: string) => {
    if (selectedCategories.includes(name)) {
      onCategoryChange("all");
    } else {
      onCategoryChange(name);
    }
  };

  const toggleCondition = (id: string) => {
    if (selectedConditions.includes(id)) {
      onConditionChange("all");
    } else {
      onConditionChange(id);
    }
  };

  // Helper to calculate product counts
  const getCategoryCount = (categoryName: string) => {
    return products.filter((p) => p.category?.name === categoryName).length;
  };

  const getConditionCount = (conditionLabel: string) => {
    return products.filter(
      (p) => String(p.condition).toLowerCase() === conditionLabel.toLowerCase()
    ).length;
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden w-full bg-white rounded-xl p-4 shadow-sm mb-4 flex items-center justify-between border border-gray-100"
      >
        <div className="flex items-center gap-2">
          <Funnel className="h-5 w-5 text-blue-600" />
          <span className="font-semibold text-gray-900">Filter Results</span>
          {hasActiveFilters && (
            <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {selectedCategories.length + selectedConditions.length}
            </span>
          )}
        </div>
        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Sidebar */}
      <aside
        className={`w-full lg:w-64 flex-shrink-0 space-y-3 h-fit lg:sticky lg:top-4 ${
          mobileOpen ? "block" : "hidden lg:block"
        }`}
      >
        {/* Filter Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Funnel className="h-4 w-4 text-blue-600" />
              <h3 className="font-bold text-gray-900">Filter Results</h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Category Section */}
          <div className="px-5 py-4 border-b border-gray-100">
            <button
              className="flex items-center justify-between w-full mb-3"
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              <span className="font-semibold text-sm text-gray-800">Category</span>
              {categoryOpen ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </button>

            {categoryOpen && (
              <div className="space-y-1.5">
                {apiCategories.map((cat) => {
                  const Icon = getIconForCategory(cat.name);
                  const checked = selectedCategories.includes(cat.name);
                  const count = getCategoryCount(cat.name);

                  return (
                    <label
                      key={cat.id}
                      className="flex items-center gap-3 py-1 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCategory(cat.name)}
                        className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                      />
                      <Icon className={`h-4 w-4 flex-shrink-0 ${checked ? "text-blue-600" : "text-gray-400"}`} />
                      <span className={`flex-1 text-sm ${checked ? "text-blue-600 font-medium" : "text-gray-700"}`}>
                        {cat.name}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">
                        {count.toLocaleString()}
                      </span>
                    </label>
                  );
                })}
                {apiCategories.length === 0 && (
                  <p className="text-xs text-gray-500 italic">No categories found</p>
                )}
              </div>
            )}
          </div>

          {/* Condition Section */}
          <div className="px-5 py-4">
            <button
              className="flex items-center justify-between w-full mb-3"
              onClick={() => setConditionOpen(!conditionOpen)}
            >
              <span className="font-semibold text-sm text-gray-800">Condition</span>
              {conditionOpen ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </button>

            {conditionOpen && (
              <div className="space-y-1.5">
                {conditions.map((cond) => {
                  const checked = selectedConditions.includes(cond.id);
                  const count = getConditionCount(cond.id);

                  return (
                    <label
                      key={cond.id}
                      className="flex items-center gap-3 py-1 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCondition(cond.id)}
                        className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                      />
                      <span className={`flex-1 text-sm ${checked ? "text-blue-600 font-medium" : "text-gray-700"}`}>
                        {cond.label}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">
                        {count.toLocaleString()}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Buy with Confidence Box */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 flex gap-3 items-start">
          <div className="bg-blue-100 rounded-lg p-2 flex-shrink-0 mt-0.5">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-700 mb-0.5">Buy with confidence</p>
            <p className="text-xs text-blue-600 leading-relaxed">
              We connect you with sellers.<br />You deal directly.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
