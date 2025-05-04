import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { jsPDF } from 'jspdf';  // Import jsPDF
import { Rapport } from 'src/app/models/Rapport';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-add-rapport',
  templateUrl: './add-rapport.component.html',
  styleUrls: ['./add-rapport.component.css']
})
export class AddRapportComponent implements OnInit {

  newRapport: Rapport = {
    dateRapport: new Date(),  // Default to today
    descriptionRapport: ''
  };
  projectId!: number;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectId = Number(params.get('idProjet'));
    });
  }

  addRapport() {
    if (!this.projectId) {
      alert('Project ID is missing!');
      return;
    }

    this.apiService.addRapport(this.projectId, this.newRapport).subscribe(response => {
      console.log('Rapport added:', response);
      alert('Rapport added successfully!');

       // Generate and download the PDF
       this.generatePdf();

      // Reset form after submission
      this.newRapport = {
        dateRapport: new Date(),
        descriptionRapport: ''
      };
    });
  }
  generatePdf() {
    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;
    
    // Report header
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('PROJECT STATUS REPORT', centerX, 40, { align: 'center' });
    
    // Project info section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Project ID: ${this.projectId}`, margin, 60);
    doc.text(`Report Date: ${this.newRapport.dateRapport.toLocaleDateString()}`, pageWidth - margin, 60, { align: 'right' });
    
    // Divider line
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, 65, pageWidth - margin, 65);
    
    // Report details section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('1. Executive Summary', margin, 80);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const descriptionLines = doc.splitTextToSize(
      this.newRapport.descriptionRapport, 
      pageWidth - 2 * margin
    );
    doc.text(descriptionLines, margin, 90);
    
    // Project status section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('2. Project Status', margin, 120);
    
    // Status table
    const headers = ['Metric', 'Value', 'Trend'];
    const data = [
      ['Completion %', '75%', '↑ 5%'],
      ['Budget Used', '$45,200 / $60,000', 'On track'],
      ['Tasks Completed', '32/45', '↑ 3 this week'],
      ['Issues Open', '5', '↓ 2 this week']
    ];
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    
    // Table headers
    doc.text(headers[0], margin, 135);
    doc.text(headers[1], margin + 70, 135);
    doc.text(headers[2], margin + 140, 135);
    
    // Table content
    doc.setFont('helvetica', 'normal');
    data.forEach((row, i) => {
      const y = 145 + i * 10;
      doc.text(row[0], margin, y);
      doc.text(row[1], margin + 70, y);
      
      // Color-coded trend indicators
      if (row[2].includes('↑')) {
        doc.setTextColor(0, 128, 0); // Green for positive
      } else if (row[2].includes('↓')) {
        doc.setTextColor(255, 0, 0); // Red for negative
      } else {
        doc.setTextColor(0, 0, 0); // Black for neutral
      }
      
      doc.text(row[2], margin + 140, y);
      doc.setTextColor(0, 0, 0); // Reset color
    });
    
    // Gantt chart placeholder
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('3. Project Timeline', margin, 195);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Current Phase: Implementation', margin, 205);
    
    // Simple timeline visualization
    doc.setDrawColor(0, 0, 0);
    doc.line(margin, 210, pageWidth - margin, 210);
    
    // Timeline markers
    const phases = [
      { name: 'Planning', date: 'Jan 15', progress: 100 },
      { name: 'Design', date: 'Mar 1', progress: 100 },
      { name: 'Development', date: 'May 15', progress: 75 },
      { name: 'Testing', date: 'Jul 1', progress: 10 },
      { name: 'Delivery', date: 'Aug 15', progress: 0 }
    ];
    
    phases.forEach((phase, i) => {
      const x = margin + (i * ((pageWidth - 2 * margin) / (phases.length - 1)));
      doc.line(x, 210, x, 215);
      doc.text(phase.name, x, 220, { align: 'center' });
      doc.text(phase.date, x, 225, { align: 'center' });
      
      // Progress indicator - Fixed color logic
      if (phase.progress === 100) {
        doc.setFillColor(0, 128, 0); // Green for complete
      } else if (phase.progress > 0) {
        doc.setFillColor(70, 130, 180); // Blue for in-progress
      }
      
      if (phase.progress > 0) {
        doc.rect(x - 5, 230, 10 * (phase.progress / 100), 5, 'F');
      }
      
      // Background for remaining progress
      if (phase.progress < 100) {
        doc.setFillColor(220, 220, 220);
        doc.rect(x - 5 + (10 * (phase.progress / 100)), 230, 
                10 * (1 - (phase.progress / 100)), 5, 'F');
      }
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Confidential - For internal use only', centerX, 290, { align: 'center' });
    doc.text(`Generated on ${new Date().toLocaleString()}`, centerX, 295, { align: 'center' });
    
    // Page number
    const pageCount = doc.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 10);
    }
    
    // Save the PDF
    doc.save(`Project_${this.projectId}_Report_${new Date().toISOString().slice(0,10)}.pdf`);
  }

}
