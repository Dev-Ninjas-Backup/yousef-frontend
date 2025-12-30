export interface Garage {
  userId: string;
  ownerName: string;
  phone: string | null;
  Garage_Name?: string | null;
  serviceCategories: string[];
  Contract: string | null;
  tradeLicense: string | null;
  garageLogo: string | null;
  garageStatus: 'APPROVE' | 'PENDING' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
  revenue: number;
  garageName : string;
  fullName?: string ;
  email?: string
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
    fullName: string;
  };
}

export interface GarageQueryParams {
  page?: number;
  limit?: number;
  name?: string;
  status?: string;
}



export interface User {
  id: string;
  role: 'GARAGE_OWNER' | 'USER' | 'SUPER_ADMIN';
  fullName: string;
  phone: string | null;
  profilePhoto: string | null;
  bio: string | null;
  email: string;
  isActive: boolean;
  garageStatus: string;
  isGarageVerified: boolean;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  isDeleted: boolean;
  _count: {
    garages: number;
  };
  vehicles: number;
}

export interface AllUsersResponse {
  success: boolean;
  message: string;
  data: User[];
}

export interface SingleUserResponse {
  success: boolean;
  message: string;
  data: User;
}





export interface Product {
  id: string;
  partName: string;
  brand: string;
  condition: string;
  price: string;
  quantity: number;
  description: string;
  photos: string[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  isPromoted: boolean;
  views: number;
  inquiries: number;
  createdAt: string;
  seller: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  category: {
    name: string;
  };
}

export interface ProductResponse {
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductQueryParams {
  search?: string;
  category?: string;
  condition?: string;
  limit?: number;
  page?: number;
}