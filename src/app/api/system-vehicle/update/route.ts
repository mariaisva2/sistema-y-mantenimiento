
import { VehiclesService } from "@/app/infrastructure";
import { NextResponse } from "next/server";

export const PUT = async (req: Request, {params}: {params:{id:string}}) => {
    console.log(params)
    const {id} = params;
    const idNumber = parseInt(id, 10);

    const vehiclesService = new VehiclesService();
try {
    const formData = await req.formData();
    const updateVehicle = await vehiclesService.update(idNumber, formData); 
    return NextResponse.json({status: 200, data: updateVehicle})
} catch (error) {
    return NextResponse.json({ status: 500, error: error});
}
}