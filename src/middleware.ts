import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Rutas protegidas (Usuario debe estar logueado)
const protectedRoutes = ["/dashboard", "/perfil"];

// Rutas de autenticación (Usuario NO debe estar logueado)
const authRoutes = ["/login", "/registro"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Obtener el token de la cookie correcta ("session_token")
  const token = request.cookies.get("session_token")?.value;

  // 2. Preparar el secreto
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  let isAuthenticated = false;

  // 3. Verificar el token
  if (token) {
    try {
      await jwtVerify(token, secret);
      isAuthenticated = true;
    } catch (error) {
      console.log("Token inválido o expirado", error);
    }
  }

  // -------------------------------------------------------------------
  // LÓGICA DE REDIRECCIÓN
  // -------------------------------------------------------------------

  // CASO A: Intento de acceso a ruta protegida sin sesión
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = "/login"; // Redirigir al login

      const response = NextResponse.redirect(url);

      // Limpiamos la cookie inválida si existía pero falló la verificación
      if (token) {
        response.cookies.delete("session_token");
      }

      return response;
    }
  }

  // CASO B: Usuario logueado intenta ir a Login/Registro
  if (authRoutes.includes(pathname)) {
    if (isAuthenticated) {
      // Lo mandamos al dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Si todo está bien, permitimos pasar
  return NextResponse.next();
}

// Configuración del Matcher para aplicar el middleware
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
