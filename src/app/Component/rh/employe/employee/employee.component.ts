import { Component, OnInit } from '@angular/core';
import { Employe } from './employee';
import { EmployeeServiceService } from '../employee-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AbsenceServiceService } from '../../absence/absence-service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employee: Employe[] = [];
  selectedEmploye: Employe | null = null;
  searchForm: FormGroup;
  loading = false;
  error: string | null = null;
  employeeStats: any[] = [];
  username: string = '';
role: string = '';

  constructor(
    private employeeService: EmployeeServiceService,
    private router: Router, 
    private fb: FormBuilder,
    private absenceService: AbsenceServiceService
  ) {
    this.searchForm = this.fb.group({
      name: ['']
    });
  }

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
    this.role = localStorage.getItem('role') || '';
    this.getAllEmployes();
  }

  getAllEmployes() {
    this.loading = true;
    this.error = null;
  
    this.employeeService.getempList().subscribe({
      next: (data: Employe[]) => {
        if (this.role === 'ADMIN') {
          this.employee = data;
        } else {
          this.employee = data.filter(emp => emp.nom === this.username);
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = "Erreur lors de la récupération des employés";
        console.error(this.error, error);
        this.loading = false;
      }
    });
  }

  /*getAllEmployes() {
    this.loading = true;
    this.error = null;
    
    this.employeeService.getempList().subscribe({
      next: (data: Employe[]) => {
        this.employee = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = "Erreur lors de la récupération des employés";
        console.error(this.error, error);
        this.loading = false;
      }
    });
  }
*/
  editEmploye(id: number) {
    this.router.navigate(['/update-employee', id]);
  }

  deleteEmploye(id: number) {
    if (confirm("Voulez-vous vraiment supprimer cet employé ?")) {
      this.loading = true;
      this.employeeService.deleteEmploye(id).subscribe({
        next: () => {
          this.getAllEmployes();
          this.loading = false;
        },
        error: (error) => {
          this.error = "Erreur lors de la suppression de l'employé";
          console.error(this.error, error);
          this.loading = false;
        }
      });
    }
  }

  sortByName() {
    this.loading = true;
    this.employeeService.getEmployeesSortedByName().subscribe({
      next: (data: Employe[]) => {
        this.employee = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = "Erreur lors du tri par nom";
        console.error(this.error, error);
        this.loading = false;
      }
    });
  }

  sortBySalary() {
    this.loading = true;
    this.employeeService.getEmployeesSortedBySalary().subscribe({
      next: (data: Employe[]) => {
        this.employee = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = "Erreur lors du tri par salaire";
        console.error(this.error, error);
        this.loading = false;
      }
    });
  }

  searchEmployees(): void {
    const name = this.searchForm.value.name;
    this.loading = true;
    
    if (name) {
      this.employeeService.searchEmployees(name).subscribe({
        next: (data) => {
          this.employee = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = "Erreur lors de la recherche";
          console.error(this.error, error);
          this.loading = false;
        }
      });
    } else {
      this.getAllEmployes();
    }
  }

  onSortChange(event: any): void {
    const value = event.target.value;
    if (value === 'name') {
      this.sortByName();
    } else if (value === 'salary') {
      this.sortBySalary();
    } else {
      this.getAllEmployes();
    }
  }
}
