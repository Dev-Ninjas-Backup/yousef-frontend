import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import NoGarageEmptyIcon from "@/assets/garage-admin/my-garage/no_garage_listed_yet.svg";

interface EmptyGarageStateProps {
  onAddGarage: () => void;
}

export function EmptyGarageState({ onAddGarage }: EmptyGarageStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-72 h-72 relative">
            <Image
              src={NoGarageEmptyIcon}
              alt="No Garage Listed Yet"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          No Garage Listed Yet
        </h2>
        <Button
          onClick={onAddGarage}
          size="lg"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus className="w-5 h-5" />
          Add New Garage
        </Button>
      </div>
    </div>
  );
}
