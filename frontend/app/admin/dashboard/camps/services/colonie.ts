"use server"

export interface IColonie {
    _id?: string;
    titre: string;
    description: string;
    images: string[];
    prix: number;
    duree: string;
    destination: string;
    activites: string[];
    placesDisponibles?: number;
    dateCreation?: string;
    date?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Récupérer toutes les colonies
export async function FetchColonie() {
    try {
        const response = await fetch(`${BASE_URL}/colonies/`, {
            method: 'GET',
            cache: 'no-store'
        });

        if (response.ok) {
            const data = await response.json();
            return data.colonies || data || [];
        }
        
        console.error(`FetchColonie a échoué avec le statut : ${response.status}`);
        return [];
    } catch (error) {
        console.error("Erreur FetchColonie:", error);
        return [];
    }
}

// Récupérer une colonie par ID
export async function FetchColonieById(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/colonies/${id}`, {
            method: 'GET',
            cache: 'no-store'
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        
        console.error(`FetchColonieById a échoué avec le statut : ${response.status}`);
        return null;
    } catch (error) {
        console.error("Erreur FetchColonieById:", error);
        return null;
    }
}

// Ajouter une nouvelle colonie
export async function AddColonie(colonie: FormData | Omit<IColonie, 'id'>) {
    try {
        const isFormData = colonie instanceof FormData;
        
        const response = await fetch(`${BASE_URL}/colonies/`, {
            method: 'POST',
            headers: isFormData ? {} : {
                'Content-Type': 'application/json',
            },
            body: isFormData ? colonie : JSON.stringify(colonie),
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        }
        
        return { success: false, error: 'Erreur lors de l\'ajout' };
    } catch (error) {
        console.error("Erreur AddColonie:", error);
        return { success: false, error: 'Erreur réseau' };
    }
}

// Mettre à jour une colonie
export async function UpdateColonie(id: string, colonie: Partial<IColonie>) {
    try {
        const response = await fetch(`${BASE_URL}/colonies/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(colonie),
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        }
        
        console.error(`UpdateColonie a échoué avec le statut : ${response.status}`);
        return { success: false, error: 'Erreur lors de la mise à jour' };
    } catch (error) {
        console.error("Erreur UpdateColonie:", error);
        return { success: false, error: 'Erreur réseau' };
    }
}

// Supprimer une colonie
export async function DeleteColonie(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/colonies/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return { success: true };
        }
        
        console.error(`DeleteColonie a échoué avec le statut : ${response.status}`);
        return { success: false, error: 'Erreur lors de la suppression' };
    } catch (error) {
        console.error("Erreur DeleteColonie:", error);
        return { success: false, error: 'Erreur réseau' };
    }
}