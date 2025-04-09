export enum TypeDemande {
    CONGE = 'CONGE',
    AVANCE = 'AVANCE',
    AUTRE = 'AUTRE'
  }
  
  export class Demande {
    id!: number;
    nom!: string;
    prenom!: string;
    typeDemande!: TypeDemande;
    commentaire!: string;
  }
  