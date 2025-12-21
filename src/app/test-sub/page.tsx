import { SubscriptionForm } from "@/features/subscriptions/components/SubscriptionForm";

export default function TestSubscriptionPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Simulación del Contenedor/Modal */}
      <div className="w-full max-w-lg bg-white/50 backdrop-blur-sm border border-brand-dark/10 p-8 rounded-[32px] shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-brand-dark mb-5">
          Añadir una suscripción
        </h1>

        {/* El Formulario */}
        <SubscriptionForm />
      </div>
    </div>
  );
}
