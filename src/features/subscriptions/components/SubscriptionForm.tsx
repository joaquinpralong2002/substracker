"use client";

import { useState } from "react";
import { useForm, useWatch, type Resolver, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSubscriptionAction } from "@/actions/subscription";
import {
  subscriptionSchema,
  SubscriptionFormValues,
  CURRENCIES,
  BILLING_CYCLES,
  COLORS,
} from "@/lib/schemas/subscription";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/FormButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { DatePicker } from "@/components/ui/DatePicker";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Prop para cerrar modal al terminar
interface SubscriptionFormProps {
  onSuccess?: () => void;
}

export function SubscriptionForm({ onSuccess }: SubscriptionFormProps) {
  const [serverError, setServerError] = useState(""); // Estado para error global

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SubscriptionFormValues>({
    resolver: zodResolver(
      subscriptionSchema
    ) as Resolver<SubscriptionFormValues>,
    defaultValues: {
      currency: "USD",
      billingCycle: "Mensual",
      color: COLORS[0],
      startDate: new Date().toISOString().split("T")[0],
    },
  });

  const selectedColor = useWatch({ control, name: "color" });

  const onSubmit = async (data: SubscriptionFormValues) => {
    setServerError(""); // Limpiar errores previos

    // Convertimos los datos a FormData para que coincida con la firma de la Action
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    // Llamada al Server Action pasando un estado inicial dummy y el FormData
    const result = await createSubscriptionAction({ success: false }, formData);

    if (result.success) {
      // Si todo salió bien:
      if (onSuccess) onSuccess(); // Cerramos el modal
      // Opcional: Mostrar Toast de éxito aquí
    } else {
      // Si hubo error:
      setServerError(result.error || "Ocurrió un error inesperado");
    }
  };

  // Clase auxiliar para los labels: Oscuro en Mobile, Blanco en Desktop
  const labelClass =
    "block text-base font-bold text-brand-dark md:text-white ml-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pb-6">
      {/* Mostrar error del servidor si existe */}
      {serverError && (
        <div className="bg-red-500/10 border border-red-500 text-red-600 p-3 rounded-xl text-sm font-medium text-center">
          {serverError}
        </div>
      )}

      <div className="space-y-1">
        <Input
          label="*Nombre de la suscripción:"
          placeholder="Ej: Netflix, Spotify..."
          {...register("name")}
          error={errors.name?.message}
          labelClassName={labelClass}
        />
      </div>

      {/* Fila con Precio y Divisa */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Input
            label="*Precio:"
            type="number"
            step="0.01"
            placeholder="14.99"
            {...register("price")}
            error={errors.price?.message}
            labelClassName={labelClass}
          />
        </div>

        <div className="space-y-1">
          <label className={labelClass}>*Divisa:</label>
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  className={cn(
                    "h-11 rounded-2xl bg-brand-pale border-none text-brand-dark font-medium focus:ring-2 focus:ring-brand-light",
                    errors.currency ? "ring-2 ring-red-500" : ""
                  )}
                >
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((curr) => (
                    <SelectItem key={curr} value={curr}>
                      {curr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.currency && (
            <p className="text-xs text-red-300 ml-2 font-medium">
              {errors.currency.message}
            </p>
          )}
        </div>
      </div>

      {/* Fila con Ciclo y Fecha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={labelClass}>*Ciclo de facturación:</label>
          <Controller
            name="billingCycle"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  className={cn(
                    "h-11 rounded-2xl bg-brand-pale border-none text-brand-dark font-medium focus:ring-2 focus:ring-brand-light",
                    errors.billingCycle ? "ring-2 ring-red-500" : ""
                  )}
                >
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {BILLING_CYCLES.map((cycle) => (
                    <SelectItem key={cycle} value={cycle}>
                      {cycle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.billingCycle && (
            <p className="text-xs text-red-300 ml-2 font-medium">
              {errors.billingCycle.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          {/* El DatePicker debe manejar su label internamente o externamente. 
               Asumiremos control externo para consistencia de color */}
          <label className={labelClass}>*Fecha de primer pago:</label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                date={field.value ? new Date(field.value) : undefined}
                onChange={(date) => {
                  field.onChange(date ? date.toISOString().split("T")[0] : "");
                }}
                error={errors.startDate?.message}
              />
            )}
          />
        </div>
      </div>

      {/* Selector de Color */}
      <div className="space-y-2">
        <label className={labelClass}>Color de etiqueta:</label>
        <div className="flex flex-wrap gap-3 justify-center bg-brand-pale/50 p-4 rounded-2xl border border-brand-dark/5">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setValue("color", color, { shouldValidate: true })}
              className={cn(
                "w-8 h-8 rounded-full transition-all flex items-center justify-center shadow-sm",
                selectedColor === color
                  ? "scale-110 ring-2 ring-brand-dark md:ring-white ring-offset-2 ring-offset-brand-pale md:ring-offset-brand-primary"
                  : "hover:scale-105 hover:opacity-80"
              )}
              style={{ backgroundColor: color }}
              title={color}
            >
              {selectedColor === color && (
                <Check size={14} className="text-white drop-shadow-md" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Notas Adicionales */}
      <div className="space-y-1">
        <label className={labelClass}>Notas adicionales:</label>
        <textarea
          className={cn(
            "w-full h-24 p-4 rounded-2xl bg-brand-pale text-brand-dark font-medium placeholder:text-brand-dark/60",
            "outline-none transition-all duration-200 resize-none",
            "focus:ring-2 focus:ring-brand-light focus:brightness-105",
            errors.notes ? "ring-2 ring-red-500" : ""
          )}
          placeholder="Ej: Usé la tarjeta Visa..."
          {...register("notes")}
        />
        {errors.notes && (
          <p className="text-xs text-red-300 ml-2 font-medium">
            {errors.notes.message}
          </p>
        )}
      </div>

      {/* Botón de Envío */}
      <div className="pt-4 flex justify-center">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="bg-brand-primary md:bg-brand-light text-white md:text-brand-dark hover:brightness-105 w-full md:w-auto px-8 py-3 rounded-2xl font-bold shadow-lg"
        >
          Añadir suscripción
        </Button>
      </div>
    </form>
  );
}
