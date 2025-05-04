import { Component, OnInit } from '@angular/core';
import { AbsenceServiceService } from '../absence-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {
  absences: any[] = [];
  employeeId!: number;
  selectedAbsence: any = null;

  constructor(
    private absenceService: AbsenceServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id')); 
    this.getAbsences();
  }

  // Charger les absences d'un employé
  getAbsences(): void {
    this.absenceService.getAbsencesByEmployee().subscribe(
      (data) => {
        this.absences = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des absences', error);
      }
    );
  }

  // Ouvrir le modal de modification
  openEditModal(absence: any) {
    this.selectedAbsence = { ...absence }; // Cloner pour éviter la modification directe
  }

  // Mettre à jour l'absence
  // Mettre à jour l'absence
updateAbsence() {
  if (this.selectedAbsence) {
    const { id, type, dateDebut, dateFin } = this.selectedAbsence;
    
    // Si ce n'est pas un retard, mettre dureeHeures à 0
    const dureeHeures = type === 'RETARD' ? this.selectedAbsence.dureeHeures : 0;

    // Envoyer la demande de mise à jour avec les nouvelles informations
    this.absenceService.updateAbsence(id, type, dateDebut, dateFin, dureeHeures).subscribe(
      () => {
        alert('Absence mise à jour avec succès !');
        this.selectedAbsence = null;
        this.getAbsences();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'absence', error);
      }
    );
  }
}
getDureeJours(dateDebut: string | null, dateFin: string | null): number {
  if (!dateDebut || !dateFin) return 0; // Si l'une des dates est nulle, on retourne 0
  const debut = new Date(dateDebut);
  const fin = new Date(dateFin);
  const diffTime = Math.abs(fin.getTime() - debut.getTime()+1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}



  // Supprimer une absence
  onDeleteAbsence(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette absence ?')) {
      this.absenceService.deleteAbsence(id).subscribe(
        () => {
          console.log('Absence supprimée avec succès');
          this.getAbsences();
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'absence', error);
        }
      );
    }
  }
  
}
