"use client"

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { FetchColonie, FetchColonieById, IColonie } from '../services/colonie'
import { MapPin, X, Sparkles, Eye, Trash2, Edit3 } from 'lucide-react'

interface CampListProps {
  refreshKey?: number;
}

function CampList({ refreshKey = 0 }: CampListProps) {
  const [colonies, setColonies] = useState<IColonie[]>([])
  const [selectedColonie, setSelectedColonie] = useState<IColonie | null>(null)
  const [loading, setLoading] = useState(true)

  const loadColonies = useCallback(async () => {
    setLoading(true);
    try {
      const data = await FetchColonie();
      setColonies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erreur Dashboard:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadColonies();
  }, [loadColonies, refreshKey]);

  const handleViewDetails = async (colonie: IColonie) => {
    const id = colonie._id;
    if (id) {
      const fullData = await FetchColonieById(id);
      setSelectedColonie(fullData || colonie);
    } else {
      setSelectedColonie(colonie);
    }
  }

  const formatDate = (date: string) => {
    if (!date) return '---'
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#c4a484]"></div>
      </div>
    )
  }

  return (
    <div className="w-full bg-white rounded-[2.5rem] shadow-xl shadow-[#2d241e]/5 border border-[#f3ece7] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fdfaf7] border-b border-[#f3ece7]">
              <th className="p-6 text-[10px] font-black uppercase text-[#c4a484] tracking-widest">Aperçu</th>
              <th className="p-6 text-[10px] font-black uppercase text-[#c4a484] tracking-widest">Colonie</th>
              <th className="p-6 text-[10px] font-black uppercase text-[#c4a484] tracking-widest">Destination</th>
              <th className="p-6 text-[10px] font-black uppercase text-[#c4a484] tracking-widest">Prix</th>
              <th className="p-6 text-[10px] font-black uppercase text-[#c4a484] tracking-widest">Places</th>
              <th className="p-6 text-[10px] font-black uppercase text-[#c4a484] tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3ece7]">
            {colonies.map((colonie) => (
              <tr key={colonie._id} className="hover:bg-[#fdfaf7]/50 transition-colors group">
                <td className="p-6">
                  <div className="h-12 w-20 relative rounded-xl overflow-hidden bg-[#fdf5ef]">
                    {colonie.images?.[0] ? (
                      <Image
                        src={colonie.images[0]}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full"><Sparkles size={16} className="text-[#c4a484]" /></div>
                    )}
                  </div>
                </td>
                <td className="p-6">
                  <div className="font-bold text-[#2d241e] line-clamp-1">{colonie.titre}</div>
                  <div className="text-[10px] text-gray-400 font-medium">Créé le {formatDate(colonie.dateCreation || '')}</div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#4a3f35]">
                    <MapPin size={14} className="text-[#c4a484]" />
                    {colonie.destination}
                  </div>
                </td>
                <td className="p-6 font-black text-[#2d241e] text-sm">
                  {colonie.prix?.toLocaleString()} <span className="text-[10px] text-[#c4a484]">FCFA</span>
                </td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-[#fdf5ef] text-[#c4a484] rounded-full text-[10px] font-black">
                    {colonie.placesDisponibles} PLACES
                  </span>
                </td>
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleViewDetails(colonie)}
                      className="p-2 hover:bg-white rounded-xl text-[#c4a484] transition-all shadow-sm border border-transparent hover:border-[#f3ece7]"
                    >
                      <Eye size={18} />
                    </button>
                    <button className="p-2 hover:bg-white rounded-xl text-[#2d241e] transition-all shadow-sm border border-transparent hover:border-[#f3ece7]">
                      <Edit3 size={18} />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-xl text-red-400 transition-all shadow-sm border border-transparent hover:border-red-100">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedColonie && (
        <div className="fixed inset-0 bg-[#2d241e]/80 backdrop-blur-md flex items-center justify-center z-200 p-4">
          <div className="bg-white rounded-[3rem] max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="relative h-48 bg-[#2d241e]">
              {selectedColonie.images?.[0] && (
                <Image src={selectedColonie.images[0]} alt="" fill className="object-cover opacity-60" unoptimized />
              )}
              <button
                onClick={() => setSelectedColonie(null)}
                className="absolute top-6 right-6 bg-white text-[#2d241e] p-2 rounded-full hover:rotate-90 transition-all"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-6 left-8">
                <h2 className="text-2xl font-black text-white">{selectedColonie.titre}</h2>
                <p className="text-[#c4a484] text-[10px] font-black uppercase tracking-widest">{selectedColonie.destination}</p>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex gap-4">
                <div className="flex-1 bg-[#fdfaf7] p-4 rounded-2xl border border-[#f3ece7]">
                  <p className="text-[10px] font-black text-[#c4a484] uppercase mb-1">Prix de vente</p>
                  <p className="font-bold text-[#2d241e]">{selectedColonie.prix?.toLocaleString()} FCFA</p>
                </div>
                <div className="flex-1 bg-[#fdfaf7] p-4 rounded-2xl border border-[#f3ece7]">
                  <p className="text-[10px] font-black text-[#c4a484] uppercase mb-1">Durée</p>
                  <p className="font-bold text-[#2d241e]">{selectedColonie.duree}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black text-[#c4a484] uppercase mb-2">Description</p>
                <p className="text-sm text-gray-500 italic leading-relaxed">{selectedColonie.description}</p>
              </div>

              {selectedColonie.activites && selectedColonie.activites.length > 0 && (
                <div>
                  <p className="text-[10px] font-black text-[#c4a484] uppercase mb-3">Activités au programme</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedColonie.activites.map((act, i) => (
                      <span key={i} className="px-3 py-1.5 bg-[#fdf5ef] text-[#2d241e] text-[10px] font-bold rounded-lg border border-[#f3ece7]">
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex gap-3">
                <button className="flex-1 bg-[#2d241e] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#4a3f35] transition-all">
                  Modifier la fiche
                </button>
                <button
                  onClick={() => setSelectedColonie(null)}
                  className="px-8 border border-[#f3ece7] text-[#4a3f35] rounded-2xl font-bold text-xs uppercase hover:bg-gray-50 transition-all"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CampList