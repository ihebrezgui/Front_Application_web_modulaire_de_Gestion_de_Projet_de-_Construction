import { Component, OnInit } from '@angular/core';
import { PerformanceServiceService } from '../performance-service.service';

@Component({
  selector: 'app-list-performance',
  templateUrl: './list-performance.component.html',
  styleUrls: ['./list-performance.component.css'],
})
export class ListPerformanceComponent implements OnInit {
  performances: any[] = [];  

  constructor(private performanceService: PerformanceServiceService) {}

  ngOnInit(): void {
    this.performanceService.getAllPerformances().subscribe(
      (data) => {
        this.performances = data;
  
        // Ajout de la récupération des noms des employés
        this.performances.forEach((performance) => {
          if (performance.employeeid) { // Vérifie que l'ID de l'employé existe
            this.performanceService.getEmployeById(performance.employeeid).subscribe(
              (employee) => {
                performance.employeeName = employee.nom;
                performance.employeePrenom = employee.prenom;
                 
              },
              (error) => {
                console.error("Erreur lors de la récupération du nom de l'employé", error);
              }
            );
          }
          
        });
  
        console.log('Performances récupérées :', this.performances);
      },
      (error) => {
        console.error('Erreur lors de la récupération des performances', error);
      }
    );
  }


 
  isModalOpen = false;
  selectedComment: string = '';

  openCommentModal(comments: string[]) {
    this.selectedComment = comments.join(' | ');  // Afficher tous les commentaires concaténés
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedComment = '';  // Réinitialiser le commentaire sélectionné
  }
 
}
  
  
  

  
  
  
