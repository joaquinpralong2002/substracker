# SubsTracker (Gestor de Suscripciones)

## Resumen del Proyecto

SubsTracker es una aplicación web diseñada para ayudar a los usuarios a gestionar sus suscripciones personales (Netflix, Spotify, etc.), visualizar gastos y recibir recordatorios de renovación. El proyecto se encuentra actualmente en fase de desarrollo inicial, con la estructura base de Next.js configurada.

## Documentación Clave

Para detalles completos sobre los requisitos funcionales, historias de usuario, y diseño planificado, consulta:

- [Documentación del Proyecto](substracker/docs/documentacion.md)

## Stack Tecnológico

### Actual

- **Frontend:** Next.js 16 (App Router), React 19
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **Iconos:** Lucide React

### Planificado (No implementado aún)

- **Base de Datos:** PostgreSQL
- **ORM:** Prisma
- **Validación:** Zod
- **Autenticación:** JWT, Bcryptjs

## Convenciones de Desarrollo

- **Idioma del Código:** Inglés (nombres de variables, funciones, componentes).
- **Idioma de Documentación/Comentarios:** Español.
- **Estilos:** Utilizar clases de utilidad de Tailwind CSS.
- **Estructura de Directorios:** `src/app` (App Router de Next.js).

## Comandos Principales

| Acción           | Comando         | Descripción                                               |
| :--------------- | :-------------- | :-------------------------------------------------------- |
| **Desarrollo**   | `npm run dev`   | Inicia el servidor de desarrollo en `localhost:3000`.     |
| **Construcción** | `npm run build` | Compila la aplicación para producción.                    |
| **Producción**   | `npm start`     | Inicia el servidor de producción (requiere build previo). |
| **Linting**      | `npm run lint`  | Ejecuta ESLint para verificar la calidad del código.      |

## Paleta de Colores (Referencia)

- **Dark Blue:** `#114B5F`
- **Primary Green:** `#1A936F`
- **Light Green:** `#88D498`
- **Pale Green:** `#C6DABF`
- **Beige:** `#F3E9D2`

## Estructura de carpetas

- Basada en Features.

## API

Utilizaremos Server Actions para las escrituras (POST/PUT/DELETE) y Server Components para las lecturas (GET).
