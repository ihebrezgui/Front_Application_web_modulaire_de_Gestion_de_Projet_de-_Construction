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
  role?: string;
  constructor(
    private salaryService: SalaireServiceService,
    private employeeService: EmployeeServiceService,
    private absenceService: AbsenceServiceService,
    private performanceService: PerformanceServiceService
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

 /* loadEmployees() {
    this.employeeService.getempList().subscribe((data) => {
      this.employe = data;
    });
  }
*/
loadEmployees() {
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');
  console.log("Récupération depuis localStorage - Role:", role, "Username:", username);

  // Vérification de la validité des données avant de continuer
  if (!role || !username) {
    console.error("Role ou Username non trouvés dans localStorage.");
    return;
  }

  // Log avant de commencer l'appel API pour voir le rôle et le username
  console.log("Vérification du rôle de l'utilisateur:", role);

  this.employeeService.getempList().subscribe(
    (data: Employe[]) => {
      console.log("Données reçues : ", data);

      // Si l'utilisateur est un admin, afficher tous les employés
      if (role === 'ADMIN') {
        console.log("Role est ADMIN. Affichage de tous les employés.");
        this.employe = data;
      } else {
        // Sinon, filtrer les employés par username
        console.log("Role n'est pas ADMIN. Filtrage par username.");
        this.employe = data.filter(emp => emp.nom === username);
      }

      console.log("Employés filtrés : ", this.employe);
    },
    error => {
      console.error("Erreur lors de la récupération des employés", error);
    }
  );
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
      doc.setFontSize(10);
      doc.text(title, 14, startY);
      autoTable(doc, {
        startY: startY + 5,
        head: [headers],
        body: data,
        theme: 'grid',
        styles: { 
          fontSize: 8, 
          cellPadding: 2,
          cellWidth: 'wrap'
        },
        headStyles: { 
          fillColor: [70, 130, 180], 
          textColor: [255, 255, 255], 
          fontStyle: 'bold',
          halign: 'center'
        },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        columnStyles: {
          0: { cellWidth: 'auto' },
          1: { cellWidth: 'auto' },
          2: { cellWidth: 'auto' },
          3: { cellWidth: 'auto' },
          4: { cellWidth: 'auto' }
        }
      });
      return (doc as any).lastAutoTable.finalY + 10;
    } else {
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.text(`Aucun(e) ${title.toLowerCase()} enregistré(e).`, 14, startY);
      doc.setFont('helvetica', 'normal');
      return startY + 10;
    }
  }

  downloadPayslipPDF() {
    if (!this.salary || !this.selectedEmployee) return;

    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 15;

    // Company Header
    doc.setFillColor(70, 130, 180); // SteelBlue
    doc.rect(0, 0, pageWidth, 30, 'F');
    
    // Company Info
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("ENTREPRISE XYZ", pageWidth / 2, 15, { align: "center" });
    
    doc.setFontSize(10);
    doc.text("123 Avenue Principale, Tunis", pageWidth / 2, 22, { align: "center" });
    doc.text("Tél: 70 123 456 | RNE: A1234567B", pageWidth / 2, 27, { align: "center" });

    // Payslip Title
    doc.setFillColor(245, 245, 245);
    doc.rect(0, 35, pageWidth, 10, 'F');
    doc.setTextColor(70, 130, 180);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text("BULLETIN DE PAIE", pageWidth / 2, 41, { align: "center" });
    doc.setFont('helvetica', 'normal');

    // Period and Reference
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text(`Période: ${this.salary.mois}`, margin, 50);
    doc.text(`Matricule: ${this.selectedEmployee.id}`, pageWidth - margin, 50, { align: "right" });

    // Employee Info Box
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, 55, pageWidth - 2 * margin, 25, 2, 2, 'S');
    
    doc.setTextColor(70, 70, 70);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text("EMPLOYÉ(E):", margin + 5, 62);
    doc.setFont('helvetica', 'normal');
    doc.text(`${this.selectedEmployee.nom} ${this.selectedEmployee.prenom}`, margin + 30, 62);
    
    doc.setFont('helvetica', 'bold');
    doc.text("POSTE:", margin + 5, 70);
    doc.setFont('helvetica', 'normal');
    doc.text(this.selectedEmployee.poste, margin + 30, 70);
    
    doc.setFont('helvetica', 'bold');
    doc.text("EMBAUCHE:", margin + 5, 78);
    doc.setFont('helvetica', 'normal');
    doc.text(this.selectedEmployee.dateEmbauche, margin + 30, 78);
    
    doc.setFont('helvetica', 'bold');
    doc.text("EMAIL:", pageWidth / 2 + 10, 62);
    doc.setFont('helvetica', 'normal');
    doc.text(this.selectedEmployee.email, pageWidth / 2 + 30, 62);
    
    doc.setFont('helvetica', 'bold');
    doc.text("TÉLÉPHONE:", pageWidth / 2 + 10, 70);
    doc.setFont('helvetica', 'normal');
    doc.text(this.selectedEmployee.telephone, pageWidth / 2 + 30, 70);

    // Salary Calculation Section
    const tauxImpot = (this.salary.impotRevenu / this.salary.salaireImposable) * 100;
    const salaryData = [
      ['Libellé', 'Base', 'Taux', 'Gains', 'Retenues', 'Observations'],
      ['Salaire de base', this.selectedEmployee.salaire.toFixed(2), '100%', this.salary.salaireBrut.toFixed(2), '-', 'Salaire contractuel brut'],
      ['Heures supplémentaires', this.selectedEmployee.heuresSupp.toString(), '-', this.salary.primeHeuresSupp.toFixed(2), '-', 'Heures complémentaires'],
      ['Avance sur salaire', '-', '10%', '-', this.salary.avanceSalaire.toFixed(2), 'Remboursement'],
      ['Cotisation CNSS', this.salary.salaireBrut.toFixed(2), '9.18%', '-', this.salary.cotisationCNSS.toFixed(2), 'Art. 12 Code CNSS'],
      ['Cotisation retraite', this.salary.salaireBrut.toFixed(2), '4%', '-', this.salary.cotisationRetraite.toFixed(2), 'Loi n°2010-XX'],
      ['IRPP', this.salary.salaireImposable.toFixed(2), `${tauxImpot.toFixed(2)}%`, '-', this.salary.impotRevenu.toFixed(2), 'Barème progressif'],
      ['Prime de performance', '-', '-', this.salary.primePerformance.toFixed(2), '-', 'Selon évaluation'],
      ['Absences', '-', '-', '-', this.salary.deductions.toFixed(2), 'Congés non rémunérés']
    ];

    // Main Salary Table
    autoTable(doc, {
      startY: 85,
      head: [salaryData[0]],
      body: salaryData.slice(1),
      theme: 'grid',
      headStyles: { 
        fillColor: [70, 130, 180], 
        textColor: [255, 255, 255], 
        fontStyle: 'bold',
        halign: 'center'
      },
      styles: { 
        fontSize: 8, 
        cellPadding: 2,
        halign: 'right'
      },
      columnStyles: {
        0: { halign: 'left', cellWidth: 40 },
        1: { cellWidth: 25 },
        2: { cellWidth: 20 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 },
        5: { halign: 'left', cellWidth: 50 }
      },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });

    let finalY = (doc as any).lastAutoTable.finalY + 5;

    // Totals Box
    doc.setDrawColor(70, 130, 180);
    doc.setLineWidth(0.5);
    doc.rect(pageWidth - 90, finalY, 80, 25, 'S');
    
    doc.setTextColor(70, 130, 180);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text("TOTAL GAINS:", pageWidth - 85, finalY + 8);
    doc.text("TOTAL RETENUES:", pageWidth - 85, finalY + 16);
    doc.text("NET À PAYER:", pageWidth - 85, finalY + 24);
    
    doc.text((this.salary.salaireBrut + this.salary.primePerformance + this.salary.primeHeuresSupp).toFixed(2) + ' TND', 
            pageWidth - 30, finalY + 8, { align: "right" });
    doc.text((this.salary.cotisationCNSS + this.salary.cotisationRetraite + this.salary.impotRevenu + this.salary.avanceSalaire + this.salary.deductions).toFixed(2) + ' TND', 
            pageWidth - 30, finalY + 16, { align: "right" });
    
    doc.setFillColor(70, 130, 180);
    doc.setTextColor(255, 255, 255);
    doc.rect(pageWidth - 30, finalY + 18, 25, 7, 'F');
    doc.text(this.salary.salaireNet.toFixed(2) + ' TND', pageWidth - 17.5, finalY + 23, { align: "center" });

    finalY += 35;

    // Additional Information Section
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, finalY, pageWidth - 2 * margin, 30, 2, 2, 'S');
    
    doc.setTextColor(70, 70, 70);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text("INFORMATIONS COMPLÉMENTAIRES", margin + 5, finalY + 5);
    doc.setFont('helvetica', 'normal');
    
    // Payment Date
    const paymentDate = new Date();
    paymentDate.setDate(5); // Simulate payment on the 5th of next month
    doc.setFont('helvetica', 'bold');
    doc.text("Date de paiement:", margin + 5, finalY + 12);
    doc.setFont('helvetica', 'normal');
    doc.text(paymentDate.toLocaleDateString('fr-FR'), margin + 40, finalY + 12);
    
    doc.setFont('helvetica', 'bold');
    doc.text("Mode de paiement:", margin + 5, finalY + 19);
    doc.setFont('helvetica', 'normal');
    doc.text("Virement bancaire", margin + 40, finalY + 19);

    finalY += 40;

    // Absences Table
    finalY = this.generateTable("DÉTAIL DES ABSENCES", ['Type', 'Début', 'Fin', 'Jours'], 
              this.absences.map(abs => [abs.type, abs.dateDebut, abs.dateFin, this.calculateDays(abs.dateDebut, abs.dateFin)]), 
              finalY, doc);

    // Performances Table
    finalY = this.generateTable("ÉVALUATION DE PERFORMANCE", ['Date', 'Note', 'Commentaire'], 
              this.performances.map(perf => [
                perf.dateEvaluation, 
                perf.note + '/20', 
                perf.commentaire.length > 50 ? perf.commentaire.substring(0, 47) + '...' : perf.commentaire
              ]), 
              finalY, doc);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Ce document a été généré électroniquement et ne nécessite pas de signature manuscrite.", 
             pageWidth / 2, pageHeight - 15, { align: "center" });
    doc.text("En cas de divergence, les registres de l'entreprise font foi.", 
             pageWidth / 2, pageHeight - 10, { align: "center" });

    // Save PDF
    const safeName = this.selectedEmployee.nom.replace(/[^\w]/gi, "_");
    doc.save(`Bulletin_Paie_${safeName}_${this.salary.mois.replace(/\//g, '_')}.pdf`);
  }

  private calculateDays(startDate: string, endDate: string): string {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays.toString();
    } catch (e) {
      return '1';
    }
  }
}