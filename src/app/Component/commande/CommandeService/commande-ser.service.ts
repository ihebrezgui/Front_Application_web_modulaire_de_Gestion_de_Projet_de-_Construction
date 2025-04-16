import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeSerService {
  private baseUrl = 'http://localhost:8089/commande';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Commande[]> {
    return this.httpClient.get<Commande[]>(`${this.baseUrl}/commandeget`);
  }

  addCommande(commande: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/commandeajouter`, commande);
  }
  

  deleteCommande(id: number): Observable<void> { // Retourner void pour la méthode de suppression
    return this.httpClient.delete<void>(`${this.baseUrl}/commandesupprimer/${id}`);
  }
  addCommandeWithRessources(ressources: any[]): Observable<Commande> {
    const commande = { 
        dateCommande: new Date(), 
        etatCommande: "EN_ATTENTE", 
        ressources 
    }; 
    return this.httpClient.post<Commande>(`${this.baseUrl}/commandeajouter`, commande);
}
addCommandeWithRessourcesJson(commande: Commande): Observable<Commande> {
  return this.httpClient.post<Commande>(`${this.baseUrl}/commandeajouter`, commande);
}
viderPanier() {
  return this.httpClient.delete('http://localhost:8080/api/panier/vider-panier');
}
getCommandesEnRetard(): Observable<any[]> {
  return this.httpClient.get<any[]>(`${this.baseUrl}/commandes/en-retard`);
}

verifierEtMettreAJourEtatCommandes(): Observable<any> {
  return this.httpClient.put(`${this.baseUrl}/commandes/verifier-et-mettre-a-jour`, {});
}

receptionnerCommande(id: number): Observable<any> {
  return this.httpClient.put(`${this.baseUrl}/commandes/${id}/receptionner`, {});
}
  // Méthode pour récupérer la position du livreur et du client
  getCommandePosition(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}/position`);
  }

  // Méthode pour récupérer une commande par ID
  getCommande(id: number): Observable<Commande> {
    return this.httpClient.get<Commande>(`${this.baseUrl}/${id}`);
  }
}

