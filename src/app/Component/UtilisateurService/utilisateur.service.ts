import { Injectable } from '@angular/core';
import{HttpClient, HttpClientModule} from  '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from '../commande/User';
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private baseURL="http://localhost:8088/auth";
  constructor(private httpClient:HttpClient) { }
  login(user: { username: string; password: string }): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}/login`, user);
  }
  
  register(user: User): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/register`, user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  forgotPassword(email: string) {
    return this.httpClient.post(`${this.baseURL}/forgot-password`, { email }, { responseType: 'text' });
  }
  resetPassword(token: string, newPassword: string) {
    return this.httpClient.post(`${this.baseURL}/reset-password?token=${token}`, { password: newPassword }, { responseType: 'text' });
  }
  
  checkEmailAvailability(email: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/check-email?email=${email}`);
  }
  registerFace(image: File, email: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('email', email);
    
    return this.httpClient.post(`${this.baseURL}/register-face`, formData);
  }

  // Nouvelle méthode pour la connexion faciale
  loginWithFace(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    
    return this.httpClient.post(`${this.baseURL}/login-face`, formData);
  }

  // Méthode pour vérifier si l'utilisateur a enregistré un visage
  hasFaceRegistered(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseURL}/has-face/${email}`);
  }




}