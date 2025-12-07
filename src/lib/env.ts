import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL es requerido"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET es requerido"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(
    "❌ Variables de entorno inválidas:",
    JSON.stringify(_env.error.format(), null, 2)
  );
  throw new Error("Variables de entorno inválidas");
}

export const env = _env.data;
