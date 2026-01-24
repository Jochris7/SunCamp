"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import {
    MapPin,
    Phone,
    Tent,
    Mail,
    Send,
    ChevronRight,
    MessageSquare,
    ArrowLeft
} from 'lucide-react'
import { AddContact } from '../actions/contact'

export default function ContactPage() {
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<{type: 'success' | 'error', msg: string} | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setStatus(null)

        const formData = new FormData(e.currentTarget)
        const payload = {
            nomComplet: formData.get('nomComplet') as string,
            email: formData.get('email') as string,
            sujet: formData.get('sujet') as string,
            message: formData.get('message') as string,
        }

        const res = await AddContact(payload)

        if (res.success) {
            setStatus({ type: 'success', msg: 'Votre message a été envoyé avec succès !' })
            ;(e.target as HTMLFormElement).reset()
        } else {
            setStatus({ type: 'error', msg: "Une erreur est survenue lors de l'envoi." })
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-[#fdfaf7] font-sans antialiased text-[#4a3f35]">
            
            {/* --- HEADER --- */}
            <header className="bg-[#2d241e] pt-24 pb-20 px-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10"><Tent size={120} /></div>
                    <div className="absolute bottom-10 right-10 rotate-12"><Tent size={150} /></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    
                    {/* BOUTON RETOUR ACCUEIL */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#2d241e] transition-all mb-12 group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Retour à l&apos;accueil
                    </Link>

                    <h1 className="text-white text-5xl md:text-6xl font-black mb-6 tracking-tight">
                        Prêt pour l&apos;aventure ? <br/>
                        <span className="text-[#c4a484]">Contactez-nous !</span>
                    </h1>
                    <p className="text-[#d9cfc7] text-lg max-w-2xl mx-auto font-medium">
                        Une question sur nos programmes ou une demande spécifique ?
                        Notre équipe vous répond généralement sous 24h.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* --- FORMULAIRE --- */}
                    <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-[#2d241e]/5 border border-[#f3ece7]">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-[#c4a484] ml-2">Votre nom complet</label>
                                    <input 
                                        name="nomComplet"
                                        required
                                        placeholder="Mohamed Traoré"
                                        className="w-full px-6 py-4 bg-[#fdfaf7] border border-[#f3ece7] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c4a484]/20 transition-all text-sm font-medium"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-[#c4a484] ml-2">Votre adresse email</label>
                                    <input 
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="mohamed@exemple.com"
                                        className="w-full px-6 py-4 bg-[#fdfaf7] border border-[#f3ece7] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c4a484]/20 transition-all text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-black uppercase tracking-widest text-[#c4a484] ml-2">Sujet de votre demande</label>
                                <select 
                                    name="sujet"
                                    required
                                    className="w-full px-6 py-4 bg-[#fdfaf7] border border-[#f3ece7] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c4a484]/20 transition-all appearance-none cursor-pointer text-sm font-medium"
                                >
                                    <option value="">Sélectionnez un sujet</option>
                                    <option value="inscription">Inscription au camp</option>
                                    <option value="programme">Programme & Activités</option>
                                    <option value="securite">Sécurité & Santé</option>
                                    <option value="autre">Autre demande</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-black uppercase tracking-widest text-[#c4a484] ml-2">Comment pouvons-nous vous aider ?</label>
                                <textarea 
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder="Bonjour, j'aimerais avoir plus d'informations..."
                                    className="w-full px-6 py-4 bg-[#fdfaf7] border border-[#f3ece7] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c4a484]/20 transition-all resize-none text-sm font-medium"
                                />
                            </div>

                            {status && (
                                <div className={`p-4 rounded-xl text-sm font-bold ${status.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                    {status.msg}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-fit px-10 py-5 bg-[#c4a484] text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-[#a68a6d] transition-all shadow-lg shadow-[#c4a484]/30 flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {loading ? "Envoi en cours..." : "Envoyer le message"}
                                <Send size={18} />
                            </button>
                        </form>
                    </div>

                    {/* --- COLONNE DROITE --- */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div className="bg-[#2d241e] rounded-[2.5rem] p-10 text-white flex flex-col gap-10 shadow-2xl">
                            <h3 className="text-2xl font-bold tracking-tight">Nos coordonnées</h3>
                            
                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-white/10 rounded-2xl text-[#c4a484]"><Phone size={24} /></div>
                                <div>
                                    <p className="text-[#d9cfc7] text-xs font-black uppercase tracking-widest mb-1">Téléphone</p>
                                    <p className="text-xl font-bold">+225 07 99 41 04 78</p>
                                    <p className="text-[#c4a484] text-sm mt-1 font-medium">Lun - Ven, 9h-18h</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-white/10 rounded-2xl text-[#c4a484]"><Mail size={24} /></div>
                                <div>
                                    <p className="text-[#d9cfc7] text-xs font-black uppercase tracking-widest mb-1">Email</p>
                                    <p className="text-xl font-bold">contact@suncamp.ci</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-white/10 rounded-2xl text-[#c4a484]"><MapPin size={24} /></div>
                                <div>
                                    <p className="text-[#d9cfc7] text-xs font-black uppercase tracking-widest mb-1">Adresse</p>
                                    <p className="text-lg font-medium">Assinie Beach, Secteur 3<br/>Abidjan, Côte d&apos;Ivoire</p>
                                </div>
                            </div>
                        </div>

                        <a href="#" className="group bg-white border border-[#f3ece7] rounded-[2.5rem] p-8 flex items-center justify-between hover:border-[#c4a484] transition-all shadow-sm">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-[#fdfaf7] rounded-2xl text-[#c4a484] group-hover:bg-[#c4a484] group-hover:text-white transition-all">
                                    <MessageSquare size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Des questions ?</h4>
                                    <p className="text-[#c4a484] text-sm font-medium">Consultez notre FAQ complète</p>
                                </div>
                            </div>
                            <ChevronRight className="text-[#f3ece7] group-hover:text-[#c4a484] group-hover:translate-x-1 transition-all" size={32} />
                        </a>
                    </div>
                </div>
            </main>
        </div>
    )
}