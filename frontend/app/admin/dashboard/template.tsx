"use client";

import React from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  MessageSquare,
  Settings,
  Plus,
  Search,
  Bell,
  Tent
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Réservations', icon: CalendarCheck, path: '/admin/dashboard/reservations' },
    { name: 'Camps', icon: Tent, path: '/admin/dashboard/camps' },
    { name: 'Messages', icon: MessageSquare, path: '/admin/dashboard/messages' },
    { name: 'Paramètres', icon: Settings, path: '/admin/dashboard/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[#fdfaf7]">
      {/* --- SIDEBAR GAUCHE --- */}
      <aside className="w-64 bg-white border-r border-[#f3ece7] flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#c4a484] rounded-xl flex items-center justify-center shadow-sm">
            <Tent className="text-white" size={24} />
          </div>
          <span className="text-xl font-black text-[#2d241e] tracking-tight">SunCamp</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                  isActive
                    ? 'bg-[#c4a484] text-white shadow-lg shadow-[#c4a484]/20'
                    : 'text-gray-500 hover:bg-[#fdf5ef] hover:text-[#c4a484]'
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#f3ece7]">
          <div className="flex items-center gap-3 p-2 bg-[#fdfaf7] rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-[#c4a484]/20 border border-[#c4a484]/10 overflow-hidden">
               {/* Image profil admin ici */}
            </div>
            <div>
              <p className="text-xs font-black text-[#2d241e]">Admin SunCamp</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        
        {/* HEADER FIXE */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-[#f3ece7] px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher une réservation, un enfant..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#fdfaf7] border border-[#f3ece7] rounded-xl outline-none focus:border-[#c4a484] transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 text-gray-500 hover:bg-[#fdfaf7] rounded-xl relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#c4a484] rounded-full border-2 border-white"></span>
            </button>
            <button className="bg-[#2d241e] hover:bg-[#4a3f35] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md text-sm">
              <Plus size={18} className="text-[#c4a484]" />
              Nouveau Camp
            </button>
          </div>
        </header>

        {/* ZONE DE CONTENU (Children) */}
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}