export class Ressource {
  idProduit?: number;          // Correspond à Long idProduit
  description?: string;       // Correspond à String description
  nomProduit?: string;        // Correspond à String nomProduit
  prixUnitaire?: number;      // Correspond à double prixUnitaire
  typeProduit?: string;       // Correspond à Typeproduit
  active?: boolean;           // Correspond à boolean active
  fournisseurId?: number; 
  public imageUrl?: string ;
  quantiteDisponible?: number;        // ID du fournisseur, optionnel selon vos besoins
 
        // ID de la commande, optionnel selon vos besoins
}
