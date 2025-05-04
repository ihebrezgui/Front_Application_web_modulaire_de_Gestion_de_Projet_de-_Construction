import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../demande/demande.service';
import { Demande, TypeDemande } from '../demande/demande';

@Component({
  selector: 'app-demandefront',
  templateUrl: './demandefront.component.html',
  styleUrls: ['./style1.css']
})
export class DemandefrontComponent implements OnInit {
  demandes: Demande[] = [];
  newDemande: Demande = new Demande();

  constructor(private demandeService: DemandeService) {}

  ngOnInit(): void {
    this.getDemandes();
  }

  getDemandes(): void {
    this.demandeService.getAllDemandes().subscribe(
      (data) => {
        this.demandes = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des demandes', error);
      }
    );
  }
  getTypeDemandes(): string[] {
    return Object.values(TypeDemande);
  }
  

  submitDemande(): void {
    this.demandeService.addDemande(this.newDemande).subscribe(
      (data) => {
        console.log('Demande ajoutée', data);
        this.demandes.push(data); // Ajout direct à la liste
        this.newDemande = new Demande(); // Réinitialiser proprement
      },
      (error) => {
        console.error("Erreur lors de l'ajout", error);
      }
    );
  }
}
