import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EcheanceService } from '../echeance.service';
import { ListFactureService } from '../list-facture.service';
import { Facture } from '../list-facture/Facture';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-echeance',
  templateUrl: './add-echeance.component.html',
  styleUrls: ['./add-echeance.component.css']
})
export class AddEcheanceComponent implements OnInit {
  echeanceForm: FormGroup;
  factures: Facture[] = [];
  today: string = new Date().toISOString().split('T')[0]; // Date actuelle YYYY-MM-DD

  constructor(
    private echeanceService: EcheanceService,
    private factureService: ListFactureService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.echeanceForm = this.fb.group({
      dateLimite: ['', [Validators.required, this.dateValidator.bind(this)]], // Validation date
      montantDu: ['', [Validators.required, Validators.min(0.01)]], // Montant > 0
      statut: ['', [Validators.required]], // Statut obligatoire
      facture: ['', [Validators.required]] // Facture obligatoire
    });
  }

  ngOnInit(): void {
    this.factureService.getFactureList().subscribe(
      (data: Facture[]) => {
        this.factures = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des factures', error.message);
      }
    );
  }

  // Validateur pour empêcher la sélection d'une date passée
  dateValidator(control: any) {
    if (!control.value) return null;
    return control.value >= this.today ? null : { invalidDate: true };
  }

  addEcheance(): void {
    if (this.echeanceForm.valid) {
      const echeance = this.echeanceForm.value;
      echeance.facture = { idFacture: echeance.facture };

      console.log('Echéance envoyée:', echeance);

      this.echeanceService.addEcheance(echeance).subscribe(
        (response) => {
          console.log('Échéance ajoutée avec succès:', response);
          alert('Échéance ajoutée avec succès');
          this.echeanceForm.reset();
          this.router.navigate(['/echeances']); // Redirection après ajout
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'échéance:', error);
          alert('Erreur lors de l\'ajout de l\'échéance');
        }
      );
    } else {
      alert('Le formulaire contient des erreurs');
    }
  }
}
