"use server"

export interface IContact{
    _id: string;
    nomComplet:string;
    email:string;
    sujet:string;
    message:string;
    dateReception:string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function FetchContact() {
    try {
        const response = await fetch(`${BASE_URL}/contacts/`, {
            method: 'GET',
            cache: 'no-store'
        });

        if (response.ok) {
            const data = await response.json();
            return data.contacts || data || [];
        }
        
        console.error(`FetchContact a échoué avec le statut : ${response.status}`);
        return [];
    } catch (error) {
        console.error("Erreur FetchColonie:", error);
        return [];
    }
}

// Récupérer une message par ID
export async function FetchContactById(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/contacts/${id}`, {
            method: 'GET',
            cache: 'no-store'
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        
        console.error(`FetchContactById a échoué avec le statut : ${response.status}`);
        return null;
    } catch (error) {
        console.error("Erreur FetchColonieById:", error);
        return null;
    }
}

// Ajouter un nouveau message
export async function AddContact(contact: FormData | Omit<IContact , '_id' | 'dateReception'>) {
    try {
        const isFormData = contact instanceof FormData;
        
        const response = await fetch(`${BASE_URL}/contacts/`, {
            method: 'POST',
            headers: isFormData ? {} : {
                'Content-Type': 'application/json',
            },
            body: isFormData ? contact : JSON.stringify(contact),
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        }
        
        return { success: false, error: 'Erreur lors de l\'ajout' };
    } catch (error) {
        console.error("Erreur AddContact:", error);
        return { success: false, error: 'Erreur réseau' };
    }
}


// Supprimer une colonie
export async function DeleteContact(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/contacts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return { success: true };
        }
        
        console.error(`DeleteMessage a échoué avec le statut : ${response.status}`);
        return { success: false, error: 'Erreur lors de la suppression' };
    } catch (error) {
        console.error("Erreur DeleteMessage:", error);
        return { success: false, error: 'Erreur réseau' };
    }
}