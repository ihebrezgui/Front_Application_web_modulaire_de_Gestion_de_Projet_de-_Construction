import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UtilisateurService } from '../../UtilisateurService/utilisateur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-utilisateur-component',
  templateUrl: './utilisateur-component.component.html',
  styleUrls: ['./style1.css']
})
export class UtilisateurComponentComponent implements OnInit  {
  isSignIn: boolean = true;
  isForgotPassword: boolean = false;
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  resetEmail: string = '';
  resetSuccess: boolean = false;
  resetError: string = '';
  email: string = '';
  message: string = '';
 
  // Validation error messages
  signupErrors = {
    username: '',
    email: '',
    password: '',
    role: ''
  };

  user: User = new User();

  constructor(private authService: UtilisateurService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isSignIn = true;
    }, 200);
  }
  onForgotPassword() {
    console.log('Reset email:', this.resetEmail); // Verify the value
    
 
  
    this.authService.forgotPassword(this.resetEmail).subscribe({
      next: (response) => {
        console.log('Response received:', response);  // Check what the response is
        this.message = "Email de réinitialisation envoyé !";
      },
      error: (err) => {
        console.error('Error received:', err);  // Log the error fully
        this.message = "Erreur : " + (err.error?.message || err.message || 'Unknown error');
      }
    });
    
  }
  toggle(): void {
    this.isSignIn = !this.isSignIn;
    this.isForgotPassword = false;
    this.resetErrors();
    this.resetError = '';
  }



  backToLogin(): void {
    this.isForgotPassword = false;
    this.resetEmail = '';
    this.resetError = '';
  }

  // Validation function
  validateSignup(): boolean {
    this.resetErrors();
    let isValid = true;

    // Username validation
    if (!this.user.username || this.user.username.trim().length === 0) {
      this.signupErrors.username = 'Username is required';
      isValid = false;
    } else if (this.user.username.length < 3) {
      this.signupErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.user.email) {
      this.signupErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailPattern.test(this.user.email)) {
      this.signupErrors.email = 'Invalid email format';
      isValid = false;
    }

    // Password validation
    if (!this.user.password) {
      this.signupErrors.password = 'Password is required';
      isValid = false;
    } else if (this.user.password.length < 6) {
      this.signupErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Role validation
    if (!this.user.role) {
      this.signupErrors.role = 'Please select a role';
      isValid = false;
    }

    return isValid;
  }

  // Reset error messages
  resetErrors(): void {
    this.signupErrors = {
      username: '',
      email: '',
      password: '',
      role: ''
    };
  }showForgotPassword() {
    this.isForgotPassword = true;
    this.isSignIn = true; // Ensure we're in sign-in mode when showing forgot password
  }
  
  hideForgotPassword() {
    this.isForgotPassword = false;
    this.isSignIn = true; // Explicitly set to sign-in mode
  }

  onRegister(): void {
    if (!this.validateSignup()) {
      return;
    }

    console.log('User Data:', this.user);
    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        console.log('User Data on Error:', this.user);
        alert('Registration failed');
      }
    });
  }

  onLogin(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    const user = { username: this.username, password: this.password };

    this.authService.login(user).subscribe(
      (response) => {
        console.log('Réponse du serveur :', response);
        if (response && response.username) {
          console.log('Utilisateur connecté:', response.username);
        }
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('role', response.role);
        localStorage.setItem('email', response.email);
        localStorage.setItem('id', response.id);
        this.router.navigate(['/afficher']);
      },
      (error) => {
        console.error('Erreur de connexion :', error);
        this.errorMessage = 'Nom dutilisateur ou mot de passe incorrect';
      }
    );
  }

  onResetPassword(): void {
    if (!this.resetEmail) {
      this.resetError = 'Email is required';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.resetEmail)) {
      this.resetError = 'Invalid email format';
      return;
    }
}
}
