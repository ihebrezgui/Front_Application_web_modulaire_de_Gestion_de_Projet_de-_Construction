import { Component, OnInit } from '@angular/core';
import { PPEService } from '../PPE.service';
import { PPE } from '../safety-management/PPE'; // Adjust the path as necessary
import { Employee } from '../safety-management/Employee'; // Adjust the path as necessary
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ppe',
  templateUrl: './add-ppe.component.html',
})
export class AddPPEComponent implements OnInit {
  ppe: PPE = new PPE(); // Initialize the PPE object
  employees: Employee[] = []; // Initialize the employees array
  selectedEmployeeId!: number; // Store the selected employee ID
  router: Router;

  constructor(private ppeService: PPEService, router:Router) {
    this.router = router;
  }

  ngOnInit(): void {
    this.loadEmployees(); // Load employees on component initialization
  }

  loadEmployees(): void {
    this.ppeService.getEmployees().subscribe(
      (data) => {
        console.log('Data fetched from API:', data); // Log fetched data
        if (data && data.length) {
          this.employees = data; // Only set if data is not empty
          console.log('Employees loaded:', this.employees); // Confirm loading
        } else {
          console.warn('No employees found!'); // Log if empty
        }
      },
      (error) => {
        console.error('Error loading employees:', error); // Log any error
      }
    );
  }

  onSubmit() {
    console.log('Selected Employee ID:', this.selectedEmployeeId); // Debugging log
    if (!this.selectedEmployeeId) {
      console.warn('No employee selected!');
      return; // Stop if no employee is selected
    }

    console.log('Submitting PPE:', this.ppe);

    // Prepare the PPE object to send to the backend
    const ppeWithEmployee = {
      ...this.ppe,
      status: this.ppe.status || 'ACTIVE', // Default status if not set
      employeeId: this.selectedEmployeeId // Include employeeId for backend
    };

    this.ppeService.addPPE(ppeWithEmployee, this.selectedEmployeeId).subscribe(
      (response) => {
        console.log('PPE added:', response);
        alert('PPE successfully added and assigned to an employee!');
        this.resetForm(); // Optional: Reset form after submission
      },
      (error) => {
        console.error('Error adding PPE:', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/safety-management']); // Adjust the route to your safety component
  }   

  resetForm() {
    this.ppe = new PPE(); // Reset the PPE object
    
  }
}
