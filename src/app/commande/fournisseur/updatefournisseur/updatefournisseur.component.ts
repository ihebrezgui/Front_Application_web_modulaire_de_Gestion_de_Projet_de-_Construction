import { Component, OnInit } from '@angular/core';
import { RessourceServiceService } from '../../RessourceService/ressource-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Fournisseur } from '../../fournisseur';
import { FournisseurServiceService } from '../../fournisseurService/fournisseur-service.service';

@Component({
  selector: 'app-updatefournisseur',
  templateUrl: './updatefournisseur.component.html',
  styleUrls: ['./updatefournisseur.component.css']
})
export class UpdatefournisseurComponent implements OnInit{
 
    fournisseurs: Fournisseur = {
      idFournisseur: undefined,
      nomFournisseur: "",      // Nom du fournisseur
      adresseFournisseur: "" , // Adresse du fournisseur
      emailFournisseur: "" ,    // Email du fournisseur
      telephoneFournisseur: ""
    };
    
 constructor(
    private fournisseurService: FournisseurServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadfournisseur();
  }
  
  loadfournisseur() {
    const fournisseurId = +this.route.snapshot.paramMap.get('id')!; // Récupérer l'ID du fournisseur depuis l'URL
    this.fournisseurService.getAllfournisseurs().subscribe(
      fournisseurs => {
        const foundFournisseur = fournisseurs.find(f => f.idFournisseur === fournisseurId); // Remplacez 'id' par le champ correct de votre modèle
        if (foundFournisseur) {
          this.fournisseurs = foundFournisseur; // Charger le fournisseur à mettre à jour
          console.log("Fournisseur récupéré:", this.fournisseurs);  // Debug
        } else {
          console.error('Fournisseur non trouvé pour l\'ID:', fournisseurId);
        }
      },
      error => {
        console.error('Erreur lors de la récupération des fournisseurs', error);
      }
    );
  }
  
  
  
  updatefournisseur() {
    console.log('Données du fournisseur à mettre à jour:', this.fournisseurs); // Debug
    this.fournisseurService.updatefournisseur(this.fournisseurs).subscribe(
        () => {
            console.log('Fournisseur mis à jour avec succès');
            this.router.navigate(['/Fournisseur']); // Redirection après mise à jour
        },
        error => {
            console.error('Erreur lors de la mise à jour du fournisseur', error);
        }
    );
}


}
