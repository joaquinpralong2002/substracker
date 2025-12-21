"use client";

import { useForm, useWatch, type Resolver, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  subscriptionSchema,
  SubscriptionFormValues,
  CURRENCIES,
  BILLING_CYCLES,
  COLORS,
} from "@/lib/schemas/subscription";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/FormButton"; // Asumo que es tu componente de botón
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

export function SubscriptionForm() {
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
    console.log("Datos del formulario:", data);
    // TODO: Conectar con el Server Action para crear la suscripción
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="*Nombre de la suscripción:"
        placeholder="Ej: Netflix, Spotify..."
        {...register("name")}
        error={errors.name?.message}
      />

      {/* Fila con Precio y Divisa */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="*Precio:"
          type="number"
          step="0.01"
          placeholder="14.99"
          {...register("price")}
          error={errors.price?.message}
        />
        <div className="space-y-1">
          <label className="block text-base font-bold text-white ml-1">
            *Divisa:
          </label>
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  className={cn(errors.currency ? "ring-2 ring-red-500" : "")}
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
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-base font-bold text-white ml-1">
            *Ciclo de facturación:
          </label>
          <Controller
            name="billingCycle"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  className={cn(
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
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="*Fecha de primer pago:"
              date={field.value ? new Date(field.value) : undefined}
              onChange={(date) => {
                field.onChange(date ? date.toISOString().split("T")[0] : "");
              }}
              error={errors.startDate?.message}
            />
          )}
        />
      </div>

      {/* Selector de Color */}
      <div className="space-y-2">
        <label className="block text-base font-bold text-white ml-1">
          Color de etiqueta:
        </label>
        <div className="flex flex-wrap gap-3 justify-center bg-brand-pale/50 p-4 rounded-2xl border border-brand-dark/5">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setValue("color", color, { shouldValidate: true })}
              className={cn(
                "w-8 h-8 rounded-full transition-all flex items-center justify-center shadow-sm",
                selectedColor === color
                  ? "scale-110 ring-2 ring-white ring-offset-2 ring-offset-brand-primary"
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
        <label className="block text-base font-bold text-white ml-1">
          Notas adicionales:
        </label>
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
          // Aplicamos los estilos del Figma directamente
          className="bg-brand-light text-brand-dark hover:brightness-105 w-full md:w-auto px-3 py-3"
        >
          Añadir suscripción
        </Button>
      </div>
    </form>
  );
}
