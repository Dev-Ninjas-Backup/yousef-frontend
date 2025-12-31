"use client";

import React from "react";
import { useGetGarageByIdQuery } from "@/store/fetures/admin.api";
import { LuArrowLeft } from "react-icons/lu";
import { LucideEdit } from "lucide-react";

interface PageProps {
  params: {
    id: string;
  };
}

const GaragePage = ({ params }: PageProps) => {
  const { id } = params;

  const { data: garageResponse, isLoading, isError } = useGetGarageByIdQuery(id);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading garage details...</div>;
  }

  if (isError || !garageResponse) {
    return <div className="flex justify-center items-center h-64 text-red-500">Failed to load garage details</div>;
  }

  const garage = garageResponse.data;

  return (
    <div className="w-full space-y-6 p-6">
      <button
        onClick={() => history.back()}
        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
      >
        <LuArrowLeft /> Back
      </button>

      <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
        <h2 className="text-xl font-semibold">
          {garage.garageName || "Garage Details"}
        </h2>
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-medium">Owner:</span> {garage.fullName}
          </p>
          <p>
            <span className="font-medium">Email:</span> {garage.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {garage.phone}
          </p>
          <p>
            <span className="font-medium">Status:</span> {garage.garageStatus}
          </p>
          <p>
            <span className="font-medium">Created At:</span>{" "}
            {new Date(garage.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Updated At:</span>{" "}
            {new Date(garage.updatedAt).toLocaleDateString()}
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <LucideEdit /> Edit Garage
        </button>
      </div>
    </div>
  );
};

export default GaragePage;
