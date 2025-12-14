import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "outline" | "danger";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, isLoading, variant = "primary", disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          // 1. Base: Dimensiones y Comportamiento
          "w-full md:w-48 md:mx-auto h-12 flex items-center justify-center gap-2",
          "rounded-2xl",
          "font-bold text-base transition-all duration-200",
          "active:scale-105", // Efecto de "presionar" sutil
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-light", // Accesibilidad

          // 2. Estado Deshabilitado / Loading
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",

          // 3. Variantes de Color
          variant === "primary" &&
            "bg-brand-primary text-white hover:brightness-110 shadow-md shadow-brand-dark/20",

          variant === "outline" &&
            "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10",

          variant === "danger" && "bg-red-600 text-white hover:bg-red-700",

          className
        )}
        {...props}
      >
        {/* Renderizado condicional del Spinner */}
        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}

        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
