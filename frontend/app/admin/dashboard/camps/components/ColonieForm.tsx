"use client"

import React, { useState } from 'react'
import { Plus, X, Upload, Send, Sparkles, Edit2, Check } from 'lucide-react'
import { AddColonie } from '../services/colonie'

function ColonieForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false)
  const [activites, setActivites] = useState<string[]>([])
  const [currentActivite, setCurrentActivite] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingValue, setEditingValue] = useState('')
  const [selectedImages, setSelectedImages] = useState<File[]>([])

  const addActivite = () => {
    if (currentActivite.trim()) {
      setActivites([...activites, currentActivite.trim()])
      setCurrentActivite('')
    }
  }

  const startEdit = (index: number) => {
    setEditingIndex(index)
    setEditingValue(activites[index])
  }

  const saveEdit = (index: number) => {
    if (editingValue.trim()) {
      const newActivites = [...activites]
      newActivites[index] = editingValue.trim()
      setActivites(newActivites)
      setEditingIndex(null)
    }
  }

  const removeActivite = (index: number) => {
    setActivites(activites.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formElement = e.currentTarget
    const formData = new FormData()
    
    formData.append('titre', (formElement.elements.namedItem('titre') as HTMLInputElement).value)
    formData.append('destination', (formElement.elements.namedItem('destination') as HTMLInputElement).value)
    formData.append('prix', (formElement.elements.namedItem('prix') as HTMLInputElement).value)
    formData.append('placesDisponibles', (formElement.elements.namedItem('placesDisponibles') as HTMLInputElement).value)
    formData.append('duree', (formElement.elements.namedItem('duree') as HTMLInputElement).value)
    formData.append('description', (formElement.elements.namedItem('description') as HTMLTextAreaElement).value)

    activites.forEach(act => formData.append('activites', act))
    selectedImages.forEach(file => formData.append('images', file))

    try {
      const result = await AddColonie(formData)
      if (result.success) {
        alert("Colonie publiée avec succès ! ")
        setActivites([])
        setSelectedImages([])
        formElement.reset()
        if (onSuccess) onSuccess()
      } else {
        alert(result.error)
      }
    } catch (error) {
      alert("Une erreur est survenue")
      console.log("Une erreur est survenue",error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-[#2d241e]/5 border border-[#f3ece7]">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#fdf5ef] p-3 rounded-2xl text-[#c4a484]">
          <Sparkles size={24} />
        </div>
        <h2 className="text-2xl font-black text-[#2d241e]">Nouvelle Colonie</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-[#c4a484] tracking-widest ml-4">Titre</label>
          <input name="titre" required className="w-full bg-[#fdfaf7] border border-[#f3ece7] rounded-2xl px-6 py-4 text-[#2d241e] font-semibold focus:border-[#c4a484] outline-none transition-all" />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-[#c4a484] tracking-widest ml-4">Destination</label>
          <input name="destination" required className="w-full bg-[#fdfaf7] border border-[#f3ece7] rounded-2xl px-6 py-4 text-[#2d241e] font-semibold focus:border-[#c4a484] outline-none transition-all" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-[#c4a484] tracking-widest ml-4">Prix (FCFA)</label>
            <input name="prix" type="number" required className="w-full bg-[#fdfaf7] border border-[#f3ece7] rounded-2xl px-6 py-4 text-[#2d241e] font-semibold focus:border-[#c4a484] outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-[#c4a484] tracking-widest ml-4">Places</label>
            <input name="placesDisponibles" type="number" required className="w-full bg-[#fdfaf7] border border-[#f3ece7] rounded-2xl px-6 py-4 text-[#2d241e] font-semibold focus:border-[#c4a484] outline-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-[#c4a484] tracking-widest ml-4">Durée</label>
          <input name="duree" placeholder="ex: 14 jours" className="w-full bg-[#fdfaf7] border border-[#f3ece7] rounded-2xl px-6 py-4 text-[#2d241e] font-semibold focus:border-[#c4a484] outline-none" />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <label className="text-[10px] font-black uppercase text-[#c4a484] tracking-widest ml-4">Description</label>
        <textarea name="description" rows={3} required className="w-full bg-[#fdfaf7] border border-[#f3ece7] rounded-3xl px-6 py-4 text-[#2d241e] focus:border-[#c4a484] outline-none resize-none" />
      </div>

      <div className="mt-6 space-y-2">
        <label className="text-[10px] font-black uppercase text-[#c4a484] tracking-widest ml-4">Activités au programme</label>
        <div className="flex gap-2 mb-4">
          <input 
            value={currentActivite} 
            onChange={(e) => setCurrentActivite(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addActivite())}
            placeholder="Ajouter une activité..."
            className="flex-1 bg-[#fdfaf7] border border-[#f3ece7] rounded-2xl px-6 py-4 text-[#2d241e] font-semibold focus:border-[#c4a484] outline-none" 
          />
          <button type="button" onClick={addActivite} className="bg-[#c4a484] text-white p-4 rounded-2xl hover:bg-[#2d241e] transition-colors shadow-lg shadow-[#c4a484]/20">
            <Plus size={24} />
          </button>
        </div>

        <div className="space-y-2">
          {activites.map((act, i) => (
            <div key={i} className="flex items-center justify-between bg-[#fdf5ef]/50 border border-[#f3ece7] p-3 rounded-2xl group hover:border-[#c4a484] transition-all">
              {editingIndex === i ? (
                <div className="flex items-center gap-2 w-full">
                  <input 
                    autoFocus
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), saveEdit(i))}
                    className="flex-1 bg-white border border-[#c4a484] rounded-xl px-4 py-2 text-sm font-bold text-[#2d241e] outline-none"
                  />
                  <button type="button" onClick={() => saveEdit(i)} className="p-2 bg-[#c4a484] text-white rounded-xl">
                    <Check size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-sm font-bold text-[#4a3f35] px-2">{act}</span>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => startEdit(i)} className="p-2 text-gray-400 hover:text-[#c4a484] hover:bg-white rounded-xl transition-all">
                      <Edit2 size={16} />
                    </button>
                    <button type="button" onClick={() => removeActivite(i)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-xl transition-all">
                      <X size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-2">
        <label className="text-[10px] font-black uppercase text-[#c4a484] tracking-widest ml-4">Galerie Photos</label>
        <div className="relative group border-2 border-dashed border-[#f3ece7] rounded-4xl p-8 flex flex-col items-center justify-center bg-[#fdfaf7] hover:border-[#c4a484] transition-all">
          <input
            type="file" multiple accept="image/*"
            onChange={(e) => e.target.files && setSelectedImages(Array.from(e.target.files))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <Upload className="text-[#c4a484] mb-2" size={32} />
          <p className="text-[#2d241e] font-bold text-center">Glisser ou cliquer pour uploader</p>
          <p className="text-[10px] text-gray-400 font-black mt-1 uppercase tracking-tighter">{selectedImages.length} images prêtes</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-10 bg-[#2d241e] text-[#c4a484] py-6 rounded-3xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#4a3f35] transition-all disabled:opacity-50 shadow-xl shadow-[#2d241e]/20"
      >
        {loading ? <div className="animate-spin h-5 w-5 border-2 border-[#c4a484] border-t-transparent rounded-full" /> : <Send size={20} />}
        {loading ? "TRAITEMENT..." : "CRÉER LA COLONIE"}
      </button>
    </form>
  )
}

export default ColonieForm