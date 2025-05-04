import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../Cart';

@Injectable({
  providedIn: 'root'
})
export class PanierServService {
  private apiUrl = 'http://localhost:8089/api/cart';
  private apiUrl1 = 'http://localhost:8089/api/cart-ressources';
  private apiUrl2 = 'http://localhost:8089/api/stock';
  private cartId = 1;  // ID du panier par défaut

  constructor(private http: HttpClient) {}

  createCart(): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, {});
  }

  addToCart(cartId: number, ressourceId: number, quantite: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/${cartId}/${ressourceId}/${quantite}`, {});
  }

  removeFromCart( ressourceId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${ressourceId}`);
  }

  getCart(cartId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${cartId}`);
  }

  addToCartt(ressourceId: number, quantite: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add/${this.cartId}/${ressourceId}/${quantite}`, {});
  }
  getCartRessources(): Observable<any> {
    return this.http.get(`${this.apiUrl1}/all`);
  }
  

  // Méthode pour supprimer une ressource du panier
  removeFromCart1(Id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl1}/${Id}`);
  }
  viderPanier() {
    return this.http.delete('http://localhost:8089/api/cart-ressources/vider-panier');
  }
  traiterCommande(ressourceId: number, quantiteDemandee: number): Observable<any> {
    return this.http.post(`${this.apiUrl2}/commandee/${ressourceId}?quantiteDemandee=${quantiteDemandee}`, {});
  }
  getStockAfterCommande(ressourceId: number): Observable<any> {
    return this.http.get(`${this.apiUrl2}/commandee/stock/${ressourceId}`);
  }
}
