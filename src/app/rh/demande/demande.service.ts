import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Demande } from './demande';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private apiUrl = 'http://localhost:8081/demande'; 
  private Url = 'http://localhost:8081/demande/send'; 
  constructor(private http: HttpClient) {}

  getAllDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.apiUrl}/alldemande`);
  }
  addDemande(demande: Demande): Observable<Demande> {
    return this.http.post<Demande>(`${this.apiUrl}/adddemande`, demande);
  }

  deleteDemande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletedemande/${id}`);
  }
  
  sendEmail(email: string, subject: string, message: string): Observable<any> {
    const emailData = { email, subject, message };
    return this.http.post(this.Url, emailData, { responseType: 'text' });
  }
 
}
