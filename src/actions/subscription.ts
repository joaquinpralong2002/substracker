"use server";

import prisma from "@/lib/prisma";
import { subscriptionSchema } from "@/lib/schemas/subscription";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { revalidatePath } from "next/cache";

// Tipos de respuesta para el cliente
export type ActionState = {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  inputs?: Record<string, string>;
};

export async function createSubscriptionAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data = Object.fromEntries(formData.entries()) as Record<string, string>;

  try {
    // 1. Obtener usuario autenticado desde la cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (!token) {
      return {
        success: false,
        error: "Debes iniciar sesión para realizar esta acción.",
      };
    }

    // Verificar y decodificar el token
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "secret-key-dev"
    );
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId as string;

    // 2. Validar datos con Zod
    const validation = subscriptionSchema.safeParse(data);

    if (!validation.success) {
      return {
        success: false,
        error: "Error de validación",
        fieldErrors: validation.error.flatten().fieldErrors,
        inputs: data,
      };
    }

    const { name, price, currency, billingCycle, startDate, color, notes } =
      validation.data;

    // 3. Calcular próxima fecha de pago (Lógica de Negocio)
    let nextPaymentDate: Date | null = null;
    const start = new Date(startDate);

    if (billingCycle !== "Unico") {
      nextPaymentDate = new Date(start);
      // Sumamos meses según el ciclo
      switch (billingCycle) {
        case "Mensual":
          nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
          break;
        case "Trimestral":
          nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 3);
          break;
        case "Semestral":
          nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 6);
          break;
        case "Anual":
          nextPaymentDate.setFullYear(nextPaymentDate.getFullYear() + 1);
          break;
      }
    }

    // 4. Guardar en Base de Datos
    await prisma.subscription.create({
      data: {
        userId,
        name,
        price,
        currency,
        billingCycle,
        startDate: start,
        nextPaymentDate,
        color: color || "#1A936F", // Default verde si no viene
        notes,
      },
    });

    // 5. Revalidar el Dashboard para mostrar la nueva suscripción
    revalidatePath("/dashboard");

    return { success: true, message: "Suscripción añadida correctamente." };
  } catch (error) {
    console.error("Error creando suscripción:", error);
    return {
      success: false,
      error: "Error interno al guardar la suscripción.",
    };
  }
}