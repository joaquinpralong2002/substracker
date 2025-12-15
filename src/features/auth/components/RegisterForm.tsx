"use client";

import { useActionState, useState } from "react";
import { registerAction } from "@/actions/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { User, Mail, Eye, EyeOff } from "lucide-react";

const initialState = {
  success: false,
  error: "",
  fieldErrors: {},
};

export function RegisterForm() {
  const [state, action, isPending] = useActionState(
    registerAction,
    initialState
  );

  // Estados para controlar la visibilidad de las contraseñas
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  return (
    <form action={action} className="space-y-6 w-full">
      {/* Mensaje de Error Global (si falla el servidor) */}
      {state?.error && !state.success && (
        <div className="bg-red-500/25 border border-red-500 text-white p-3 rounded-2xl text-sm text-center font-medium">
          {state.error}
        </div>
      )}

      {/* Mensaje de Éxito */}
      {state?.success && (
        <div className="bg-green-500/20 border border-green-500/50 text-green-100 p-3 rounded-2xl text-sm text-center font-medium">
          {state.message}
        </div>
      )}

      <div className="space-y-5">
        <Input
          label="Nombre completo:"
          name="name"
          placeholder="Ej: Luis Pérez"
          icon={<User size={20} />}
          error={state?.fieldErrors?.name}
          defaultValue={state?.inputs?.name}
        />

        <Input
          label="Correo electrónico:"
          name="email"
          type="email"
          placeholder="Ej: luisperez@gmail.com"
          icon={<Mail size={20} />}
          error={state?.fieldErrors?.email}
          defaultValue={state?.inputs?.email}
        />

        <Input
          label="Contraseña:"
          name="password"
          type={showPass ? "text" : "password"}
          placeholder="********"
          icon={showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          onIconClick={() => setShowPass(!showPass)}
          error={state?.fieldErrors?.password}
        />

        <Input
          label="Confirmar contraseña:"
          name="confirmPassword"
          type={showConfirmPass ? "text" : "password"}
          placeholder="********"
          icon={showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
          onIconClick={() => setShowConfirmPass(!showConfirmPass)}
          error={state?.fieldErrors?.confirmPassword}
        />
      </div>

      <div className="pt-6">
        <Button type="submit" isLoading={isPending}>
          Registrarse
        </Button>
      </div>
    </form>
  );
}
