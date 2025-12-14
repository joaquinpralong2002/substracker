import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Mail, Lock } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-white text-3xl font-bold text-center mb-8">
          Prueba de Componentes
        </h1>

        {/* Inputs */}
        <Input
          label="Correo electrónico"
          placeholder="Ej: usuario@email.com"
          icon={<Mail size={20} />}
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="********"
          icon={<Lock size={20} />}
        />

        {/* Botón (Debe tener el mismo ancho y alto visual que los inputs) */}
        <div className="pt-4">
          <Button isLoading={false}>Registrarse</Button>
        </div>
      </div>
    </div>
  );
}
