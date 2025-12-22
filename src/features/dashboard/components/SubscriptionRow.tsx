import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

// Definimos la interfaz basada en tu modelo de Prisma
interface SubscriptionRowProps {
  subscription: {
    id: string;
    name: string;
    price: number; // Prisma devuelve Decimal, pero al cliente llega como number/string
    currency: string;
    billingCycle: string;
    nextPaymentDate: Date | string | null;
    color?: string | null;
  };
}

export function SubscriptionRow({ subscription }: SubscriptionRowProps) {
  // 1. Formateador de Moneda
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("es-AR", {
      // O "en-US" según prefieras
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // 2. Formateador de Fecha (ej. "10 de noviembre, 2025")
  const formatDate = (date: Date | string | null) => {
    if (!date) return "N/A";
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="group flex items-center p-4 bg-brand-pale/20 border-b border-brand-dark/5 hover:bg-brand-pale/40 transition-colors last:rounded-b-[32px]">
      {/* GRID LAYOUT: Debe coincidir con el Header de la lista */}
      <div className="grid grid-cols-12 w-full items-center gap-4">
        {/* COL 1: Checkbox + Icono + Nombre (Span 4 cols) */}
        <div className="col-span-4 flex items-center gap-4">
          {/* Checkbox customizado simple */}
          <input
            type="checkbox"
            className="w-5 h-5 rounded border-brand-dark/20 text-brand-primary focus:ring-brand-light cursor-pointer accent-brand-primary"
          />

          {/* Icono de la Suscripción */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm shrink-0"
            style={{ backgroundColor: subscription.color || "#1A936F" }}
          >
            {subscription.name.charAt(0).toUpperCase()}
          </div>

          <span className="font-bold text-brand-dark truncate">
            {subscription.name}
          </span>
        </div>

        {/* COL 2: Precio (Span 2 cols) */}
        <div className="col-span-2 font-bold text-brand-dark">
          {formatCurrency(Number(subscription.price), subscription.currency)}
        </div>

        {/* COL 3: Ciclo (Span 2 cols) */}
        <div className="col-span-2 font-medium text-brand-dark">
          {subscription.billingCycle}
        </div>

        {/* COL 4: Próxima Renovación (Span 3 cols) */}
        <div className="col-span-3 font-medium text-brand-dark">
          {formatDate(subscription.nextPaymentDate)}
        </div>

        {/* COL 5: Acciones (Span 1 col - Alineado a la derecha) */}
        <div className="col-span-1 flex justify-end">
          <button className="p-2 text-brand-dark/70 hover:text-brand-dark hover:bg-brand-dark/10 rounded-full transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
