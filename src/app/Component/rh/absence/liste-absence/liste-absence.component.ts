import { Component } from '@angular/core';
import { AbsenceServiceService } from '../absence-service.service';
import { ActivatedRoute } from '@angular/router';
import { EmployeeServiceService } from '../../employe/employee-service.service';

@Component({
  selector: 'app-liste-absence',
  templateUrl: './liste-absence.component.html',
  styleUrls: ['./liste-absence.component.css']
})
export class ListeAbsenceComponent {
  employeesWithAbsences: any[] = [];

  constructor(private employeeService: AbsenceServiceService) {}

  ngOnInit(): void {
    this.getEmployeesWithAbsences();
  }

  // Appel du service pour récupérer les employés avec leurs absences
  getEmployeesWithAbsences(): void {
    this.employeeService.getEmployeesWithAbsences().subscribe(
      (data) => {
        this.employeesWithAbsences = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des employés et de leurs absences', error);
      }
    );
  }
}