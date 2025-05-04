import { Component, NgZone, OnInit } from '@angular/core';
import { Ressource } from '../../ressource';
import { RessourceServiceService } from '../../RessourceService/ressource-service.service';
import { PanierServService } from '../../PanierService/panier-serv.service';
import { CommandeSerService } from '../../CommandeService/commande-ser.service';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrls: ['./style1.css']
})
export class EquipementComponent implements OnInit {
  ressources: Ressource[] = []; // Liste des ressources
  fournisseurs: any[] = []; // Liste des fournisseurs
  quantites: { [key: number]: number } = {};
  commandesEnRetard: any[] = [];
  dateLivraisonPrevue: string = ''; // Dictionnaire pour la quantité de chaque ressource

  constructor(
    private ressourceService: RessourceServiceService,private commandeService: CommandeSerService,
    private panierService: PanierServService, private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.getFournisseurs();
    this.getRessources();
    this.getCommandesEnRetard();  // Fetch commandes en retard on init
    this.updateCommandesState();
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

  // Afficher uniquement les ressources de type "EQUIPEMENT"
  filteredRessources(): Ressource[] {
    return this.ressources.filter(res => res.typeProduit === 'EQUIPEMENT');
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
   // Get all commandes en retard
   getCommandesEnRetard(): void {
    this.commandeService.getCommandesEnRetard().subscribe(
      data => {
        this.commandesEnRetard = data;
        console.log('Commandes en retard:', data);
      },
      error => console.error('Erreur lors de la récupération des commandes en retard', error)
    );
  }

  // Update commandes state
  updateCommandesState(): void {
    this.commandeService.verifierEtMettreAJourEtatCommandes().subscribe(
      response => {
        console.log('État des commandes mis à jour:', response);
      },
      error => console.error('Erreur lors de la mise à jour des commandes', error)
    );
  }

  // Receptionner a commande (update its state)
  receptionnerCommande(id: number): void {
    this.commandeService.receptionnerCommande(id).subscribe(
      response => {
        console.log('Commande reçue:', response);
      },
      error => console.error('Erreur lors de la réception de la commande', error)
    );
  }
  formatDate(date: string): string {
    const formattedDate = new Date(date);
    return `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`;
  }
}
