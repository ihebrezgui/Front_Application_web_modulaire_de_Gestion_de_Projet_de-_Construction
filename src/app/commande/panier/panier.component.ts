import { Component, OnInit } from '@angular/core';
import { PanierServService } from '../PanierService/panier-serv.service';
import { CommandeSerService } from '../CommandeService/commande-ser.service';
import { Commande, EtatCommande } from '../commande';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./style1.css']
})
export class PanierComponent implements OnInit {
  cartRessources: any[] = [];  // Liste des ressources dans le panier
  cartId: number = 1;  // ID du panier par défaut
  stockDetails: any = null; // Pour stocker les informations du stock après la commande
  loadingStock: boolean = false; 
  dateLivraisonPrevue: Date | undefined;
  constructor(private panierService: PanierServService,private commandeService: CommandeSerService) {}

  ngOnInit(): void {
    this.loadCartRessources();  // Charger les ressources du panier au démarrage
  }

  // Charger les ressources du panier depuis l'API
  loadCartRessources() {
    this.panierService.getCartRessources().subscribe(data => {
      this.cartRessources = data;  // Stocker les ressources dans la variable
      console.log('Cart Resources:', this.cartRessources);  // Vérifier la structure des données
    });
  }

  // Supprimer une ressource du panier
  removeFromCart(ressourceId: number) {
    this.panierService.removeFromCart(ressourceId).subscribe(() => {
      this.loadCartRessources();  // Recharger les ressources après suppression
    });
  }
  passerCommande() {
    if (this.cartRessources.length === 0) {
      alert("Votre panier est vide !");
      return;
    }
  
    const ressourcesValidées = this.cartRessources.filter(item => item.ressource && item.ressource.prixUnitaire);
    if (ressourcesValidées.length === 0) {
      alert("Certaines ressources sont invalides !");
      return;
    }
  
    const ressources = ressourcesValidées.map(item => ({
      nomProduit: item.ressource.nomProduit,
      quantite: item.quantite,
      idProduit: item.ressource.idProduit
    }));
  
    const ressourcesJson = JSON.stringify(ressources);
    const commande = new Commande();
    commande.ressourcesJson = ressourcesJson;
    commande.etatCommande = EtatCommande.EN_COURS;
    commande.dateCommande = new Date();
    commande.dateLivraisonPrevue = this.dateLivraisonPrevue;
    commande.username = localStorage.getItem('username')?.toString() ?? '';
    commande.iduser = parseInt(localStorage.getItem('id')?.toString() ?? '0');
  
    this.commandeService.addCommandeWithRessourcesJson(commande).subscribe(
      (response) => {
        console.log("Commande ajoutée avec succès", response);
        alert("Votre commande a été passée avec succès !");
        ressources.forEach((ressource) => {
          this.panierService.traiterCommande(ressource.idProduit, ressource.quantite).subscribe(
            (response) => {
              console.log("Stock mis à jour pour la ressource", ressource.nomProduit);
              // Si la ressource est en rupture de stock, gérer le cas
              if (response === "Stock mis à jour après la commande.") {
                alert(`Ressource ${ressource.nomProduit} mise à jour.`);
              } else {
                alert(`Ressource ${ressource.nomProduit} hors stock.`);
              }
            },
            (error) => {
              console.error("Erreur lors de la mise à jour du stock", error);
            }
          );
        });
  
        // 🔴 Supprimer toutes les ressources du panier après la commande
        this.panierService.viderPanier().subscribe(() => {
          console.log("Panier vidé après la commande");
          this.cartRessources = []; // Mettre à jour le frontend
        });
  
        localStorage.removeItem('cartRessources'); // Nettoyer le stockage local
        window.location.reload(); // Recharger la page
      },
      (error) => {
        console.error("Erreur lors de l'ajout de la commande", error);
      }
    );
  }
  
  
  getStockAfterCommande(ressourceId: number) {
    this.loadingStock = true;  // Indiquer que la requête est en cours
    this.panierService.getStockAfterCommande(ressourceId).subscribe(
      (data) => {
        this.stockDetails = data; // Stock mis à jour
        this.loadingStock = false; // Fin du chargement
        console.log('Stock après commande:', this.stockDetails);
      },
      (error) => {
        this.loadingStock = false; // Fin du chargement même en cas d'erreur
        console.error("Erreur lors de la récupération du stock", error);
      }
    );
  }

}
