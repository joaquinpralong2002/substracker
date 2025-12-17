import { LoginForm } from "@/features/auth/components/LoginForm";
import Link from "next/link";
import { SubscriptionLogo } from "@/components/SubscriptionLogo";
import { CreditCard, Wallet, Banknote, CircleDollarSign } from "lucide-react";

export default function LoginPage() {
  return (
    // 1. CONTENEDOR PRINCIPAL
    <main className="min-h-screen w-full flex items-center justify-center p-4 bg-brand-dark md:bg-background transition-colors duration-300 relative overflow-hidden">
      {/* CAPA DE FONDO DECORATIVA (Solo Desktop) */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <CreditCard
          className="absolute top-[20%] left-[10%] w-24 h-24 text-brand-dark -rotate-12"
          strokeWidth={1.5}
        />
        <CircleDollarSign
          className="absolute bottom-[25%] left-[15%] w-20 h-20 text-brand-dark rotate-12"
          strokeWidth={1.5}
        />
        <Banknote
          className="absolute top-[30%] right-[12%] w-28 h-28 text-brand-dark rotate-6"
          strokeWidth={1.5}
        />
        <Wallet
          className="absolute bottom-[15%] right-[20%] w-24 h-24 text-brand-dark -rotate-12"
          strokeWidth={1.5}
        />
      </div>

      {/* TARJETA CENTRAL */}
      <div className="w-full max-w-lg md:bg-brand-dark md:p-12 md:rounded-4xl md:shadow-2xl z-10 relative">
        {/* HEADER: Logo y Título */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="mb-6">
            <SubscriptionLogo size={100} />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Iniciar sesión
          </h1>
          <p className="text-brand-pale/70 mt-2 text-sm">
            Ingresa para gestionar tus suscripciones
          </p>
        </div>

        {/* FORMULARIO */}
        <LoginForm />

        {/* FOOTER: Link a Registro */}
        <div className="mt-8 text-center">
          <p className="text-brand-pale/80 text-sm">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/registro"
              className="text-brand-light font-bold hover:text-white transition-colors hover:underline decoration-2 underline-offset-4"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
