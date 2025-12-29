import { Button } from "@/components/ui/button";

interface GarageListHeaderProps {
  garageCount: number;
  onAddGarage: () => void;
}

export function GarageListHeader({ garageCount, onAddGarage }: GarageListHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Garages</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage your garage listings ({garageCount})
        </p>
      </div>
      <Button onClick={onAddGarage} className="bg-blue-600 hover:bg-blue-700">
        + Add New Garage
      </Button>
    </div>
  );
}
