export enum EtatCommande {
  RECUE,
  EN_ATTENTE,
  EXPEDIEE,
  EN_COURS,
  EN_RETARD
  }
  
  export class Ressource {
    constructor(public idProduit: number, public quantite: number) {} // Ajout de quantite si nécessaire
  }
  
  export class Commande {
    constructor(
      public idCommande?: number,
      public iduser?: number,
      public dateCommande?: Date,
      public dateLivraisonPrevue?: Date,
      public etatCommande?: EtatCommande,
      public ressources?: Ressource[],
      public clientLat?: number,
      public  clientLng?: number,
      public livreurLat?: number,
      public livreurLng?: number,
      public  username?: string,
      public imageUrl?: string,
      public ressourcesJson?: string // Ajout du champ ressourcesJson pour stocker les ressources en JSON
    ) {}
  }
  