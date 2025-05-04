import { Component } from '@angular/core';
import { PPEService } from '../PPE.service';
import { Employee } from '../safety-management/Employee'; // Adjust the path as necessary

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
})
export class AddEmployeeComponent {
  employee: Employee = new Employee(); // Initialize the Employee object

  constructor(private ppeService: PPEService) {}

  onSubmit() {
    console.log('Submitting Employee:', this.employee);
    this.ppeService.addEmployee(this.employee).subscribe(
      (response: Employee) => { // Explicitly type response
        console.log('Employee added:', response);
        // Optionally redirect or show a success message
      },
      (error: any) => { // Explicitly type error
        console.error('Error adding employee:', error);
      }
    );
  }
}
