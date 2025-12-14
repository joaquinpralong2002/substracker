import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | string[]; // Soporta errores de Zod
  icon?: ReactNode; // Icono de Lucide (User, Mail, Eye)
  onIconClick?: () => void; // Para el toggle de contraseña
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, onIconClick, type, ...props }, ref) => {
    // Si el error es un array, tomamos el primer mensaje
    const errorMessage = Array.isArray(error) ? error[0] : error;

    return (
      <div className="w-full space-y-1">
        <label className="block text-base font-bold text-white ml-1">
          {label}
        </label>

        <div className="relative">
          <input
            ref={ref}
            type={type}
            className={cn(
              // 1. Dimensiones y Espaciado
              "w-full h-11 pl-5 pr-12", // Altura generosa y espacio a la derecha para el icono

              // 2. Forma
              "rounded-2xl", // Bordes redondeados

              // 3. Colores y Tipografía
              "bg-brand-pale text-brand-dark", // Fondo verde pálido, texto oscuro
              "placeholder:text-brand-dark/60", // Placeholder semitransparente
              "font-medium",

              // 4. Estados (Focus y Error)
              "outline-none transition-all duration-200",
              "focus:ring-2 focus:ring-brand-light focus:brightness-105", // Brillo sutil al enfocar
              errorMessage ? "ring-2 ring-red-500" : "",

              className
            )}
            {...props}
          />

          {/* Icono: Posicionado absolutamente a la derecha */}
          {icon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-dark">
              {onIconClick ? (
                <button
                  type="button"
                  onClick={onIconClick}
                  className="flex items-center justify-center hover:opacity-70 transition-opacity focus:outline-none"
                  tabIndex={-1} // Evita que el tab se detenga en el ojo antes del input
                >
                  {icon}
                </button>
              ) : (
                <span className="flex items-center justify-center pointer-events-none">
                  {icon}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Mensaje de Error */}
        {errorMessage && (
          <p className="text-xs text-red-300 ml-2 font-medium animate-pulse">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
