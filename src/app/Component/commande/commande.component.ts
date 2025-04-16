import { Component } from '@angular/core';
import { CommandeSerService } from './CommandeService/commande-ser.service';
import { Router } from '@angular/router';
import { Commande } from './commande';
import { PanierServService } from './PanierService/panier-serv.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent {
  commandes: Commande[] = [];
  cartRessources: any[] = []; // Initialisation du panier

  selectedCommande: Commande | null = null; // Commande sélectionnée pour mise à jour

  constructor(private commandeService: CommandeSerService, private panierService: PanierServService,private router: Router) {}

  ngOnInit() {
    this.getAllCommandes(); 
  }

  getAllCommandes() {
    this.commandeService.getAll().subscribe(
      (data: Commande[]) => {
        this.commandes = data;
      },
      error => {
        console.error("Erreur lors de la récupération des commandes", error);
      }
    );
  }

  deleteCommande(id: number ) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) { // Demander confirmation
      this.commandeService.deleteCommande(id).subscribe(
        () => {
          this.commandes = this.commandes.filter(c => c.idCommande !== id); // Supprimer de la liste locale
          console.log("Commande supprimée avec succès");
        },
        error => {
          console.error("Erreur lors de la suppression de la commande", error);
        }
      );
    }
  }
  passerCommande() {
    if (this.cartRessources.length === 0) {
      alert("Votre panier est vide !");
      return;
    }
  
    // Filtrer les ressources invalides (ressource nulle ou sans prixUnitaire)
    const ressourcesValidées = this.cartRessources.filter(item => {
      return item.ressource != null && item.ressource.prixUnitaire != null;
    });
  
    // Vérifier qu'il y a des ressources valides
    if (ressourcesValidées.length === 0) {
      alert("Certaines ressources sont invalides !");
      return;
    }
  
    // Mapper les ressources validées pour la commande
    const ressources = ressourcesValidées.map(item => ({
      idProduit: item.ressource.idProduit,
      quantite: item.quantite
    }));
  
    this.commandeService.addCommandeWithRessources(ressources).subscribe(
      (response) => {
        console.log("Commande ajoutée avec succès", response);
        
        alert("Votre commande a été passée avec succès !");
        this.cartRessources = []; // Vider le panier après la commande
        localStorage.removeItem('cartRessources'); // Nettoyer le stockage local
      },
      (error) => {
        console.error("Erreur lors de l'ajout de la commande", error);
      }
    );
  }
  
  
}
