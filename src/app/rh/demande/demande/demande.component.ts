import { Component } from '@angular/core';
import { Demande } from '../demande';
import { DemandeService } from '../demande.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent {
  demandes: Demande[] = [];
  activeId: number | null = null;

  constructor(private demandeService: DemandeService) {}

  ngOnInit(): void {
    this.getDemandes();
    
  }
  deleteDemande(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette demande ?')) {
      this.demandeService.deleteDemande(id).subscribe(
        () => {
          this.demandes = this.demandes.filter(d => d.id !== id);
          console.log('Demande supprimée avec succès');
        },
        (error) => {
          console.error('Erreur lors de la suppression de la demande', error);
        }
      );
    }
  }
  

  /*getDemandes(): void {
    this.demandeService.getAllDemandes().subscribe(
      (data) => {
        this.demandes = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des demandes', error);
      }
    );
  }*/

    getDemandes(): void {
      const role = localStorage.getItem('role');
      const username = localStorage.getItem('username');
      console.log("Récupération des demandes - Role:", role, "Username:", username);
    
      this.demandeService.getAllDemandes().subscribe(
        (data) => {
          // Filtrer les demandes en fonction du rôle
          if (role === 'ADMIN') {
            // Si l'utilisateur est un admin, afficher toutes les demandes
            this.demandes = data;
            console.log("Demandes affichées (toutes) : ", this.demandes);
          } else {
            // Sinon, filtrer les demandes en fonction du username
            this.demandes = data.filter(demande => demande.nom === username);
            console.log("Demandes filtrées par username : ", this.demandes);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des demandes', error);
        }
      );
    }
    

  toggleDetails(id: number): void {
    this.activeId = this.activeId === id ? null : id;
  }
  getBadgeClass(typeDemande: string): string {
    switch (typeDemande) {
      case 'CONGE':
        return 'badge-conge';
      case 'AVANCE':
        return 'badge-avance';
      case 'AUTRE':
        return 'badge-autre';
      default:
        return 'badge-secondary';
    }
  }
  
}
