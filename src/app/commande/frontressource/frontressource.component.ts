import { Component, NgZone, OnInit } from '@angular/core';
import { RessourceServiceService } from '../RessourceService/ressource-service.service';
import { PanierServService } from '../PanierService/panier-serv.service';
import { Ressource } from '../ressource';
import { HeadComponent } from "../../head/head.component";

@Component({
  selector: 'app-frontressource',
  templateUrl: './frontressource.component.html',
  styleUrls: ['./style1.css'],
 
})
export class FrontressourceComponent implements OnInit {
  ressources: Ressource[] = []; // Liste des ressources
  fournisseurs: any[] = []; // Liste des fournisseurs
  quantites: { [key: number]: number } = {}; // Dictionnaire pour la quantité de chaque ressource

  constructor(
    private ressourceService: RessourceServiceService,
    private panierService: PanierServService,private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.getFournisseurs();
    this.getRessources();
  }

  // Récupérer les fournisseurs
  getFournisseurs(): void {
    this.ressourceService.getFournisseurs().subscribe(
      data => {
        console.log('Fournisseurs récupérés:', data);  
        this.fournisseurs = data;
      },
      error => console.error('Erreur lors de la récupération des fournisseurs', error)
    );
  }

  // Récupérer les ressources
  getRessources(): void {
    this.ressourceService.getAllRessources().subscribe(
      data => {
        console.log('Ressources récupérées:', data);  
        this.ressources = data;
        // Vérifie chaque ressource au chargement
        this.ressources.forEach(res => this.resetStockAfterDelay(res));
      },
      error => console.error('Erreur lors de la récupération des ressources', error)
    );
  }

  // Initialiser la quantité pour chaque ressource
  initQuantite(ressourceId: number): void {
    if (!this.quantites[ressourceId]) {
      this.quantites[ressourceId] = 1; // Quantité par défaut
    }
  }

  // Ajouter la ressource avec la quantité au panier
  addToCart(ressourceId: number): void {
    const quantite = this.quantites[ressourceId] || 1; // Utiliser la quantité locale ou 1 par défaut
    console.log("Ajout au panier de la ressource ID :", ressourceId, " Quantité :", quantite);
    this.panierService.addToCartt(ressourceId, quantite).subscribe(
      response => {
        console.log('Ressource ajoutée au panier:', response);
        alert('Ressource ajoutée au panier !');
      },
      error => console.error('Erreur lors de l\'ajout au panier', error)
    );
  }
  typesProduits: string[] = ['MATERIAUX', 'MAIN_DŒUVRE',  'ENERGIE', 'OUTILLAGE'];
  selectedType: string = ''; // Par défaut, aucun filtre

  filteredRessources(): Ressource[] {
    if (!this.selectedType) {
      return this.ressources.filter(res => res.typeProduit !== 'EQUIPEMENT'); // Filtre les ressources dont le type n'est pas "EQUIPEMENT"
    }
    return this.ressources.filter(res => res.typeProduit === this.selectedType && res.typeProduit !== 'EQUIPEMENT'); // Filtre aussi les "EQUIPEMENT"
  }
  
  resetStockAfterDelay(ressource: Ressource) {
    if (ressource.quantiteDisponible === 0) {
      console.log(`Réapprovisionnement automatique de ${ressource.nomProduit} dans 1 minute...`);
  
      setTimeout(() => {
        this.ngZone.run(() => {
          console.log(`Réapprovisionnement en cours pour ${ressource.nomProduit}...`);
  
          // Mettre à jour en local
          ressource.quantiteDisponible = 10;
          ressource.active = true;
  
          // Mise à jour en base de données
          this.ressourceService.updateRessourceStock(ressource.idProduit ?? 0, 10).subscribe(
            response => {
              console.log(`Réapprovisionnement en base réussi pour ${ressource.nomProduit}`, response);
            },
            error => {
              console.error(`Erreur lors du réapprovisionnement en base pour ${ressource.nomProduit}`, error);
            }
          );
  
          console.log(`Réapprovisionnement terminé pour ${ressource.nomProduit}. Nouveau stock: 10`);
        });
      }, 1 * 60 * 1000);
    }
  }
  
  
}
