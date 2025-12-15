import { RegisterForm } from "@/features/auth/components/RegisterForm";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  return (
    // 1. CONTENEDOR PRINCIPAL
    // Mobile: Fondo Azul Oscuro (brand-dark)
    // Desktop: Fondo Beige (background)
    <main className="min-h-screen w-full flex items-center justify-center p-4 bg-brand-dark md:bg-background transition-colors duration-300">
      {/* 2. TARJETA (Solo visible como tarjeta en Desktop) 
         - Mobile: Ancho completo, transparente.
         - Desktop: Ancho fijo, fondo azul, bordes redondeados, sombra.
      */}
      <div className="w-full max-w-lg md:bg-brand-dark md:p-12 md:rounded-4xl md:shadow-2xl">
        {/* HEADER: Logo y Título */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="mb-6">
            <Image src="/logo.svg" alt="Logo" width={100} height={100} />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Crea tu cuenta
          </h1>
          {/* Subtítulo opcional para balancear */}
          {/* <p className="text-brand-pale/70 mt-2 text-sm">Comienza a controlar tus gastos hoy</p> */}
        </div>

        {/* FORMULARIO */}
        <RegisterForm />

        {/* FOOTER: Link a Login */}
        <div className="mt-8 text-center">
          <p className="text-brand-pale/80 text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/login"
              className="text-brand-light font-bold hover:text-white transition-colors hover:underline decoration-2 underline-offset-4"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
