export type Animal = {
  id: string;
  petName: string;
  description: string;
  address: string;
  category: string;
  location: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  createdBy: string;
};
