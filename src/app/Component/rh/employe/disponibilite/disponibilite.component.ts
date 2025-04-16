import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-disponibilite',
  templateUrl: './disponibilite.component.html',
  styleUrls: ['./disponibilite.component.css']
})
export class DisponibiliteComponent implements OnInit {
  postesDisponibles: { [key: string]: any[] } = {};  
  totalEmployeesParPoste: { [key: string]: number } = {};  
  postes: string[] = [
    'MACON',
    'ELECTRICIEN',
    'PLOMBIER',
    'CHARPENTIER',
    'PEINTRE',
    'SOUDEUR',
    'MANOEUVRE',
    'CHEF_CHANTIER',
    'INGENIEUR',
    'ARCHITECTE'
  ];

  selectedPoste: string = ''; 
  filteredPostesDisponibles: { [key: string]: any[] } = {};  

  constructor(private employeeService: EmployeeServiceService) {}

  ngOnInit(): void {
    
    this.employeeService.getDisponibiliteParPoste().subscribe(data => {
      this.postesDisponibles = data;
      this.filterPostes(); 
    });

    
    this.employeeService.getTotalEmployeesParPoste().subscribe(data => {
      this.totalEmployeesParPoste = data;
    });
  }


  filterPostes(): void {
    this.filteredPostesDisponibles = {};
    this.showDisponibles = {};
    if (this.selectedPoste) {
     
      if (this.postesDisponibles[this.selectedPoste]) {
        this.filteredPostesDisponibles[this.selectedPoste] = this.postesDisponibles[this.selectedPoste];
      } else {
        
        this.filteredPostesDisponibles[this.selectedPoste] = ['Aucun dispo'];
      }
    } else {
     
      this.postes.forEach(poste => {
        if (this.postesDisponibles[poste]) {
          this.filteredPostesDisponibles[poste] = this.postesDisponibles[poste];
        } else {
          this.filteredPostesDisponibles[poste] = ['Aucun dispo'];
        }
      });
    }

  }

  
showDisponibles: { [key: string]: boolean } = {};

// Fonction pour basculer l'affichage des disponibilités
toggleDisponibles(poste: string): void {
  this.showDisponibles[poste] = !this.showDisponibles[poste];
}

 
getDisponibilitePourcentage(poste: string): number {
  const total = this.totalEmployeesParPoste[poste] || 0;
  if (this.filteredPostesDisponibles[poste]?.includes('Aucun dispo')) {
    return 0;
  }
  const disponibles = Array.isArray(this.filteredPostesDisponibles[poste]) 
    ? this.filteredPostesDisponibles[poste].length 
    : 0;
  return total > 0 ? Math.round((disponibles / total) * 100) : 0;
}
   onPosteChange(): void {
    this.filterPostes();
  }

getTotalEmployes(): number {
  return Object.values(this.totalEmployeesParPoste).reduce((a, b) => a + b, 0);
}

getTotalDisponibles(): number {
  let total = 0;
  for (const [poste, employes] of Object.entries(this.filteredPostesDisponibles)) {
    if (!employes.includes('Aucun dispo')) {
      total += employes.length;
    }
  }
  return total;
}

getTauxDisponibilite(): number {
  const total = this.getTotalEmployes();
  return total > 0 ? Math.round((this.getTotalDisponibles() / total) * 100) : 0;
}

  
}