export interface Garage {
  userId: string;
  ownerName: string;
  phone: string | null;
  Garage_Name: string | null;
  serviceCategories: string[];
  Contract: string | null;
  tradeLicense: string | null;
  garageLogo: string | null;
  garageStatus: 'APPROVE' | 'PENDING' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
  revenue: number;
}

export interface GarageResponse {
  success: boolean;
  message: string;
  data: Garage[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface GarageQueryParams {
  page?: number;
  limit?: number;
  name?: string;
  status?: string;
}