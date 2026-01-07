"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";

interface PlaceData {
  address: string;
  formattedAddress: string;
  placeId: string;
  lat: number;
  lng: number;
  city: string;
  emirate: string;
  street: string;
}

interface GooglePlacesAutocompleteProps {
  onPlaceSelect: (place: PlaceData) => void;
  value: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

export function GooglePlacesAutocomplete({
  onPlaceSelect,
  value,
  placeholder = "Enter address...",
  label = "Address",
  required = false,
}: GooglePlacesAutocompleteProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleAddressConfirm = () => {
    if (inputValue.trim()) {
      const placeData: PlaceData = {
        address: inputValue,
        formattedAddress: inputValue,
        placeId: "",
        lat: 25.2048, // Default Dubai coordinates
        lng: 55.2708,
        city: "Dubai",
        emirate: "Dubai", 
        street: inputValue,
      };
      onPlaceSelect(placeData);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddressConfirm();
    }
  };

  return (
    <div>
      <Label htmlFor="address">
        {label} {required && "*"}
      </Label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            id="address"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            required={required}
            className="pr-10"
          />
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddressConfirm}
          className="px-3"
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Enter your garage address and click search or press Enter
      </p>
    </div>
  );
}