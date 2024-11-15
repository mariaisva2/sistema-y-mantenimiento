
import { IAllVehiclesRequest, IAllVehiclesResponse } from "@/app/core/application/dto/vehicles/vehiclesAll-response.dto";
import { HttpClient } from "../utils/client-http";
import { IVehiclesResponse } from "@/app/core/application/dto/vehicles/vehicles-response.dto";

export class VehiclesService  {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    async findAll({page, size}:IAllVehiclesRequest){
        try {
            const vehicles = await this.httpClient.get<IAllVehiclesResponse>(`vehicles?page=${page}&size=${size}`);
            return vehicles;
        } catch (error) {
            console.log(error);
            throw new Error("Error al obtener los vehiculos");
        }
    }

    async create(req: FormData): Promise<IVehiclesResponse>{
        const formData = true;
        try {
            const newVehicle = await this.httpClient.post< IVehiclesResponse, FormData>(
                "vehicles",
                 req,
                formData)
            return newVehicle;
        } catch (error) {
            console.log(error);
            throw new Error("Error al crear el vehiculo");
        }
    }

    async update(id: number, req: FormData): Promise<IVehiclesResponse>{
        const formData = true;
        try {
            const updatedVehicle = await this.httpClient.patch<IVehiclesResponse, FormData>(
                `vehicles/${id}`, 
                req, 
                formData)
            return updatedVehicle;
        } catch (error) {
            console.log(error);
            throw new Error("Error al actualizar el vehiculo");
        }
    }

    async destroy(id: number){
        try {
            const vehicle = await this.httpClient.delete(`vehicles/${id}`);
            return vehicle;
        } catch (error) {
            console.log(error)
            throw new Error("Error al eliminar el vehiculo");
        }
    }

}