import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import SignaturePad from 'signature_pad';
import { Contrat } from '../ajouter-contrat/contrat';
import { TerreService } from '../TerreService.service';

@Component({
  selector: 'app-contratfront',
  templateUrl: './contratfront.component.html',
  styleUrls: ['./style1.css']
})
export class ContratfrontComponent implements OnInit, AfterViewInit {
  contrat!: Contrat;
  id!: number;
  @ViewChild('signaturePad', { static: false }) signaturePadElement!: ElementRef;
  signaturePad!: SignaturePad;
  signatureClient: string | null = null;
  captchaVerified = false;

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
    setTimeout(() => {
      const canvas = this.signaturePadElement.nativeElement as HTMLCanvasElement;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
  
      this.signaturePad = new SignaturePad(canvas, {
        penColor: "black",
        minWidth: 1,
        maxWidth: 5,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        throttle: 16
      });

      this.signaturePad.minWidth = Math.min(20, canvas.height) / 20;
      this.signaturePad.maxWidth = this.signaturePad.minWidth;
    }, 500);
  }

  getContrat(id: number): void {
    this.terreservice.findContratByid(id).subscribe((response: Contrat) => {
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

  onCaptchaResolved(response: string) {
    console.log("Captcha response:", response);
    this.captchaVerified = !!response;
  }

  saveSignature() {
    if (!this.captchaVerified) {
      alert("Please verify reCAPTCHA before submitting.");
      return;
    }

    if (!this.signaturePad.isEmpty()) {
      this.signatureClient = this.signaturePad.toDataURL();

      this.terreservice.saveSignature(this.signatureClient).subscribe(
        (response) => {
          console.log('Signature saved successfully:', response);
          this.contrat.signatureClient = response.signaturePath + '?t=' + new Date().getTime();

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
