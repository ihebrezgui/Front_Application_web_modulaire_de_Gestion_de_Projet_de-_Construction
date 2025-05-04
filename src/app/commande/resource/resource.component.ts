import { Component, OnInit } from '@angular/core';
import { Ressource } from '../ressource'; // Assurez-vous d'importer votre interface Ressource
// Assurez-vous d'importer le service pour les ressources
import { RessourceServiceService } from '../RessourceService/ressource-service.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  ressources: Ressource[] = []; // Tableau pour stocker les ressources

  constructor(private ressourceService:RessourceServiceService) {} // Injection du service RessourceService

  ngOnInit() {
    this.getAllRessources(); // Appel de la méthode pour récupérer toutes les ressources au démarrage
  }

  getAllRessources() {
    this.ressourceService.getAllRessources().subscribe(
      (data: Ressource[]) => {
        console.log("Données récupérées : ", data); // Ajout d'un log pour voir les données
        this.ressources = data; // Stockage des ressources récupérées
      },
      error => {
        console.error("Erreur lors de la récupération des ressources", error); // Gestion des erreurs
      }
    );
  }
  

  deleteRessource(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?')) {
      this.ressourceService.deleteRessource(id).subscribe(
        () => {
          this.ressources = this.ressources.filter(r => r.idProduit !== id); // Mise à jour de la liste locale
          console.log("Ressource supprimée avec succès");
        },
        error => {
          console.error("Erreur lors de la suppression de la ressource", error);
        }
      );
    }
  }
  addRessource() {
    console.log("Ajout de ressource");
  
    const newRessource = new Ressource(); // Create a new instance of Ressource
    // Initialize the properties of newRessource as needed
  
    this.ressourceService.addRessource(newRessource).subscribe(
      (ressource: Ressource) => {
        this.ressources.push(ressource);
        console.log("Ressource ajoutée avec succès");
      },
      error => {
        console.error("Erreur lors de l'ajout de la ressource", error);
      }
    );
  }
  filterText: string = ''; // Texte de recherche
sortKey: string = 'nomProduit'; // Clé de tri par défaut
sortOrder: 'asc' | 'desc' = 'asc'; // Ordre de tri

// Fonction de recherche
// Fonction de recherche
searchRessources() {
  if (this.filterText.trim() === '') {
    this.getAllRessources(); // Recharge toutes les ressources si la recherche est vide
  } else {
    this.ressources = this.ressources.filter(ressource =>
      (ressource.nomProduit ?? '').toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
}
// Fonction de tri
sortRessources(key: string) {
  this.sortKey = key;
  this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';

  this.ressources.sort((a :any, b: any) => {
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
