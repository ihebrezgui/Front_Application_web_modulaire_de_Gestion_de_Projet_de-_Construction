import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListFactureService } from '../list-facture.service';

@Component({
  selector: 'app-update-facture',
  templateUrl: './update-facture.component.html',
  styleUrls: ['./update-facture.component.css']
})
export class UpdateFactureComponent implements OnInit {
  factureId!: number;
  factureForm!: FormGroup;
  statut: string[] = ['PAYEE', 'EN_ATTENTE', 'PARTIELLEMENT_PAYEE'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private factureService: ListFactureService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.factureId = parseInt(id, 10);
        console.log('Facture ID récupéré:', this.factureId); // ✅ Debug
        this.loadFacture();
      } else {
        console.error('Erreur: ID de facture non récupéré.');
      }
    });

    this.factureForm = this.fb.group({
      montantTotal: ['', Validators.required],
      reference: ['', Validators.required],
      dateEmission: ['', Validators.required],
      statut: ['', Validators.required]
    });
  }

  private loadFacture(): void {
    console.log('Chargement des données de la facture...'); // ✅ Debug
    this.factureService.getFactureById(this.factureId).subscribe(
      (data) => {
        console.log('Données récupérées:', data); // ✅ Debug
        if (data) {
          this.factureForm.patchValue({
            montantTotal: data.montantTotal,
            reference: data.reference,
            dateEmission: data.dateEmission,
            statut: data.statut
          });
        } else {
          console.error('Erreur: aucune donnée récupérée.');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la facture:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.factureForm.valid) {
      const updatedFacture = this.factureForm.value;
      console.log('Données envoyées pour modification:', updatedFacture); // ✅ Debug

      this.factureService.updateFacture(this.factureId, updatedFacture).subscribe(
        (response) => {
          console.log('Réponse du serveur:', response); // ✅ Debug
          console.log('Facture mise à jour avec succès');
          this.router.navigate(['/list-factures']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la facture:', error);
        }
      );
    } else {
      console.error('Erreur: Formulaire invalide.');
    }
  }
}
