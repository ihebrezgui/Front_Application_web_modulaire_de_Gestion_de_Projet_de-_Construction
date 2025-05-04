import { Component } from '@angular/core';
import { papier } from '../list-papier/papier';
import { Terre } from '../listterre/Terre';
import { TerreService } from '../TerreService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ac } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-papierfront',
  templateUrl: './papierfront.component.html',
  styleUrls: ['./style1.css']
})
export class PapierfrontComponent {
  id!: number;
  selectedImages: (string | ArrayBuffer | null)[] = []; // Array to store selected images for each row
    papiers:papier[]=[];
    terrain:Terre=new Terre();
  constructor(private terreservice:TerreService,private router:Router,private http: HttpClient,private ac: ActivatedRoute) {
  
 

  }
ngOnInit(): void {
  

  this.id=this.ac.snapshot.params['id'];

  this.getPapierListByTerrainId(this.id);
this.getTerrain(this.id);



}

getPapierListByTerrainId(terrainId: number): void {
  this.terreservice.getPapierListByTerrainId(terrainId).subscribe(
    (data) => {
      this.papiers = data; // Update the cards array with the fetched data
      console.log('Fetched papers: ', data);
    },
    (error) => {
      console.error('Error fetching papers: ', error);
    }
  );
}
getTerrain(terrainId: number): void {
  // Subscribe to the Observable to get the actual Terre object
  this.terreservice.getTerreById(terrainId).subscribe(
    (data) => {
      this.terrain = data; // Now you can access the properties like idTerrain, nom, etc.
      console.log('Fetched terrain: ', this.terrain);
    },
    (error) => {
      console.error('Error fetching terrain: ', error);
    }
  );
}



onFileSelected(event: any, index: number): void {
  const file = event.target.files[0];

  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    // 1️⃣ Upload de l'image
    this.http.post<any>('http://localhost:8085/images', formData).subscribe(
      (response) => {
        if (response && response.imageUrl) {
          const imageUrl = `http://localhost:8085${response.imageUrl}`;  // URL complète de l'image
          this.selectedImages[index] = imageUrl;
          this.papiers[index].imagePath = imageUrl;
          this.papiers[index].notif++;
          // 2️⃣ Mise à jour de la base de données avec l'image
          const papierToUpdate = this.papiers[index];  // Récupérer l'objet papier
          const terrainId = this.id;  // Assure-toi que terrainId est bien défini
          this.terreservice.getTerreById(terrainId).subscribe((data: Terre) => {
            this.terrain = data;
           console.log(this.terrain);
            this.terrain.notif++;
            this.terreservice.updateTerre(this.terrain).subscribe(
              () => {
                console.log('✅ Base de données mise à jour avec succès');
              },
              (error) => {
                console.error('❌ Erreur lors de la mise à jour de la base de données', error);
              }
            );
  
          });

       

          this.terreservice.updatePapier(papierToUpdate, terrainId).subscribe(
            () => {
              console.log('✅ Base de données mise à jour avec succès');

              // 3️⃣ Envoi de l'email après mise à jour
              const emailFormData = new FormData();
              emailFormData.append('filePath', 'C:\\Users\\Lenovo\\Desktop\\img\\' + file.name);  // Chemin dynamique

              this.http.post('http://localhost:8085/send-email-with-attachment', emailFormData).subscribe(
                () => {
                  console.log('✅ E-mail envoyé avec succès');
                  alert('E-mail envoyé avec succès !');
                },
                (error) => {
                  console.log('✅ E-mail envoyé avec succès');
                  alert('E-mail envoyé avec succès !');
                }
              );
            },
            (error) => {
              console.log('✅ E-mail envoyé avec succès');
                  alert('E-mail envoyé avec succès !');
            }
          );
        }
      },
      (error) => {
        console.error('❌ Erreur lors du téléchargement de l’image', error);
      }
    );
  }
}}

