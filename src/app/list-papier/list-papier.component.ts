import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TerreService } from '../TerreService.service';
import { papier } from './papier';
import * as bootstrap from 'bootstrap';
import { Terre } from '../listterre/Terre';

@Component({
  selector: 'app-list-papier',
  templateUrl: './list-papier.component.html',
  styleUrls: ['./list-papier.component.css']
})
export class ListPapierComponent implements OnInit {

  PapierForm!: FormGroup;
  addedCard: any = null;
  cards: any[] = [];
  papiers: papier[] = [];
  selectedAutorisation: any;
  id!: number;
  terrain: Terre = new Terre();
 
  selectedTerrainId!: number; // Store the terrain ID
  modal: any;
  papier = { 
    id_Autorisation: 0, 
    type_Autorisation: '', 
    statut: '', 
    description: '', 
    terrainid: 0 ,
    imagePath: '' ,
    notif: 0
  };
  
  constructor(
    private fb: FormBuilder,
    private terreservice: TerreService,
    private router: Router,
    private http: HttpClient,
    private ac: ActivatedRoute
  ) {
 
  }



  ngOnInit(): void {
    this.PapierForm = new FormGroup({
      type_Autorisation: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[A-Za-zÀ-ÿ\\s]+$') // Autorise les espaces
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[A-Za-zÀ-ÿ\\s]+$')
      ]),
      statut: new FormControl('pas_valide', Validators.required) // ✅ Définit "pas_valide" par défaut
    });

    this.id = this.ac.snapshot.params['id'];
    this.getPapierListByTerrainId(this.id);
  }


  
  resetNotification(card: any): void {
    console.log('Before API Call:', card.notif);
  
    this.terreservice.getTerreById(this.id).subscribe((data: Terre) => {
      this.terrain = data;
      console.log('Terrain Retrieved:', this.terrain);
  
      // Now modify terrain.notif AFTER we have received the terrain data
      this.terrain.notif -= card.notif;
  
      // Update the terrain in the database
      this.terreservice.updateTerre(this.terrain).subscribe(() => {
        console.log('✅ Terrain notification updated in database');
      });
  
      // Reset the notification count for the card
      card.notif = 0;
      this.terreservice.updatePapier(card, this.id).subscribe(() => {
        console.log('✅ Card notification updated in database');
      });
  
      console.log('After Update:', card.notif); // Should log 0
    });
  }
  
  openModal(pa: papier) {
    this.papier = { ...pa }; // First, copy the properties of 'pa' (the selected card) into 'this.papier'
    this.papier.terrainid = this.id; // Now set the 'terrainid' after the copy
  
    console.log('Opening modal with papier:', this.papier); // Debugging to ensure correct data
  
    const modalElement = document.getElementById('updateModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('La modale avec l\'ID "updateModal" n\'a pas été trouvée.');
    }
  }
  

  updateData() {
    console.log('Données mises à jour:', this.papier);
    
    // Ensure the papier object contains the required fields
    if (this.papier.terrainid) {
      console.log(this.papier.terrainid);
    }
  
    this.terreservice.updatePapier(this.papier, this.id).subscribe(
      (response) => {
        console.log('Update successful:', response);
        alert('Papier updated successfully!');
        this.closeModal()

        this.getPapierListByTerrainId(this.id);
      },
      (error) => {
        console.error('Update failed:', error);
        alert('An error occurred while updating the terrain');
      }
    );
  }
  
closeModal() {
  const modalElement = document.getElementById('updateModal');
  if (modalElement) {
    const modalInstance = bootstrap.Modal.getInstance(modalElement); // Get the existing instance
    if (modalInstance) {
      modalInstance.hide(); // Hide the modal
    } else {
      console.warn('Modal instance not found. Creating a new one to close.');
      new bootstrap.Modal(modalElement).hide(); // Fallback: create and hide modal
    }
  } else {
    console.error('Modal element not found.');
  }
}


  // Toggle statut between 'valide' and 'pas_valide'
  onToggleStatut(event: Event, papier: any): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const newStatut = isChecked ? 'valide' : 'pas_valide';

    // Only update if the statut has changed
    if (papier.statut !== newStatut) {
      papier.statut = newStatut;
      papier.terrainId = this.id;

      this.terreservice.updatePapier(papier, this.id).subscribe(response => {
        console.log('Papier mis à jour avec succès:', response);
        this.getPapierListByTerrainId(this.id); // Refresh list after update
      }, error => {
        console.error('Erreur lors de la mise à jour du papier:', error);
      });
    }
  }

  // Get list of papiers based on terrainId
  getPapierListByTerrainId(terrainId: number, page: number = 1, pageSize: number = 10): void {
    this.terreservice.getPapierListByTerrainId(terrainId).subscribe(
      (data) => {
        this.cards = data; 
        this.papiers = data;
        console.log('Fetched papers: ', data);
      },
      (error) => {
        console.error('Error fetching papers: ', error);
      }
    );
  }

  // Open the modal to update the paper
  

  // Delete Papier
  deletepapier(id: number): void {
    this.terreservice.deletepapier(id).subscribe(() => {
      this.cards = this.cards.filter(papier => papier.id_Autorisation !== id);
    });
  }

  // Confirm delete action
  confirmDelete(id: number): void {
    if (window.confirm("Are you sure you want to delete this paper?")) {
      this.deletepapier(id);
    }
  }
  
 
  // Handle form submission for adding a new Papier
  onFormSubmit(): void {
    const isConfirmed = window.confirm('Are you sure you want to submit the form?');
    
    if (isConfirmed && this.PapierForm.valid) {
      const papierData = {
        ...this.PapierForm.value,
        terrain: { id: this.id }
      };

      this.terreservice.createPapier(papierData, this.id).subscribe(data => {
        console.log('Created Papier:', data);
        this.closeModal();  
        this.getPapierListByTerrainId(this.id);

      }, error => {
        console.error('Error creating Papier:', error);
        alert('There was an error while creating the Papier');
      });

      this.PapierForm.reset();
    } else {
      alert('Form is invalid or submission canceled');
      console.log('Form submission canceled');
    }
  }
}
