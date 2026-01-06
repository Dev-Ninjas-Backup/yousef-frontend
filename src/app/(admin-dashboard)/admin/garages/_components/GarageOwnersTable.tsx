import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Eye, Trash2, Check, X, Plus, Minus } from "lucide-react";
import { GarageOwner, GarageInfo } from "@/store/api/garageManagement";
import GarageSubTable from "./GarageSubTable";

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
}: GarageOwnersTableProps) {
  const [expandedOwners, setExpandedOwners] = useState<Set<string>>(new Set());

  const toggleOwnerExpansion = (ownerId: string) => {
    const newExpanded = new Set(expandedOwners);
    if (newExpanded.has(ownerId)) {
      newExpanded.delete(ownerId);
    } else {
      newExpanded.add(ownerId);
    }
    setExpandedOwners(newExpanded);
  };

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
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Owner
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Contact
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Revenue
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Garages
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {garageOwners.map((owner) => (
              <>
                {/* Owner Row */}
                <tr key={owner.userId} className="hover:bg-gray-50">
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
                      <div>
                        <p className="font-medium text-gray-900">
                          {owner.ownerName}
                        </p>
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
                      ${owner.revenue.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium">
                      {owner.garages.length}
                    </span>
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

                {/* Expanded Garages Table */}
                {expandedOwners.has(owner.userId) && (
                  <tr>
                    <td colSpan={6} className="py-0 px-6">
                      <GarageSubTable
                        garages={owner.garages}
                        onGarageApprove={onGarageApprove}
                        onGarageReject={onGarageReject}
                        onGarageView={onGarageView}
                      />
                    </td>
                  </tr>
                )}
              </>
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
