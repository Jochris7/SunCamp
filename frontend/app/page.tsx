import Image from 'next/image';
import {
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  Tent,
  ShieldCheck,
  Star,
  Phone
} from 'lucide-react';
import Link from 'next/link';


export default function Home() {
  return (
    <div className="min-h-screen bg-[#fdfaf7] font-sans antialiased text-[#4a3f35]">
      
      <header className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/ImageAcceuil.png"
            alt="Plage Assinie"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>


        <nav className="relative z-20 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          <div className="flex gap-8 text-white font-medium uppercase tracking-widest text-sm">
            <Link href="/" className="hover:text-[#c4a484] transition-colors">Accueil</Link>
            <Link href="/" className="hover:text-[#c4a484] transition-colors">À Propos</Link>
            <Link href="/contact" className="hover:text-[#c4a484] transition-colors">Contact</Link>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-[#c4a484] text-white rounded-md font-bold text-xs uppercase hover:bg-[#a68a6d] transition-all">
              Sign In
            </button>
            <button className="px-6 py-2 border-2 border-white text-white rounded-md font-bold text-xs uppercase hover:bg-white/20 transition-all">
              Login In
            </button>
          </div>
        </nav>


        <div className="relative z-10 flex flex-col items-center justify-center h-[70%] text-center px-4">
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
            Des <span className="text-[#c4a484]">souvenirs</span> inoubliables <br /> à portée de clic
          </h1>
          <p className="text-white text-lg md:text-xl italic font-light drop-shadow-md">
            L&apos;aventure est là. Réservez-la facilement
          </p>

          <div className="mt-16 w-full max-w-5xl bg-white/90 backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-white/50">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex gap-6 px-6 py-2 border-b md:border-b-0 md:border-r border-gray-200">
                <span className="text-[#c4a484] font-bold cursor-pointer border-b-2 border-[#c4a484]">Destinations</span>
                <span className="text-gray-500 font-medium cursor-pointer hover:text-[#c4a484]">Tickets</span>
                <span className="text-gray-500 font-medium cursor-pointer hover:text-[#c4a484]">Activités</span>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4">
                <div className="flex flex-col items-start">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Localisation</label>
                  <div className="flex items-center gap-2 text-[#c4a484] font-bold">
                    Assinie <ChevronDown size={16} />
                  </div>
                </div>
                <div className="flex flex-col items-start border-l border-gray-100 pl-4">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Date de début</label>
                  <div className="flex items-center gap-2 text-[#c4a484] font-bold">
                    02 Jan 2026 <Calendar size={16} />
                  </div>
                </div>
                <div className="flex flex-col items-start border-l border-gray-100 pl-4">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Date de fin</label>
                  <div className="flex items-center gap-2 text-[#c4a484] font-bold">
                    02 Mai 2026 <Calendar size={16} />
                  </div>
                </div>
              </div>

              <button className="bg-[#c4a484] hover:bg-[#a68a6d] text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg">
                Recherche
              </button>
            </div>
          </div>
        </div>
      </header>


      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-[#c4a484] font-bold tracking-[0.2em] uppercase text-sm">Pourquoi nous choisir ?</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2d241e] leading-tight">
              Une expérience sécurisée au cœur de la nature.
            </h2>
            <p className="text-gray-600 text-lg">
              Nos colonies sont conçues pour forger le caractère, créer des amitiés durables et apprendre l&apos;autonomie.
            </p>
            
            <div className="space-y-4 pt-4">
              {[
                { title: "Sécurité Totale", desc: "Surveillance 24/7 et équipe médicale dédiée.", icon: <ShieldCheck className="text-[#c4a484]" /> },
                { title: "Équipe Experte", desc: "Conseillers certifiés passionnés par l'éducation.", icon: <Users className="text-[#c4a484]" /> },
                { title: "Souvenirs Uniques", desc: "Des activités qu'ils n'oublieront jamais.", icon: <Star className="text-[#c4a484]" /> }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-white shadow-soft border border-[#f3ece7] hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-[#fdf5ef] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2d241e] text-lg">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-125 rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <Image src="/assinie.png" alt="Camping" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-[#f7f2ee] py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black mb-12 text-[#2d241e]">Les activités préférées</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-150">
            
            <div className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10" />
              <Image src="/vaccane_parfaite.png" alt="Kayaking" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="text-white text-2xl font-bold">Sports Nautiques</h3>
                <p className="text-white/80 text-sm">Explorez les magnifiques cours d&apos;eau</p>
              </div>
            </div>

            <div className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10" />
              <Image src="/feuxDeCamp.jpg" alt="Feux de camp" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="text-white text-xl font-bold">Feux de camp</h3>
              </div>
            </div>

            {/* Randonnées */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10" />
              <Image src="/Randonné.jpg" alt="Randonnées" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <h3 className="absolute bottom-6 left-6 z-20 text-white font-bold">Randonnées</h3>
            </div>

            {/* Ateliers Art */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10" />
              <Image src="/Atelier_Art.jpg" alt="Ateliers Art" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <h3 className="absolute bottom-6 left-6 z-20 text-white font-bold">Ateliers Art</h3>
            </div>
          </div>
        </div>
      </section>
            
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[#c4a484] font-bold tracking-[0.2em] uppercase text-sm">Témoignages</span>
          <h2 className="text-4xl font-extrabold text-[#2d241e] mt-4 mb-16">Ce que les familles disent de nous</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Famille Koné", text: "Une expérience incroyable pour mon fils. Il est revenu plus autonome et avec des souvenirs plein la tête !", role: "Parent d'élève" },
              { name: "Marie-Eve L.", text: "La sécurité est au top et l'équipe est vraiment passionnée. Je recommande les yeux fermés.", role: "Maman de Lucas (10 ans)" },
              { name: "Jean-Philippe K.", text: "C'est la troisième fois que nous choisissons SunCamp. La qualité des activités est exceptionnelle.", role: "Parent fidèle" }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-[#fdfaf7] p-8 rounded-3xl border border-[#f3ece7] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-[#c4a484] fill-[#c4a484]" />)}
                </div>
                <p className="text-gray-600 italic mb-6">{testimonial.text}</p>
                <h4 className="font-bold text-[#2d241e]">{testimonial.name}</h4>
                <p className="text-[#c4a484] text-xs uppercase font-bold mt-1">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto bg-[#2d241e] rounded-[3rem] p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c4a484]/10 rounded-full -mr-32 -mt-32" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Restez informé de nos prochaines aventures</h2>
              <p className="text-[#d9cfc7]">Inscrivez-vous pour recevoir nos programmes et les offres exclusives.</p>
            </div>
            
            <div className="flex-1 w-full">
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Votre adresse email" 
                  className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#c4a484] transition-colors"
                />
                <button className="bg-[#c4a484] hover:bg-[#a68a6d] text-white px-8 py-4 rounded-2xl font-bold transition-all whitespace-nowrap">
                  S&apos;inscrire
                </button>
              </form>
              <p className="text-[#d9cfc7]/50 text-[10px] mt-4 text-center md:text-left">
                En vous inscrivant, vous acceptez de recevoir nos emails marketing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#2d241e] text-[#d9cfc7] py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#c4a484]">
              <Tent size={32} />
              <span className="text-2xl font-bold text-white tracking-tighter">SunCamp</span>
            </div>
            <p className="text-sm">Créer des souvenirs, un été à la fois. Rejoignez-nous pour l&apos;aventure de votre vie.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Programmes</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#c4a484]">Aventure</a></li>
              <li><a href="#" className="hover:text-[#c4a484]">Arts & Culture</a></li>
              <li><a href="#" className="hover:text-[#c4a484]">Sports nautiques</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#c4a484]">Guide Parents</a></li>
              <li><a href="#" className="hover:text-[#c4a484]">FAQ</a></li>
              <li><a href="#" className="hover:text-[#c4a484]">Contactez-nous</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-[#c4a484]" /> Assinie Beach, Côte d&apos;Ivoire
            </div>
            <div className="flex items-center gap-2 text-sm mt-3">
              <Phone size={16} className="text-[#c4a484]" /> +225 07 99 41 04 78
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-xs">
          © 2026 SunCamp CI. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}