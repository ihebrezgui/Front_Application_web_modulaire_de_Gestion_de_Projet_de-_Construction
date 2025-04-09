export class Project {
    idProjet?: number;  // Optional ID (for existing projects)
    nomProjet!: string;
    descriptionProjet!: string;
    dateDebutProjet?: Date;
    DateFinProjet?: Date;
    budgetProjet?: number;
    statut?: string;  // Example: "In Progress", "Completed"
  
    constructor(nomProjet: string, descriptionProjet: string, dateDebutProjet?: Date, DateFinProjet?: Date, budgetProjet?:number,statut?: string) {
      this.nomProjet = nomProjet;
      this.descriptionProjet = descriptionProjet;
      this.dateDebutProjet = dateDebutProjet;
      this.DateFinProjet = DateFinProjet;
      this;budgetProjet= budgetProjet;
      this.statut = statut;
    }
  }
  