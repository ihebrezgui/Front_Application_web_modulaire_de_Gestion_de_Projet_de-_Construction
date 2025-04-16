import { Component } from '@angular/core';
import { PerformanceServiceService } from '../performance-service.service';
import { Performance } from '../Performance';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-per-all',
  templateUrl: './list-per-all.component.html',
  styleUrls: ['./list-per-all.component.css']
})
export class ListPerAllComponent {
  performances: any[] = [];
  employeeId!: number;
  selectedPerformance: any = null;
  role: string = '';  // Variable pour le rôle de l'utilisateur
  username: string = '';  // Variable pour le username

  constructor(
    private performanceService: PerformanceServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id')); 
    this.getPerformances();
    this.username = localStorage.getItem('username') || '';
    this.role = localStorage.getItem('role') || '';
  }

  // Charger les performances d'un employé

  
  getPerformances(): void {
    this.performanceService.getAll().subscribe(
      (data) => {
        this.performances = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des performances', error);
      }
    );
  }

  // Ouvrir le modal de modification
  openEditModal(performance: any) {
    this.selectedPerformance = { ...performance };
    console.log(this.selectedPerformance);  // Vérifiez si `note` est correct ici
  }

  // Mettre à jour la performance
  updatePerformance() {
    if (this.selectedPerformance) {
      const { id, note, commentaire, dateEvaluation } = this.selectedPerformance;
      console.log('Update Performance:', id, note, commentaire, dateEvaluation);  // Vérifiez les valeurs
  
      // Appel au service avec les bonnes valeurs
      this.performanceService.updatePerformance(id, note, commentaire, dateEvaluation).subscribe(
        () => {
          alert('Performance mise à jour avec succès !');
          this.selectedPerformance = null;
          this.getPerformances();
        },
        (error) => {
          console.error("Erreur lors de la mise à jour de la performance", error);
        }
      );
    }
  }
  

  // Supprimer une performance
  onDeletePerformance(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette performance ?')) {
      this.performanceService.deletePerformance(id).subscribe(
        () => {
          console.log('Performance supprimée avec succès');
          this.getPerformances();
        },
        (error) => {
          console.error('Erreur lors de la suppression de la performance', error);
        }
      );
    }
  }
}