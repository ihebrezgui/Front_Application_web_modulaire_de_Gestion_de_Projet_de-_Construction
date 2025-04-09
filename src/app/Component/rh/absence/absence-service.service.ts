import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Absence, AbsenceType } from './absence';


@Injectable({
  providedIn: 'root'
})
export class AbsenceServiceService {

  private apiUrl = 'http://localhost:8081/absences'; 

  constructor(private http: HttpClient) {}

  getAbsencesByEmployee(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }
  getAbsencesByEmployeeId(employeeId: number): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.apiUrl}/employees/${employeeId}/absences`);
  }
  getEmployeesWithAbsences(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employees/with-absences`);
  }
  deleteAbsence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  addAbsence(employeeId: number, absence: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/${employeeId}`, absence);
  }
  updateAbsence(id: number, type: string, dateDebut: string, dateFin: string, dureeHeures: number) {
    const params = new URLSearchParams();
    params.set('newType', type);
    params.set('newDateDebut', dateDebut);
    params.set('newDateFin', dateFin);
    params.set('newDureeHeures', dureeHeures.toString()); 
    
    return this.http.put(`${this.apiUrl}/update/${id}?${params.toString()}`, {});
  }
  
  
  }

