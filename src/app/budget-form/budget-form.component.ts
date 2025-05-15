import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./style1.css']
})
export class BudgetFormComponent {
  formData = {
    size: 0,
    floors: 0,
    location_factor: 1,
    material_cost: 0,
    labor_cost: 0,
    contingency_rate: 0
  };

  estimatedBudget: number | null = null;

  constructor(private http: HttpClient) {}

  estimateBudget() {
    this.http.post<any>('http://localhost:8000/predict', this.formData)
      .subscribe({
        next: (response) => {
          this.estimatedBudget = response.estimated_budget;
        },
        error: (error) => {
          console.error('Error fetching estimate:', error);
        }
      });
  }
}
