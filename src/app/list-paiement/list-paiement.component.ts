import { Component, OnInit } from '@angular/core';
import { Paiement } from './Paiement'; // Ensure the path is correct
import { PaiementService } from '../paiement.service';  // Service for Paiement
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-paiement',
  templateUrl: './list-paiement.component.html',
  styleUrls: ['./list-paiement.component.css']
})
export class ListPaiementComponent implements OnInit {

  paiements!: Paiement[]; // List of Paiements
  nbre: number = 1; // Default number of installments (you can adjust this logic as per your requirement)

  constructor(private paiementService: PaiementService, private router: Router) { }

  ngOnInit(): void {
    this.getPaiements();  // Fetch payments on component initialization
  }

  // Fetch list of paiements
  private getPaiements(): void {
    this.paiementService.getPaiementList().subscribe(paiements => this.paiements = paiements);
  }

  // Delete a paiement by ID
  deletePaiement(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce paiement ?')) {
      this.paiementService.deletePaiement(id).subscribe(
        () => {
          console.log(`Paiement avec ID ${id} supprimé.`);
          this.getPaiements();  // Refresh the list after deletion
        },
        (error) => {
          console.error('Erreur lors de la suppression du paiement:', error);
        }
      );
    }
  }

  // Add a new paiement with a specific number of installments (nbre)
  addPaiement(paiement: Paiement): void {
    this.paiementService.addPaiement(paiement, this.nbre).subscribe(
      (newPaiement) => {
        console.log('Paiement ajouté avec succès:', newPaiement);
        this.getPaiements();  // Refresh the list after adding
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du paiement:', error);
      }
    );
  }
  goToAjouterPaiement() {
    this.router.navigate(['/addPaiement']);
  }
  goToAjouterFacture() {
    this.router.navigate(['/factures']);
  }
  goToUpdate(id: number): void {
    this.router.navigate(['/update-paiement', id]);
  }

}
