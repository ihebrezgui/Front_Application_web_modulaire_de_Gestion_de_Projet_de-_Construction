import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'backend';
  isLoggedIn = false;
  user: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkUserSession();
  }

  checkUserSession() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.isLoggedIn = true;
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.user = null;
    this.router.navigate(['/login']);  // Redirige vers la page de connexion
  }
}
