import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, X, ShieldAlert } from "lucide-react";
import {
  GarageInfo,
  useApproveBrandExpertiseMutation,
  useRejectBrandExpertiseMutation,
} from "@/store/api/garageManagement";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface BrandExpertiseReviewModalProps {
  garage: GarageInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BrandExpertiseReviewModal({
  garage,
  isOpen,
  onClose,
}: BrandExpertiseReviewModalProps) {
  const [approveBrand, { isLoading: isApproving }] = useApproveBrandExpertiseMutation();
  const [rejectBrand, { isLoading: isRejecting }] = useRejectBrandExpertiseMutation();

  const [rejectingBrand, setRejectingBrand] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isRejectionReasonOpen, setIsRejectionReasonOpen] = useState(false);

  if (!garage) return null;

  const handleApproveBrand = async (brand: string) => {
    try {
      const res = await approveBrand({
        garageId: garage.garageId,
        brands: [brand],
      }).unwrap();
      if (res.success) {
        toast.success(`Successfully approved ${brand} expertise for ${garage.garageName}`);
        // If it was the last pending claim, automatically close the modal
        if (garage.requestedBrandExpertise.length <= 1) {
          onClose();
        }
      }
    } catch (err: any) {
      toast.error(err?.data?.message || `Failed to approve ${brand} expertise`);
    }
  };

  const openRejectionDialog = (brand: string) => {
    setRejectingBrand(brand);
    setRejectReason("");
    setIsRejectionReasonOpen(true);
  };

  const handleConfirmReject = async () => {
    if (!rejectingBrand) return;
    try {
      const res = await rejectBrand({
        garageId: garage.garageId,
        brands: [rejectingBrand],
        reason: rejectReason.trim() || undefined,
      }).unwrap();
      if (res.success) {
        toast.success(`Successfully rejected ${rejectingBrand} expertise for ${garage.garageName}`);
        setIsRejectionReasonOpen(false);
        setRejectingBrand(null);
        setRejectReason("");
        // If it was the last pending claim, automatically close the modal
        if (garage.requestedBrandExpertise.length <= 1) {
          onClose();
        }
      }
    } catch (err: any) {
      toast.error(err?.data?.message || `Failed to reject ${rejectingBrand} expertise`);
    }
  };

  const pendingBrands = garage.requestedBrandExpertise || [];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <ShieldAlert className="w-5 h-5 text-yellow-500" />
              Review Brand Expert Claims
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <h3 className="font-semibold text-md text-gray-800">
                {garage.garageName}
              </h3>
              <p className="text-xs text-gray-500">ID: {garage.garageId}</p>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Requested Expertises ({pendingBrands.length})
              </p>
              {pendingBrands.length === 0 ? (
                <p className="text-sm text-gray-500 py-2">
                  No pending claims to review.
                </p>
              ) : (
                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                  {pendingBrands.map((brand) => (
                    <div
                      key={brand}
                      className="flex items-center justify-between p-3 rounded-lg border border-yellow-100 bg-yellow-50/30 hover:bg-yellow-50/50 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-800">
                        {brand}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Button
                          size="sm"
                          disabled={isApproving || isRejecting}
                          className="bg-green-600 hover:bg-green-700 text-white h-8 px-3 text-xs flex items-center gap-1"
                          onClick={() => handleApproveBrand(brand)}
                        >
                          <Check className="w-3.5 h-3.5" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={isApproving || isRejecting}
                          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 h-8 px-3 text-xs flex items-center gap-1"
                          onClick={() => openRejectionDialog(brand)}
                        >
                          <X className="w-3.5 h-3.5" /> Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rejection Reason Modal */}
      <Dialog open={isRejectionReasonOpen} onOpenChange={setIsRejectionReasonOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Reason for Rejection</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-gray-500">
              Please enter the reason for rejecting <strong>{rejectingBrand}</strong> expertise for {garage.garageName}.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g., Inadequate proof of brand-specific equipment or certifications."
              rows={3}
              className="w-full text-sm border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsRejectionReasonOpen(false);
                  setRejectingBrand(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleConfirmReject}
                disabled={isRejecting}
              >
                Confirm Decline
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
