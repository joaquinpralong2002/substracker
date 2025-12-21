"use client";

import { useState } from "react";
import {
  Wallet,
  ListChecks,
  CalendarDays,
  ArrowUp,
  Clock,
  Search,
  Plus,
} from "lucide-react";
import { AddSubscriptionModal } from "@/features/subscriptions/components/AddSubscriptionModal";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative">
      {/* 1. HEADER: Saludo */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-brand-dark">
          Buenas tardes, Joaquín.
        </h1>
      </div>

      {/* 2. KPI CARDS (Resumen) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Card 1: Gasto Mensual */}
        <div className="bg-brand-primary rounded-[24px] p-6 text-white shadow-lg shadow-brand-primary/20 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
              <Wallet size={18} />
              <span>Gasto mensual total</span>
            </div>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold">$ 22.000</span>
            <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full mb-1">
              <ArrowUp size={12} />
              <span>+$69.420</span>
            </div>
          </div>
        </div>

        {/* Card 2: Suscripciones Activas */}
        <div className="bg-brand-primary rounded-[24px] p-6 text-white shadow-lg shadow-brand-primary/20">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
              <ListChecks size={18} />
              <span>Suscripciones activas</span>
            </div>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold">7</span>
            <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full mb-1">
              <ArrowUp size={12} />
              <span>+2</span>
            </div>
          </div>
        </div>

        {/* Card 3: Próximo Vencimiento */}
        <div className="bg-brand-primary rounded-[24px] p-6 text-white shadow-lg shadow-brand-primary/20">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
              <CalendarDays size={18} />
              <span>Próximo vencimiento</span>
            </div>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold truncate">Netflix</span>
            <div className="flex items-center gap-1 text-xs bg-brand-light text-brand-dark px-2 py-1 rounded-full mb-1 font-bold">
              <Clock size={12} />
              <span>3 días</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. LISTA DE SUSCRIPCIONES (Contenedor Verde Claro) */}
      <div className="bg-brand-light/30 border border-brand-primary/20 rounded-[32px] p-6 min-h-[400px]">
        {/* Header de la Lista (Buscador + Botón) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-brand-dark self-start md:self-center">
            Tus suscripciones
          </h2>

          <div className="flex gap-3 w-full md:w-auto">
            {/* Buscador */}
            <div className="relative flex-1 md:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dark/50"
                size={20}
              />
              <input
                type="text"
                placeholder="Búsqueda"
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-brand-pale/50 border border-brand-dark/10 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-dark placeholder:text-brand-dark/50"
              />
            </div>

            {/* Botón Añadir (Solo Desktop) */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden md:flex items-center gap-2 bg-brand-primary text-white px-4 py-2 rounded-xl font-bold hover:brightness-110 transition-all shadow-md"
            >
              <Plus size={20} />
              Añadir suscripción
            </button>
          </div>
        </div>

        {/* Placeholder de la lista (Aquí irán los items luego) */}
        <div className="flex flex-col items-center justify-center h-64 text-brand-dark/40 text-center">
          <p>Aquí aparecerá tu lista de suscripciones...</p>
        </div>
      </div>

      {/* 4. FAB (Floating Action Button) - Solo Mobile */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-brand-primary text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        <Plus size={32} />
      </button>

      {/* 5. MODAL DE AÑADIR SUSCRIPCIÓN */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
          <AddSubscriptionModal onClose={() => setIsModalOpen(false)} />
        </div>
      )}
    </div>
  );
}
