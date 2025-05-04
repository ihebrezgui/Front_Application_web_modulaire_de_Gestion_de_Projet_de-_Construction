import { Component, OnInit } from '@angular/core';
import { TerreService } from '../TerreService.service';
import { Terre } from './Terre';
import * as bootstrap from 'bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { papier } from '../list-papier/papier';
import { Router, ActivatedRoute } from '@angular/router';
import { Contrat } from '../ajouter-contrat/contrat';
import { Modal } from 'bootstrap';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-listterre',
  templateUrl: './listterre.component.html',
  styleUrls: ['./listterre.component.css'],

})
export class ListterreComponent implements OnInit {

  terres: Terre[] = [];
  contrats: Contrat[] = [];
  isModalVisible = false;  // Control modal visibility
  searchText: string = '';
  contrat!: Contrat;
  Terrain = { idTerrain: 0, nom: '', localisation: '', superficie: 0, statutJuridique: '', imagePath: '', typeSol: '', notif: 0 , ban: 0};
  ordreTri: string = 'ascendant';
  validationStatus: { [key: number]: 'pending' | 'available' | 'signed' } = {};
  warningModal: any;
  notifications: any[] = [];
  notificationCount: number = 0;
  user: any = null;

  constructor(private terreservice: TerreService, private router: Router) {}

  ngOnInit(): void {
    this.getallcontrat();
    this.getTerreList();
this.getUser();
    const modalElement = document.getElementById('warningModal');
    if (modalElement) {
      this.warningModal = new Modal(modalElement);
    }
  }
   getUser() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log("Utilisateur récupéré :", this.user); // Debug
    }
  }

  private getTerreList() {
    this.terreservice.getTerreList().subscribe(data => {
      this.terres = data;
      this.notifications = this.terres.filter(terre => terre.notif > 0);
      this.notificationCount = this.notifications.length;

      // Vérification de l'état des papiers pour chaque terrain
      this.terres.forEach(terre => {
        this.checkIfAllPapersValidated(terre.idTerrain);
      });
    });
  }

  filterTerres() {
    return this.terres.filter((r) => r.localisation.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  deleteTerre(id: number) {
    this.terreservice.deleteTerre(id).subscribe(() => {
      this.terres = this.terres.filter(terre => terre.idTerrain !== id);
    });
  }

  openModal(terrain: Terre) {
    this.Terrain = { ...terrain };
    const modalElement = document.getElementById('updateModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('La modale avec l\'ID "updateModal" n\'a pas été trouvée.');
    }
  }

  confirmDelete(terrainId: number): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (isConfirmed) {
      this.deleteTerre(terrainId);
    }
  }

  updateData() {
    console.log('Données mises à jour:', this.Terrain);
    this.terreservice.updateTerre(this.Terrain).subscribe(
      (response) => {
        console.log('Update successful:', response);
        alert('Terrain updated successfully!');
        this.closeModal();
        this.getTerreList();
      },
      (error) => {
        console.error('Update failed:', error);
        alert('An error occurred while updating the terrain');
      }
    );
  }

  resetNotification(terre: any): void {
    terre.notif = 0;
  }

  trierParSuperficie(): void {
    this.terres = [...this.terres].sort((a, b) => this.ordreTri === 'ascendant' ? a.superficie - b.superficie : b.superficie - a.superficie);
  }

  closeModal() {
    const modalElement = document.getElementById('updateModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance?.hide();
    } else {
      console.error('Modal element not found.');
    }
  }
  openModal2() {
    var modalElement = document.getElementById('contratModal');
    if (modalElement) {
      var modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  getallcontrat() {
    this.terreservice.getContractList().subscribe(data => {
      this.contrats = data;
      
      // Vérification et affichage des ID des terrains
      this.contrats.forEach(contrat => {
        if (contrat.terrain) {
          console.log(`Contrat ID: ${contrat.id_Contrat}, Terrain ID: ${contrat.terrain}`);
        } else {
          console.log(`Contrat ID: ${contrat.id_Contrat}, Terrain non défini`);
        }
      });
    });
  }
  

  checkIfAllPapersValidated(terrainId: number): void {
    console.log(`Checking papers and contract for terrain with ID: ${terrainId}`);
    if (!this.validationStatus) {
      this.validationStatus = {}; 
    }

    this.terreservice.getPapierListByTerrainId(terrainId).subscribe({
      next: (papers: papier[]) => {
        console.log(`Papers for terrain ${terrainId}:`, papers);
        if (papers.length === 0) {
          console.log(`No papers found for terrain ${terrainId}. Setting status to "pending".`);
          this.validationStatus[terrainId] = 'pending';
          return;
        }

        const allValidated = papers.every(paper => paper.statut === 'valide');
        console.log(`Are all papers validated for terrain ${terrainId}? ${allValidated}`);

        this.terreservice.findContratByidTerrain(terrainId).subscribe({
          next: (contrat) => {
            console.log(`Contract for terrain ${terrainId}:`, contrat);
            this.validationStatus[terrainId] = contrat ? 'signed' : (allValidated ? 'available' : 'pending');
            if (this.updateButtonColor) {
              this.updateButtonColor(terrainId);
            }
          },
          error: (error) => {
            console.error(`Error fetching contract for terrain ${terrainId}:`, error);
            this.validationStatus[terrainId] = allValidated ? 'available' : 'pending';
            if (this.updateButtonColor) {
              this.updateButtonColor(terrainId);
            }
          }
        });
      },
      error: (error) => {
        console.error(`Error fetching papers for terrain ${terrainId}:`, error);
        this.validationStatus[terrainId] = 'pending';
      }
    });
  }

  navigateToContrat(id: number) {
    this.router.navigate(['/contrat', id]);
  }

  updateButtonColor(terrainId: number): void {
    const status = this.validationStatus[terrainId];
    console.log(`Updating button color for terrain ${terrainId}`);
    // Add logic to update button colors based on status
  }

  async generatePDF(): Promise<void> {
    const pdf = new jsPDF();
    let y = 20;
    pdf.setFontSize(18);
    pdf.text('Liste des Terrains', 80, 10);

    for (const terrain of this.terres) {
      pdf.setFontSize(12);
      pdf.text(`Nom: ${terrain.nom}`, 10, y);
      y += 10;
      pdf.text(`Localisation: ${terrain.localisation}`, 10, y);
      y += 10;
      pdf.text(`Superficie: ${terrain.superficie} m²`, 10, y);
      y += 10;
      pdf.text(`Statut Juridique: ${terrain.statutJuridique}`, 10, y);
      y += 10;
      pdf.text(`Type de Sol: ${terrain.typeSol}`, 10, y);
      y += 10;

      if (terrain.imagePath) {
        await this.addImageToPdf(terrain.imagePath, pdf, y);
        y += 60;
      } else {
        y += 20;
      }

      y += 10;
    }

    pdf.save('terrains.pdf');
  }
  handleButtonClick(terrainId: number): void {
    if (  this.validationStatus[terrainId] === 'available') {
      this.navigateToContrat(terrainId);
    } 
    else if (this.validationStatus[terrainId] === 'signed') {
      this.router.navigate(['/detailcontrat', terrainId]);
    }
    else {
      this.showWarningPopup();
    }
  }

  showWarningPopup(): void {
    const modalElement = document.getElementById('warningModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  addImageToPdf(imagePath: string, pdf: jsPDF, y: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imagePath;

      img.onload = () => {
        const imageWidth = 100;
        const imageHeight = 60;
        const imageX = 10;
        pdf.addImage(img, 'JPEG', imageX, y, imageWidth, imageHeight);
        resolve();
      };

      img.onerror = (error) => {
        console.error('Image loading error', error);
        reject(error);
      };
    });
  }
}
