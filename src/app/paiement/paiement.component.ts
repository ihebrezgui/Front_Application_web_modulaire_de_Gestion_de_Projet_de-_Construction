import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanierServService } from '../commande/PanierService/panier-serv.service';
import { CommandeSerService } from '../commande/CommandeService/commande-ser.service';
import { Commande,EtatCommande } from '../commande/commande';
@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  nomTitulaire: string = '';
  numeroCarte: string = '';
  expiration: string = '';
  cvv: string = '';

  cartRessources: any[] = [];
  dateLivraisonPrevue: Date | undefined;

  constructor(private router: Router, private commandeService: CommandeSerService, private panierService: PanierServService) {}

  ngOnInit(): void {
    const cartData = localStorage.getItem('cartRessources');
    this.cartRessources = cartData ? JSON.parse(cartData) : [];
    const dateLivraison = localStorage.getItem('dateLivraisonPrevue');
    this.dateLivraisonPrevue = dateLivraison ? new Date(dateLivraison) : undefined;
  }

  onSubmit() {
    if (!this.nomTitulaire || !this.numeroCarte || !this.expiration || !this.cvv) {
      alert("Veuillez remplir tous les champs de paiement !");
      return;
    }

    const ressources = this.cartRessources.map(item => ({
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
    commande.username = localStorage.getItem('username') ?? '';
    commande.iduser = parseInt(localStorage.getItem('id') ?? '0');

    this.commandeService.addCommandeWithRessourcesJson(commande).subscribe(
      (response) => {
        alert("Commande confirmée !");
this.router.navigate(['/afficher']);
        ressources.forEach(ressource => {
          this.panierService.traiterCommande(ressource.idProduit, ressource.quantite).subscribe();
        });

        this.panierService.viderPanier().subscribe(() => {
          localStorage.removeItem('cartRessources');
          //this.router.navigate(['/afficher']);
        });
      },
      (error) => {
        console.error("Erreur lors de la commande", error);
        alert("Erreur lors du traitement de la commande !");
      }
    );
  }
}
