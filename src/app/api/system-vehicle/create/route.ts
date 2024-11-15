import { VehiclesService } from "@/app/infrastructure";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const vehiclesService = new VehiclesService();
    try {
        const formData = await req.formData();
        const newVehicle = vehiclesService.create(formData);
        return NextResponse.json(newVehicle, {status: 200});
    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
    }
}