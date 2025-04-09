import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AbsenceServiceService } from '../absence-service.service';
import { EmployeeServiceService } from '../../employe/employee-service.service';


@Component({
  selector: 'app-add-absence',
  templateUrl: './add-absence.component.html',
  styleUrls: ['./add-absence.component.css']
})
export class AddAbsenceComponent {
  absenceForm: FormGroup;
  employeeId!: number;
  employeeName: string = '';
  showDureeHeures: boolean = false; // Contrôle de l'affichage

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private absenceService: AbsenceServiceService,
    private employeeService: EmployeeServiceService,
    private router: Router
  ) {
    this.absenceForm = this.fb.group({
      dateDebut: ['', [Validators.required]],
      dateFin: ['', [Validators.required]],
      type: ['', Validators.required],
      dureeHeures: [null, [Validators.min(1)]], // Non requis par défaut
    });
  }

  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];

    this.employeeService
      .getEmployeById(this.employeeId)
      .subscribe((employee) => {
        this.employeeName = `${employee.nom} ${employee.prenom}`;
      });
  }

  onTypeChange() {
    const selectedType = this.absenceForm.get('type')?.value;
    this.showDureeHeures = selectedType === 'RETARD';

    if (this.showDureeHeures) {
      // Rendre la durée obligatoire si type = RETARD
      this.absenceForm
        .get('dureeHeures')
        ?.setValidators([Validators.required, Validators.min(1)]);
    } else {
      // Retirer les validateurs si ce n'est pas un retard
      this.absenceForm.get('dureeHeures')?.clearValidators();
      this.absenceForm.get('dureeHeures')?.setValue(null);
    }
    this.absenceForm.get('dureeHeures')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.absenceForm.invalid) {
      return;
    }

    const { dateDebut, dateFin, type, dureeHeures } = this.absenceForm.value;


    if (new Date(dateFin) < new Date(dateDebut)) {
      alert('La date de fin doit être après la date de début !');
      return;
    }
// Si le type n'est pas "RETARD", on met dureeHeures à 0
const absenceData = {
  dateDebut: this.absenceForm.value.dateDebut,
  dateFin: this.absenceForm.value.dateFin,
  type: type,
  dureeHeures: type === 'RETARD' ? dureeHeures : null
};


this.absenceService
  .addAbsence(this.employeeId, absenceData)
  .subscribe(() => {
    this.router.navigate(['/absence']);
  });
  }
}