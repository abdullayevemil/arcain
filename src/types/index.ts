export type UserRole = "student" | "landlord";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  image?: string;
  country?: string;
}

export type PropertyType = "flat" | "house";
export type BuiltType = "new" | "old";

export interface House {
  id: string;
  title: string;
  city: string;
  price: number;
  rooms: number;
  images: string[];
  rating: number;
  description: string;
  roommateFriendly: boolean;
  type: PropertyType;
  builtType: BuiltType;
  address: string;
  renovated: boolean;
  area: number;
  floor: number;
}
