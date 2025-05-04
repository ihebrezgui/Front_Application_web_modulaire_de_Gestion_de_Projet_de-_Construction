import { Component, OnInit } from '@angular/core';

import { RessourceServiceService } from '../../RessourceService/ressource-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ressource } from '../../ressource';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({  
  selector: 'app-updateressource',
  templateUrl: './updateressource.component.html',
  styleUrls: ['./updateressource.component.css']
})
export class UpdateressourceComponent implements OnInit {
  ressource: Ressource = {
    idProduit: undefined, // Set a default value instead of undefined
    description: '',
    nomProduit: '',
    prixUnitaire: 0,
    typeProduit: '',
    fournisseurId: undefined // Set a default value as well
  };
  fournisseurs: any[] = [];

  constructor(
    private ressourceService: RessourceServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getFournisseurs();
    this.loadRessource();
  }

  loadRessource() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.ressourceService.getAllRessources().subscribe(
      ressources => {
        const foundRessource = ressources.find(r => r.idProduit === id);
        if (foundRessource) {
          this.ressource = foundRessource;
        } else {
          console.error('Ressource non trouvée pour l\'ID:', id);
        }
      },
      error => {
        console.error('Erreur lors de la récupération des ressources', error);
      }
    );
  }
  

  getFournisseurs() {
    this.ressourceService.getFournisseurs().subscribe(
      data => {
        this.fournisseurs = data;
      },
      error => {
        console.error('Erreur lors de la récupération des fournisseurs :', error);
      }
    );
  }

  updateRessource() {
    console.log('Données envoyées:', this.ressource);
  
    this.ressourceService.updateRessource(this.ressource).subscribe(
      response => {
        console.log('Ressource mise à jour avec succès', response);
        this.router.navigate(['/resource']); // Redirection vers la liste des ressources
      },
      error => {
        console.error('Erreur lors de la mise à jour de la ressource', error);
      }
    );
  }
}
