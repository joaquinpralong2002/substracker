import { SubscriptionForm } from "./SubscriptionForm";
import { X } from "lucide-react";

interface AddSubscriptionModalProps {
  onClose: () => void; // Función para cerrar el modal
}

export function AddSubscriptionModal({ onClose }: AddSubscriptionModalProps) {
  return (
    // Contenedor principal del modal (fondo verde)
    <div className="bg-brand-primary p-8 rounded-4xl w-full max-w-xl relative shadow-2xl">
      {/* Botón de Cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-brand-dark/50 hover:bg-brand-dark transition-colors flex items-center justify-center text-white"
      >
        <X size={20} />
      </button>

      {/* Header */}
      <h2 className="text-2xl font-bold text-white text-center mb-8">
        Añadir una suscripción
      </h2>

      {/* El Formulario */}
      <SubscriptionForm />
    </div>
  );
}
