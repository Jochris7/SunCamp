"use client"

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Eye, Trash2, Search, ChevronDown, Filter, Mail } from 'lucide-react'
import { FetchReservations, IReservation, DeleteReservation } from '../services/reservations'

interface ReservationTableProps {
    initialData: IReservation[];
}

function ReservationTable({ initialData }: ReservationTableProps) {
    const [reservations, setReservations] = useState<IReservation[]>(initialData)
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        setReservations(initialData);
    }, [initialData]);

    const loadReservations = useCallback(async () => {
        try {
            setLoading(true)
            const data = await FetchReservations()
            setReservations(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error("Erreur lors du chargement:", error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (initialData.length === 0) {
            loadReservations()
        }
    }, [loadReservations, initialData.length])

    const handleDelete = async (id: string) => {
        if (confirm("Voulez-vous vraiment supprimer cette réservation ?")) {
            const res = await DeleteReservation(id)
            if (res.success) loadReservations()
        }
    }

    // LOGIQUE DE RECHERCHE FILTRÉE
    const filteredReservations = useMemo(() => {
        return reservations.filter((res) => {
            const search = searchTerm.toLowerCase();
            const firstParticipant = res.participants?.[0];
            const fullName = `${firstParticipant?.prenom || ''} ${firstParticipant?.nom || ''}`.toLowerCase();
            const email = res.emailContact?.toLowerCase() || "";
            const colonieTitle = (res.colonie && typeof res.colonie === 'object' && 'titre' in res.colonie) ? (res.colonie.titre?.toLowerCase() || ""): "";

            return (
                fullName.includes(search) ||
                email.includes(search) ||
                colonieTitle?.includes(search) ||
                res._id?.toLowerCase().includes(search)
            );
        });
    }, [reservations, searchTerm]);

    const getStatusStyle = (status: string) => {
        const s = status?.toLowerCase() || 'en attente'
        if (s === 'payé' || s === 'confirmé') return 'bg-[#e7f6f2] text-[#059669] border-[#d1fae5]'
        if (s === 'annulé') return 'bg-[#fff1f2] text-[#e11d48] border-[#ffe4e6]'
        return 'bg-[#fffbeb] text-[#d97706] border-[#fef3c7]'
    }

    if (loading) return (
        <div className="p-20 text-center font-black text-[#c4a484] animate-pulse tracking-widest uppercase">
            Chargement des réservations...
        </div>
    )

    return (
        <div className="flex flex-col gap-6">
            
            {/* BARRE DE RECHERCHE ET FILTRES */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex-1 min-w-75 relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#00e396]" size={20} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Rechercher par nom, parent ou session..."
                        className="w-full pl-14 pr-6 py-4 bg-white border border-[#f3ece7] rounded-full text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00e396]/20 transition-all"
                    />
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-4 bg-white border border-[#f3ece7] rounded-full text-sm font-bold text-[#4a3f35] shadow-sm hover:bg-gray-50 transition-all">
                        Tous les statuts <ChevronDown size={16} className="text-[#00e396]" />
                    </button>
                    <button className="flex items-center gap-2 px-6 py-4 bg-white border border-[#f3ece7] rounded-full text-sm font-bold text-[#4a3f35] shadow-sm hover:bg-gray-50 transition-all">
                        Toutes les sessions <ChevronDown size={16} className="text-[#00e396]" />
                    </button>
                    <button className="p-4 bg-white border border-[#f3ece7] rounded-full text-[#00e396] shadow-sm hover:bg-gray-50 transition-all">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* TABLEAU DES RÉSÉRVATIONS */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-[#f3ece7] shadow-xl shadow-[#2d241e]/5">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#fdfaf7]/50 border-b border-[#f3ece7]">
                                <th className="px-8 py-6 text-left text-[11px] font-black uppercase tracking-widest text-[#c4a484]">Campeur</th>
                                <th className="px-8 py-6 text-left text-[11px] font-black uppercase tracking-widest text-[#c4a484]">Session</th>
                                <th className="px-8 py-6 text-left text-[11px] font-black uppercase tracking-widest text-[#c4a484]">Statut</th>
                                <th className="px-8 py-6 text-left text-[11px] font-black uppercase tracking-widest text-[#c4a484]">Paiement</th>
                                <th className="px-8 py-6 text-right text-[11px] font-black uppercase tracking-widest text-[#c4a484]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f3ece7]">
                            {filteredReservations.map((res) => (
                                <tr key={res._id} className="hover:bg-[#fdfaf7]/30 transition-colors group">
                                    {/* CAMPEUR */}
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-11 w-11 rounded-full bg-[#fdf5ef] flex items-center justify-center text-[#c4a484] font-black text-xs shadow-inner">
                                                {res.participants?.[0]?.prenom?.[0] || '?'}{res.participants?.[0]?.nom?.[0] || '?'}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#2d241e] text-[15px]">
                                                    {res.participants?.[0]?.prenom} {res.participants?.[0]?.nom}
                                                </span>
                                                <span className="text-[11px] text-[#c4a484] font-medium flex items-center gap-1">
                                                    <Mail size={10}/> {res.emailContact}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* SESSION */}
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-[#4a3f35]">
                                                {typeof res.colonie === 'object' ? res.colonie?.titre : 'Colonie active'}
                                            </span>
                                            <span className="text-[11px] text-gray-400 italic">ID: {res._id?.slice(-6).toUpperCase()}</span>
                                        </div>
                                    </td>

                                    {/* STATUT */}
                                    <td className="px-8 py-5">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border flex items-center gap-2 w-fit ${getStatusStyle(res.statutPaiement || '')}`}>
                                            <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                                            {res.statutPaiement || 'En attente'}
                                        </span>
                                    </td>

                                    {/* PAIEMENT */}
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-[#2d241e]">
                                                {res.montantTotal?.toLocaleString()} FCFA
                                            </span>
                                            <span className="text-[11px] text-gray-400 font-medium">
                                                Via {res.methodePaiement?.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2.5 bg-white border border-[#f3ece7] rounded-full text-gray-400 hover:text-[#00e396] hover:border-[#00e396] transition-all shadow-sm">
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => res._id && handleDelete(res._id)}
                                                className="p-2.5 bg-white border border-[#f3ece7] rounded-full text-gray-400 hover:text-red-500 hover:border-red-500 transition-all shadow-sm"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* FOOTER */}
                <div className="p-6 bg-[#fdfaf7]/20 border-t border-[#f3ece7] flex items-center justify-between">
                    <p className="text-[12px] text-[#c4a484] font-bold">
                        Affichage de {filteredReservations.length} résultat(s)
                    </p>
                    <div className="flex gap-2">
                        <button className="h-9 w-9 rounded-full border border-[#f3ece7] flex items-center justify-center text-gray-400 text-xs font-bold hover:bg-white transition-all">{"<"}</button>
                        <button className="h-9 w-9 rounded-full bg-[#00e396] text-white flex items-center justify-center text-xs font-black shadow-lg shadow-[#00e396]/20">1</button>
                        <button className="h-9 w-9 rounded-full border border-[#f3ece7] flex items-center justify-center text-gray-400 text-xs font-bold hover:bg-white transition-all">{">"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReservationTable