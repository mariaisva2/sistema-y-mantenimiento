"use client";

import Button from "@/ui/atoms/Button";
import Text from "@/ui/atoms/Parragraph";
import { FormField, FormFileField } from "@/ui/molecules";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styles from "./FormVehicles.module.scss";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Datum, IVehiclesRequest } from "@/app/core/application/dto";

const vehiclesSchema = yup.object().shape({
  make: yup.string().required("La marca es requerida"),
  model: yup.string().required("El modelo es requerido"),
  year: yup.string().required("El año es requerido"),
  licensePlate: yup.string().required("El número de la placa es requerido"),
  file: yup.mixed<File>().nullable().notRequired(),
});

interface IVehiclesFormProps {
  initialData?: Datum | null;
  onClose: () => void;
}

const VehicleForm = ({ initialData, onClose }: IVehiclesFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<IVehiclesRequest>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(vehiclesSchema),
  });


  const handleVehicle = async (data: IVehiclesRequest) => {
    try {
      const formData = new FormData();

      formData.append("make", data.make);
      formData.append("model", data.model);
      formData.append("year", data.year);
      formData.append("licensePlate", data.licensePlate);

      if (data.file instanceof File) {
        formData.append("file", data.file);
      } else {
        console.log("La imagen no es un archivo válido");
      }

      const response = await fetch("/api/vehicles/create-vehicle", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al crear un vehiculo");
      }
      toast.success("Vehiculo creado exitosamente");
      onClose();
      return await response.json();
    } catch (error) {
      console.error("Error en el POST:", error);
      throw error;
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleVehicle)}>
      <Text classname={styles.h1}>Agregar nuevo vehículo</Text>


      <div className={styles.divInputs}>
      <FormField<IVehiclesRequest>
        control={control}
        type="text"
        name="make"
        label="Marca"
        error={errors.make}
        placeholder="Ingrese la marca"
      />

      <FormField<IVehiclesRequest>
        control={control}
        type="text"
        name="model"
        label="Modelo"
        error={errors.model}
        placeholder="Ingrese el modelo"
      />
      </div>
      
      <div className={styles.divInputs}>
      <FormField<IVehiclesRequest>
        control={control}
        type="text"
        name="year"
        label="Año"
        error={errors.year}
        placeholder="Ingrese el año"
      />

      <FormField<IVehiclesRequest>
        control={control}
        type="text"
        name="licensePlate"
        label="Número de licencia"
        error={errors.licensePlate}
        placeholder="Ingrese el número de licencia"
      />
      </div>
      
      <div>
        <FormFileField<IVehiclesRequest>
          control={control}
          name="file"
          label="Foto del vehiculo"
          error={errors.file}
        />
      </div>
      <Button type="submit" className={styles.button}>
        Agregar
      </Button>
    </form>
  );
};

export default VehicleForm;
