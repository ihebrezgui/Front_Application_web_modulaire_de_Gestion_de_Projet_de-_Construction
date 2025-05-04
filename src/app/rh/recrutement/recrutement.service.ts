import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecrutementComponent } from './recrutement/recrutement.component';

@Injectable({
  providedIn: 'root'
})
export class RecrutementService {

  private apiUrl = 'http://localhost:8081/recrutement'; // URL de l'API

  constructor(private http: HttpClient) { }

addRecrutement(recrutement: FormData): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/add`, recrutement);
}

getAllRecrutements(): Observable<any> {
  return this.http.get(`${this.apiUrl}/all`);
}


deleteRecrutement(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/delete/${id}`);
}

updateRecrutementStatus(id: number, status: boolean): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateStatus/${id}`, { traiter: status });
}
}
