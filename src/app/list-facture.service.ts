// list-facture.service.ts
import { Injectable } from '@angular/core';
import { Facture } from './list-facture/Facture';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListFactureService {

  private baseUrl = 'http://localhost:8082/facture';
  // Base URL de l'API

  constructor(private httpClient: HttpClient) { }

  // Méthode pour récupérer toutes les factures
  getFactureList(): Observable<Facture[]> {
    return this.httpClient.get<Facture[]>(`${this.baseUrl}/facturesall`);
  }

  // Méthode pour récupérer une facture par son ID

  // Méthode pour supprimer une facture
  deleteFacture(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/deletefacture/${id}`);
  }

  // Méthode pour mettre à jour une facture
  getFactureById(id: number): Observable<Facture> {
    return this.httpClient.get<Facture>(`${this.baseUrl}/${id}`);
  }

  updateFacture(id: number, facture: Facture): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/updatefacture/${id}`, facture);
  }
  getMontantParMois(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/montant-par-mois`);
  }
 
}
