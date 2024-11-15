
import { IAllVehiclesRequest } from '@/app/core/application/dto/vehicles/vehiclesAll-response.dto';
import { VehiclesService } from '@/app/infractrusture/service/vehicle.service';

import VehiclesTemplate from '@/app/ui/template/Vehicles/Vehicles';

import React from 'react'

interface IProps{
  searchParams: IAllVehiclesRequest
}

export const generateMetadata = async({searchParams}: IProps) =>{
    const page = searchParams.page ?? 1;
    return {
        title: `Vehicles List - Page ${page}`,
        description: `List of vehicles on page ${page}`,
        meta: [
            { name: 'description', content: `List of vehicles on page ${page}` },
            { property: 'og:title', content: `Vehicles List - Page ${page}` },
            { property: 'og:description', content: `List of vehicles on page ${page}` },
        ],
    }
  }

const vehiclesService = new VehiclesService();

export default async function VehiclePage({searchParams}: IProps){
    const page = searchParams.page ? parseInt(searchParams.page.toString()): 1;
    const data = await vehiclesService.findAll({page, size:8});
    return (
        <VehiclesTemplate data={data} pagination={data.metadata}/>
    )
}
