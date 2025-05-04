import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerformanceServiceService } from '../performance-service.service';

@Component({
  selector: 'app-add-performance',
  templateUrl: './add-performance.component.html',
  styleUrls: ['./add-performance.component.css'],
})
export class AddPerformanceComponent implements OnInit {
  performanceForm: FormGroup;
  employeeId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private performanceService: PerformanceServiceService,
    private router: Router
  ) {
    this.performanceForm = this.fb.group({
      note: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      dateEvaluation: [null, [Validators.required, this.dateValidator]],
      commentaire: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    });
  }

  ngOnInit(): void {
    this.employeeId = +this.route.snapshot.paramMap.get('id')!;
  }

  dateValidator(control: any) {
    const today = new Date().toISOString().split('T')[0]; // Date actuelle
    return control.value && control.value > today ? { futureDate: true } : null;
  }

  submitPerformance(): void {
    if (this.performanceForm.valid) {
      const performanceData = this.performanceForm.value;

      this.performanceService.getEmployeById(this.employeeId).subscribe(
        (employee) => {
          const performanceWithEmployeeName = {
            ...performanceData,
            employeeName: employee.nom,
          };

          this.performanceService.addPerformance(this.employeeId, performanceWithEmployeeName).subscribe(
            (response) => {
              console.log('Performance ajoutée', response);
              this.router.navigate(['/listperformance']);
            },
            (error) => {
              console.error("Erreur lors de l'ajout de la performance", error);
            }
          );
        },
        (error) => {
          console.error("Erreur lors de la récupération du nom de l'employé", error);
        }
      );
    }
  }
}
