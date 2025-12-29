import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";

interface EmptyProductsStateProps {
  onAddProduct: () => void;
}

export function EmptyProductsState({ onAddProduct }: EmptyProductsStateProps) {
  return (
    <div className="bg-white rounded-lg border p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Yet</h3>
        <p className="text-sm text-gray-600 mb-6">
          Start adding your spare parts to showcase them to customers
        </p>
        <Button onClick={onAddProduct}>
          <Plus className="w-4 h-4" />
          Add Your First Product
        </Button>
      </div>
    </div>
  );
}
