"use client";

import { Datum, EndpointVehicless, IAllVehiclesResponse } from "@/app/core/application/dto";

import TableRow from "@/ui/molecules/TableRows/TableDataRow/TableDataRow";
import TableHeaderRow from "@/ui/molecules/TableRows/TableHeadRow/TableHeaderRow";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import styles from "./TableVehicles.module.scss"
import Modal from "../../Modal/Modal";


interface ITableProps {
    data: IAllVehiclesResponse;
}
const Table = ({data}: ITableProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<Datum | null>(null);

    const router = useRouter();

    const handleDelete = async (id: number) => {
        console.log("ID a eliminar:", id); 

        const idString = id.toString();
        console.log("ID en string:", idString); 
      
        const isConfirmed = confirm("¿Estás seguro que deseas borrar el vehiculo?");
        if (!isConfirmed) return;
      
        try {
          const res = await fetch(`${EndpointVehicless.DELETE_PROJECT.replace(":id", idString)}`, {
            method: "DELETE",
          });
      
          if (!res.ok) {
            throw new Error("Error borrando el vehiculo");
          }
          console.log("Vehiculo eliminado");
          router.refresh();
        } catch (error) {
          console.log("Error al eliminar el vehiculo", error);
        }
      };

      const handleEdit = () => {
        console.log("editando")
      };
      
      const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedVehicle(null);  
      };

      return (
        <>
         <table className={styles.table}>
                <TableHeaderRow/>
                <tbody>
                    {data.data.map((vehicle, index) => (
                        <TableRow 
                            key={index} 
                            photo={vehicle.photo} 
                            make={vehicle.make}
                            model={vehicle.model}
                            year={vehicle.year}
                            licensePlate={vehicle.licensePlate}
                            onDelete={()=> handleDelete(vehicle.id)} 
                            onEdit={handleEdit}
                        />
                    ))}
                </tbody>
            </table>
            
            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                vehicle={selectedVehicle}
            />
        </>
      );
      
}

export default Table;