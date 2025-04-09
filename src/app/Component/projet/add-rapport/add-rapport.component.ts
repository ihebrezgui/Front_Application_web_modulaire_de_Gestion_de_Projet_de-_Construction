import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../models/Project';
import { Rapport } from '../../../models/Rapport';
import { jsPDF } from 'jspdf';  // Import jsPDF


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

    // Add title
    doc.setFontSize(18);
    doc.text('Rapport Details', 20, 20);

    // Add the rapport data
    doc.setFontSize(12);
    doc.text(`Date: ${this.newRapport.dateRapport.toLocaleDateString()}`, 20, 30);
    doc.text(`Description: ${this.newRapport.descriptionRapport}`, 20, 40);

    // Save the PDF and download it
    doc.save('rapport.pdf');
  }

}
