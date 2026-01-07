declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: any) => void;
          }) => void;
          prompt: () => void;
        };
      };
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLInputElement,
            options?: {
              componentRestrictions?: { country: string };
              fields?: string[];
              types?: string[];
            }
          ) => google.maps.places.Autocomplete;
        };
        event?: {
          clearInstanceListeners: (instance: any) => void;
        };
      };
    };
  }
}

declare namespace google.maps.places {
  interface Autocomplete {
    addListener(eventName: string, handler: () => void): void;
    getPlace(): {
      address_components?: {
        long_name: string;
        short_name: string;
        types: string[];
      }[];
      formatted_address?: string;
      geometry?: {
        location?: {
          lat(): number;
          lng(): number;
        };
      };
      name?: string;
      place_id?: string;
    };
  }
}

export {};