export enum AbsenceType {
    CONGE_PAYE = "CONGE_PAYE",
    MALADIE = "MALADIE",
    SANS_SOLDE = "SANS_SOLDE",
    RETARD = "RETARD"
  }
  
  export class Absence {
    id?: number;
    dateDebut!: string;
    dateFin!: string;
    type!: AbsenceType;
    employeeId?: number;
    dureeHeures?: number;
  }
  