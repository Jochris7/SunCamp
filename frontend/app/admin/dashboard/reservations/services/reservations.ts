"use server"
import { IColonie } from "../../camps/services/colonie";

export interface IParticipant {
    _id?: string;
    nom: string;
    prenom: string;
    dateNaissance: string | Date;
    type: 'enfant' | 'adulte';
    allergies: string;
}

export interface IReservation {
    _id?: string;
    colonie: IColonie | string | null;
    emailContact: string;
    participants: IParticipant[];
    montantTotal: number;
    statutPaiement?: 'en attente' | 'payé' | 'annulé';
    methodePaiement: 'carte' | 'mobile_money' | 'agence';
    dateReservation?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// 1. Récupérer toutes les réservations
export async function FetchReservations() {
    try {
        const response = await fetch(`${BASE_URL}/reservations/`, {
            method: 'GET',
            cache: 'no-store'
        });

        const data = await response.json();
        console.log("LOG: FetchReservations Response Data ->", data);

        if (response.ok) {
            return data.reservations || data || [];
        }
        
        console.error(`FetchReservations a échoué: ${response.status}`);
        return [];
    } catch (error) {
        console.error("Erreur FetchReservations:", error);
        return [];
    }
}

// 2. Créer une nouvelle réservation (Post)
export async function CreateReservation(reservation: IReservation) {
    try {
        console.log("LOG: Sending Reservation Data ->", JSON.stringify(reservation));

        const response = await fetch(`${BASE_URL}/reservations/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservation),
        });

        const data = await response.json();
        console.log("LOG: CreateReservation Server Response ->", data);

        if (response.ok) {
            return { success: true, data };
        }
        
        return { success: false, error: data.message || 'Erreur lors de la réservation' };
    } catch (error) {
        console.error("Erreur CreateReservation:", error);
        return { success: false, error: 'Erreur réseau' };
    }
}

// 3. Récupérer une réservation par son ID
export async function FetchReservationById(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/reservations/${id}`, {
            method: 'GET',
            cache: 'no-store'
        });

        const data = await response.json();
        console.log(`LOG: FetchReservationById (${id}) Response ->`, data);

        if (response.ok) {
            return data;
        }
        
        return null;
    } catch (error) {
        console.error("Erreur FetchReservationById:", error);
        return null;
    }
}

// 4. Mettre à jour le statut d'une réservation (ex: marquer comme payé)
export async function UpdateReservationStatus(id: string, status: 'en attente' | 'payé' | 'annulé') {
    try {
        const response = await fetch(`${BASE_URL}/reservations/${id}`, {
            method: 'PATCH', // Ou PUT selon ton controller
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ statutPaiement: status }),
        });

        const data = await response.json();
        console.log(`LOG: UpdateReservationStatus (${id}) Response ->`, data);

        if (response.ok) {
            return { success: true, data };
        }
        
        return { success: false, error: 'Erreur mise à jour statut' };
    } catch (error) {
        console.error("Erreur UpdateReservationStatus:", error);
        return { success: false, error: 'Erreur réseau' };
    }
}

// 5. Supprimer une réservation
export async function DeleteReservation(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/reservations/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        console.log(`LOG: DeleteReservation (${id}) Response ->`, data);

        if (response.ok) {
            return { success: true };
        }
        
        return { success: false, error: 'Erreur suppression' };
    } catch (error) {
        console.error("Erreur DeleteReservation:", error);
        return { success: false, error: 'Erreur réseau' };
    }
}