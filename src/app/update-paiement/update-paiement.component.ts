import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaiementService } from '../paiement.service';
import { Paiement } from '../list-paiement/Paiement';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-paiement',
  templateUrl: './update-paiement.component.html',
  styleUrls: ['./update-paiement.component.css']
})
export class UpdatePaiementComponent implements OnInit {
  paiementForm: FormGroup;
  paiementId: number | null = null;
  today: string = new Date().toISOString().split('T')[0];

  constructor(
    private paiementService: PaiementService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.paiementForm = this.fb.group({
      montantPaye: ['', [Validators.required, Validators.min(0.01)]],
      datePaiement: ['', [Validators.required, this.dateValidator.bind(this)]],
      modePaiement: ['', Validators.required],
      nbreEcheances: ['', [Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.paiementId = id;
        this.getPaiementById(id);
      }
    });

    this.paiementForm.get('modePaiement')?.valueChanges.subscribe(value => {
      if (value === 'Echeance') {
        this.paiementForm.get('nbreEcheances')?.setValidators([Validators.required, Validators.min(1)]);
      } else {
        this.paiementForm.get('nbreEcheances')?.clearValidators();
      }
      this.paiementForm.get('nbreEcheances')?.updateValueAndValidity();
    });
  }

  getPaiementById(id: number) {
    this.paiementService.getPaiementById(id).subscribe(
      (paiement: Paiement) => {
        this.paiementForm.patchValue(paiement);
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de la récupération du paiement', error);
        alert('Erreur lors du chargement du paiement.');
      }
    );
  }

  dateValidator(control: any) {
    if (!control.value) return null;
    return control.value <= this.today ? null : { invalidDate: true };
  }

  onSubmit() {
    if (this.paiementForm.valid && this.paiementId !== null) {
      const paiement: Paiement = { idPaiement: this.paiementId, ...this.paiementForm.value };

      this.paiementService.updatePaiement(this.paiementId, paiement).subscribe({
        next: (response) => {
          console.log('Paiement mis à jour avec succès !', response);
          alert('Paiement mis à jour avec succès !');
          this.router.navigate(['/paiements']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erreur lors de la mise à jour du paiement', error);
          alert('Erreur lors de la mise à jour du paiement.');
        }
      });
    } else {
      console.error('Formulaire invalide:', this.paiementForm.value);
      alert('Veuillez remplir correctement le formulaire.');
    }
  }}
  
