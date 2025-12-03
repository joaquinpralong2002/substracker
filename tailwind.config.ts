import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#114B5F", // El azul oscuro (Fondo de tarjetas, Textos)
          primary: "#1A936F", // El verde principal (Botones, Acciones)
          light: "#88D498", // Verde claro (Acentos, Links)
          pale: "#C6DABF", // Verde pálido (Inputs, Bordes suaves)
        },
        background: "#F3E9D2", // El Beige/Crema (Fondo de la app)

        // Colores de estado (para errores y alertas)
        danger: "#B91C1C", // Rojo estándar para errores
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
