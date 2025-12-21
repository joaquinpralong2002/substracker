"use client";

import { ReactNode, useTransition } from "react";
import { logoutAction } from "@/actions/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface LogoutDialogProps {
  trigger: ReactNode;
}

export function LogoutDialog({ trigger }: LogoutDialogProps) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
          <AlertDialogDescription>
            Tendrás que volver a ingresar tus credenciales para acceder.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              handleLogout();
            }}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 text-white border-none"
          >
            {isPending ? "Saliendo..." : "Sí, cerrar sesión"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
