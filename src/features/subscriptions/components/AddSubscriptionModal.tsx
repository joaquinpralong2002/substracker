import { SubscriptionForm } from "./SubscriptionForm";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddSubscriptionModalProps {
  onClose: () => void;
}

export function AddSubscriptionModal({ onClose }: AddSubscriptionModalProps) {
  return (
    // CONTENEDOR RESPONSIVO:
    // Mobile: fixed inset-0 (pantalla completa), bg-background (beige), scrollable
    // Desktop (md): relative, max-w-xl, bg-brand-primary (verde), rounded-4xl
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background p-6", // Estilos Mobile
        "md:relative md:inset-auto md:block md:bg-brand-primary md:p-8 md:rounded-4xl md:w-full md:max-w-xl md:shadow-2xl md:overflow-visible" // Estilos Desktop
      )}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8 md:justify-center md:relative">
        {/* Botón Cerrar (Mobile: Izquierda/Derecha según prefieras, Desktop: Absolute Right) */}
        <button
          onClick={onClose}
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full transition-colors",
            "bg-brand-dark text-white", // Mobile: Botón oscuro
            "md:absolute md:-top-2 md:-right-2 md:bg-brand-dark/50 md:hover:bg-brand-dark" // Desktop: Posición absoluta
          )}
        >
          <X size={24} />
        </button>

        {/* Título */}
        <h2
          className={cn(
            "text-2xl font-bold text-center flex-1 md:flex-none",
            "text-brand-dark", // Mobile: Texto oscuro
            "md:text-white" // Desktop: Texto blanco
          )}
        >
          Añadir una suscripción
        </h2>

        {/* Espaciador para centrar título en mobile si el botón está a la izquierda */}
        <div className="w-10 md:hidden"></div>
      </div>

      {/* EL FORMULARIO (Se adapta por dentro) */}
      <SubscriptionForm onSuccess={onClose} />
    </div>
  );
}
