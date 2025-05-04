import { Component } from '@angular/core';
import { Employe } from '../employee/employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeedetailsComponent {
  employe: Employe | null = null;
  loading = false;
  error: string | null = null;
  username: string = '';
  role: string = '';
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeServiceService
  ) {}

  ngOnInit(): void {
    const employeId = this.route.snapshot.paramMap.get('id');
    if (employeId) {
      this.getEmployeeDetails(parseInt(employeId, 10));
    }
    this.username = localStorage.getItem('username') || '';
    this.role = localStorage.getItem('role') || '';
  }

  getEmployeeDetails(id: number) {
    this.loading = true;
    this.error = null;

    this.employeeService.getEmployeById(id).subscribe({
      next: (data: Employe) => {
        this.employe = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = "Erreur lors de la récupération des détails de l'employé";
        console.error(this.error, error);
        this.loading = false;
      }
    });
  }
}
