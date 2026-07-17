"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Compass, Map, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

  // Script loading state
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);

  // GPS / Geolocation state
  const [isLocating, setIsLocating] = useState(false);

  // Map Modal states
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapNode, setMapNode] = useState<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number }>({
    lat: locationData.garageLat || 25.2048,
    lng: locationData.garageLng || 55.2708,
  });

  // Safe Google Maps Script Loading
  useEffect(() => {
    if (window.google?.maps) {
      setIsMapsLoaded(true);
      return;
    }

    const handleScriptLoad = () => {
      setIsMapsLoaded(true);
    };

    const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    if (existingScript) {
      existingScript.addEventListener("load", handleScriptLoad);
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = handleScriptLoad;
      document.head.appendChild(script);
    }

    return () => {
      const script = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
      if (script) {
        script.removeEventListener("load", handleScriptLoad);
      }
    };
  }, []);

  // Initialize Autocomplete Service when Maps load
  useEffect(() => {
    if (isMapsLoaded && window.google?.maps?.places && addressInputRef.current) {
      const service = new window.google.maps.places.AutocompleteService();
      autocompleteRef.current = service;
    }
  }, [isMapsLoaded]);

  // Google Maps Instance initialization on modal open and DOM node mount
  useEffect(() => {
    if (!isMapOpen || !isMapsLoaded || !mapNode || !window.google?.maps) return;
    
    const latLng = {
      lat: selectedCoords.lat || 25.2048,
      lng: selectedCoords.lng || 55.2708,
    };
    
    const map = new window.google.maps.Map(mapNode, {
      center: latLng,
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });
    mapRef.current = map;
    
    const marker = new window.google.maps.Marker({
      position: latLng,
      map: map,
      draggable: true,
      animation: window.google.maps.Animation.DROP,
    });
    markerRef.current = marker;
    
    marker.addListener("dragend", () => {
      const pos = marker.getPosition();
      if (pos) {
        setSelectedCoords({
          lat: pos.lat(),
          lng: pos.lng(),
        });
      }
    });
    
    map.addListener("click", (e: any) => {
      const pos = e.latLng;
      if (pos) {
        marker.setPosition(pos);
        setSelectedCoords({
          lat: pos.lat(),
          lng: pos.lng(),
        });
      }
    });
  }, [isMapOpen, isMapsLoaded, mapNode]);

  // Robust Address Component Parser with Fallbacks
  const parseAddressComponents = (components: any[]) => {
    let street = "";
    let city = "";
    let emirate = "";
    
    let route = "";
    let streetNumber = "";
    let neighborhood = "";
    let sublocality = "";
    
    components.forEach((component: any) => {
      const types = component.types;
      if (types.includes("route")) {
        route = component.long_name;
      } else if (types.includes("street_number")) {
        streetNumber = component.long_name;
      } else if (types.includes("neighborhood")) {
        neighborhood = component.long_name;
      } else if (types.includes("sublocality") || types.includes("sublocality_level_1") || types.includes("sublocality_level_2")) {
        sublocality = component.long_name;
      } else if (types.includes("locality")) {
        city = component.long_name;
      } else if (types.includes("administrative_area_level_1")) {
        emirate = component.long_name;
      }
    });
    
    // Fallbacks for Street field
    street = route 
      ? (streetNumber ? `${streetNumber} ${route}` : route) 
      : (neighborhood || sublocality || "");
      
    return { street, city, emirate };
  };

  const handleAddressSearch = (query: string) => {
    if (!autocompleteRef.current || !window.google?.maps || query.length < 3) {
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
    if (!window.google?.maps) return;
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    
    service.getDetails({
      placeId: placeId,
      fields: ['address_components', 'formatted_address', 'geometry', 'name', 'place_id']
    }, (place: any, status: any) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
        const { street, city, emirate } = parseAddressComponents(place.address_components || []);

        const newLocationData: LocationData = {
          address: place.name || description,
          street: street,
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

  // Reverse Geocoding Helper
  const reverseGeocode = (lat: number, lng: number) => {
    if (!window.google?.maps) {
      toast.error("Google Maps is still loading. Please try again.");
      return;
    }
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results: any, status: any) => {
      if (status === "OK" && results && results[0]) {
        const place = results[0];
        const { street, city, emirate } = parseAddressComponents(place.address_components || []);
        
        // Find name of place
        const nameComponent = place.address_components.find((c: any) => 
          c.types.includes("establishment") || c.types.includes("point_of_interest")
        );
        const addressName = nameComponent ? nameComponent.long_name : (street || place.formatted_address.split(",")[0]);

        const newLocationData: LocationData = {
          address: addressName || place.formatted_address,
          street: street,
          city: city || "Dubai",
          emirate: emirate || "Dubai",
          formattedAddress: place.formatted_address || "",
          placeId: place.place_id || "",
          garageLat: lat,
          garageLng: lng,
        };

        setLocationData(newLocationData);
        onLocationChange(newLocationData);
        toast.success("Location auto-filled successfully!");
      } else {
        toast.error("Failed to fetch address details for these coordinates.");
      }
    });
  };

  // Use Current GPS Geolocation
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        reverseGeocode(lat, lng);
        setIsLocating(false);
      },
      (error) => {
        console.error("Geolocation error: ", error);
        toast.error("Failed to get location. Please enable location access.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleCenterMapOnCurrentLocation = () => {
    if (!navigator.geolocation) return;
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const newLatLng = { lat, lng };
        
        setSelectedCoords(newLatLng);
        
        if (mapRef.current && window.google?.maps) {
          mapRef.current.setCenter(newLatLng);
          mapRef.current.setZoom(16);
        }
        if (markerRef.current) {
          markerRef.current.setPosition(newLatLng);
        }
      },
      (error) => {
        console.error(error);
        toast.error("Could not find your current location.");
      }
    );
  };

  const handleConfirmLocation = () => {
    reverseGeocode(selectedCoords.lat, selectedCoords.lng);
    setIsMapOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Address Search */}
        <div className="relative">
          <div className="flex items-center justify-between mb-1.5">
            <Label htmlFor="address" className="mb-0">Address *</Label>
            <button
              type="button"
              onClick={() => {
                if (locationData.garageLat && locationData.garageLng) {
                  setSelectedCoords({
                    lat: locationData.garageLat,
                    lng: locationData.garageLng,
                  });
                }
                setIsMapOpen(true);
              }}
              className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-bold flex items-center gap-1 transition-all"
            >
              <Compass className="w-3.5 h-3.5" />
              Choose from Map
            </button>
          </div>
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
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              disabled={isLocating}
              title="Use current location"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-md hover:bg-gray-100 text-blue-600 hover:text-blue-750 transition-colors disabled:opacity-50"
            >
              {isLocating ? (
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              ) : (
                <MapPin className="w-4 h-4" />
              )}
            </button>
          </div>
          
          {/* Helpful Tip */}
          <p className="text-[10px] text-gray-400 mt-1.5 leading-normal">
            💡 **Tip:** You can search your address using the search bar, click the pin icon inside the input to auto-detect your current GPS location, or click **"Choose from Map"** to manually drop a pin on the map.
          </p>
          
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
              disabled
              className="bg-gray-50 text-gray-500 cursor-not-allowed"
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
              disabled
              className="bg-gray-50 text-gray-500 cursor-not-allowed"
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
            disabled
            className="bg-gray-50 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Place ID (Read-only) */}
        <div>
          <Label htmlFor="placeId">Place ID</Label>
          <Input
            id="placeId"
            value={locationData.placeId}
            placeholder="Auto-filled from Google Places"
            disabled
            className="bg-gray-50 text-gray-500 cursor-not-allowed"
          />
        </div>
      </CardContent>

      {/* Choose pinpoint location from Google Maps Dialog Modal */}
      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Map className="w-5 h-5 text-blue-600" />
              Pinpoint Garage Location
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-xs text-gray-500 leading-normal">
              Drag the marker or click on the map to pinpoint your exact garage location. You can also center the map on your current location.
            </p>
            
            <div className="relative">
              {/* Map Element Container */}
              <div 
                ref={setMapNode} 
                className="w-full h-80 rounded-xl border border-gray-200 overflow-hidden shadow-inner bg-gray-50"
              />
              
              {/* Float map controls inside map container */}
              <button
                type="button"
                onClick={handleCenterMapOnCurrentLocation}
                className="absolute bottom-4 right-4 bg-white hover:bg-gray-50 text-gray-700 shadow-md border px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Compass className="w-4 h-4 text-blue-500" />
                Find My Location
              </button>
            </div>
            
            {/* Display current coordinates */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs font-semibold text-gray-600">
              <div>Latitude: <span className="font-mono text-gray-900 font-bold ml-1">{selectedCoords.lat.toFixed(6)}</span></div>
              <div>Longitude: <span className="font-mono text-gray-900 font-bold ml-1">{selectedCoords.lng.toFixed(6)}</span></div>
            </div>
            
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsMapOpen(false)}
                className="px-4 font-bold text-gray-700 border-gray-300"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleConfirmLocation}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 shadow-sm"
              >
                Confirm Location
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}