"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useDeleteProductMutation,
  useDeleteProductPermanentlyMutation,
} from "@/store/api/garageAdminApis/products/products";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

interface DeleteProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  productName: string;
  isPermanent?: boolean;
}

export function DeleteProductModal({
  open,
  onOpenChange,
  productId,
  productName,
  isPermanent = false,
}: DeleteProductModalProps) {
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [deleteProductPermanently, { isLoading: isDeletingPermanent }] = useDeleteProductPermanentlyMutation();

  const isLoading = isDeleting || isDeletingPermanent;

  const handleDelete = async () => {
    try {
      if (isPermanent) {
        await deleteProductPermanently(productId).unwrap();
        toast.success("Product permanently deleted!");
      } else {
        await deleteProduct(productId).unwrap();
        toast.success("Product moved to drafts!");
      }
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete product");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white border border-gray-100 rounded-2xl shadow-xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <DialogTitle className="text-xl font-bold">
              {isPermanent ? "Delete Product Permanently" : "Delete Product"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-base text-gray-600">
            {isPermanent ? (
              <>
                Are you sure you want to permanently delete <strong>{productName}</strong>? This action cannot be undone and will delete all files and photos.
              </>
            ) : (
              <>
                Are you sure you want to delete <strong>{productName}</strong>? This listing will be moved to your <strong>Drafts</strong> list and hidden from public searches.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? "Deleting..." : isPermanent ? "Delete Permanently" : "Move to Drafts"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
