"use client"

import { useEffect, useState } from "react";
import ReservationTable from "./components/Affichage";
import Bilan from "./components/Bilan";
import { FetchReservations, IReservation } from "./services/reservations";

export default function Home() {
  const [reservations, setReservations] = useState<IReservation[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await FetchReservations();
      setReservations(data);
    };
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfaf7] font-sans antialiased text-[#4a3f35] overflow-x-hidden pb-20">
        <div className="max-w-7xl mx-auto py-10 px-8">
          <span className="text-[20px] font-black text-[#0f0e0d] uppercase tracking-[0.4em] block border-l-4 border-[#c4a484] pl-6">
            Dashboard Admin Reservations
          </span>
        </div>
        
        {/* On passe les données aux deux composants */}
        <Bilan reservations={reservations} />
        
        <div className="max-w-7xl mx-auto px-8">
            <ReservationTable initialData={reservations} />
        </div>
    </div>
  );
}