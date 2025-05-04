import { Injectable } from '@angular/core';
import { Paiement } from './list-paiement/Paiement';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private baseURL = 'http://localhost:8082/paiement'; // Assurez-vous que l'URL est correcte

  constructor(private httpClient: HttpClient) {}

  // Récupérer un paiement par ID
  getPaiementById(id: number): Observable<Paiement> {
    return this.httpClient.get<Paiement>(`${this.baseURL}/paiement/${id}`);
  }

  // Récupérer la liste des paiements
  getPaiementList(): Observable<Paiement[]> {
    return this.httpClient.get<Paiement[]>(`${this.baseURL}/paiementall`);
  }

  // Ajouter un paiement
  addPaiement(paiement: Paiement, nbre: number): Observable<Paiement> {
    return this.httpClient.post<Paiement>(`${this.baseURL}/addpaiement/${nbre}`, paiement);
  }

  // Mettre à jour un paiement
  updatePaiement(id: number, paiement: Paiement): Observable<Paiement> {
    return this.httpClient.put<Paiement>(`${this.baseURL}/updatepaiement/${id}`, paiement);
  }

  // Supprimer un paiement
  deletePaiement(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/deletepaiement/${id}`);
  }
}
