import { Component } from '@angular/core';
import { SalaireServiceService } from '../salaire-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historique-salaire',
  templateUrl: './historique-salaire.component.html',
  styleUrls: ['./historique-salaire.component.css']
})
export class HistoriqueSalaireComponent {
  employeeId!: number;
  salaryHistory: any[] = [];

  constructor(private route: ActivatedRoute, private salaryService: SalaireServiceService) {}

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSalaryHistory();
  }

  loadSalaryHistory() {
    this.salaryService.getSalaryHistory(this.employeeId).subscribe(data => {
      console.log("Données reçues de l'API :", data); // Vérifie si l'API renvoie quelque chose
      this.salaryHistory = data;
    }, error => {
      console.error("Erreur lors du chargement de l'historique :", error);
    });
  }

  startDate: string = '';
endDate: string = '';

filterByDate() {
  if (this.startDate && this.endDate) {
    this.salaryService.getSalariesBetweenDates(this.employeeId, this.startDate, this.endDate)
      .subscribe(data => {
        this.salaryHistory = data;
      });
  }}
  
}
