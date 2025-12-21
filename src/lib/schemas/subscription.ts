import { z } from "zod";

export const CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "SEK",
  "NZD",
  "ARS",
] as const;

export const BILLING_CYCLES = [
  "Mensual",
  "Trimestral",
  "Semestral",
  "Anual",
  "Unico",
] as const;

export const COLORS = [
  "#1A936F",
  "#114B5F",
  "#E50914",
  "#1DB954",
  "#00A4EF",
  "#FF4500",
  "#6441A5",
] as const; // Verde, Azul, Netflix Red, Spotify Green, etc.

export const subscriptionSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio").max(100),
  price: z.coerce
    .number({ error: "Debe ser un número" })
    .min(0.01, "El precio debe ser mayor a 0")
    .max(999999.99, "El precio excede el límite permitido"),
  currency: z.enum(CURRENCIES, { error: "Selecciona una divisa válida" }),
  billingCycle: z.enum(BILLING_CYCLES, {
    error: "Selecciona un ciclo de facturación",
  }),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    error: "Fecha inválida",
  }),
  color: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}){1,2}$/, "Formato de color inválido")
    .optional(),
  notes: z.string().trim().max(500, "Las notas son muy largas").optional(),
});

export type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;
