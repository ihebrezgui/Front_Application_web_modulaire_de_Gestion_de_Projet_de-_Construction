import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fournisseur } from '../fournisseur';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FournisseurServiceService {

  
  private apiUrl = 'http://localhost:8089/commande'; // Mettez à jour avec votre API
 
   constructor(private http: HttpClient) {}
 
   getAllfournisseurs(): Observable<Fournisseur[]> {
     return this.http.get<Fournisseur[]>(`${this.apiUrl}/fournisseurget`).pipe(
       catchError(error => {
         console.error('Erreur lors de la récupération des ressources', error);
         return throwError(error);
       })
     );
   }
   supprimerfournisseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/fournisseursupprimer/${id}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la suppression de la ressource', error);
        return throwError(error);
      })
    );
  }
  addfournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<Fournisseur>(`${this.apiUrl}/fournisseurajouter`, fournisseur, { headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'ajout de la ressource', error);
        return throwError(error);
      })
    );
}

getfournisseurById(id: number): Observable<Fournisseur> {
  const url = `${this.apiUrl}/fournisseurget/${id}`;
  console.log("Requête GET envoyée à :", url); // Debug
  return this.http.get<Fournisseur>(url).pipe(
    catchError(error => {
      console.error('Erreur lors de la récupération du fournisseur', error);
      return throwError(error);
    })
  );
}

updatefournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
  const headers = { 'Content-Type': 'application/json' };
  return this.http.put<Fournisseur>(`${this.apiUrl}/fournisseurupdate`, fournisseur, { headers })
  .pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Erreur lors de la mise à jour du fournisseur', error);
      alert(`Erreur: ${error.status} - ${error.message}`); // Alerte pour voir le message d'erreur
      return throwError(error);
    })
  );
}


}
