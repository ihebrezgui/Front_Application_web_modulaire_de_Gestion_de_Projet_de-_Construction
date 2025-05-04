import { Component, OnInit } from '@angular/core';
import { Terre } from '../listterre/Terre';
import { TerreService } from '../TerreService.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-ajouter-terre',
  templateUrl: './ajouter-terre.component.html',
  styleUrls: ['./ajouter-terre.component.css']
})
export class AjouterTerreComponent implements OnInit {
Terrain: Terre=new Terre();
terrainForm!: FormGroup;
typeSolOptions: string[] = ['ARGILEUX', 'SABLONNEUX', 'ROCHEUX'];


constructor(private terreservice:TerreService,private router:Router,private http: HttpClient) {

  this.Terrain.typeSol = this.typeSolOptions[0];


 }
 ngOnInit(): void {
  
  // Initialiser le formulaire réactif
  this.terrainForm = new FormGroup({
    nom: new FormControl('', [
      Validators.required, 
      Validators.minLength(3),
      Validators.pattern('^[A-Za-zÀ-ÿ\\s]+$') // Accepte uniquement les lettres et caractères accentués
    ]),
    
    localisation: new FormControl('', [
      Validators.required, 
      Validators.pattern('^[A-Za-zÀ-ÿ\\s]+$')  // Accepte uniquement des lettres et des espaces
    ]),
    
    superficie: new FormControl('', [
      Validators.required, 
      Validators.min(50),      // La superficie ne peut pas être inférieure à 50
      Validators.max(3000)     // La superfi cie ne peut pas être supérieure à 3000
    ]),
    statutJuridique: new FormControl('Autorisé', [Validators.required]),

    imagePath: new FormControl('', [Validators.required]),
    typeSol: new FormControl(this.typeSolOptions[0], [Validators.required]),
  });
}

saveTerre(){
  this.terrainForm.value.ban=0;
  this.terreservice.createTerre(this.terrainForm.value).subscribe(data=>{
    console.log(data);
    this.goToTerreList();
  });
}


goToTerreList(){
  this.router.navigate(['/listterre']);

}
onSubmit() {
  console.log(this.terrainForm.value);  // Log the terrain data to check what's being submitted

  // Ask for confirmation before proceeding
  const isConfirmed = window.confirm('Are you sure you want to save this terrain?');

  if (isConfirmed) {
    console.log('User confirmed submission');  // Confirmation log
    this.saveTerre();  // Call the saveTerre function if confirmed
  } else {
    console.log('Form submission canceled');  // If canceled, log it
  }
}


// Remove this part of the code


onFileSelected(event: any) {
  const file = event.target.files[0]; // Get the actual file

  if (file) {
    // Create a new FormData object to send the file as part of the request
    const formData = new FormData();
    formData.append('file', file);

    // Send the file to your server (in this case, uploading to a URL)
    this.http.post<any>('http://localhost:8085/images', formData).subscribe(
      (response) => {
        if (response && response.imageUrl) {
          // Assuming the server responds with the image URL after upload
          this.terrainForm.value.imagePath = `http://localhost:8085${response.imageUrl}`;
          console.log('Image URL saved: ', this.terrainForm.value.imagePath);

          // Optionally update the form control with the image URL
          this.terrainForm.patchValue({
            imagePath: this.terrainForm.value.imagePath  // This is where you store the URL in the form
          });
        } else {
          console.error('Invalid response from API');
        }
      },
      (error) => {
        console.error('Error during image upload', error);
      }
    );
  }
}



}
