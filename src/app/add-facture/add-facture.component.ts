import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import du Router
import { FactureService } from '../facture.service';
import { Facture } from '../list-facture/Facture';

@Component({
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.css']
})
export class AddFactureComponent {
  factureForm: FormGroup;
  statut: string[] = ['PAYEE', 'EN_ATTENTE', 'PARTIELLEMENT_PAYEE'];
  description: string[] = ['Frais de service', 'Achat de matériel', 'Autre']; // Ajout de cette propriété
  today: string = new Date().toISOString().split('T')[0]; // Date actuelle au format YYYY-MM-DD

  constructor(
    private factureService: FactureService, 
    private fb: FormBuilder,
    private router: Router
  ) {
    this.factureForm = this.fb.group({
      montantTotal: ['', [Validators.required, Validators.min(0.01)]], 
      reference: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9\-]+$/)]], 
      dateEmission: ['', [Validators.required, this.dateValidator.bind(this)]], 
      statut: ['', Validators.required],
      description: ['', Validators.required] // Assurez-vous que ce champ est bien défini ici aussi
    });
  }

  dateValidator(control: any) {
    if (!control.value) return null;
    return control.value >= this.today ? null : { invalidDate: true };
  }

  onSubmit() {
    if (this.factureForm.valid) {
      const facture: Facture = this.factureForm.value;
      console.log('Données envoyées :', facture);

      this.factureService.addFacture(facture).subscribe({
        next: (response) => {
          console.log('Facture ajoutée avec succès !', response);
          alert('Facture ajoutée avec succès !');
          this.factureForm.reset();
          this.router.navigate(['/factures']);
        },
        error: (error) => {
          console.error('Erreur lors de l’ajout de la facture', error);
          alert('Erreur lors de l’ajout de la facture.');
        }
      });
    } else {
      console.error('Formulaire invalide :', this.factureForm.value);
      alert('Formulaire invalide !');
    }
  }
}


