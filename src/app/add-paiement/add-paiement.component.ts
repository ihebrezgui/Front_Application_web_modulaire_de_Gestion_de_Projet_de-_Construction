import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PaiementService } from '../paiement.service';
import { Paiement } from '../list-paiement/Paiement';
import { HttpErrorResponse } from '@angular/common/http';
import { ListFactureService } from '../list-facture.service';
import { Facture } from '../list-facture/Facture';

@Component({
  selector: 'app-add-paiement',
  templateUrl: './add-paiement.component.html',
  styleUrls: ['./add-paiement.component.css']
})
export class AddPaiementComponent implements OnInit {
  paiementForm: FormGroup;
  factures: Facture[] = [];
  modePaiement: string[] = ['Full', 'Echeance'];
  today: string = new Date().toISOString().split('T')[0];
  isEditMode: boolean = false;
  paiementId: number | null = null;

  constructor(
    private paiementService: PaiementService,
    private factureService: ListFactureService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.paiementForm = this.fb.group({
      montantPaye: ['', [Validators.required, Validators.min(0.01)]],
      datePaiement: ['', [Validators.required, this.dateValidator.bind(this)]],
      modePaiement: ['', Validators.required],
      facture: ['', Validators.required],
      nbreEcheances: ['', [Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.factureService.getFactureList().subscribe(
      (data: Facture[]) => {
        this.factures = data;
        console.log("Factures chargées :", this.factures);
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de la récupération des factures', error.message);
      }
    );

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.isEditMode = true;
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
        console.error('Erreur lors de la récupération du paiement', error.message);
      }
    );
  }

  dateValidator(control: any) {
    if (!control.value) return null;
    return control.value <= this.today ? null : { invalidDate: true };
  }

  onSubmit() {
    if (this.paiementForm.valid) {
      const paiement: Paiement = this.paiementForm.value;
      console.log('Données envoyées :', paiement);

      if (this.isEditMode && this.paiementId !== null) {
        paiement.idPaiement = this.paiementId;
        this.paiementService.updatePaiement(this.paiementId, paiement).subscribe({
          next: (response) => {
            console.log('Paiement mis à jour avec succès !', response);
            alert('Paiement mis à jour avec succès !');
            this.paiementForm.reset();
            this.router.navigate(['/paiements']);
          },
          error: (error: HttpErrorResponse) => {
            console.error('Erreur lors de la mise à jour du paiement', error);
            alert('Erreur lors de la mise à jour du paiement.');
          }
        });
      } else {
        this.paiementService.addPaiement(paiement, paiement.nbreEcheances!).subscribe({
          next: (response) => {
            console.log('Paiement ajouté avec succès !', response);
            alert('Paiement ajouté avec succès !');
            this.paiementForm.reset();
            this.router.navigate(['/paiements']);
          },
          error: (error: HttpErrorResponse) => {
            console.error('Erreur lors de l\'ajout du paiement', error);
            alert('Erreur lors de l\'ajout du paiement.');
          }
        });
      }
    } else {
      console.error('Données de formulaire invalides:', this.paiementForm.value);
      alert('Formulaire invalide !');
    }
  }
}
