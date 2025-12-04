# Proyecto: Gestor de Suscripciones (SubsTracker)

## Requisitos funcionales (Historias de usuario)

### Módulo 1: Gestión de Usuarios (Autenticación)

El sistema debe permitir a los usuarios tener cuentas privadas.

- **HU-1 (Registro):** **Como** un usuario nuevo, **quiero** poder crear una cuenta usando mi email y una contraseña, **para** poder guardar mis suscripciones de forma privada y segura.
- **HU-2 (Inicio de Sesión):** **Como** un usuario existente, **quiero** poder iniciar sesión con mi email y contraseña, **para** acceder a mi panel de suscripciones.
- **HU-3 (Cierre de Sesión):** **Como** un usuario con sesión iniciada, **quiero** poder cerrar mi sesión, **para** proteger mi información en un dispositivo compartido.

### Módulo 2: Gestión de Suscripciones

- **HU-4 (Añadir Suscripción - MVP):** **Como** usuario, **quiero** poder añadir una nueva suscripción detallando su **nombre** (ej. "Netflix"), **precio**, **divisa** (ej. USD, ARS, EUR) y **fecha del primer pago**.
- **HU-5 (Definir Ciclo de Facturación):** **Como** usuario, al añadir una suscripción, **quiero** poder especificar el **ciclo de facturación** (ej. Mensual, Anual, Único), **para** que el sistema calcule correctamente las fechas de renovación futuras.
- **HU-6 (Listar Suscripciones):** **Como** usuario, **quiero** ver una lista de todas mis suscripciones activas, **para** tener un vistazo general de todos mis gastos.
- **HU-7 (Editar Suscripción):** **Como** usuario, **quiero** poder editar los detalles de una suscripción existente (ej. el precio subió), **para** mantener mi información actualizada.
- **HU-8 (Cancelar/Eliminar Suscripción):** **Como** usuario, **quiero** poder marcar una suscripción como "Cancelada" o eliminarla, **para** que deje de contar en mis gastos futuros.

### Módulo 3: Dashboard (Visualización de Gastos)

- **HU-9 (Ver Gasto Total Mensual - MVP):** **Como** usuario, **quiero** ver en un _dashboard_ el **costo total de mis suscripciones por mes**, **para** entender rápidamente cuánto dinero estoy gastando recurrentemente.
- **HU-10 (Ver Próximas Renovaciones):** **Como** usuario, **quiero** ver una lista de mis próximas renovaciones ordenadas por fecha (ej. "Próximos 30 días"), **para** saber qué pagos se acercan.
- **HU-11 (Ver Gasto Total Anual):** **Como** usuario, **quiero** poder ver un cálculo de mi gasto total anualizado, **para** tomar conciencia del impacto a largo plazo de mis suscripciones.

### Módulo 4: Recordatorios y Notificaciones (La función "estrella")

- **HU-12 (Recordatorio por Email - MVP):** **Como** usuario, **quiero** recibir un recordatorio por email 3 días antes de que se renueve una suscripción, **para** tener tiempo de decidir si quiero cancelarla.
- **HU-13 (Configurar Días de Recordatorio):** **Como** usuario, **quiero** poder configurar (al añadir o editar una suscripción) cuántos días de antelación quiero recibir el recordatorio (ej. 1, 3, 7 días), **para** ajustar las notificaciones a mis preferencias.

## Listado de tareas

Tarea Descripción Estado Prioridad Requerimiento asociado
[Diseño] Diseñar la pantalla de 'Registro de Usuario' en Figma. (campos: email, contraseña, confirmar contraseña) Hecho Alta HU-1
Backlog (Ideas)
[Diseño] Diseñar la pantalla de 'Inicio de Sesión'. (campos: email, contraseña, enlace "¿Olvidaste tu contraseña?") Hecho Alta HU-2
[Diseño] Definir los mensajes de error. (ej. "Contraseñas no coinciden", "Email ya existe", "Datos incorrectos") Por Hacer Media HU-1, HU-2
[Diseño] Diseñar el estado 'autenticado' en la barra de navegación. (ej. un ícono de perfil con un menú desplegable que incluya "Cerrar Sesión") Hecho Baja HU-1, HU-2, HU-3
[Base de Datos] Definir y crear el modelo/tabla 'Usuario'. (campos: id, email, password_hash) Por Hacer Alta HU-1, HU-2, HU-3
[Backend] Investigar y elegir un método de autenticación (Recomendado: JWT - JSON Web Tokens - o sesiones basadas en cookies). Por Hacer Alta HU-1, HU-2, HU-3
[Backend] Configurar la lógica de seguridad para hashear contraseñas ej. usando la librería bcrypt Por Hacer Alta HU-1, HU-2, HU-3
[Backend] Crear el endpoint API para 'Registro' (POST /api/auth/register) que valide datos, verifique si el email ya existe, hashee la contraseña y cree el usuario. Por Hacer Alta HU-1
[Backend] Crear el endpoint API para 'Inicio de Sesión' (POST /api/auth/login) que valide datos, encuentre al usuario, compare la contraseña hasheada y genere un token/sesión. Por Hacer Alta HU-2
[Backend] Crear el endpoint API para 'Cierre de Sesión' (POST /api/auth/logout) que invalide el token o destruya la sesión. Por Hacer Media HU-3
[Frontend] Crear la página/componente de 'Registro' con su formulario (basado en el diseño de Figma). Por Hacer Alta HU-1
[Frontend] Crear la página/componente de 'Inicio de Sesión' con su formulario. Por Hacer Alta HU-2
[Frontend] Implementar la lógica de validación de formularios en el cliente (ej. "campo requerido", "email no válido"). Por Hacer Alta HU-1, HU-2
[Frontend] Conectar el formulario de 'Registro' con el endpoint API /api/auth/register y gestionar la respuesta (éxito o error). Por Hacer Alta HU-1
[Frontend] Conectar el formulario de 'Inicio de Sesión' con el endpoint API /api/auth/login y gestionar la respuesta. Por Hacer Alta HU-2
[Frontend] Crear un 'Estado Global' o 'Contexto' (AuthContext) para almacenar si el usuario está autenticado y guardar su token/información. Por Hacer Alta HU-1, HU-2, HU-3
[Frontend] Implementar la lógica de 'Cierre de Sesión' en el botón (limpiar el AuthContext, borrar el token y llamar al endpoint /api/auth/logout). Por Hacer Media HU-3
[Frontend] Crear el sistema de 'Rutas Protegidas' (Protected Routes) que redirija al usuario a '/login' si intenta acceder al dashboard sin estar autenticado. Por Hacer Alta HU-1, HU-2, HU-3
[Base de Datos] Definir/Ampliar el modelo 'Suscripcion' (campos: userId, nombre, precio, divisa, fecha_primer_pago, ciclo_facturacion). Por Hacer Alta HU-4, HU-5
[Diseño] Diseñar el formulario/modal 'Añadir Nueva Suscripción' (incluir todos los campos de HU-4 y HU-5). Hecho Alta HU-4, HU-5
[Backend] Crear el endpoint API (POST /api/suscripciones) para guardar una nueva suscripción. (validar datos y asociar al usuario autenticado) Por Hacer Alta HU-4, HU-5
[Frontend] Crear el componente 'SuscripcionForm' (React) con validaciones de cliente. Por Hacer Alta HU-4, HU-5
[Frontend] Implementar selectores (dropdown) para 'Divisa' (USD, EUR, etc.) y 'Ciclo de Facturación' (Mensual, Anual, Único). Por Hacer Media HU-4, HU-5
[Frontend] Conectar el 'SuscripcionForm' al endpoint API (POST /api/suscripciones) y gestionar la respuesta (éxito/error). Por Hacer Alta HU-4, HU-5
[Diseño] Diseñar el 'Dashboard' principal: un área de 'Sumario' (HU-9) y la 'Lista de Suscripciones' (HU-6). Hecho Alta HU-6, HU-9
[Diseño] Diseñar el componente 'TarjetaSuscripcion' (Card) para mostrar los datos clave de cada ítem de la lista (nombre, precio, próxima renovación). Hecho Alta HU-6
[Backend] Crear la lógica/función que calcule el 'Gasto Total Mensual' (sumando mensuales + (anuales/12)). Por Hacer Alta HU-9
[Backend] Crear el endpoint API (GET /api/suscripciones) que devuelva la lista de suscripciones del usuario Y el cálculo del gasto total mensual (HU-9). Por Hacer Alta HU-6, HU-9
[Frontend] Crear la página/componente 'Dashboard' que llame al endpoint (GET /api/suscripciones) al cargar. Por Hacer Alta HU-6, HU-9
[Frontend] Crear el componente 'SumarioGastos' (o 'DashboardHeader') que muestre el Gasto Total Mensual recibido de la API. Por Hacer Alta HU-9
[Frontend] Crear el componente 'ListaSuscripciones' que reciba el array de suscripciones y renderice una 'TarjetaSuscripcion' por cada una. Por Hacer Alta HU-6

## Paleta de colores y fuente de texto

- #114B5F

- #1A936F

- #88D498

- #C6DABF

- #F3E9D2

- Fuente de texto: Inter

## Stack tecnológico

**Core & Frontend**

- **Framework:** **Next.js** (App Router).
- **Lenguaje:** **TypeScript**.
- **Estilos:** **Tailwind CSS**.
- **Iconos:** **Lucide React**

**Backend & Datos**

- **API:** **Next.js API Routes** (Serverless functions).
- **Base de Datos:** **PostgreSQL**.
- **ORM:** **Prisma**.
- **Validación:** **Zod**.

**Seguridad (Auth)**

- **Encriptación:** **Bcryptjs**.
- **Sesiones:** **JWT** (JSON Web Tokens).

**Herramientas**

- **Diseño:** **Figma**.
- **Control de Versiones:** **Git/GitHub**.
- **Despliegue:** **Vercel**.

## Estructura de carpetas

- Basada en Features.
