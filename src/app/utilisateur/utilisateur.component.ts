import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from '../utilisateur.service';
import { User } from './User';
import { Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./style1.css']
})
export class UtilisateurComponent implements OnInit {
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

  resultMessage: string = '';
  showWebcam: boolean = false;  // Track webcam activation status
  // Subject for triggering webcam snapshot
  trigger: Subject<void> = new Subject<void>();

  constructor(private authService: UtilisateurService, private router: Router, private http: HttpClient) {

    
  }

  ngOnInit(): void {
    localStorage.clear(); // ⬅️ Add this to reset old login sessions
    setTimeout(() => {
      this.isSignIn = true;
    }, 200);
  }  webcamImage: WebcamImage | null = null;
  
  
  triggerSnapshot(): void {
    this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  
    const headers = {
      'Content-Type': 'application/json'
    };
  
    this.http.post('http://127.0.0.1:5000/verify-face', {
      image: webcamImage.imageAsDataUrl
    }, {
      headers: headers,
      withCredentials: true // Important for handling credentials
    }).subscribe((res: any) => {
      this.resultMessage = res.verified ? "✅ Face Verified!" : "❌ Verification Failed";
  
      if (res.verified) {
        this.router.navigate(['/terrefront']); // Adjust route as needed
      }
    }, error => {
      console.error("Verification error:", error);
      this.resultMessage = "❌ Error during verification.";
    });
  }
  

  // Trigger webcam snapshot

  
  // Handle forgot password
  onForgotPassword() {
    console.log('Reset email:', this.resetEmail);

    this.authService.forgotPassword(this.resetEmail).subscribe({
      next: (response) => {
        console.log('Response received:', response);
        this.message = "Email de réinitialisation envoyé !";
      },
      error: (err) => {
        console.error('Error received:', err);
        this.message = "Erreur : " + (err.error?.message || err.message || 'Unknown error');
      }
    });
  }

  // Toggle between sign-in and sign-up views
  toggle(): void {
    this.isSignIn = !this.isSignIn;
    this.isForgotPassword = false;
    this.resetErrors();
    this.resetError = '';
  }

  // Back to login from forgot password view
  backToLogin(): void {
    this.isForgotPassword = false;
    this.resetEmail = '';
    this.resetError = '';
  }

  // Validation function for signup
  validateSignup(): boolean {
    this.resetErrors();
    let isValid = true;

    // Validate username
    if (!this.user.username || this.user.username.trim().length === 0) {
      this.signupErrors.username = 'Username is required';
      isValid = false;
    } else if (this.user.username.length < 3) {
      this.signupErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.user.email) {
      this.signupErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailPattern.test(this.user.email)) {
      this.signupErrors.email = 'Invalid email format';
      isValid = false;
    }

    // Validate password
    if (!this.user.password) {
      this.signupErrors.password = 'Password is required';
      isValid = false;
    } else if (this.user.password.length < 6) {
      this.signupErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Validate role
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
  }

  // Show forgot password view
  showForgotPassword() {
    this.isForgotPassword = true;
    this.isSignIn = true;
  }

  // Hide forgot password view
  hideForgotPassword() {
    this.isForgotPassword = false;
    this.isSignIn = true;
  }

  // Register new user
  onRegister(): void {
    if (!this.validateSignup()) {
      return;
    }

    console.log('User Data:', this.user);
    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('User registered successfully', response);
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        alert('Registration failed');
      }
    });
  }

  // Login user
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
  
        // Store data in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('id', response.id);
        localStorage.setItem('role', response.role);  // Store role
       // this.router.navigate(['/employe'])
 
        // 🔀 Redirect based on role
        if (response.role === 'ADMIN') {
          this.router.navigate(['/projets']); // Route for admin/backoffice
        } else {
          this.router.navigate(['/terrefront']); // Route for standard users
        }
      },
      (error) => {
        console.error('Erreur de connexion :', error);
        this.errorMessage = 'Nom d’utilisateur ou mot de passe incorrect';
      }
    );
  }
  
  

  // Reset password logic
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

    // Call your password reset service here
  }
}
