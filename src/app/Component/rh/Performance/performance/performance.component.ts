import { Component } from '@angular/core';
import { Employe } from '../../employe/employee/employee';
import { PerformanceServiceService } from '../performance-service.service';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent {
  employee: Employe[] = [];
  role: string = ''; // variable pour stocker le rôle de l'utilisateur
  username: string = ''; // variable pour le username, si nécessaire
 constructor(private performanceServiceService: PerformanceServiceService) {
    {}
  }
  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
    this.role = localStorage.getItem('role') || '';
    this.getAllEmployes();
  }

 /* getAllEmployes() {
    this.performanceServiceService.getempList().subscribe(
      (data: Employe[]) => {
        this.employee = data;
      },
      error => {
        console.error("Erreur lors de la récupération des employés", error);
      }
    );
  }*/
    getAllEmployes() {
      this.performanceServiceService.getempList().subscribe(
        (data: Employe[]) => {
          if (this.role === 'ADMIN') {
            // Si l'utilisateur est admin, afficher tous les employés
            this.employee = data;
          } else {
            // Sinon, filtrer les employés par username
            this.employee = data.filter(emp => emp.nom === this.username);
          }
        },
        error => {
          console.error("Erreur lors de la récupération des employés", error);
        }
      );
    }
  
}
