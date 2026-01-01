"use client";

import { useState, useCallback } from "react";
import { useGetProductsQuery, ProductsParams } from "@/store/api/sparePartsApi";

export function useSparePartsManagement() {
  const [filters, setFilters] = useState<ProductsParams>({
    search: "",
    category: "all",
    condition: "all",
    limit: 9,
    page: 1,
  });

  const { data, isLoading, error } = useGetProductsQuery(filters);

  console.log("API Call - Filters:", filters);
  console.log("API Response - Data:", data);
  console.log("API Response - Loading:", isLoading);
  console.log("API Response - Error:", error);
  console.log("API Response - Full Response:", JSON.stringify(data, null, 2));

  const updateFilter = useCallback((key: keyof ProductsParams, value: string | number) => {
    const filterValue = typeof value === "string" && value === "all" ? "" : value;
    console.log(`Updating filter ${key}:`, value, "-> Converted:", filterValue);
    setFilters(prev => ({
      ...prev,
      [key]: filterValue,
      page: key !== "page" ? 1 : (value as number), // Reset to page 1 when changing filters
    }));
  }, []);

  const handleSearch = useCallback((searchTerm: string) => {
    updateFilter("search", searchTerm);
  }, [updateFilter]);

  const handleCategoryFilter = useCallback((category: string) => {
    updateFilter("category", category);
  }, [updateFilter]);

  const handleConditionFilter = useCallback((condition: string) => {
    updateFilter("condition", condition);
  }, [updateFilter]);

  const handlePageChange = useCallback((page: number) => {
    updateFilter("page", page);
  }, [updateFilter]);

  const clearFilters = useCallback(() => {
    setFilters({
      search: "",
      category: "all",
      condition: "all",
      limit: 9,
      page: 1,
    });
  }, []);

  return {
    products: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    filters,
    handleSearch,
    handleCategoryFilter,
    handleConditionFilter,
    handlePageChange,
    clearFilters,
  };
}