import { Injectable } from '@angular/core';
import{HttpClient, HttpClientModule} from  '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Terre } from '../app/listterre/Terre';
import { papier } from './list-papier/papier';
import { Contrat } from './ajouter-contrat/contrat';

interface Recommendation {
  distance: number;
  location: string;
}

interface RecommendedLocationResponse {
  query_location: string;
  recommendations: Recommendation[];
}


@Injectable({
  providedIn: 'root'
})
export class TerreService {
private baseURL="http://localhost:8085/api4/terrain";
  constructor(private httpClient:HttpClient) { }

getTerreList():Observable<Terre[]>{
return this.httpClient.get<Terre[]>(this.baseURL+'/allterrain');
}
getTerreById(id: number): Observable<Terre> {
  return this.httpClient.get<Terre>(`${this.baseURL}/seuleterrain/${id}`);
}


deleteTerre(id: number): Observable<void> {
 
  return this.httpClient.delete<void>(this.baseURL + '/deleteterrain' + '/' + id);
}

deletepapier(id: number): Observable<void> {
 
  return this.httpClient.delete<void>(this.baseURL + '/deletePapier' + '/' + id);
}
createTerre(terre: Terre): Observable<Object> {
  return this.httpClient.post<Object>(this.baseURL + '/addterrain', terre);

}



createPapier(papier:papier, terrainId: number): Observable<Object> {
  // Send the terrainId in the URL and the Papier_autorisation in the request body
  return this.httpClient.post<Object>(`${this.baseURL}/addPapier/${terrainId}`, papier);
}

createContrat(contrat:Contrat, terrainId: number): Observable<Object> {
  // Send the terrainId in the URL and the Papier_autorisation in the request body
  return this.httpClient.post<Object>(`${this.baseURL}/addContrat/${terrainId}`, contrat);
}



getPapierListByTerrainId(terrainId: number): Observable<papier[]> {
  return this.httpClient.get<papier[]>(`${this.baseURL}/papiers/${terrainId}`);
}
saveSignature(signatureBase64: string): Observable<{ signaturePath: string }> {
  return this.httpClient.post<{ signaturePath: string }>(
    `${this.baseURL}/save-signature`, 
    { signatureImage: signatureBase64 }
  );
}



updateTerre(terre: Terre): Observable<Object> {
  return this.httpClient.put<Object>(this.baseURL + '/updateterrain', terre);
}
updatePapier(papier: papier, terrainId: number): Observable<Object> {
  return this.httpClient.put<Object>(`${this.baseURL}/updatePapier/${terrainId}`, papier);
}


updateContrat(contrat: Contrat): Observable<Object> {
  return this.httpClient.put<Object>(`${this.baseURL}/updatecontrat`, contrat);
}
findContratByidTerrain(idTerrain: number): Observable<Contrat> {
  return this.httpClient.get<Contrat>(`${this.baseURL}/contrat/${idTerrain}`);

}

findContratByid(id: number): Observable<Contrat> {
  return this.httpClient.get<Contrat>(`${this.baseURL}/contratid/${id}`);

}
getContractList():Observable<Contrat[]>{
  return this.httpClient.get<Contrat[]>(this.baseURL+'/contrat');
  }

  getUserContracts(nom: string): Observable<Contrat[]> {
    return this.httpClient.get<Contrat[]>(`${this.baseURL}/contratnom/${nom}`);
  }
  
  private apiUrl = 'http://127.0.0.1:5001';  // Flask API URL
  getRecommendedTerres(username: string): Observable<Recommendation[]> {
    return this.httpClient.get<RecommendedLocationResponse>(`${this.apiUrl}/recommend?location=${username}`)
      .pipe(
        map(response => response.recommendations)  // Return the full list of recommended locations with their distances
      );
  }
  getTerrefromContrat():Observable<Terre[]>{
    return this.httpClient.get<Terre[]>(this.baseURL+'/allterrainfromcontracts');
    }
  
  
}
