"use client";

import { useState, useCallback, useEffect } from "react";
import { useGetProductsQuery, ProductsParams } from "@/store/api/sparePartsApi";
import { useSearchParams, useRouter } from "next/navigation";

export function useSparePartsManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlUserId = searchParams.get("userId") || undefined;

  const [filters, setFilters] = useState<ProductsParams>({
    search: "",
    category: "all",
    condition: "all",
    status: "APPROVED",
    sortBy: "relevance",
    limit: 9,
    page: 1,
    userId: urlUserId,
    isPromoted: undefined,
    sellerType: "all",
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, userId: urlUserId, page: 1 }));
  }, [urlUserId]);

  const { data, isLoading, error } = useGetProductsQuery({
    ...filters,
    search: filters.search || undefined,
    category:
      filters.category === "all" || !filters.category
        ? undefined
        : filters.category,
    condition:
      filters.condition === "all" || !filters.condition
        ? undefined
        : filters.condition,
    isPromoted: filters.isPromoted ? true : undefined,
    status: "APPROVED",
    sortBy: filters.sortBy || "relevance",
    sellerType: filters.sellerType === "all" || !filters.sellerType ? undefined : filters.sellerType,
  });

  const updateFilter = useCallback(
    (key: keyof ProductsParams, value: string | number | boolean | undefined) => {
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

  const handlePromotedFilter = useCallback(
    (promotedOnly: boolean) => {
      updateFilter("isPromoted", promotedOnly ? true : undefined);
    },
    [updateFilter]
  );

  const handleUserFilter = useCallback(
    (userId: string) => {
      updateFilter("userId", userId);
    },
    [updateFilter]
  );
  
  const handleSellerTypeFilter = useCallback(
    (sellerType: string) => {
      updateFilter("sellerType", sellerType);
    },
    [updateFilter]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateFilter("page", page);
      if (typeof window !== "undefined") {
        const catalogSection = document.getElementById("catalog");
        if (catalogSection) {
          catalogSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [updateFilter]
  );

  const handleSortChange = useCallback(
    (sort: string) => {
      updateFilter("sortBy", sort);
    },
    [updateFilter]
  );

  const clearFilters = useCallback(() => {
    setFilters({
      search: "",
      category: "all",
      condition: "all",
      status: "APPROVED",
      sortBy: "relevance",
      limit: 9,
      page: 1,
      userId: undefined,
      isPromoted: undefined,
      sellerType: "all",
    });
    router.push("/spare-parts");
  }, [router]);

  return {
    products: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    filters,
    handleSearch,
    handleCategoryFilter,
    handleConditionFilter,
    handlePromotedFilter,
    handleUserFilter,
    handleSellerTypeFilter,
    handleSortChange,
    handlePageChange,
    clearFilters,
  };
}
