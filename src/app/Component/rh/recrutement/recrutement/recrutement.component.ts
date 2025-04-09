import { Component, ViewChild, ElementRef } from '@angular/core';
import { RecrutementService } from '../recrutement.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recrutement',
  templateUrl: './recrutement.component.html',
  styleUrls: ['./recrutement.component.css']
})
export class RecrutementComponent {
  nom: string = '';
  prenom: string = '';
  commentaire: string = '';
  fichier: File | null = null;
  typeDemande: string = ''; 
  dateNaissance: string = '';
  email: string = '';
  telephone: string = '';
  poste: string = '';
  postes: string[] = [
    'MACON',
    'ELECTRICIEN',
    'PLOMBIER',
    'CHARPENTIER',
    'PEINTRE',
    'SOUDEUR',
    'MANOEUVRE',
    'CHEF_CHANTIER',
    'INGENIEUR',
    'ARCHITECTE'
  ];
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  recrutementForm: FormGroup;

  constructor(private recrutementService: RecrutementService, private fb: FormBuilder, private router: Router) {
    this.recrutementForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],  // 8 chiffres
      dateNaissance: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      poste: ['', Validators.required],
      commentaire: ['', Validators.required],
      typeDemande: ['RECRUTEMENT', Validators.required]
    });
  }

  // Gérer le changement de fichier
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.fichier = event.target.files[0];
    }
  }

  // Gérer l'envoi du formulaire
  onSubmit(): void {
    if (this.nom && this.prenom && this.commentaire && this.fichier && this.typeDemande && this.dateNaissance && this.email && this.telephone && this.poste) {
      const formData = new FormData();
      formData.append('nom', this.nom);
      formData.append('prenom', this.prenom);
      formData.append('commentaire', this.commentaire);
      formData.append('dateNaissance', this.dateNaissance);
      formData.append('email', this.email);
      formData.append('telephone', this.telephone);
      formData.append('poste', this.poste);
      formData.append('fichier', this.fichier);
      formData.append('typeDemande', this.typeDemande);  

      this.recrutementService.addRecrutement(formData)
        .subscribe(response => {
          console.log('Demande envoyée avec succès!', response);
          alert('Demande envoyée avec succès!');

          // Réinitialiser les champs du formulaire après soumission
          this.nom = '';
          this.prenom = '';
          this.commentaire = '';
          this.fichier = null;  
          this.typeDemande = '';  
          this.dateNaissance = '';
          this.email = '';
          this.telephone = '';
          this.poste = '';

          // Réinitialiser le champ de fichier dans le DOM
          if (this.fileInput) {
            this.fileInput.nativeElement.value = '';  // Réinitialiser le champ de fichier
          }
        }, error => {
          console.error('Erreur lors de l\'envoi de la demande', error);
          alert('Une erreur est survenue. Veuillez réessayer.');
        });
    } else {
      alert('Veuillez remplir tous les champs et ajouter un fichier.');
    }
  }
 
}
