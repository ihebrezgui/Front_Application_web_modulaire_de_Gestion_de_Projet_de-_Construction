import { Component } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  trigger: Subject<void> = new Subject<void>();
  webcamImage: WebcamImage | null = null;
  resultMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}  // Inject Router

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;

    this.http.post('http://127.0.0.1:5000/verify-face', {
      image: webcamImage.imageAsDataUrl
    }).subscribe((res: any) => {
      this.resultMessage = res.verified ? "✅ Face Verified!" : "❌ Verification Failed";
      
      if (res.verified) {
        // Navigate to another route on successful verification
        this.router.navigate(['/projets']);  // Change '/dashboard' to the route you want to navigate to
      }
    }, error => {
      this.resultMessage = "❌ Error during verification.";
    });
  }

  

}
