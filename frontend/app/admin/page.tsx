"use client";

import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Tent } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#fdfaf7] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#c4a484]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#c4a484]/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md z-10">
        {/* Logo / Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-[#c4a484] rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <Tent className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-[#2d241e] tracking-tight">
            SunCamp <span className="text-[#c4a484]">Admin</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2 font-medium">Espace de gestion sécurisé</p>
        </div>

        {/* Card de connexion */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl border border-white/50">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Champ Email */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-black text-[#4a3f35] ml-1 tracking-widest">
                Email Professionnel
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-[#c4a484] group-focus-within:text-[#a68a6d] transition-colors" />
                </div>
                <input 
                  type="email" 
                  required
                  placeholder="admin@suncamp.ci"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-[#f3ece7] rounded-2xl outline-none focus:border-[#c4a484] focus:ring-4 focus:ring-[#c4a484]/5 transition-all text-[#2d241e] font-medium"
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs uppercase font-black text-[#4a3f35] tracking-widest">
                  Mot de passe
                </label>
                <button type="button" className="text-[10px] font-bold text-[#c4a484] hover:underline uppercase">
                  Oublié ?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-[#c4a484] group-focus-within:text-[#a68a6d] transition-colors" />
                </div>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-[#f3ece7] rounded-2xl outline-none focus:border-[#c4a484] focus:ring-4 focus:ring-[#c4a484]/5 transition-all text-[#2d241e] font-medium"
                />
              </div>
            </div>

            {/* Bouton de connexion */}
            <button 
              type="submit"
              className="w-full bg-[#2d241e] hover:bg-[#4a3f35] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] mt-4"
            >
              Se connecter
              <ArrowRight size={20} className="text-[#c4a484]" />
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-gray-400 text-xs font-medium">
          &copy; 2026 SunCamp Administration <br/>
          Accès restreint au personnel autorisé
        </p>
      </div>
    </div>
  );
}