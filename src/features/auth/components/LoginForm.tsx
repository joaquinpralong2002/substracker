"use client";

import { useActionState, useState } from "react";
import { loginAction } from "@/actions/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Mail, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const initialState = {
  success: false,
  error: "",
  fieldErrors: {},
};

export function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, initialState);
  const [showPass, setShowPass] = useState(false);

  return (
    <form action={action} className="space-y-6 w-full">
      {/* Mensaje de Error Global */}
      {state?.error && (
        <div className="bg-red-500/25 border border-red-500 text-white p-3 rounded-2xl text-sm text-center font-medium">
          {state.error}
        </div>
      )}

      <div className="space-y-5">
        <Input
          label="Correo electrónico:"
          name="email"
          type="email"
          placeholder="Ej: luisperez@gmail.com"
          icon={<Mail size={20} />}
          error={state?.fieldErrors?.email}
          defaultValue={state?.inputs?.email}
        />

        <div className="space-y-2">
          <Input
            label="Contraseña:"
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="********"
            icon={showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            onIconClick={() => setShowPass(!showPass)}
            error={state?.fieldErrors?.password}
          />

          {/* Link de recuperación */}
          <div className="flex justify-end px-1">
            <Link
              href="/forgot-password"
              className="text-xs text-brand-pale/80 hover:text-white transition-colors font-medium"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <Button type="submit" isLoading={isPending}>
          Iniciar sesión
        </Button>
      </div>
    </form>
  );
}
