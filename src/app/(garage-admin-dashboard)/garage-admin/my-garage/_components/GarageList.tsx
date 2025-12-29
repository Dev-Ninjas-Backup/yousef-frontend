import { GarageListHeader } from "./GarageListHeader";
import { GarageCard } from "./GarageCard";

interface GarageListProps {
  garages: any[];
  onAddGarage: () => void;
  onViewGarage: (garage: any) => void;
}

export function GarageList({ garages, onAddGarage, onViewGarage }: GarageListProps) {
  return (
    <div className="p-6 space-y-6">
      <GarageListHeader garageCount={garages.length} onAddGarage={onAddGarage} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {garages.map((garage) => (
          <GarageCard
            key={garage.id}
            garage={garage}
            onClick={() => onViewGarage(garage)}
          />
        ))}
      </div>
    </div>
  );
}
