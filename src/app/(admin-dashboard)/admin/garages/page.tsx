"use client";

import { useState } from "react";
import {
  useSearchGaragesQuery,
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
import Pagination from "./_components/Pagination";

export default function GarageManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "APPROVE" | "PENDING" | "DECLINE" | "all"
  >("all");
  const [page, setPage] = useState(1);
  const [selectedOwner, setSelectedOwner] = useState<GarageOwner | null>(null);
  const [selectedGarage, setSelectedGarage] = useState<GarageInfo | null>(null);

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

  const garageOwners = response?.data || [];
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

  const handleExportCSV = () => {
    if (!garageOwners.length) {
      alert("No data to export");
      return;
    }

    const csvHeaders = [
      "Owner Name",
      "Email",
      "Phone",
      "Status",
      "Garage Name",
      "Garage Address",
      "Garage Status",
      "Created Date"
    ];

    const csvData = garageOwners.map(owner => [
      owner.ownerName || "",
      owner.garages?.[0]?.email || "",
      owner.phone || "",
      owner.garageStatus || "",
      owner.garages?.[0]?.garageName || "",
      owner.garages?.[0]?.formattedAddress || "",
      owner.garages?.[0]?.garageStatus || "",
      new Date(owner.createdAt).toLocaleDateString()
    ]);

    const csvContent = [csvHeaders, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(","))
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
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
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

      <GarageDetailsModal
        garage={selectedGarage}
        isOpen={!!selectedGarage}
        onClose={() => setSelectedGarage(null)}
      />
    </div>
  );
}
