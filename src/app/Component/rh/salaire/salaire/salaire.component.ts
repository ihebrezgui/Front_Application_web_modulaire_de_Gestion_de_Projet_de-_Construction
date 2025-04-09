import { Component } from '@angular/core';
import { Employe } from '../../employe/employee/employee';
import { EmployeeServiceService } from '../../employe/employee-service.service';
import { SalaireServiceService } from '../salaire-service.service';
import { Salary } from '../salaire';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AbsenceServiceService } from '../../absence/absence-service.service';
import { PerformanceServiceService } from '../../Performance/performance-service.service';

@Component({
  selector: 'app-salaire',
  templateUrl: './salaire.component.html',
  styleUrls: ['./salaire.component.css']
})
export class SalaireComponent {
  employe: Employe[] = [];
  absences: any[] = [];
  performances: any[] = [];
  salary?: Salary;
  selectedEmployee?: Employe;
  
  
  constructor(
    private salaryService: SalaireServiceService,
    private employeeService: EmployeeServiceService,
    private absenceService: AbsenceServiceService,
    private performanceService: PerformanceServiceService
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getempList().subscribe((data) => {
      this.employe = data;
    });
  }

  calculateSalary(employeeId: number) {
    const currentDate = new Date().toISOString().split('T')[0];
    this.selectedEmployee = this.employe.find(emp => emp.id === employeeId);

    this.salaryService.calculateSalary(employeeId, currentDate).subscribe({
      next: (data) => {
        this.salary = data;
        this.loadAbsences(employeeId);
        this.loadPerformances(employeeId);
      },
      error: (error) => {
        console.error('Erreur lors du calcul du salaire', error);
      }
    });
  }

  loadAbsences(employeeId: number) {
    this.absenceService.getAbsencesByEmployeeId(employeeId).subscribe({
      next: (data) => {
        this.absences = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des absences', error);
      }
    });
  }

  loadPerformances(employeeId: number) {
    this.performanceService.getPerformancesByEmployee(employeeId).subscribe({
      next: (data) => {
        this.performances = Array.isArray(data) ? data : [];
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des performances', error);
      }
    });
  }

  closeModal() {
    this.salary = undefined;
  }

  generateTable(title: string, headers: string[], data: any[][], startY: number, doc: jsPDF): number {
    if (data.length > 0) {
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.text(title, 20, startY);
      autoTable(doc, {
        startY: startY + 5,
        head: [headers],
        body: data,
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [245, 245, 245] }
      });
      return (doc as any).lastAutoTable.finalY + 10; 
    } else {
      doc.setTextColor(0, 0, 0);
      doc.text(`Aucun(e) ${title.toLowerCase()} enregistré(e).`, 20, startY);
      return startY + 10;
    }
  }

  downloadPayslipPDF() {
    if (!this.salary || !this.selectedEmployee) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;

    // Header
    doc.setFillColor(41, 128, 185);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("ENTREPRISE ", margin, 25);

    // Employee Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text("BULLETIN DE PAIE", pageWidth / 2, 50, { align: "center" });
    doc.text(`Période : ${this.salary.mois}`, pageWidth / 2, 60, { align: "center" });

    // Employee Details
    doc.setDrawColor(41, 128, 185);
    doc.setLineWidth(0.5);
    doc.rect(margin, 70, pageWidth - 2 * margin, 40);
    doc.setFontSize(12);
    doc.text(`Nom et Prénom: ${this.selectedEmployee.nom} ${this.selectedEmployee.prenom}`, margin + 5, 80);
    doc.text(`Poste: ${this.selectedEmployee.poste}`, margin + 5, 90);
    doc.text(`Email: ${this.selectedEmployee.email}`, margin + 5, 100);

    // Salary Table
    const tauxImpot = (this.salary.impotRevenu / this.salary.salaireImposable) * 100;
    const salaryData = [
      ['RUBRIQUES', 'BASE', 'TAUX', 'MONTANT', 'EXPLICATION'],
      ['Salaire de Base', this.salary.salaireBrut.toFixed(2), '100%', this.salary.salaireBrut.toFixed(2), 'Le salaire brut de l\'employé avant toutes les déductions et primes.'],
      ['Prime de Rendement', '-', '-', this.salary.primePerformance.toFixed(2), 'Prime versée en fonction des performances de l\'employé durant le mois.'],
      ['Prime Heures Supp.', '-', '-', this.salary.primeHeuresSupp.toFixed(2), 'Prime correspondant aux heures supplémentaires effectuées par l\'employé.'],
      ['Cotisation CNSS', '-', '9,18%', this.salary.cotisationCNSS.toFixed(2), 'Cotisation pour la sécurité sociale, calculée à 9,18% du salaire brut.'],
      ['Cotisation Retraite', '-', '4%', this.salary.cotisationRetraite.toFixed(2), 'Cotisation pour la retraite, calculée à 4% du salaire brut.'],
      ['Impot Revenu(IRPP)', '-', `${tauxImpot.toFixed(2)}%`, this.salary.impotRevenu.toFixed(2), 'Impôt sur le revenu calculé selon le barème fiscal en vigueur.'],
      ['Déductions', '-', '-', `-${this.salary.deductions.toFixed(2)}`, 'Déductions liées aux absences ou autres facteurs (congé sans solde, maladie, etc.).'],
      ['Avance sur Salaire', '-', '10%', `-${this.salary.avanceSalaire.toFixed(2)}`, 'Montant des avances sur salaire accordées à l\'employé, majorées de 10% pour le remboursement.']
    ];
    
    

    autoTable(doc, {
      startY: 120,
      head: [salaryData[0]],
      body: salaryData.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 5 }
    });

    let finalY = (doc as any).lastAutoTable.finalY + 20;

    // Net Salary
    doc.setFillColor(41, 128, 185);
    doc.rect(pageWidth - 80, finalY, 60, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text(`NET À PAYER: ${this.salary.salaireNet.toFixed(2)} TND`, pageWidth - 75, finalY + 13);

    finalY += 30;

    // Absences Table
    finalY = this.generateTable("Détails des Absences", ['Type', 'Début', 'Fin'], 
              this.absences.map(abs => [abs.type, abs.dateDebut, abs.dateFin]), finalY, doc);

    // Performances Table
    finalY = this.generateTable("Détails des Performances", ['Description', 'Date', 'Prime'], 
              this.performances.map(perf => [perf.commentaire, perf.dateEvaluation, perf.note]), finalY, doc);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text("Ce bulletin de paie est généré électroniquement", pageWidth / 2, pageHeight - 20, { align: "center" });

    // Save PDF
    const safeName = this.selectedEmployee.nom.replace(/[^\w]/gi, "_");
    doc.save(`Fiche_Paie_${safeName}_${this.salary.mois}.pdf`);
  }
}