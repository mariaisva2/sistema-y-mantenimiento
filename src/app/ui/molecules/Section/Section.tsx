"use client";
import React from 'react';
import { useState } from "react";
import styles from "./Section.module.scss"
import Button from '@/ui/atoms/Button';
import { GrAddCircle } from "react-icons/gr";
import { useSession } from 'next-auth/react';
import { Datum } from '@/app/core/application/dto';
import Modal from '@/ui/organisms/Modal/Modal';
interface sectionProps {
  vehicle: Datum | null;
}

const Section = ({vehicle}: sectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {data: session} = useSession()

  if (!session || !session.user || !session.user.email) {
    // Si no hay sesión o no hay email, no renderizamos el componente
    return null;
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.div}>
      <div className={styles.headerContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.mainTitle}>Gestion de vehiculos</h1>
      </div>
      <Button className={styles.button} onClick={openModal}>
      {<GrAddCircle />}
      Nuevo Vehiculo
      </Button>
          <Modal isOpen={isModalOpen} onClose={closeModal} vehicle={vehicle} />
    </div>
    </div>
    
  )
}

export default Section