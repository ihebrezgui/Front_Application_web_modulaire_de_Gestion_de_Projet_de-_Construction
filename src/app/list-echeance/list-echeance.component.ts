import { Component, OnInit } from '@angular/core';
import { Echeance } from './Echeance'; // Assurez-vous que le chemin est correct
import { EcheanceService } from '../echeance.service';  // Utilisation de EcheanceService
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-echeance',
  templateUrl: './list-echeance.component.html',
  styleUrls: ['./list-echeance.component.css']
})
export class ListEcheanceComponent implements OnInit {
  echeances!: Echeance[];

  constructor(private echeanceService: EcheanceService, private router: Router) {} // Injection du service EcheanceService

  ngOnInit(): void {
    this.getEcheances();
  }

  private getEcheances(): void {
    this.echeanceService.getEcheanceList().subscribe(
      (data: Echeance[]) => {
        console.log('Données des échéances:', data); // Ajoutez cette ligne pour vérifier les données
        this.echeances = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des échéances:', error);
      }
    );
  }
  deleteEcheance(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette échéance ?')) {
      this.echeanceService.deleteEcheance(id).subscribe(
        () => {
          console.log(`Échéance avec ID ${id} supprimée.`);
          this.getEcheances(); // Rafraîchir la liste après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'échéance:', error);
        }
      );
    }
  }
  
  
  goToUpdate(id: number): void {
    this.router.navigate(['/updateEcheance', id]);
  }
  goToAjouterFacture() {
    this.router.navigate(['/factures']);
  }
  goToAjouterEcheance() {
    this.router.navigate(['/addEcheance']);
  }

}
