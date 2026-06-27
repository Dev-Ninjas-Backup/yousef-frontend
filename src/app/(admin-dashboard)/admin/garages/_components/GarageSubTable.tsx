import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye, Paperclip } from "lucide-react";
import { GarageInfo } from "@/store/api/garageManagement";

interface GarageSubTableProps {
  garages: GarageInfo[];
  onGarageApprove: (garageId: string) => void;
  onGarageReject: (garageId: string) => void;
  onGarageView: (garage: GarageInfo) => void;
  onReviewBrands?: (garage: GarageInfo) => void;
}

export default function GarageSubTable({
  garages,
  onGarageApprove,
  onGarageReject,
  onGarageView,
  onReviewBrands,
}: GarageSubTableProps) {
  return (
    <div className="bg-blue-50/40 border border-blue-100 border-l-4 border-l-blue-500 rounded-xl p-4 my-3 shadow-sm">
      <h4 className="font-semibold text-sm text-blue-900 mb-3 flex items-center gap-1.5">
        <span className="w-1.5 h-3 bg-blue-500 rounded"></span>
        Garages ({garages.length})
      </h4>
      <div className="bg-white rounded-lg overflow-hidden border border-blue-100 shadow-sm">
        <table className="w-full">
          <thead className="bg-blue-50 border-b border-blue-100">
            <tr>
              <th className="text-left py-2.5 px-4 text-xs font-bold text-blue-900/80 uppercase tracking-wider">
                Name
              </th>
              <th className="text-left py-2.5 px-4 text-xs font-bold text-blue-900/80 uppercase tracking-wider">
                Location
              </th>
              <th className="text-left py-2.5 px-4 text-xs font-bold text-blue-900/80 uppercase tracking-wider">
                Contact
              </th>
              <th className="text-left py-2.5 px-4 text-xs font-bold text-blue-900/80 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-2.5 px-4 text-xs font-bold text-blue-900/80 uppercase tracking-wider">
                Expert Claims
              </th>
              <th className="text-left py-2.5 px-4 text-xs font-bold text-blue-900/80 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {garages.map((garage) => (
              <tr key={garage.garageId} className="bg-white hover:bg-blue-50/30 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    {/* Garage Thumbnail Image */}
                    {garage.profileImage ? (
                      <img
                        src={garage.profileImage}
                        alt={garage.garageName}
                        className="w-10 h-10 rounded-lg object-cover border border-blue-100 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-blue-50/50 border border-blue-100 flex items-center justify-center shrink-0">
                        <span className="text-blue-600 font-bold text-xs">
                          {garage.garageName?.charAt(0).toUpperCase() || "?"}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-sm text-slate-800">{garage.garageName}</p>
                      <p
                        className="text-xs text-gray-400 font-mono mt-0.5 break-all"
                        title={garage.garageId}
                      >
                        ID: {garage.garageId}
                      </p>
                      {garage.certificationFile && (
                        <a
                          href={garage.certificationFile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[10px] bg-green-50 text-green-700 border border-green-200 rounded-md px-2 py-0.5 mt-1.5 font-bold hover:bg-green-100 transition-colors w-fit shadow-sm"
                        >
                          <Paperclip className="w-2.5 h-2.5" />
                          <span>Cert Proof</span>
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-slate-700 font-medium">
                    {garage.city}, {garage.emirate}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{garage.street}</p>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-slate-700 font-medium">{garage.garagePhone}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{garage.email}</p>
                </td>
                <td className="py-3 px-4">
                  <Badge
                    className={`${
                      garage.garageStatus === "APPROVED"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : garage.garageStatus === "PENDING"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                        : "bg-red-100 text-red-800 border-red-200"
                    } border text-xs font-semibold px-2.5 py-0.5`}
                  >
                    {garage.garageStatus}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  {garage.requestedBrandExpertise && garage.requestedBrandExpertise.length > 0 ? (
                    <button
                      onClick={() => onReviewBrands?.(garage)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-xs font-bold rounded-full border border-yellow-200 transition-colors shadow-sm animate-pulse"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping"></span>
                      {garage.requestedBrandExpertise.length} Pending
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400 font-medium">—</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5">
                    {garage.garageStatus === "PENDING" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 border-green-200 hover:bg-green-50 h-8 w-8 p-0"
                          onClick={() => onGarageApprove(garage.garageId)}
                          title="Approve Garage"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 h-8 w-8 p-0"
                          onClick={() => onGarageReject(garage.garageId)}
                          title="Reject Garage"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    {garage.garageStatus === "APPROVED" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50 h-8 w-8 p-0"
                        onClick={() => onGarageReject(garage.garageId)}
                        title="Decline/Suspend Garage"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                    {garage.garageStatus === "REJECTED" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-200 hover:bg-green-50 h-8 w-8 p-0"
                        onClick={() => onGarageApprove(garage.garageId)}
                        title="Approve Garage"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                      onClick={() => onGarageView(garage)}
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
