import { Component, OnInit } from '@angular/core';
import { RessourceServiceService } from '../../RessourceService/ressource-service.service';

export class Ressource {
    idProduit?: number;
    description?: string;
    nomProduit?: string;
    prixUnitaire?: number;
    typeProduit?: string;
    fournisseurId?: number | undefined;
    imageUrl?: string; // Ajout du champ image
    fournisseur?: { idFournisseur: number };
  }
  
  @Component({
    selector: 'app-add-ressource',
    templateUrl: './add-ressource.component.html',
    styleUrls: ['./add-ressource.component.css']
  })
  export class AddRessourceComponent implements OnInit {
    ressource: Ressource = {
      nomProduit: '',
      description: '',
      prixUnitaire: 0,
      imageUrl: '',
      typeProduit: '',
      fournisseurId: undefined
    };
  
    fournisseurs: any[] = [];
    selectedFile: File | null = null;
    imagePreview: string | ArrayBuffer | null = null;
  
    constructor(private ressourceService: RessourceServiceService) {}
  
    ngOnInit() {
      this.getFournisseurs();
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
  
    // Fonction pour gérer la sélection du fichier
    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
          this.selectedFile = file;
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result;
            if (result !== undefined) {
              this.imagePreview = result;
            } else {
              this.imagePreview = null;
            }
          };
          reader.readAsDataURL(file);
        }
      }
    // Fonction pour ajouter la ressource
    ajouterRessource() {
      if (!this.ressource.nomProduit || !this.ressource.description || !this.ressource.prixUnitaire || !this.ressource.typeProduit || this.ressource.fournisseurId === undefined) {
        console.error('Erreur : tous les champs doivent être remplis.');
        return;
      }
  
      const fournisseur = { idFournisseur: this.ressource.fournisseurId };
      this.ressource.fournisseur = fournisseur;
  
      if (this.selectedFile) {
        // Si une image est sélectionnée, l'uploader d'abord
        this.ressourceService.uploadImage(this.selectedFile).subscribe(
          (response) => {
            this.ressource.imageUrl = response.fileUrl; // L'URL de l'image est récupérée
            this.envoyerRessource();
          },
          (error) => {
            console.error('Erreur lors de l\'upload de l\'image :', error);
          }
        );
      } else {
        // Si aucune image, envoyer directement la ressource
        this.envoyerRessource();
      }
    }
  
    // Fonction pour envoyer la ressource après l'upload
    envoyerRessource() {
        this.ressourceService.addRessource(this.ressource).subscribe(
          (response) => {
            console.log('Ressource ajoutée :', response);
            this.resetForm();
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de la ressource :', error);
          }
        );
      }
    
      resetForm() {
        this.ressource = {
          nomProduit: '',
          description: '',
          prixUnitaire: 0,
          typeProduit: '',
          fournisseurId: undefined
        };
        this.selectedFile = null;
        this.imagePreview = null;
      }
  }
