"use server";

import prisma from "@/lib/prisma";
import { registerSchema, loginSchema } from "@/lib/schemas/auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { flattenError } from "zod";
import { SignJWT } from "jose";

export type ActionState = {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  inputs?: {
    name?: string;
    email?: string;
  };
};

// ----------------------------------------------------------------------
// ACCIÓN: REGISTRO DE USUARIO
// ----------------------------------------------------------------------
export async function registerAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data = Object.fromEntries(formData.entries());

  const validation = registerSchema.safeParse(data);

  if (!validation.success) {
    const flattened = flattenError(validation.error);

    return {
      success: false,
      error: "Error de validación en los campos.",
      fieldErrors: flattened.fieldErrors,
      inputs: {
        name: data.name as string,
        email: data.email as string,
      },
    };
  }

  const { name, email, password } = validation.data;

  try {
    const existingUser = await prisma.appUser.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "Este correo electrónico ya está en uso.",
        inputs: { name, email },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.appUser.create({
      data: { name, email, password: hashedPassword },
    });

    return {
      success: true,
      message: "Cuenta creada exitosamente.",
    };
  } catch (error) {
    console.error("Register Error:", error);
    return {
      success: false,
      error: "Hubo un error interno al crear la cuenta.",
      inputs: { name, email },
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

  const validation = loginSchema.safeParse(data);

  if (!validation.success) {
    const flattened = flattenError(validation.error);
    return {
      success: false,
      error: "Credenciales inválidas.",
      fieldErrors: flattened.fieldErrors,
      inputs: {
        email: data.email as string,
      },
    };
  }

  const { email, password } = validation.data;

  try {
    const user = await prisma.appUser.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { success: false, error: "Credenciales incorrectas." };
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    if (!secret) throw new Error("JWT_SECRET no configurado.");

    const token = await new SignJWT({
      userId: user.id,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d") // Expira en 1 hora
      .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
      path: "/",
    });
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, error: "Error interno al iniciar sesión." };
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session_token");
  redirect("/");
}
