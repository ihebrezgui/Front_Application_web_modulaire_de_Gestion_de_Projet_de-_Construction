import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Echeance } from './list-echeance/Echeance';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EcheanceService {
  private baseURL = 'http://localhost:8082/echeance'; // Vérifiez que cette URL est correcte

  constructor(private httpClient: HttpClient) {}

  // Récupérer la liste des échéances
  getEcheanceList(): Observable<Echeance[]> {
    return this.httpClient.get<Echeance[]>(`${this.baseURL}/echeancesall`).pipe(
      tap(data => console.log('Données des échéances:', data))
    );
  }

  // Supprimer une échéance par ID
  deleteEcheance(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/deleteEcheance/${id}`);
  }

  // Ajouter une échéance
  addEcheance(echeance: Echeance): Observable<Echeance> {
    return this.httpClient.post<Echeance>(`${this.baseURL}/addEcheance`, echeance);
  }

  // Mettre à jour une échéance
  updateEcheance(id: number, echeance: Echeance): Observable<Echeance> {
    return this.httpClient.put<Echeance>(`${this.baseURL}/updateEcheance/${id}`, echeance);
  }

  // Récupérer une échéance par son ID
  getEcheanceById(id: number): Observable<Echeance> {
    return this.httpClient.get<Echeance>(`${this.baseURL}/${id}`);
  }
}
