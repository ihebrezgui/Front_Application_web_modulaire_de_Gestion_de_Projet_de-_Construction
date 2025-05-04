import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TerreService } from '../TerreService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Contrat } from './contrat';

@Component({
  selector: 'app-ajouter-contrat',
  templateUrl: './ajouter-contrat.component.html',
  styleUrls: ['./ajouter-contrat.component.css']
})
export class AjouterContratComponent implements OnInit {
  contratForm!: FormGroup;
  terrains: any[] = []; // Define the terrains property to hold the list of terrains
  id!: number;
   contrat!: Contrat;
  
  constructor(private terreservice:TerreService,private router:Router,private http: HttpClient,private ac: ActivatedRoute) {
  
  }



  ngOnInit(): void {
    this.id = this.ac.snapshot.params['id'];
    this.terreservice.getTerreList().subscribe((data) => {
      this.terrains = data; // Populate the terrains property
      console.log('Terrains:', this.terrains);
    });
  
    
 // Initialiser le formulaire réactif
 this.contratForm = new FormGroup({
  nom_admin: new FormControl('', [
    Validators.required, 
    Validators.minLength(3),
    Validators.pattern('^[A-Za-zÀ-ÿ]+$') // Accepte uniquement les lettres et caractères accentués
  ]),
  
  nomProprietaire: new FormControl('', [
    Validators.required, 
    Validators.minLength(3),
    Validators.pattern('^[A-Za-zÀ-ÿ\s]+$') // Accepte uniquement des lettres et des espaces
  ]),
  
  prenom_Proprietaire: new FormControl('', [
    Validators.required, 
    Validators.minLength(3),
    Validators.pattern('^[A-Za-zÀ-ÿ\s]+$') // Accepte uniquement des lettres et des espaces
  ]),
  date_signature: new FormControl('', [
    Validators.required,
    this.dateMinValidator()  // Validation pour interdire une date passée
  ]),
  imageTerre: new FormControl(), // Add the imageTerre field here
  type_contrat: new FormControl('', [Validators.required]),
  statut_Contrat: new FormControl('valide', Validators.required) // ✅ Définit "pas_valide" par défaut
});
}

onSubmit() {
  // Ask for confirmation first
  const isConfirmed = window.confirm('Are you sure you want to submit this form?');

  if (isConfirmed) {
    // Proceed only if the user confirms
    if (this.contratForm.valid) {

      this.terreservice.getTerreList().subscribe((data) => {
        this.terrains = data; // Populate the terrains property
        console.log('Terrains:', this.terrains); // Log the entire terrains list

        // Log the ID of the selected terrain to make sure it exists
        console.log('Selected terrain ID:', this.id);

        // Ensure this.id is valid before searching
        if (!this.id) {
          console.error('Selected terrain ID is invalid:', this.id);
          alert('Invalid terrain ID!');
          return;
        }

        // Ensure both this.id and t.idTerrain are of the same type for comparison (convert both to numbers)
        const terrain = this.terrains.find(t => Number(t.idTerrain) === Number(this.id)); // Force both to be numbers

        console.log('Selected terrain:', terrain);  // Log the terrain object

        if (!terrain) {
          console.error('Terrain not found for ID:', this.id);
          alert('Terrain not found!');
          return;
        }

        // Check if the imagePath is correct or null
        const imageTerre = terrain.imagePath ? terrain.imagePath : 'assets/default-image.jpg'; 

        // If imagePath is null, it will fall back to default
        if (!terrain.imagePath) {
          console.warn('Image path is null or empty, using default image.');
        }

        // Add the terrain image to the form value
        this.contratForm.value.idTerrain = this.id;
        this.contratForm.value.imageterre = imageTerre;
        this.contratForm.value.indice=1;

        this.contrat = this.contratForm.value;

        console.log("Formulaire soumis :", this.contrat);
        
        // Proceed to create the contract
        this.terreservice.createContrat(this.contrat, this.id).subscribe(data => {
          console.log(data);
          

          this.router.navigate(['/listterre']);
        });
      });

    } else {
      alert("Veuillez remplir correctement tous les champs.");
    }
  } else {
    console.log("Form submission canceled.");
  }
}



resetForm() {
  this.contratForm.reset({
    nom_admin: '',
    nom_Proprietaire: '',
    prenom_Proprietaire: '',
    type_contart: '',
    date_signature: '',
    statut_Contrat: 'Valide'
  });
}
dateMinValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // Si aucun champ n'est rempli, pas d'erreur
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);  // Supprime l'heure pour comparer uniquement la date

    const selectedDate = new Date(control.value);

    return selectedDate < today ? { 'dateInvalid': true } : null;
  };
}

}
