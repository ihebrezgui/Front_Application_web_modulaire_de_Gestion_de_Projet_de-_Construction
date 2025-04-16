import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Click & Drag
import { Facture } from '../list-facture/Facture';
import { FactureService } from '../facture.service';
import { ListFactureService } from '../list-facture.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent  implements OnInit{
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
  factures: Facture[] = [];
  constructor(private factureService: ListFactureService) {}
  ngOnInit(): void {
    this.loadFactures();
  }

  loadFactures() {
    this.factureService.getFactureList().subscribe(data => {
      this.factures = data;
      this.calendarOptions = {
        ...this.calendarOptions,
        events: data.map(facture => ({
          title: `Facture #${facture.reference} - ${facture.montantTotal} DT`,
          start: new Date(facture.dateEmission),
          backgroundColor: this.getStatusColor(facture.statut),
          borderColor: 'black',
          extendedProps: {
            idFacture: facture.idFacture,
            montantTotal: facture.montantTotal,
            reference: facture.reference,
            statut: facture.statut,
            description: facture.description
          },
        }))
      };
    });
  }
  
  
    
  
  eventContent(info: any) {
    const facture = info.event.extendedProps;  // Access extendedProps from facture
  
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.textAlign = 'center';
    container.style.padding = '15px';
    container.style.borderRadius = '15px';
    container.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
    container.style.backgroundColor = '#fffbe6'; // Light yellow for facture look
    container.style.transition = 'transform 0.3s ease';
    container.addEventListener('mouseenter', () => {
      container.style.transform = 'scale(1.05)';
    });
    container.addEventListener('mouseleave', () => {
      container.style.transform = 'scale(1)';
    });
  
    // Create the details section for the facture
    const details = document.createElement('div');
    details.classList.add('fc-event-details');
    details.style.fontSize = '15px';
    details.style.color = '#333';
    details.style.marginTop = '10px';
    details.innerHTML = `
      <p><strong style="color: #fa8c16;">Référence :</strong> ${facture.reference}</p>
      <p><strong style="color: #fa8c16;">Montant :</strong> ${facture.montantTotal} DT</p>
      <p><strong style="color: #fa8c16;">Statut :</strong> ${facture.statut}</p>
      <p><strong style="color: #fa8c16;">Émise le :</strong> ${new Date(facture.dateEmission).toLocaleDateString()}</p>
      <p><strong style="color: #fa8c16;">Description :</strong> ${facture.description || '---'}</p>
    `;
  
    details.style.borderTop = '1px solid #fa8c16';
    details.style.paddingTop = '10px';
  
    container.appendChild(details);
  
    return { domNodes: [container] };
  }
    getStatusColor(status: string): string {
    switch (status) {
      case 'active': return '#4CAF50';  // Green for active contracts
      case 'pending': return '#FFA500'; // Orange for pending contracts
      case 'expired': return '#FF0000'; // Red for expired contracts
      default: return '#008080';        // Default color (teal)
    }
  }
}
