import Image from "next/image";

export default function Home() {
  return (
    // 1. Usamos bg-background (tu beige #F3E9D2)
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      {/* 2. Usamos text-brand-dark (tu azul oscuro #114B5F) */}
      <h1 className="text-4xl font-bold text-brand-dark mb-4">SubsTracker</h1>

      <p className="text-brand-dark mb-8">
        Probando la paleta de colores de Figma
      </p>

      {/* 3. Usamos bg-brand-primary (tu verde #1A936F) */}
      <button className="bg-brand-primary px-6 py-3 text-white">Botón de Prueba</button>
    </main>
  );
}
