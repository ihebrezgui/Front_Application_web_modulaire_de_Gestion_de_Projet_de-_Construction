import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from './list-facture/Facture';


@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = 'http://localhost:8082/facture/addfacture'; // Remplacez par l'URL de ton API

  constructor(private http: HttpClient) {}

  addFacture(facture: Facture): Observable<Facture> {
    return this.http.post<Facture>(`${this.apiUrl}`, facture);
  }
  
  
}
