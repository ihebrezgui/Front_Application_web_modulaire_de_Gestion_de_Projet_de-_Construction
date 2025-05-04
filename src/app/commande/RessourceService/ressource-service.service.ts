import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Ressource } from '../ressource'; // Importez votre interface Ressource

@Injectable({
  providedIn: 'root'
})
export class RessourceServiceService {
  private apiUrl = 'http://localhost:8089/commande'; // Mettez à jour avec votre API

  constructor(private http: HttpClient) {}

  getAllRessources(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(`${this.apiUrl}/ressourceget`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des ressources', error);
        return throwError(error);
      })
    );
  }
  
  addRessource(ressource: Ressource): Observable<Ressource> {
    console.log('Envoi de la ressource au serveur :', ressource); // Log pour vérifier l'envoi
    return this.http.post<Ressource>(`${this.apiUrl}/Resourceajouter`, ressource).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'ajout de la ressource', error);
        return throwError(error);
      })
    );
  }

  deleteRessource(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/ressourcesupprimer/${id}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la suppression de la ressource', error);
        return throwError(error);
      })
    );
  }

  getFournisseurs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/fournisseurget`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des fournisseurs', error);
        return throwError(error);
      })
    );
  }

  getCommandes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/commandeget`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des commandes', error);
        return throwError(error);
      })
    );
  }
  updateRessource(ressource: Ressource): Observable<Ressource> {
    return this.http.put<Ressource>(`${this.apiUrl}/ressourceupdate`, ressource).pipe(
      catchError(error => {
        console.error('Erreur lors de la mise à jour de la ressource', error);
        return throwError(error);
      })
    );
  }
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.apiUrl}/uploadImage`, formData);
  }
  updateRessourceStock(ressourceId: number, newStock: number) {
    return this.http.put(`${this.apiUrl}/ressources/${ressourceId}/updateStock`, { quantiteDisponible: newStock });
  }
  
}
