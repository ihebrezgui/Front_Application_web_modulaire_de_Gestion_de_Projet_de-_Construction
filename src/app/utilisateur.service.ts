import { Injectable } from '@angular/core';
import{HttpClient, HttpClientModule} from  '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from './utilisateur/User';
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
/*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Sends a request to the server to initiate the password reset process for the specified email.
   * 
   * @param email - The email address of the user who wants to reset their password.
   * @returns An Observable that emits the server's response as a text string.
   */

/*******  693f7eb4-504e-4ed5-802b-7fbe476b4b5f  *******/
  forgotPassword(email: string) {
    return this.httpClient.post(`${this.baseURL}/forgot-password`, { email }, { responseType: 'text' });
  }
  resetPassword(token: string, newPassword: string) {
    return this.httpClient.post(`${this.baseURL}/reset-password?token=${token}`, { password: newPassword }, { responseType: 'text' });
  }
  


  checkEmailAvailability(email: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/check-email?email=${email}`);
  }






}
