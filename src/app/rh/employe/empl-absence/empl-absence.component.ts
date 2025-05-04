import { Component } from '@angular/core';
import { Absence } from '../../absence/absence';
import { ActivatedRoute } from '@angular/router';
import { AbsenceServiceService } from '../../absence/absence-service.service';

@Component({
  selector: 'app-empl-absence',
  templateUrl: './empl-absence.component.html',
  styleUrls: ['./empl-absence.component.css']
})
export class EmplAbsenceComponent {
  employeId!: number;
  absences: any[] = [];
  username: string = '';
role: string = '';
  constructor(
    private route: ActivatedRoute,
    private absenceService: AbsenceServiceService
  ) { }

  ngOnInit(): void {
    this.employeId = +this.route.snapshot.paramMap.get('id')!; 
    this.loadAbsences();
      this.username = localStorage.getItem('username') || '';
    this.role = localStorage.getItem('role') || '';
  }

  loadAbsences() {
    this.absenceService.getAbsencesByEmployeeId(this.employeId).subscribe((data: Absence[]) => {
      this.absences = data;  // Stocke les absences récupérées
    });
  }
  getDureeJours(dateDebut: string | null, dateFin: string | null): number {
    if (!dateDebut || !dateFin) return 0; // Si l'une des dates est nulle, on retourne 0
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    const diffTime = Math.abs(fin.getTime() - debut.getTime()+1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  
  
}

