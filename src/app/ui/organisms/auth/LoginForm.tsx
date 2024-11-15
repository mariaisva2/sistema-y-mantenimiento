"use client";
import {
  ErrorResponse,
  FieldError,
  ILoginRequest,
} from "@/app/core/application/dto";
import Button from "@/ui/atoms/Button";
import Text from "@/ui/atoms/Parragraph";
import { Icon } from '@iconify/react';
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./LoginForm.module.scss";

import { FormField } from "@/ui/molecules";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("El correo es inválido")
    .required("El correo el obligatorio"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener  al menos 8  caracteres")
    .required("La contraseña es obligatoria"),
});

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginRequest>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(loginSchema),
  });
  
  const router = useRouter()
  const handleLogin = async (data: ILoginRequest) => {
    console.log(data);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      console.log(result);

      if (result?.error) {
        console.log("Ocurrio un error", JSON.parse(result.error));
        handleError(JSON.parse(result.error))
        return;
      }
      router.push("/dashboard/vehicles")
    } catch (error) {
      console.log(error);
    }
  };

  const handleError = (error: unknown) => {
    const erroData = error as ErrorResponse;
    if (erroData && erroData.errors) {
      if (Array.isArray(erroData.errors) && "field" in erroData.errors[0]) {
        erroData.errors.forEach((fieldError) => {
          const { field, error } = fieldError as FieldError;
          setError(field as keyof ILoginRequest, {
            message: error,
          });
        });
      } else {
        if ("message" in erroData.errors[0]) {
          setError("email", {
            message: erroData.errors[0].message,
          });
        }
      }
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(handleLogin)}
    >
        <div className={styles.containerTitle}>
        <Icon icon="mdi:car-outline" width="30" height="30" className={styles.icon} />
        <Text classname={styles.h1}>Transport Solutions S.A</Text>
        </div>
      

      <Text classname={styles.p}>Inicia sesión en tu cuenta y gestiona tu flota de vehiculos</Text>

      <FormField<ILoginRequest>
        control={control}
        type="email"
        label="Correo Electrónico"
        name="email"
        error={errors.email}
        placeholder="Ingresa tu correo"
      />

      <FormField<ILoginRequest>
        control={control}
        type="password"
        label="Contraseña"
        name="password"
        error={errors.password}
        placeholder="Ingresa tu contraseña"
      />
      <Button
        type="submit"
        className={styles.button}
      >
        <Icon icon="mdi:lock" width="20" height="20" />
        Iniciar Sesión
      </Button>
      <Text classname={styles.div}>
        ¿Problemas para iniciar sesión? Contacta al administrador del sistema
      </Text>
    </form>
  );
};
