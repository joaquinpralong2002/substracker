import { SubscriptionRow } from "./SubscriptionRow";
import { ArrowUpDown } from "lucide-react";

// Datos dummy para probar visualmente (luego vendrán de la BD)
const MOCK_SUBSCRIPTIONS = [
  {
    id: "1",
    name: "Netflix",
    price: 20.0,
    currency: "USD",
    billingCycle: "Mensual",
    nextPaymentDate: "2025-11-10",
    color: "#B91C1C", // Rojo Netflix
  },
  {
    id: "2",
    name: "Spotify",
    price: 10.0,
    currency: "USD",
    billingCycle: "Mensual",
    nextPaymentDate: "2025-11-15",
    color: "#1A936F", // Verde Spotify
  },
];

export function SubscriptionList() {
  return (
    <div className="w-full overflow-x-auto">
      {/* Contenedor con ancho mínimo para evitar que se rompa en pantallas medianas */}
      <div className="min-w-[800px]">
        {/* HEADER DE LA TABLA (Barra Verde) */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-brand-primary text-white rounded-t-2xl text-sm font-bold items-center">
          {/* Col 1: Suscripción */}
          <div className="col-span-4 flex items-center gap-2">
            <input
              type="checkbox"
              className="w-5 h-5 accent-white cursor-pointer opacity-50 hover:opacity-100"
            />
            <span>Suscripción</span>
            <ArrowUpDown
              size={14}
              className="opacity-70 cursor-pointer hover:opacity-100"
            />
          </div>

          {/* Col 2: Precio */}
          <div className="col-span-2 flex items-center gap-1 cursor-pointer hover:opacity-80">
            <span>Precio</span>
            <ArrowUpDown size={14} className="opacity-70" />
          </div>

          {/* Col 3: Ciclo */}
          <div className="col-span-2 flex items-center gap-1 cursor-pointer hover:opacity-80">
            <span>Ciclo</span>
            <ArrowUpDown size={14} className="opacity-70" />
          </div>

          {/* Col 4: Próxima renovación */}
          <div className="col-span-3 flex items-center gap-1 cursor-pointer hover:opacity-80">
            <span>Próxima renovación</span>
            <ArrowUpDown size={14} className="opacity-70" />
          </div>

          {/* Col 5: Espacio vacío para el menú de acciones */}
          <div className="col-span-1"></div>
        </div>

        {/* CUERPO DE LA TABLA (Filas) */}
        <div className="bg-brand-pale/30 rounded-b-[32px] border-x border-b border-brand-primary/20">
          {MOCK_SUBSCRIPTIONS.map((sub) => (
            <SubscriptionRow key={sub.id} subscription={sub} />
          ))}

          {/* Mensaje si no hay datos (Opcional) */}
          {MOCK_SUBSCRIPTIONS.length === 0 && (
            <div className="p-8 text-center text-brand-dark/50">
              No tienes suscripciones activas.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
