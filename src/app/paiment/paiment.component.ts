import { Component, OnInit } from '@angular/core';
import { ListFactureService } from '../list-facture.service';
import { Facture } from '../list-facture/Facture';

@Component({
  selector: 'app-paiment',
  templateUrl: './paiment.component.html',
  styleUrls: ['./style2.css']
})
export class PaimentComponent implements OnInit {
  isLoading: boolean = true;
  factures: Facture[] = [];

  selectedStatut: string = 'ALL'; // <- Statut sélectionné

  constructor(private factureService: ListFactureService) {}

  ngOnInit(): void {
    this.loadFactures();
  }

  loadFactures() {
    this.factureService.getFactureList().subscribe({
      next: (data) => {
        this.factures = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des factures:', err);
        this.isLoading = false;
      }
    });
  }

  get filteredFactures(): Facture[] {
    if (this.selectedStatut === 'ALL') return this.factures;
    return this.factures.filter(f => f.statut === this.selectedStatut);
  }

  filterByStatut(statut: string) {
    this.selectedStatut = statut;
  }
}
