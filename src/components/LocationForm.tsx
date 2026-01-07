"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface LocationData {
  address: string;
  street: string;
  city: string;
  emirate: string;
  formattedAddress: string;
  placeId: string;
  garageLat: number;
  garageLng: number;
}

interface LocationFormProps {
  initialData?: Partial<LocationData>;
  onLocationChange: (data: LocationData) => void;
}

export function LocationForm({ initialData, onLocationChange }: LocationFormProps) {
  const [locationData, setLocationData] = useState<LocationData>({
    address: initialData?.address || "",
    street: initialData?.street || "",
    city: initialData?.city || "Dubai",
    emirate: initialData?.emirate || "Dubai",
    formattedAddress: initialData?.formattedAddress || "",
    placeId: initialData?.placeId || "",
    garageLat: initialData?.garageLat || 0,
    garageLng: initialData?.garageLng || 0,
  });

  const addressInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Initialize Google Places
  useEffect(() => {
    const initGooglePlaces = () => {
      if (window.google?.maps?.places && addressInputRef.current) {
        const service = new window.google.maps.places.AutocompleteService();
        autocompleteRef.current = service;
      }
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = initGooglePlaces;
      document.head.appendChild(script);
    } else {
      initGooglePlaces();
    }
  }, []);

  const handleAddressSearch = (query: string) => {
    if (!autocompleteRef.current || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const request = {
      input: query,
      componentRestrictions: { country: "ae" },
      types: ["establishment", "geocode"],
    };

    autocompleteRef.current.getPlacePredictions(request, (predictions: any[], status: any) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
        setSuggestions(predictions.slice(0, 5));
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    });
  };

  const handleSuggestionSelect = (placeId: string, description: string) => {
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    
    service.getDetails({
      placeId: placeId,
      fields: ['address_components', 'formatted_address', 'geometry', 'name', 'place_id']
    }, (place: any, status: any) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
        let street = "";
        let city = "";
        let emirate = "";
        
        if (place.address_components) {
          place.address_components.forEach((component: any) => {
            const types = component.types;
            if (types.includes("route")) {
              street = component.long_name;
            } else if (types.includes("sublocality") || types.includes("locality")) {
              city = component.long_name;
            } else if (types.includes("administrative_area_level_1")) {
              emirate = component.long_name;
            }
          });
        }

        const newLocationData: LocationData = {
          address: place.name || description,
          street: street || "",
          city: city || "Dubai",
          emirate: emirate || "Dubai",
          formattedAddress: place.formatted_address || description,
          placeId: place.place_id || "",
          garageLat: place.geometry?.location?.lat() || 0,
          garageLng: place.geometry?.location?.lng() || 0,
        };

        setLocationData(newLocationData);
        onLocationChange(newLocationData);
        setShowSuggestions(false);
      }
    });
  };

  const updateLocationData = (field: keyof LocationData, value: string | number) => {
    const newData = { ...locationData, [field]: value };
    setLocationData(newData);
    onLocationChange(newData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Address Search */}
        <div className="relative">
          <Label htmlFor="address">Address *</Label>
          <div className="relative">
            <Input
              ref={addressInputRef}
              id="address"
              value={locationData.address}
              onChange={(e) => {
                updateLocationData("address", e.target.value);
                handleAddressSearch(e.target.value);
              }}
              placeholder="Search for your garage location..."
              className="pr-10"
              required
            />
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
          </div>
          
          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                  onClick={() => handleSuggestionSelect(suggestion.place_id, suggestion.description)}
                >
                  <div className="font-medium text-sm">{suggestion.structured_formatting?.main_text}</div>
                  <div className="text-xs text-gray-500">{suggestion.structured_formatting?.secondary_text}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Street */}
        <div>
          <Label htmlFor="street">Street</Label>
          <Input
            id="street"
            value={locationData.street}
            onChange={(e) => updateLocationData("street", e.target.value)}
            placeholder="Street name"
          />
        </div>

        {/* City and Emirate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={locationData.city}
              onChange={(e) => updateLocationData("city", e.target.value)}
              placeholder="City"
              required
            />
          </div>
          <div>
            <Label htmlFor="emirate">Emirate *</Label>
            <Input
              id="emirate"
              value={locationData.emirate}
              onChange={(e) => updateLocationData("emirate", e.target.value)}
              placeholder="Emirate"
              required
            />
          </div>
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="latitude">Latitude *</Label>
            <Input
              id="latitude"
              type="number"
              step="any"
              value={locationData.garageLat}
              onChange={(e) => updateLocationData("garageLat", parseFloat(e.target.value) || 0)}
              placeholder="25.2048"
              required
            />
          </div>
          <div>
            <Label htmlFor="longitude">Longitude *</Label>
            <Input
              id="longitude"
              type="number"
              step="any"
              value={locationData.garageLng}
              onChange={(e) => updateLocationData("garageLng", parseFloat(e.target.value) || 0)}
              placeholder="55.2708"
              required
            />
          </div>
        </div>

        {/* Formatted Address (Read-only) */}
        <div>
          <Label htmlFor="formattedAddress">Formatted Address</Label>
          <Input
            id="formattedAddress"
            value={locationData.formattedAddress}
            placeholder="Auto-filled from Google Places"
            readOnly
            className="bg-gray-50"
          />
        </div>

        {/* Place ID (Read-only) */}
        <div>
          <Label htmlFor="placeId">Place ID</Label>
          <Input
            id="placeId"
            value={locationData.placeId}
            placeholder="Auto-filled from Google Places"
            readOnly
            className="bg-gray-50"
          />
        </div>
      </CardContent>
    </Card>
  );
}