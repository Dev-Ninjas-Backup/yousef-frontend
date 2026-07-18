import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Eye, Trash2, Check, X, Plus, Minus, Paperclip, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { GarageOwner, GarageInfo } from "@/store/api/garageManagement";
import GarageSubTable from "./GarageSubTable";

const getFileDetails = (url: string, defaultName: string) => {
  if (!url) return { name: defaultName, ext: "" };
  try {
    const decodedUrl = decodeURIComponent(url);
    const parts = decodedUrl.split("/");
    const fullName = parts[parts.length - 1] || defaultName;
    const dotIndex = fullName.lastIndexOf(".");
    if (dotIndex !== -1) {
      return {
        name: fullName.substring(0, dotIndex),
        ext: fullName.substring(dotIndex + 1).toUpperCase()
      };
    }
    return { name: fullName, ext: "" };
  } catch (e) {
    return { name: defaultName, ext: "" };
  }
};

interface GarageOwnersTableProps {
  garageOwners: GarageOwner[];
  isFetching: boolean;
  onOwnerApprove: (userId: string) => void;
  onOwnerReject: (userId: string) => void;
  onOwnerView: (owner: GarageOwner) => void;
  onOwnerDelete: (userId: string) => void;
  onGarageApprove: (garageId: string) => void;
  onGarageReject: (garageId: string) => void;
  onGarageView: (garage: GarageInfo) => void;
  onReviewBrands?: (garage: GarageInfo) => void;
  currentPage?: number;
  limit?: number;
}

export default function GarageOwnersTable({
  garageOwners,
  isFetching,
  onOwnerApprove,
  onOwnerReject,
  onOwnerView,
  onOwnerDelete,
  onGarageApprove,
  onGarageReject,
  onGarageView,
  onReviewBrands,
  currentPage,
  limit,
}: GarageOwnersTableProps) {
  const [expandedOwners, setExpandedOwners] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const toggleOwnerExpansion = (ownerId: string) => {
    const newExpanded = new Set(expandedOwners);
    if (newExpanded.has(ownerId)) {
      newExpanded.delete(ownerId);
    } else {
      newExpanded.add(ownerId);
    }
    setExpandedOwners(newExpanded);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedGarageOwners = [...garageOwners].sort((a, b) => {
    if (!sortField) return 0;

    let aValue: any = "";
    let bValue: any = "";

    if (sortField === "ownerName") {
      aValue = a.ownerName || "";
      bValue = b.ownerName || "";
    } else if (sortField === "phone") {
      aValue = a.phone || "";
      bValue = b.phone || "";
    } else if (sortField === "status") {
      aValue = a.isGarageVerified ? 1 : 0;
      bValue = b.isGarageVerified ? 1 : 0;
    } else if (sortField === "revenue") {
      aValue = a.revenue || 0;
      bValue = b.revenue || 0;
    } else if (sortField === "garages") {
      aValue = a.garages?.length || 0;
      bValue = b.garages?.length || 0;
    }

    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden relative">
      {isFetching && (
        <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase w-12">
                SL
              </th>
              <th
                className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 select-none transition-colors"
                onClick={() => handleSort("ownerName")}
              >
                <div className="flex items-center gap-1.5">
                  Owner
                  {sortField === "ownerName" ? (
                    sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                  ) : (
                    <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </div>
              </th>
              <th
                className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 select-none transition-colors"
                onClick={() => handleSort("phone")}
              >
                <div className="flex items-center gap-1.5">
                  Contact
                  {sortField === "phone" ? (
                    sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                  ) : (
                    <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </div>
              </th>
              <th
                className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 select-none transition-colors"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-1.5">
                  Status
                  {sortField === "status" ? (
                    sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                  ) : (
                    <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </div>
              </th>
              <th
                className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 select-none transition-colors"
                onClick={() => handleSort("revenue")}
              >
                <div className="flex items-center gap-1.5">
                  Revenue
                  {sortField === "revenue" ? (
                    sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                  ) : (
                    <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </div>
              </th>
              <th
                className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100 select-none transition-colors"
                onClick={() => handleSort("garages")}
              >
                <div className="flex items-center gap-1.5">
                  Garages
                  {sortField === "garages" ? (
                    sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-blue-600" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                  ) : (
                    <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </div>
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Attachments
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedGarageOwners.map((owner, index) => (
              <React.Fragment key={owner.userId}>
                {/* Owner Row */}
                {(() => {
                  const totalPendingClaims = owner.garages?.reduce(
                    (sum, g) => sum + (g.requestedBrandExpertise?.length || 0),
                    0
                  ) || 0;
                  return (
                    <tr key={owner.userId} className="hover:bg-gray-50">
                      <td className="py-4 px-6 text-sm text-gray-500 font-medium w-12">
                        {currentPage && limit ? (currentPage - 1) * limit + index + 1 : index + 1}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleOwnerExpansion(owner.userId)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            {expandedOwners.has(owner.userId) ? (
                              <Minus className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </button>
                          
                          {/* Owner Profile Photo */}
                          {owner.profilePhoto ? (
                            <img
                              src={owner.profilePhoto}
                              alt={owner.ownerName}
                              className="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                              <span className="text-blue-600 font-semibold text-sm">
                                {owner.ownerName?.charAt(0).toUpperCase() || "?"}
                              </span>
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-medium text-gray-900">
                                {owner.ownerName}
                              </p>
                              {owner.garages?.some((g) => g.garageStatus === "PENDING") && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleOwnerExpansion(owner.userId);
                                  }}
                                  className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-rose-50 text-rose-800 text-[10px] font-extrabold rounded-full border border-rose-200 transition-all hover:bg-rose-100 animate-pulse"
                                >
                                  <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                                  </span>
                                  <span>Pending Garage</span>
                                </button>
                              )}
                              {totalPendingClaims > 0 && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-yellow-100 text-yellow-800 text-[10px] font-bold rounded-full border border-yellow-200 animate-pulse">
                                  ⚠️ {totalPendingClaims} Claim{totalPendingClaims > 1 ? "s" : ""}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">
                              {owner.Garage_Name}
                            </p>
                          </div>
                        </div>
                      </td>
                  <td className="py-4 px-6">
                    <p className="text-sm">{owner.phone}</p>
                  </td>
                  <td className="py-4 px-6">
                    <Badge
                      className={`${
                        owner.isGarageVerified
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      } border-0`}
                    >
                      {owner.isGarageVerified ? "APPROVED" : "PENDING"}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium">
                      {owner.revenue.toLocaleString()} AED
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium">
                      {owner.garages.length}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1.5">
                      {owner.tradeLicense && (() => {
                        const file = getFileDetails(owner.tradeLicense, "Trade License");
                        return (
                          <a
                            href={owner.tradeLicense}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200 transition-colors w-max"
                            title={`Open Trade License: ${file.name}.${file.ext.toLowerCase()}`}
                          >
                            <Paperclip className="w-3.5 h-3.5" />
                            <span>Trade License {file.ext ? `(${file.ext})` : ""}</span>
                          </a>
                        );
                      })()}
                      {owner.garageLogo && (() => {
                        const file = getFileDetails(owner.garageLogo, "Garage Logo");
                        return (
                          <a
                            href={owner.garageLogo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold rounded-lg border border-purple-200 transition-colors w-max"
                            title={`Open Garage Logo: ${file.name}.${file.ext.toLowerCase()}`}
                          >
                            <Paperclip className="w-3.5 h-3.5" />
                            <span>Garage Logo {file.ext ? `(${file.ext})` : ""}</span>
                          </a>
                        );
                      })()}
                      {!owner.tradeLicense && !owner.garageLogo && (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {!owner.isGarageVerified && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 border-green-200 hover:bg-green-50"
                          onClick={() => onOwnerApprove(owner.userId)}
                        >
                          <Check className="w-3 h-3" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onOwnerView(owner)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => onOwnerDelete(owner.userId)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })()}

                {/* Expanded Garages Table */}
                {expandedOwners.has(owner.userId) && (
                  <tr>
                    <td colSpan={8} className="py-0 px-6">
                      <GarageSubTable
                        garages={owner.garages}
                        onGarageApprove={onGarageApprove}
                        onGarageReject={onGarageReject}
                        onGarageView={onGarageView}
                        onReviewBrands={onReviewBrands}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {garageOwners.length === 0 && (
        <div className="py-12 text-center text-gray-500">
          No garage owners found
        </div>
      )}
    </div>
  );
}
