import { flattenError, z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL es requerido"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET es requerido"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  const flattened = flattenError(_env.error);
  console.error("Variables de entorno inválidas:", flattened.fieldErrors);
  throw new Error("Variables de entorno inválidas");
}

export const env = _env.data;
