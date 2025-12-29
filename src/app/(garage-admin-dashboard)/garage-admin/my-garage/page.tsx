"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetUserProfileQuery } from "@/store/api/garageAdminApis/userProfileApi";
import { EmptyGarageState } from "./_components/EmptyGarageState";
import { GarageList } from "./_components/GarageList";
import { LoadingState } from "./_components/LoadingState";
import { ErrorState } from "./_components/ErrorState";
import { AddGarageModal } from "./_components/AddGarageModal";

export default function MyGaragePage() {
  const { data, isLoading, error } = useGetUserProfileQuery();
  const router = useRouter();
  const [showAddDialog, setShowAddDialog] = useState(false);

  const garages = data?.data?.garages || [];

  const handleAddGarage = () => {
    setShowAddDialog(true);
  };

  const handleViewGarage = (garage: any) => {
    router.push(`/garage-admin/my-garage/${garage.id}`);
  };

  const handleSaveGarage = () => {
    setShowAddDialog(false);
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <>
      {garages.length === 0 ? (
        <EmptyGarageState onAddGarage={handleAddGarage} />
      ) : (
        <GarageList
          garages={garages}
          onAddGarage={handleAddGarage}
          onViewGarage={handleViewGarage}
        />
      )}

      <AddGarageModal
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={handleSaveGarage}
      />
    </>
  );
}
