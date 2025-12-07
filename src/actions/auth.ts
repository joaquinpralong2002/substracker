"use server";

import prisma from "@/lib/prisma";
import { registerSchema, loginSchema } from "@/lib/schemas/auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

// Definimos un tipo para el estado de respuesta (útil para el frontend)
export type ActionState = {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

// ----------------------------------------------------------------------
// ACCIÓN: REGISTRO DE USUARIO
// ----------------------------------------------------------------------
export async function registerAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // 1. Convertir FormData a un objeto plano
  const data = Object.fromEntries(formData.entries());

  const validation = registerSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: "Datos de entrada inválidos." };
  }

  try {
    // 2. Validar datos con Zod (Usa archivo schemas/auth.ts)
    const parsed = registerSchema.parse(data);

    // 3. Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: parsed.email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "El correo electrónico ya está registrado.",
      };
    }

    // 4. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(parsed.password, 10);

    // 5. Crear el usuario en Base de Datos
    // NOTA: No enviamos confirmPassword a Prisma
    await prisma.user.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Cuenta creada exitosamente. Ahora puedes iniciar sesión.",
    };
  } catch (error) {
    // Manejo de errores de validación de Zod
    if (error instanceof ZodError) {
      return {
        success: false,
        error: "Error de validación",
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    console.error("Register Error:", error);
    return {
      success: false,
      error: "Hubo un error interno al crear la cuenta.",
    };
  }
}

// ----------------------------------------------------------------------
// ACCIÓN: INICIO DE SESIÓN
// ----------------------------------------------------------------------
export async function loginAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data = Object.fromEntries(formData.entries());

  // Validar datos básicos
  const validation = loginSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: "Datos de entrada inválidos." };
  }

  const { email, password } = validation.data;

  try {
    // 1. Buscar usuario
    const user = await prisma.user.findUnique({ where: { email } });

    // 2. Verificar credenciales (Usuario no existe O Password incorrecta)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { success: false, error: "Credenciales incorrectas." };
    }

    // 3. Generar Token JWT
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET no configurado.");

    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.name },
      secret,
      { expiresIn: "7d" } // Sesión de 7 días
    );

    // 4. Guardar Token en Cookie HTTP-Only
    // Esto hace que el JS del cliente NO pueda leer el token (protección XSS)
    (await cookies()).set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días en segundos
      path: "/",
    });
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, error: "Error al iniciar sesión." };
  }

  // 5. Redireccionar (Debe estar FUERA del try/catch)
  redirect("/dashboard");
}

// ----------------------------------------------------------------------
// ACCIÓN: CERRAR SESIÓN (Logout)
// ----------------------------------------------------------------------
export async function logoutAction() {
  (await cookies()).delete("session_token");
  redirect("/"); // O a /login
}
