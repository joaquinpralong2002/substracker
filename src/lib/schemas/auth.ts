"use server";
import { z } from "zod";

// ----------------------------------------------------------------------
// SCHEMA: REGISTRO
// Adaptado para coincidir con el input visual y el modelo User de Prisma
// ----------------------------------------------------------------------
export const registerSchema = z
  .object({
    name: z
      .string()
      .trim() // Elimina espacios al inicio y final primero
      .min(5, "El nombre completo debe tener al menos 5 caracteres")
      .max(100, "El nombre es demasiado largo")
      .refine((val) => val.includes(" "), {
        error: "Por favor, ingresa tu nombre y apellido",
      })
      .refine((val) => val.split(" ").length >= 2, {
        message: "Ingresa al menos nombre y apellido",
      })
      .refine((val) => val.split(" ").every((part) => part.length > 0), {
        message: "El nombre no puede contener espacios múltiples",
      }),

    email: z.email().trim().toLowerCase(),

    password: z
      .string()
      .min(8, { error: "La contraseña debe tener al menos 8 caracteres" })
      .max(100, { error: "La contraseña es demasiado larga" })
      .regex(/[0-9]/, { error: "Debe contener al menos un número" })
      .regex(/[!@#$%^&*]/, {
        error: "Debe contener al menos un carácter especial",
      }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// ----------------------------------------------------------------------
// SCHEMA: LOGIN
// Simple y directo. No revelamos reglas de complejidad aquí por seguridad.
// ----------------------------------------------------------------------
export const loginSchema = z.object({
  email: z
    .email({ error: "Por favor, ingresa un correo electrónico válido" })
    .trim()
    .toLowerCase(),

  password: z.string().min(1, { error: "La contraseña es requerida" }),
});

// ----------------------------------------------------------------------
// TIPOS INFERIDOS (TypeScript)
// Úsalos en tus formularios de React (React Hook Form)
// ----------------------------------------------------------------------
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
