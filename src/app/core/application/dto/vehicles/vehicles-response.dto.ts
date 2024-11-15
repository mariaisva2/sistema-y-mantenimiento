export interface IVehiclesResponse {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    make:         string;
    model:        string;
    year:         number;
    licensePlate: string;
    photo:        string | null;
    id:           number;
}