import { Component, OnInit } from '@angular/core';
import { FournisseurServiceService } from '../../fournisseurService/fournisseur-service.service';
import { Fournisseur } from '../../fournisseur';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../../../sidebar/sidebar.component";
@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.css'],

})
export class AddFournisseurComponent  {
  fournisseur: Fournisseur = new Fournisseur();

  constructor(private fournisseurService: FournisseurServiceService) { }

  ajouterFournisseur(fournisseurForm: NgForm) {
    if (fournisseurForm.invalid) {
      alert("Veuillez remplir tous les champs correctement !");
      return;
    }

    this.fournisseurService. addfournisseur(this.fournisseur).subscribe(
      response => {
        console.log('Fournisseur ajouté :', response);
        alert("Fournisseur ajouté avec succès !");
        fournisseurForm.resetForm(); // Réinitialiser le formulaire
        this.fournisseur = new Fournisseur(); // Réinitialisation de l'objet
      },
      error => {
        console.error('Erreur lors de l\'ajout du fournisseur :', error);
        alert("Erreur lors de l'ajout du fournisseur !");
      }
    );
  }

}
