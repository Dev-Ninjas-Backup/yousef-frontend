import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye } from "lucide-react";
import { GarageInfo } from "@/store/api/garageManagement";

interface GarageSubTableProps {
  garages: GarageInfo[];
  onGarageApprove: (garageId: string) => void;
  onGarageReject: (garageId: string) => void;
  onGarageView: (garage: GarageInfo) => void;
}

export default function GarageSubTable({
  garages,
  onGarageApprove,
  onGarageReject,
  onGarageView,
}: GarageSubTableProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 my-2">
      <h4 className="font-medium mb-3">Garages ({garages.length})</h4>
      <div className="bg-white rounded-lg overflow-hidden border">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600 uppercase">
                Name
              </th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600 uppercase">
                Location
              </th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600 uppercase">
                Contact
              </th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {garages.map((garage) => (
              <tr key={garage.garageId} className="hover:bg-gray-50">
                <td className="py-2 px-3">
                  <p className="font-medium text-sm">{garage.garageName}</p>
                  <p className="text-xs text-gray-500">
                    ID: {garage.garageId.slice(0, 8)}...
                  </p>
                </td>
                <td className="py-2 px-3">
                  <p className="text-sm">
                    {garage.city}, {garage.emirate}
                  </p>
                  <p className="text-xs text-gray-500">{garage.street}</p>
                </td>
                <td className="py-2 px-3">
                  <p className="text-sm">{garage.garagePhone}</p>
                  <p className="text-xs text-gray-500">{garage.email}</p>
                </td>
                <td className="py-2 px-3">
                  <Badge
                    className={`${
                      garage.garageStatus === "APPROVED"
                        ? "bg-green-100 text-green-800"
                        : garage.garageStatus === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    } border-0`}
                  >
                    {garage.garageStatus}
                  </Badge>
                </td>
                <td className="py-2 px-3">
                  <div className="flex items-center gap-1">
                    {garage.garageStatus === "PENDING" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 border-green-200 hover:bg-green-50 h-7 px-2"
                          onClick={() => onGarageApprove(garage.garageId)}
                        >
                          <Check className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 h-7 px-2"
                          onClick={() => onGarageReject(garage.garageId)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </>
                    )}
                    {garage.garageStatus === "APPROVED" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50 h-7 px-2"
                        onClick={() => onGarageReject(garage.garageId)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                    {garage.garageStatus === "REJECTED" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-200 hover:bg-green-50 h-7 px-2"
                        onClick={() => onGarageApprove(garage.garageId)}
                      >
                        <Check className="w-3 h-3" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2"
                      onClick={() => onGarageView(garage)}
                    >
                      <Eye className="w-3 h-3" />
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
