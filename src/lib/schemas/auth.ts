import { z } from "zod";

// ----------------------------------------------------------------------
// SCHEMA: REGISTRO
// Adaptado para coincidir con el input visual y el modelo User de Prisma
// ----------------------------------------------------------------------
export const registerSchema = z
  .object({
    name: z
      .string()
      .trim() // 1. IMPORTANTE: Elimina espacios al inicio y final primero
      .min(5, "El nombre completo debe tener al menos 5 caracteres")
      .refine((val) => val.includes(" "), {
        // 2. Lógica: Si no tiene un espacio intermedio, falla
        message: "Por favor, ingresa tu nombre y apellido",
      }),

    email: z.email().trim().toLowerCase(),

    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .max(100, { message: "La contraseña es demasiado larga" }) // Protección contra DoS
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message: "Debe contener al menos un número y un carácter especial",
      }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// ----------------------------------------------------------------------
// SCHEMA: LOGIN
// Simple y directo. No revelamos reglas de complejidad aquí por seguridad.
// ----------------------------------------------------------------------
export const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),

  password: z.string().min(1, { message: "La contraseña es requerida" }),
});

// ----------------------------------------------------------------------
// TIPOS INFERIDOS (TypeScript)
// Úsalos en tus formularios de React (React Hook Form)
// ----------------------------------------------------------------------
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
