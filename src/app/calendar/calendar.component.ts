import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Click & Drag
import { TerreService } from '../TerreService.service';
import { Contrat } from '../ajouter-contrat/contrat'; // Assuming Contrat is an interface or class
import { Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek',
    },
    events: [],  // Events will be loaded dynamically
    eventContent: this.eventContent.bind(this), // This will call our custom eventContent method
  };

  contracts: Contrat[] = [];

  constructor(private terrainService: TerreService) {}

  ngOnInit() {
    this.loadContracts();
  }

  loadContracts() {
    let contractsList: Contrat[] = [];
  
    // Étape 1: Récupérer la liste des contrats
    this.terrainService.getContractList().pipe(
      switchMap((contracts: Contrat[]) => {
        contractsList = contracts;  // Sauvegarde des contrats
        return this.terrainService.getTerreList();  // Étape 2: Récupérer tous les terrains
      })
    ).subscribe((terrains: any[]) => {
      // Étape 3: Associer chaque contrat à son terrain
      const updatedContracts = contractsList.map(contract => {
        const terrain = terrains.find(t => t.id === contract.idTerrain);  // Trouver le terrain correspondant
        return {
          ...contract, 
          terrainImage: terrain?.imagePath || '',  // Assigner l'image si disponible
        };
      });
  
      // Mettre à jour le calendrier avec les contrats mis à jour
      this.calendarOptions = {
        ...this.calendarOptions,
        events: updatedContracts.map(contract => ({
          title: `${contract.nomProprietaire} ${contract.prenom_Proprietaire}`,
          start: new Date(contract.date_signature),
          backgroundColor: this.getStatusColor(contract.statut_Contrat),
          borderColor: 'black',
          extendedProps: {
            contractId: contract.id_Contrat,
            nomAdmin: contract.nom_admin,
            typeContrat: contract.type_contrat,
            nom_Proprietaire: contract.nomProprietaire,
            date_signature: contract.date_signature,
            telephone: contract.telephone,
            terrainImage: contract.terrainImage,  // Ajouter l'image du terrain
          },
        }))
      };
    });
  }
  
  
  
  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return '#4CAF50';  // Green for active contracts
      case 'pending': return '#FFA500'; // Orange for pending contracts
      case 'expired': return '#FF0000'; // Red for expired contracts
      default: return '#008080';        // Default color (teal)
    }
  }

  // eventContent will return the HTML content for each event, including the image
  eventContent(info: any) {
  const contract = info.event.extendedProps;  // Access extendedProps
  
  // Create the container div for the event content
  const container = document.createElement('div');
  container.style.display = 'flex'; // Use flexbox for layout
  container.style.flexDirection = 'column'; // Stack image and details vertically
  container.style.alignItems = 'center'; // Center align items horizontally
  container.style.justifyContent = 'center'; // Center align items vertically
  container.style.textAlign = 'center'; // Center text inside the container
  container.style.padding = '15px'; // Add padding for spacing
  container.style.borderRadius = '15px'; // Larger rounded corners for a softer look
  container.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)'; // Stronger shadow for a deeper effect
  container.style.backgroundColor = '#e6f7ff'; // Lighter blue background for a fresh look
  container.style.transition = 'transform 0.3s ease'; // Smooth hover effect
  container.addEventListener('mouseenter', () => {
    container.style.transform = 'scale(1.05)'; // Zoom effect on hover
  });
  container.addEventListener('mouseleave', () => {
    container.style.transform = 'scale(1)'; // Reset zoom effect
  });
  
  // Create the image container and image element
  const imageContainer = document.createElement('div');
  if (contract.terrainImage) {
    const imgElement = document.createElement('img');
    imgElement.src = contract.terrainImage;


    imgElement.alt = 'Terrain Image';
    imgElement.style.width = '130px';  // Larger image size for better visibility
    imgElement.style.height = '130px';
    imgElement.style.borderRadius = '10px'; // Round the image corners
    imgElement.style.marginBottom = '15px';  // Space between image and details
    imgElement.style.border = '3px solid #007BFF'; // Blue border around the image
    imgElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Add shadow to the image
    imageContainer.appendChild(imgElement);
  } else {
    const noImageText = document.createElement('span');
    noImageText.innerText = 'No Image';
    noImageText.style.color = '#007BFF'; // Change the color of the "No Image" text to blue
    imageContainer.appendChild(noImageText);
  }

  // Create the details section for the event
  const details = document.createElement('div');
  details.classList.add('fc-event-details');
  details.style.fontSize = '16px';  // Adjust font size for details
  details.style.color = '#333'; // Darker text for readability
  details.style.marginTop = '15px'; // Add space between the image and the details
  details.innerHTML = `
    <p><strong style="color: #007BFF;">Contract ID:</strong> ${contract.contractId}</p>
    <p><strong style="color: #007BFF;">Admin:</strong> ${contract.nomAdmin}</p>
    <p><strong style="color: #007BFF;">Propreitaire:</strong> ${contract.nom_Proprietaire}</p>
    <p><strong style="color: #007BFF;">TypeContrat:</strong> ${contract.typeContrat}</p>
  `;
  
  // Add a border for the details section
  details.style.borderTop = '1px solid #007BFF'; // Blue border between image and details
  details.style.paddingTop = '10px'; // Add space between the image and details

  // Append image and details to the container
  container.appendChild(imageContainer);
  container.appendChild(details);
  
  // Return the custom content for the event
  return { domNodes: [container] };
}

  
}
