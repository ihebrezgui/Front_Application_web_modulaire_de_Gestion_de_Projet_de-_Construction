import { Component } from '@angular/core';
import { Employe } from '../employee/employee';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeServiceService } from '../employee-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})

export class AddemployeeComponent {
 
  employeForm: FormGroup;
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
  constructor(private fb: FormBuilder, private employeeService: EmployeeServiceService, private router: Router) {
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
  
// ✅ Correction : Déplacement des méthodes de validation dans la classe
validateDateNaissance(control: FormControl) {
  const dateNaissance = new Date(control.value);
  const today = new Date();
  const age = today.getFullYear() - dateNaissance.getFullYear();
  return age >= 18 ? null : { invalidDate: 'L\'employé doit avoir au moins 18 ans.' };
}

validateDateEmbauche(control: FormControl) {
  const dateEmbauche = new Date(control.value);
  const today = new Date();
  return dateEmbauche <= today ? null : { invalidDate: 'La date d\'embauche ne peut pas être dans le futur.' };
}

onSubmit() {
  if (this.employeForm.valid) {
    const employe: Employe = this.employeForm.value;
    this.employeeService.addEmploye(employe).subscribe(
      response => {
        console.log('Employé ajouté avec succès', response);
        alert('Employé ajouté avec succès !');
        this.employeForm.reset();
        this.router.navigate(['/']);
      },
      error => {
        console.error('Erreur lors de l’ajout', error);
      }
    );
  } else {
    alert('Veuillez corriger les erreurs avant de soumettre.');
  }
}
}