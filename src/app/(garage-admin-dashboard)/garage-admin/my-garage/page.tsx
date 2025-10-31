"use client";

import { useState } from "react";
import { EmptyGarageState } from "./_components/EmptyGarageState";
import { GarageForm } from "./_components/GarageForm";
import { GarageDetailsView } from "./_components/GarageDetailsView";

export default function MyGaragePage() {
  const [view, setView] = useState<"empty" | "form" | "details">("empty");
  const [garageData, setGarageData] = useState<any>(null);

  const handleAddGarage = () => {
    setView("form");
  };

  const handleSaveGarage = (data: any) => {
    setGarageData(data);
    setView("details");
  };

  const handleEditGarage = () => {
    setView("form");
  };

  const handleCancelForm = () => {
    if (garageData) {
      setView("details");
    } else {
      setView("empty");
    }
  };

  return (
    <div>
      {view === "empty" && <EmptyGarageState onAddGarage={handleAddGarage} />}
      {view === "form" && (
        <GarageForm
          onCancel={handleCancelForm}
          onSave={handleSaveGarage}
          initialData={garageData}
        />
      )}
      {view === "details" && garageData && (
        <GarageDetailsView garage={garageData} onEdit={handleEditGarage} />
      )}
    </div>
  );
}
