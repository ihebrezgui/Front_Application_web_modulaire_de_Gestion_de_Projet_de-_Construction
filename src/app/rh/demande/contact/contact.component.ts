import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DemandeService } from '../demande.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./style1.css']
})
export class ContactComponent {
  email = '';
  subject = '';
  message = '';
  responseMessage = '';
  isSuccess = false;
  isLoading = false;

  constructor(private emailService: DemandeService) {}

  sendEmail(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    this.responseMessage = '';

    this.emailService.sendEmail(this.email, this.subject, this.message).subscribe({
      next: (response) => {
        this.responseMessage = 'Votre message a été envoyé avec succès !';
        this.isSuccess = true;

        this.resetForm(form);

        // Réinitialiser le message après 5 secondes
        setTimeout(() => {
          this.responseMessage = '';
        }, 5000);
      },
      error: (error) => {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        this.responseMessage = 'Une erreur est survenue. Veuillez réessayer.';
        this.isSuccess = false;

        // Réinitialiser le message après 5 secondes
        setTimeout(() => {
          this.responseMessage = '';
        }, 5000);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  resetForm(form: NgForm) {
    form.resetForm(); 
    this.email = '';
    this.subject = '';
    this.message = '';
  }
}
