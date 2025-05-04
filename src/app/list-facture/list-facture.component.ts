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

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text('FACTURE', 105, 15, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text('Auto Entrepreneur', 170, 15);

    const barcode = facture.reference;
    const barcodeCanvas = document.createElement('canvas');

    JsBarcode(barcodeCanvas, barcode, {
      format: 'CODE128',
      width: 2,
      height: 30,
      displayValue: false
    });

    doc.addImage(barcodeCanvas, 'PNG', 10, 25, 100, 20);

    doc.setFontSize(12);
    doc.text(`Date d'émission: ${new Date(facture.dateEmission).toLocaleDateString()}`, 10, 65);
    doc.text(`Référence: ${facture.reference}`, 10, 75);
    doc.text(`Montant Total: ${facture.montantTotal.toFixed(2)} €`, 10, 85);
    doc.text(`Statut: ${facture.statut}`, 10, 95);

    autoTable(doc, {
      startY: 110,
      head: [['Description', 'Montant (€)']],
      body: [
        [facture.description || 'Non spécifiée', facture.montantTotal.toFixed(2)]
      ]
    });

    doc.save(`Facture-${facture.reference}.pdf`);
  }
}