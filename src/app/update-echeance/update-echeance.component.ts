import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EcheanceService } from '../echeance.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Echeance } from '../list-echeance/Echeance';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-echeance',
  templateUrl: './update-echeance.component.html',
  styleUrls: ['./update-echeance.component.css']
})
export class UpdateEcheanceComponent implements OnInit {
  echeanceForm: FormGroup;
  idEcheance!: number;

  constructor(
    private route: ActivatedRoute,
    private echeanceService: EcheanceService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.echeanceForm = this.fb.group({
      dateLimite: ['', [Validators.required]],
      montantDu: ['', [Validators.required, Validators.min(0.01)]],
      statut: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.idEcheance = this.route.snapshot.params['id'];
    this.echeanceService.getEcheanceById(this.idEcheance).subscribe(
      (data: Echeance) => {
        this.echeanceForm.patchValue(data);
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du chargement de l\'échéance', error.message);
      }
    );
  }

  updateEcheance(): void {
    if (this.echeanceForm.valid) {
      const updatedEcheance = this.echeanceForm.value;
      this.echeanceService.updateEcheance(this.idEcheance, updatedEcheance).subscribe(
        () => {
          alert('Échéance mise à jour avec succès');
          this.router.navigate(['/echeances']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'échéance:', error);
          alert('Erreur lors de la mise à jour de l\'échéance');
        }
      );
    } else {
      alert('Le formulaire contient des erreurs');
    }
  }
}
