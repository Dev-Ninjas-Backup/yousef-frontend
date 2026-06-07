"use client";

import { useState } from "react";
import {
  useSearchGaragesQuery,
  useLazySearchGaragesQuery,
  useUpdateGarageOwnerStatusMutation,
  useUpdateGarageStatusMutation,
  useDeleteGarageMutation,
  GarageOwner,
  GarageInfo,
} from "@/store/api/garageManagement";
import { Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SearchFilters from "./_components/SearchFilters";
import GarageOwnersTable from "./_components/GarageOwnersTable";
import GarageOwnerDetailsModal from "./_components/GarageOwnerDetailsModal";
import GarageDetailsModal from "./_components/GarageDetailsModal";
import BrandExpertiseReviewModal from "./_components/BrandExpertiseReviewModal";
import Pagination from "./_components/Pagination";

export default function GarageManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "APPROVE" | "PENDING" | "DECLINE" | "all"
  >("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [selectedOwner, setSelectedOwner] = useState<GarageOwner | null>(null);
  const [selectedGarage, setSelectedGarage] = useState<GarageInfo | null>(null);
  const [reviewBrandsGarage, setReviewBrandsGarage] = useState<GarageInfo | null>(null);
  const [isReviewBrandsOpen, setIsReviewBrandsOpen] = useState(false);

  const handleReviewBrands = (garage: GarageInfo) => {
    setReviewBrandsGarage(garage);
    setIsReviewBrandsOpen(true);
  };

  const {
    data: response,
    isLoading,
    isFetching,
  } = useSearchGaragesQuery({
    name: searchQuery || undefined,
    status: statusFilter === "all" ? undefined : statusFilter,
    page,
    limit: 10,
  });

  const [updateOwnerStatus] = useUpdateGarageOwnerStatusMutation();
  const [updateGarageStatus] = useUpdateGarageStatusMutation();
  const [deleteGarage] = useDeleteGarageMutation();
  const [triggerGetGarages] = useLazySearchGaragesQuery();
  const [isExporting, setIsExporting] = useState(false);

  const rawGarageOwners = response?.data || [];
  const garageOwners = rawGarageOwners.filter((owner) => {
    if (dateFilter !== "all") {
      const joinDate = new Date(owner.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - joinDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (dateFilter === "Today" && diffDays > 1) return false;
      if (dateFilter === "This Week" && diffDays > 7) return false;
      if (dateFilter === "This Month" && diffDays > 30) return false;
      if (dateFilter === "This Year" && diffDays > 365) return false;
    }
    return true;
  });
  const metadata = response?.metadata;

  const handleOwnerApprove = async (userId: string) => {
    try {
      const result = await updateOwnerStatus({ userId }).unwrap();
      if (result.success) {
        toast.success(result.message || "Garage owner approved successfully!");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to approve garage owner");
    }
  };

  const handleOwnerReject = async (userId: string) => {
    if (confirm("Are you sure you want to reject this garage owner?")) {
      console.log("Reject owner:", userId);
      // TODO: Backend doesn't have reject endpoint for owners
    }
  };

  const handleGarageApprove = async (garageId: string) => {
    try {
      const result = await updateGarageStatus({ garageId, status: "APPROVE" }).unwrap();
      if (result.success) {
        toast.success(result.message || "Garage approved successfully!");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to approve garage");
    }
  };

  const handleGarageReject = async (garageId: string) => {
    try {
      const result = await updateGarageStatus({ garageId, status: "DECLINE" }).unwrap();
      if (result.success) {
        toast.success(result.message || "Garage rejected successfully!");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reject garage");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this garage?")) {
      try {
        const result = await deleteGarage(id).unwrap();
        if (result.success) {
          toast.success(result.message || "Garage deleted successfully!");
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete garage");
      }
    }
  };

  const handleExportCSV = async () => {
    try {
      setIsExporting(true);
      const res = await triggerGetGarages({
        name: searchQuery || undefined,
        status: statusFilter === "all" ? undefined : statusFilter,
        page: 1,
        limit: 10000,
      }).unwrap();

      const allGarageOwners = res?.data || [];
      if (!allGarageOwners.length) {
        alert("No data to export");
        return;
      }

      // Filter all owners locally based on dateFilter
      const filteredAllOwners = allGarageOwners.filter((owner) => {
        if (dateFilter !== "all") {
          const joinDate = new Date(owner.createdAt);
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - joinDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (dateFilter === "Today" && diffDays > 1) return false;
          if (dateFilter === "This Week" && diffDays > 7) return false;
          if (dateFilter === "This Month" && diffDays > 30) return false;
          if (dateFilter === "This Year" && diffDays > 365) return false;
        }
        return true;
      });

      if (!filteredAllOwners.length) {
        alert("No matching data to export");
        return;
      }

      const getAbsoluteUrl = (path?: string) => {
        if (!path) return "";
        if (path.startsWith("http://") || path.startsWith("https://")) return path;
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const cleanPath = path.startsWith("/") ? path : `/${path}`;
        return `${baseUrl}${cleanPath}`;
      };

      const csvHeaders = [
        "Owner Name",
        "Owner Phone",
        "Owner Status",
        "Garage Name",
        "Garage Email",
        "Garage Phone",
        "Garage Address",
        "Garage Status",
        "Trade License Document Link",
        "Garage Logo Document Link",
        "Created Date"
      ];

      const csvData: string[][] = [];
      filteredAllOwners.forEach(owner => {
        if (owner.garages && owner.garages.length > 0) {
          owner.garages.forEach(garage => {
            csvData.push([
              owner.ownerName || "",
              owner.phone || "",
              owner.isGarageVerified ? "APPROVED" : "PENDING",
              garage.garageName || "",
              garage.email || "",
              garage.garagePhone || "",
              garage.formattedAddress || "",
              garage.garageStatus || "",
              getAbsoluteUrl(owner.tradeLicense),
              getAbsoluteUrl(owner.garageLogo),
              new Date(owner.createdAt).toLocaleDateString()
            ]);
          });
        } else {
          csvData.push([
            owner.ownerName || "",
            owner.phone || "",
            owner.isGarageVerified ? "APPROVED" : "PENDING",
            "",
            "",
            "",
            "",
            "",
            getAbsoluteUrl(owner.tradeLicense),
            getAbsoluteUrl(owner.garageLogo),
            new Date(owner.createdAt).toLocaleDateString()
          ]);
        }
      });

      const csvContent = [csvHeaders, ...csvData]
        .map(row => row.map(field => `"${(field || "").replace(/"/g, '""')}"`).join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `garage-data-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      alert("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Garage Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage garage owners and their garages
          </p>
        </div>
        <Button 
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Download className="w-4 h-4" />
          Export Data
        </Button>
      </div>

      {/* Search & Filters */}
      <SearchFilters
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        dateFilter={dateFilter}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setPage(1);
        }}
        onStatusChange={(val) => {
          setStatusFilter(val);
          setPage(1);
        }}
        onDateChange={(val) => {
          setDateFilter(val);
          setPage(1);
        }}
      />

      {/* Garage Owners Table */}
      <GarageOwnersTable
        garageOwners={garageOwners}
        isFetching={isFetching}
        onOwnerApprove={handleOwnerApprove}
        onOwnerReject={handleOwnerReject}
        onOwnerView={setSelectedOwner}
        onOwnerDelete={handleDelete}
        onGarageApprove={handleGarageApprove}
        onGarageReject={handleGarageReject}
        onGarageView={setSelectedGarage}
        onReviewBrands={handleReviewBrands}
      />

      {/* Pagination */}
      {metadata && (
        <Pagination
          currentPage={page}
          totalPages={metadata.totalPage}
          total={metadata.total}
          limit={metadata.limit}
          onPageChange={setPage}
        />
      )}

      {/* Modals */}
      <GarageOwnerDetailsModal
        owner={selectedOwner}
        isOpen={!!selectedOwner}
        onClose={() => setSelectedOwner(null)}
      />

      {(() => {
        const latestGarage = selectedGarage
          ? garageOwners
              .flatMap((owner) => owner.garages)
              .find((g) => g.garageId === selectedGarage.garageId) || selectedGarage
          : null;
        return (
          <GarageDetailsModal
            garage={latestGarage}
            isOpen={!!selectedGarage}
            onClose={() => setSelectedGarage(null)}
          />
        );
      })()}

      {(() => {
        const latestReviewGarage = reviewBrandsGarage
          ? garageOwners
              .flatMap((owner) => owner.garages)
              .find((g) => g.garageId === reviewBrandsGarage.garageId) || reviewBrandsGarage
          : null;
        return (
          <BrandExpertiseReviewModal
            garage={latestReviewGarage}
            isOpen={isReviewBrandsOpen}
            onClose={() => {
              setIsReviewBrandsOpen(false);
              setReviewBrandsGarage(null);
            }}
          />
        );
      })()}
    </div>
  );
}
