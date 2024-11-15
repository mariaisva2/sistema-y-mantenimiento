"use client";

import React from "react";
import "./modal.module.scss";
import { FiX } from "react-icons/fi";

import VehicleForm from "../Vehicles/FormVehicles/FormVehicles";
import { Datum } from "@/app/core/application/dto/vehicles/vehiclesAll-response.dto";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Datum | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, vehicle }) => {
  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <FiX size={24} />
        </button>
        <VehicleForm initialData={vehicle} onClose={onClose} />
      </div>
    </div>
  );
};

export default Modal;
