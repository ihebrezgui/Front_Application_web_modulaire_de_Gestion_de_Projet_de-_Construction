export class Facture {
    idFacture!: number;
    montantTotal!: number;
    reference!: string;
    dateEmission!: Date;
    statut!: string;
    description!: string;
    id?: number;  // Optional, for compatibility
    nom?: string; // Optional, for compatibility
}