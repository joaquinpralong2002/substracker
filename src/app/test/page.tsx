"use client"; // Componente Cliente para poder usar console.log en el navegador

import { registerAction, loginAction, logoutAction } from "@/actions/auth";

export default function TestPage() {
  // Wrapper para ver la respuesta del servidor en la consola del navegador
  async function handleRegister(formData: FormData) {
    const result = await registerAction({ success: false }, formData);
    console.log("Respuesta Registro:", result);
    if (result.success) alert("✅ Registro Exitoso: " + result.message);
    else alert("❌ Error Registro: " + result.error);
  }

  async function handleLogin(formData: FormData) {
    const result = await loginAction({ success: false }, formData);
    console.log("Respuesta Login:", result);
    if (!result?.success && result?.error)
      alert("❌ Error Login: " + result.error);
    // Si es exitoso, loginAction hace redirect, así que la página cambiará
  }

  return (
    <div className="p-10 space-y-8 bg-gray-100 min-h-screen text-black">
      <h1 className="text-2xl font-bold">🧪 Laboratorio de Pruebas</h1>

      {/* FORMULARIO DE REGISTRO */}
      <div className="border p-5 bg-white rounded">
        <h2 className="font-bold mb-4">Prueba 1: Registro</h2>
        <form action={handleRegister} className="flex flex-col gap-3 max-w-sm">
          <input
            name="name"
            defaultValue="Juan Perez"
            placeholder="Nombre (con espacio)"
            className="border p-2"
          />
          <input
            name="email"
            defaultValue="juan@test.com"
            placeholder="Email"
            className="border p-2"
          />
          <input
            name="password"
            defaultValue="Password123@"
            placeholder="Pass (Min 8, Num, Simbolo)"
            className="border p-2"
          />
          <input
            name="confirmPassword"
            defaultValue="Password123@"
            placeholder="Confirmar Pass"
            className="border p-2"
          />
          <button className="bg-blue-500 text-white p-2">
            Probar Registro
          </button>
        </form>
      </div>

      {/* FORMULARIO DE LOGIN */}
      <div className="border p-5 bg-white rounded">
        <h2 className="font-bold mb-4">Prueba 2: Login (Generar Cookie)</h2>
        <form action={handleLogin} className="flex flex-col gap-3 max-w-sm">
          <input
            name="email"
            defaultValue="juan@test.com"
            placeholder="Email"
            className="border p-2"
          />
          <input
            name="password"
            defaultValue="Password123@"
            placeholder="Password"
            className="border p-2"
          />
          <button className="bg-green-500 text-white p-2">Probar Login</button>
        </form>
      </div>

      {/* LOGOUT */}
      <div className="border p-5 bg-white rounded">
        <h2 className="font-bold mb-4">Prueba 3: Logout</h2>
        <form action={logoutAction}>
          <button className="bg-red-500 text-white p-2">Cerrar Sesión</button>
        </form>
      </div>
    </div>
  );
}
