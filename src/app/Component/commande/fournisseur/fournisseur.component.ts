import { Component } from '@angular/core';
import { FournisseurServiceService } from '../fournisseurService/fournisseur-service.service';
import { Router } from '@angular/router';
import { Fournisseur } from '../fournisseur';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent {
  fournisseurs: Fournisseur[] = [];
  fournisseursFiltrés: Fournisseur[] = [];
  critereRecherche: string = '';

   constructor(private fournisseurService: FournisseurServiceService, private router: Router) {}
   
ngOnInit() {
    this.getAllfournisseurs(); 
  }

  getAllfournisseurs() {
    this.fournisseurService. getAllfournisseurs().subscribe(
      (data:Fournisseur[]) => {
        this. fournisseurs = data;
      },
      error => {
        console.error("Erreur lors de la récupération des commandes", error);
      }
    );
  }
  supprimerfournisseur(id: number) {
    this.fournisseurService.supprimerfournisseur(id).subscribe(
      () => {
        this.getAllfournisseurs();
      },
      error => {
        console.error("Erreur lors de la suppression de la commande", error);
      }
    );
  }
  filterText: string = ''; // Texte de recherche
  sortKey: string = 'nomFournisseur'; // Clé de tri par défaut
  sortOrder: 'asc' | 'desc' = 'asc'; // Ordre de tri
  searchRessources() {
    if (this.filterText.trim() === '') {
      this.getAllfournisseurs(); // Recharge toutes les ressources si la recherche est vide
    } else {
      this.fournisseurs = this.fournisseurs.filter(Fournisseur =>
        (Fournisseur.nomFournisseur ?? '').toLowerCase().includes(this.filterText.toLowerCase())
      );
    }
  }
  // Fonction de tri
  sortRessources(key: string) {
    this.sortKey = key;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  
    this.fournisseurs.sort((a :any, b: any) => {
      let valueA = a[key];
      let valueB = b[key];
  
      if (typeof valueA === 'string') valueA = valueA.toLowerCase();
      if (typeof valueB === 'string') valueB = valueB.toLowerCase();
  
      if (valueA < valueB) return this.sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
