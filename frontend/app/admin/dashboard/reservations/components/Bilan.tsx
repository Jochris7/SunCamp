"use client"
import React from 'react'
import { Users, Clock, Banknote, MapPin, TrendingUp } from 'lucide-react'
import { IReservation } from '../services/reservations'

export default function Bilan({ reservations }: { reservations: IReservation[] }) {
    const totalInscrits = reservations.reduce((acc, res) => acc + (res.participants?.length || 0), 0)
    const revenus = reservations.filter(r => r.statutPaiement === 'payé').reduce((acc, r) => acc + (r.montantTotal || 0), 0)

    const cards = [
        { label: "TOTAL INSCRITS", val: totalInscrits, sub: "+12%", color: "text-emerald-500", bg: "bg-emerald-50", icon: <Users size={18}/> },
        { label: "EN ATTENTE", val: reservations.filter(r => r.statutPaiement !== 'payé').length, sub: "À valider", color: "text-amber-500", bg: "bg-amber-50", icon: <Clock size={18}/> },
        { label: "REVENUS ESTIMÉS", val: `${revenus.toLocaleString()} €`, sub: "+5%", color: "text-emerald-500", bg: "bg-emerald-50", icon: <Banknote size={18}/> },
        { label: "PLACES RESTANTES", val: "18", sub: "Session actuelle", color: "text-blue-500", bg: "bg-blue-50", icon: <MapPin size={18}/> }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-8 mb-8">
        {cards.map((c, i) => (
            <div key={i} className="bg-white p-6 rounded-[1.8rem] border border-[#f3ece7] shadow-sm">
            <div className="flex justify-between mb-4">
                <span className="text-[10px] font-black text-[#c4a484] tracking-widest uppercase">{c.label}</span>
                <div className={`${c.bg} ${c.color} p-2 rounded-xl`}>{c.icon}</div>
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#2d241e]">{c.val}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.bg} ${c.color}`}>
                {c.sub.includes('+') && <TrendingUp size={8} className="inline mr-1"/>}
                {c.sub}
                </span>
            </div>
            </div>
        ))}
        </div>
    )
}