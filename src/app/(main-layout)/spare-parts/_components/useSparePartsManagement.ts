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

  const { data, isLoading, error } = useGetProductsQuery({
    ...filters,
    // Remove empty/all values to avoid validation errors
    search: filters.search || undefined,
    category:
      filters.category === "all" || !filters.category
        ? undefined
        : filters.category,
    condition:
      filters.condition === "all" || !filters.condition
        ? undefined
        : filters.condition,
  });

  const updateFilter = useCallback(
    (key: keyof ProductsParams, value: string | number) => {
      console.log(`Updating filter ${key}:`, value);
      setFilters((prev) => ({
        ...prev,
        [key]: value === "all" ? "" : value,
        page: key !== "page" ? 1 : (value as number), // Reset to page 1 when changing filters
      }));
    },
    []
  );

  const handleSearch = useCallback(
    (searchTerm: string) => {
      updateFilter("search", searchTerm);
    },
    [updateFilter]
  );

  const handleCategoryFilter = useCallback(
    (category: string) => {
      updateFilter("category", category);
    },
    [updateFilter]
  );

  const handleConditionFilter = useCallback(
    (condition: string) => {
      updateFilter("condition", condition);
    },
    [updateFilter]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateFilter("page", page);
    },
    [updateFilter]
  );

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
