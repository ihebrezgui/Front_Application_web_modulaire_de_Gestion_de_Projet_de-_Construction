import { Component, OnInit } from '@angular/core';
import { RecrutementService } from '../recrutement.service';

@Component({
  selector: 'app-recrutement-back',
  templateUrl: './recrutement-back.component.html',
  styleUrls: ['./recrutement-back.component.css']
})
export class RecrutementBackComponent implements OnInit {
  recrutements: any[] = [];
  selectedCommentaire: string = '';
  selectedRecrutementId: number | null = null;
  username: string = '';  // Variable pour l'username de l'utilisateur
  role: string = '';  // Variable pour le rôle de l'utilisateur
  constructor(private recrutementService: RecrutementService) { }

  ngOnInit(): void {
    this.getRecrutements();
    this.username = localStorage.getItem('username') || '';
    this.role = localStorage.getItem('role') || '';
  }

  // Récupérer toutes les demandes

    // Récupérer les recrutements
    getRecrutements(): void {
      this.recrutementService.getAllRecrutements().subscribe(
        (data: any[]) => {  // Typage du retour comme `any[]`
          if (this.role === 'ADMIN') {
            // Si l'utilisateur est un admin, afficher tous les recrutements
            this.recrutements = data;
          } else {
            // Si l'utilisateur n'est pas un admin, filtrer par username
            this.recrutements = data.filter(recrutement => recrutement.nom === this.username);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des recrutements', error);
        }
      );
    }
  
  /*getRecrutements(): void {
    this.recrutementService.getAllRecrutements().subscribe(
      (data) => {
        this.recrutements = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des recrutements', error);
      }
    );
  }*/

  // Supprimer une demande de recrutement
  deleteRecrutement(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      this.recrutementService.deleteRecrutement(id).subscribe(
        () => {
          console.log('Demande supprimée avec succès');
          this.getRecrutements(); // Rafraîchir la liste après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de la demande', error);
        }
      );
    }
  }

  // Générer l'URL pour le téléchargement du fichier
  getDownloadUrl(id: number): string {
    return `http://localhost:8081/recrutement/download/${id}`;
  }

  // Obtenir la classe pour le badge en fonction du type de demande
  getBadgeClass(typeDemande: string): string {
    switch (typeDemande) {
      case 'RECRUTEMENT':
        return 'badge-recrutement';
      case 'STAGE':
        return 'badge-stage';
      case 'AUTRE':
        return 'badge-autre';
      default:
        return 'badge-secondary';
    }
  }

  // Ouvrir le modal avec le commentaire sélectionné
  showCommentaire(commentaire: string): void {
    this.selectedCommentaire = commentaire;
  }

  // Mettre à jour le statut de la demande
  toggleStatus(id: number, status: boolean): void {
    this.recrutementService.updateRecrutementStatus(id, !status).subscribe(
      () => {
        this.getRecrutements(); // Rafraîchir la liste après la mise à jour
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du statut', error);
      }
    );
  }
}
