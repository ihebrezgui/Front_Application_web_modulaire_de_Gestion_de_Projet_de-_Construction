import { Terre } from "../listterre/Terre";

export class Contrat {
   id_Contrat !: number;
    nom_admin!: string;
    nomProprietaire!: string;
    prenom_Proprietaire!: string;
    date_signature!:Date;
    type_contrat!: string;  
    statut_Contrat!: string;
    idTerrain!: number;  
    terrain!:Terre
imageterre!:string;
telephone!:string;
// Relation avec Terrain

 // Add terrainImage as an optional field
signatureImage?:string

signatureClient?:string
indice !: number;

}
  