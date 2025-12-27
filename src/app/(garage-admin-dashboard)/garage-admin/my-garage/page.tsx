"use client";

import { useState } from "react";
import { useGetUserProfileQuery } from "@/store/api/garageAdminApis/userProfileApi";
import { EmptyGarageState } from "./_components/EmptyGarageState";
import { GarageList } from "./_components/GarageList";
import { GarageForm } from "./_components/GarageForm";
import { GarageDetailsView } from "./_components/GarageDetailsView";
import { LoadingState } from "./_components/LoadingState";
import { ErrorState } from "./_components/ErrorState";

export default function MyGaragePage() {
  const { data, isLoading, error } = useGetUserProfileQuery();
  const [view, setView] = useState<"list" | "form" | "details">("list");
  const [selectedGarage, setSelectedGarage] = useState<any>(null);

  const garages = data?.data?.garages || [];

  const handleAddGarage = () => {
    setSelectedGarage(null);
    setView("form");
  };

  const handleViewGarage = (garage: any) => {
    setSelectedGarage(garage);
    setView("details");
  };

  const handleEditGarage = () => {
    setView("form");
  };

  const handleSaveGarage = () => {
    setView("list");
  };

  const handleBackToList = () => {
    setView("list");
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <>
      {view === "list" &&
        (garages.length === 0 ? (
          <EmptyGarageState onAddGarage={handleAddGarage} />
        ) : (
          <GarageList
            garages={garages}
            onAddGarage={handleAddGarage}
            onViewGarage={handleViewGarage}
          />
        ))}

      {view === "form" && (
        <GarageForm
          onCancel={handleBackToList}
          onSave={handleSaveGarage}
          initialData={selectedGarage}
        />
      )}

      {view === "details" && selectedGarage && (
        <GarageDetailsView
          garage={selectedGarage}
          onEdit={handleEditGarage}
          onBack={handleBackToList}
        />
      )}
    </>
  );
}
