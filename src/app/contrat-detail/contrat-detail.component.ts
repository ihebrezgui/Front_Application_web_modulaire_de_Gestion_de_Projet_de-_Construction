import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import SignaturePad from 'signature_pad';
import { Contrat } from '../ajouter-contrat/contrat';
import { TerreService } from '../TerreService.service';

@Component({
  selector: 'app-contrat-detail',
  templateUrl: './contrat-detail.component.html',
  styleUrls: ['./contrat-detail.component.css']
})
export class ContratDetailComponent implements OnInit, AfterViewInit {
  contrat!: Contrat;
  id!: number;
  
  @ViewChild('signaturePad', { static: false }) signaturePadElement!: ElementRef;
  signaturePad!: SignaturePad;
  signatureImage: string | null = null; // Store the signature image in Base64 format

  constructor(
    private ac: ActivatedRoute,
    private r: Router,
    private terreservice: TerreService
  ) {}

  ngOnInit(): void {
    this.id = this.ac.snapshot.params['id'];
    this.getContrat(this.id);
  }

  ngAfterViewInit() {
    const modal = document.getElementById('signatureModal');
    modal?.addEventListener('shown.bs.modal', () => {
      this.initializeSignaturePad();
    });
  }

  initializeSignaturePad() {
    const canvas = this.signaturePadElement.nativeElement as HTMLCanvasElement;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;

    this.signaturePad = new SignaturePad(canvas, {
      penColor: "black",  // Pen color
      minWidth: 1,        
      maxWidth: 5,        
      backgroundColor: 'rgba(255, 255, 255, 0)', // Transparent background
      throttle: 16,       
    });

    const penWidth = Math.min(20, canvas.height) / 20;
    this.signaturePad.minWidth = penWidth;
    this.signaturePad.maxWidth = penWidth;
  }

  getContrat(id: number): void {
    this.terreservice.findContratByidTerrain(id).subscribe((response: Contrat) => {
      if (response) {
        this.contrat = response;
      } else {
        console.error('No contract found for this terrain');
      }
    });
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  // Save the signature to the server
  saveSignature() {
    if (!this.signaturePad.isEmpty()) {
      this.signatureImage = this.signaturePad.toDataURL();  // Convert to Base64
  
      this.terreservice.saveSignature(this.signatureImage).subscribe(
        (response) => {
          console.log('Signature saved successfully:', response);
  
          // Append a timestamp query parameter to bypass cache
          this.contrat.signatureImage = response.signaturePath + '?t=' + new Date().getTime();
  
          // Update the contract with the new signature image URL
          this.terreservice.updateContrat(this.contrat).subscribe(
            () => console.log('Contract updated successfully'),
            (error) => console.error('Error saving contract:', error)
          );
        },
        (error) => console.error('Error saving signature:', error)
      );
    }
  }
  
  
  generatePDF(): void {
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text(`📜 Contract Agreement`, 10, 10);
    
    pdf.setFontSize(12);
    pdf.text(`👤 Owner: ${this.contrat.nomProprietaire} ${this.contrat.prenom_Proprietaire}`, 10, 20);
    pdf.text(`📞 Phone: ${this.contrat.telephone}`, 10, 30);
    pdf.text(`📅 Date of Signing: ${this.contrat.date_signature}`, 10, 40);
    pdf.text(`📑 Contract Type: ${this.contrat.type_contrat}`, 10, 50);
    
    pdf.text(`⚖️ Legal Provisions:`, 10, 70);
    pdf.text(`This contract is governed by the Insurance Code.`, 10, 80);
    pdf.text(`All disputes shall be resolved in the appropriate court.`, 10, 90);
    
    if (this.contrat.signatureImage) {
      pdf.text(`✍️ Subscriber's Signature:`, 10, 110);
      pdf.addImage(this.contrat.signatureImage, 'PNG', 10, 120, 50, 20);
    } else {
      pdf.text(`❌ No Signature Provided`, 10, 110);
    }

    pdf.save('Contract_Agreement.pdf');
  }
}
