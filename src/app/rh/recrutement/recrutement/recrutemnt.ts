export class Recrutement {
    nom!: string;
    prenom!: string;
    commentaire!: string;
    dateNaissance!: string ;
    email!: string;
    telephone!: string;
    poste!: string;
    fichier!: File | null;
    typeDemande: string = 'RECRUTEMENT'; // Valeur par défaut
  }
  