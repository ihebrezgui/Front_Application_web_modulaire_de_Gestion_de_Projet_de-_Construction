import { Component, OnInit } from '@angular/core';
import { Facture } from './Facture';
import { ListFactureService } from '../list-facture.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as JsBarcode from 'jsbarcode';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-list-facture',
  templateUrl: './list-facture.component.html',
  styleUrls: ['./list-facture.component.css']
})
export class ListFactureComponent implements OnInit {
  factures!: Facture[];
  search: string = '';
  selectedFactureId: number | null = null;
  montantRestant: number = 0;

  // Statistiques
  totalFactures: number = 0;
  totalMontant: number = 0;
  nbFacturesPayees: number = 0;
  nbFacturesEnAttente: number = 0;
  facturesPayees: number = 0;
  facturesEnAttente: number = 0;

  // Graphique circulaire
  public pieChartData: ChartData<'pie'> = {
    labels: ['Payées', 'En attente', 'Autres'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
    }]
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  // Graphique linéaire
  public lineChartData: ChartData<'line'> = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55],
        label: 'Montant des factures',
        fill: true,
        tension: 0.4,
        borderColor: '#3F51B5',
        backgroundColor: 'rgba(63, 81, 181, 0.1)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  barChartData: {
    labels: any[];
    datasets: {
      label: string;
      data: any[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  } | undefined;

  constructor(
    private factureService: ListFactureService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getFactures();
  }

  private getFactures(): void {
    this.factureService.getFactureList().subscribe({
      next: (data) => {
        this.factures = data;
        this.calculerStatistiques();
      },
      error: (err) => console.error('Erreur lors de la récupération des factures', err)
    });
  }

  private calculerStatistiques(): void {
    this.totalFactures = this.factures.length;
    this.totalMontant = this.factures.reduce((sum, f) => sum + f.montantTotal, 0);

    this.nbFacturesPayees = this.factures.filter(f => f.statut === 'Payée').length;
    this.nbFacturesEnAttente = this.factures.filter(f => f.statut === 'En attente').length;

    this.facturesPayees = this.factures
      .filter(f => f.statut === 'Payée')
      .reduce((sum, f) => sum + f.montantTotal, 0);

    this.facturesEnAttente = this.factures
      .filter(f => f.statut === 'En attente')
      .reduce((sum, f) => sum + f.montantTotal, 0);

    const autresMontants = this.totalMontant - (this.facturesPayees + this.facturesEnAttente);
    this.pieChartData.datasets[0].data = [
      this.facturesPayees,
      this.facturesEnAttente,
      autresMontants
    ];
  }

  filterFactures() {
    return this.factures.filter((r) => r.reference.toLowerCase().includes(this.search.toLowerCase()));
  }

  deleteFacture(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
      this.factureService.deleteFacture(id).subscribe(() => {
        this.getFactures();
      });
    }
  }

  goToUpdate(id: number): void {
    this.router.navigate(['/update-facture', id]);
  }

  goToAjouterFacture() {
    this.router.navigate(['/addFacture']);
  }

  goToAjouterecheance() {
    this.router.navigate(['/echeances']);
  }

  goToPaiement() {
    this.router.navigate(['/paiements']);
  }

  goToCalendrier() {
    this.router.navigate(['/calendar']);
  }

  getMontantRestant(factureId: number) {
    this.http.get<number>(`http://localhost:8082/facture/${factureId}/totalToPay`).subscribe(
      data => {
        this.montantRestant = data;
        this.selectedFactureId = factureId;
      },
      error => {
        console.error('Erreur lors de la récupération du montant restant', error);
      }
    );
  }

  private getMontantParMois() {
    this.factureService.getMontantParMois().subscribe(data => {
      const labels = data.map(entry => entry.mois);
      const values = data.map(entry => entry.montantTotal);

      this.barChartData = {
        labels: labels,
        datasets: [
          {
            label: 'Montant Total par Mois (€)',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      };
    });
  }

  exportToPDF(facture: Facture): void {
    const doc = new jsPDF();
    
    // Add light gray background for header (corrected method name)
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 210, 30, 'F');
    
    // Company logo placeholder (replace with your actual logo)
    // doc.addImage(logoData, 'PNG', 10, 10, 30, 15);
    
    // Invoice title with styling
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text('FACTURE', 105, 20, { align: 'center' });
    
    // Company info with styling
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text('Auto Entrepreneur', 170, 20);
    doc.text('123 Business Street', 170, 25);
    doc.text('75000 Paris, France', 170, 30);
    
    // Barcode with better positioning
    const barcode = facture.reference;
    const barcodeCanvas = document.createElement('canvas');
    JsBarcode(barcodeCanvas, barcode, {
        format: 'CODE128',
        width: 2,
        height: 30,
        displayValue: true,
        fontSize: 12,
        margin: 10
    });
    
    // Barcode with border
    doc.setDrawColor(200, 200, 200);
    doc.rect(10, 40, 60, 30);
    doc.addImage(barcodeCanvas, 'PNG', 15, 45, 50, 20);
    
    // Invoice details section with better styling
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 60, 60);
    doc.text('DÉTAILS DE LA FACTURE', 10, 85);
    
    // Horizontal line
    doc.setDrawColor(200, 200, 200);
    doc.line(10, 88, 200, 88);
    
    // Invoice details with better formatting
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    
    doc.text(`Date d'émission:`, 10, 100);
    doc.text(`${new Date(facture.dateEmission).toLocaleDateString()}`, 50, 100);
    
    doc.text(`Référence:`, 10, 110);
    doc.text(`${facture.reference}`, 50, 110);
    
    doc.text(`Montant Total:`, 10, 120);
    doc.text(`${facture.montantTotal.toFixed(2)} €`, 50, 120);
    
    doc.text(`Statut:`, 10, 130);
    doc.text(`${facture.statut}`, 50, 130);
    
    // Items table with better styling
    autoTable(doc, {
        startY: 140,
        head: [
            {
                content: 'Description',
                styles: { 
                    //fillColor: [60, 60, 60],
                   // textColor: [255, 255, 255],
                    //fontStyle: 'bold'
                }
            },
            {
                content: 'Montant (€)',
                styles: { 
                    ///fillColor: [60, 60, 60],
                    //textColor: [255, 255, 255],
                    //fontStyle: 'bold'
                }
            }
        ],
        body: [
            [
                { 
                    content: facture.description || 'Non spécifiée',
                    styles: { fontStyle: 'normal' }
                },
                { 
                    content: facture.montantTotal.toFixed(2),
                    styles: { fontStyle: 'normal' }
                }
            ]
        ],
        theme: 'grid',
        headStyles: {
            fillColor: [70, 70, 70],
            textColor: 255,
            fontStyle: 'bold'
        },
        alternateRowStyles: {
            fillColor: [240, 240, 240]
        },
        margin: { top: 10 }
    });
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text('Merci pour votre confiance!', 105, 280, { align: 'center' });
    doc.text('Pour toute question, contactez-nous à contact@entreprise.com', 105, 285, { align: 'center' });
    
    // Save the PDF
    doc.save(`Facture-${facture.reference}.pdf`);
}
}