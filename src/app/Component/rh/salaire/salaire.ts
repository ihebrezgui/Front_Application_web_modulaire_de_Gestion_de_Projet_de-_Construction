export class Salary {
  id!: number;
  mois!: string; 
  salaireBrut!: number;
  salaireNet!: number;
  primePerformance!: number;
  primeHeuresSupp!: number;
  cotisationCNSS!: number;
  cotisationRetraite!: number;
  impotRevenu!: number;
  avanceSalaire!: number;
  deductions!: number;
  salaireImposable!: number;
  

  

    absence!: { type: string, dateDebut: string, dateFin: string }[];
    performances!: { description: string, date: string, prime: number }[];
  
  }
  