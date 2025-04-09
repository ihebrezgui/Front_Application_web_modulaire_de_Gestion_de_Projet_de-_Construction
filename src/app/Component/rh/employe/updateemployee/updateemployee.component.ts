import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from '../employee/employee';
import { EmployeeServiceService } from '../employee-service.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-updateemployee',
  templateUrl: './updateemployee.component.html',
  styleUrls: ['./updateemployee.component.css']
})
export class UpdateemployeeComponent {
  employeForm: FormGroup;
  selectedEmploye: Employe = new Employe();
  postes: string[] = [
    'MACON',
    'ELECTRICIEN',
    'PLOMBIER',
    'CHARPENTIER',
    'PEINTRE',
    'SOUDEUR',
    'MANOEUVRE',
    'CHEF_CHANTIER',
    'INGENIEUR',
    'ARCHITECTE'
  ];
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-zÀ-ÿ-]+$/)]],
      prenom: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-zÀ-ÿ-]+$/)]],
      dateNaissance: ['', [Validators.required, this.validateDateNaissance]],
      dateEmbauche: ['', [Validators.required, this.validateDateEmbauche]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      poste: ['', [Validators.required]],
      salaire: [0, [Validators.required, Validators.min(0)]],
      heuresSupp: [0, [Validators.min(0)]],
      avanceSalaire: [0, [Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getEmployeById(+id);
    } else {
      console.error('ID not found');
    }
  }

  getEmployeById(id: number): void {
    this.employeeService.getEmployeById(id).subscribe(
      (employe: Employe) => {
        this.selectedEmploye = employe;
        this.employeForm.patchValue(employe);
      },
      (error) => {
        console.error('Erreur lors du chargement de l\'employé', error);
      }
    );
  }

  validateDateNaissance(control: AbstractControl) {
    const dateNaissance = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - dateNaissance.getFullYear();
    return age >= 18 ? null : { invalidDate: 'L\'employé doit avoir au moins 18 ans.' };
  }

  validateDateEmbauche(control: AbstractControl) {
    const dateEmbauche = new Date(control.value);
    const today = new Date();
    return dateEmbauche <= today ? null : { invalidDate: 'La date d\'embauche ne peut pas être dans le futur.' };
  }

  onSubmit(): void {
    if (this.employeForm.valid) {
      const employe: Employe = this.employeForm.value;
      const employeId = this.selectedEmploye.id;

      this.employeeService.updateEmploye(employeId, employe).subscribe(
        response => {
          console.log('Employé modifié avec succès', response);
          alert('Employé modifié avec succès !');
          this.router.navigate(['/']);
        },
        error => {
          console.error('Erreur lors de la modification', error);
        }
      );
    }
  }
}
