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
 constructor(private performanceServiceService: PerformanceServiceService) {
    {}
  }
  ngOnInit() {
    this.getAllEmployes(); 
  }

  getAllEmployes() {
    this.performanceServiceService.getempList().subscribe(
      (data: Employe[]) => {
        this.employee = data;
      },
      error => {
        console.error("Erreur lors de la récupération des employés", error);
      }
    );
  }
}
