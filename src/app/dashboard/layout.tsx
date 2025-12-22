import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, LogOut, Menu } from "lucide-react";
import { LogoutDialog } from "@/features/auth/components/LogoutDialog";
import { SubscriptionLogo } from "@/components/SubscriptionLogo";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* --------------------------------------------------------- */}
      {/* 1. SIDEBAR (Solo Desktop)                                 */}
      {/* --------------------------------------------------------- */}
      <aside className="hidden md:flex w-64 flex-col bg-brand-dark text-white h-screen sticky top-0">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 bg-brand-primary/20 rounded-full flex items-center justify-center border border-brand-light/30">
            <SubscriptionLogo size={50} />
          </div>
          <span className="font-bold text-xl tracking-tight">SubsTracker</span>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 bg-white/10 text-brand-light rounded-xl font-medium transition-colors"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          {/* Aquí irían más links en el futuro (Perfil, Ajustes) */}
        </nav>

        {/* Footer Sidebar (Logout) */}
        <div className="p-4 border-t border-white/10">
          <LogoutDialog
            trigger={
              <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-300 hover:bg-white/5 rounded-xl transition-colors text-sm font-medium">
                <LogOut size={18} />
                Cerrar sesión
              </button>
            }
          />
        </div>
      </aside>

      {/* --------------------------------------------------------- */}
      {/* 2. NAVBAR (Solo Mobile)                                   */}
      {/* --------------------------------------------------------- */}
      <header className="md:hidden h-16 bg-brand-dark text-white flex items-center justify-between px-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary/20 rounded-full flex items-center justify-center border border-brand-light/30">
            <SubscriptionLogo />
          </div>
          <span className="font-bold text-lg">SubsTracker</span>
        </div>

        {/* Logout Mobile */}
        <LogoutDialog
          trigger={
            <button className="p-2 text-red-300">
              <LogOut size={24} />
            </button>
          }
        />
      </header>

      {/* --------------------------------------------------------- */}
      {/* 3. CONTENIDO PRINCIPAL (Dinámico)                         */}
      {/* --------------------------------------------------------- */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
        {children}
      </main>
    </div>
  );
}
