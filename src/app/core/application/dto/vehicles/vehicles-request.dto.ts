export interface IVehiclesRequest {
    make: string;
    model: string;
    year: string;
    licensePlate: string;
    file?: File | null;
  }