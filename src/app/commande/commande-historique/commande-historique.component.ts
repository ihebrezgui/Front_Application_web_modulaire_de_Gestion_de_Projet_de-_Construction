import { Component, OnInit } from '@angular/core';
import { Commande, EtatCommande } from '../commande';
import { CommandeSerService } from '../CommandeService/commande-ser.service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-commande-historique',
  templateUrl: './commande-historique.component.html',
  styleUrls: ['./commande-historique.component.css']
})
export class CommandeHistoriqueComponent implements OnInit {
  commandes: Commande[] = [];
  sortAscending: boolean = true; 
  EtatCommande = EtatCommande;// Indicateur pour trier

  constructor(private commandeService: CommandeSerService,private router: Router) {}

  ngOnInit() {
    this.getAllCommandes();
  }

  getAllCommandes() {
    const userId = localStorage.getItem('id');  // Récupérer l'ID de l'utilisateur depuis le localStorage
  
    if (!userId) {
      console.error("ID de l'utilisateur non trouvé dans le localStorage");
      return;
    }
  
    this.commandeService.getAll().subscribe(
      (data: Commande[]) => {
        // Filtrer les commandes par l'ID de l'utilisateur
        this.commandes = data.filter(commande => commande.iduser === Number(userId));
        this.sortByDate(); // Trier par défaut après filtrage
      },
      error => {
        console.error("Erreur lors de la récupération des commandes", error);
      }
    );
  }
  
  

  // Fonction pour trier selon la dateCommande
  sortByDate() {
    this.commandes.sort((a, b) => {
      const dateA = a.dateCommande !== undefined ? new Date(a.dateCommande).getTime() : 0;
      const dateB = b.dateCommande !== undefined ? new Date(b.dateCommande).getTime() : 0;
      return this.sortAscending ? dateA - dateB : dateB - dateA;
    });
    this.sortAscending = !this.sortAscending; // Inverser l'ordre au prochain tri
  }

  // Fonction pour générer le PDF
  generatePDF() {
    const doc = new jsPDF();
    doc.text('Historique des Commandes', 20, 10);

    autoTable(doc, {
      head: [['ID Commande', 'Date Commande', 'État', 'Nombre de Ressources']],
      body: this.commandes.map(commande => [
        commande.idCommande ?? '',
        new Date(commande.dateCommande ?? '').toLocaleString(),
        commande.etatCommande ?? '',
        commande.ressourcesJson ?? '0'
      ]),
      startY: 20,
    });

    doc.save('historique_commandes.pdf');
  }
  getCommandesEnRetard() {
    this.commandeService.getCommandesEnRetard().subscribe(
      (data: Commande[]) => {
        this.commandes = data;
        alert('Commandes en retard récupérées.');
      },
      error => {
        console.error("Erreur lors de la récupération des commandes en retard", error);
      }
    );
  }

  // Fonction pour réceptionner une commande
  receptionnerCommande(id: number) {
    this.commandeService.receptionnerCommande(id).subscribe(
      (_response) => {
        // Mettre à jour l'état de la commande dans le tableau après réception
        const commande = this.commandes.find(c => c.idCommande === id);
        if (commande) {
          commande.etatCommande = EtatCommande.RECUE; // Mettre à jour l'état localement
        }
        alert('Commande reçue avec succès!');
      },
      error => {
        console.error("Erreur lors de la réception de la commande", error);
      }
    );
  }
  verifierEtMettreAJourEtatCommandes() {
    this.commandeService.verifierEtMettreAJourEtatCommandes().subscribe(
      _response => {
        alert('Les états des commandes ont été mis à jour');
        this.getAllCommandes();  // Recharger les commandes après mise à jour
      },
      error => {
        console.error('Erreur lors de la mise à jour des états des commandes', error);
      }
    );
  }
  suivreLivraison(idCommande: number): void {
    this.router.navigate(['/tracking', idCommande]);}
}
