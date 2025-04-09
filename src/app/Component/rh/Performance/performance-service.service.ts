import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employe } from '../employe/employee/employee';
import { Observable } from 'rxjs';
import { Performance } from './Performance';

@Injectable({
  providedIn: 'root'
})
export class PerformanceServiceService {

  private baseUrl = 'http://localhost:8081/performance';
  private Url = 'http://localhost:8081/employee';
    constructor(private httpClient: HttpClient) {}
  
    getempList(): Observable<Employe[]> {
      return this.httpClient.get<Employe[]>(`${this.Url}/get_all_employees`);

    }
    getEmployeById(id: number): Observable<Employe> {
      return this.httpClient.get<Employe>(`${this.Url}/get_employee/${id}`);
    }
    getPerformancesByEmployee(employeeId: number): Observable<Performance[]> {
      return this.httpClient.get<Performance[]>(`${this.baseUrl}/get_performances_by_employee/${employeeId}`);
    }
    
    getAllPerformances(): Observable<Performance[]> {
      return this.httpClient.get<Performance[]>(`${this.baseUrl}/get_all_performancesbyEmpl`);
    }
    getAll(): Observable<Performance[]> {
      return this.httpClient.get<Performance[]>(`${this.baseUrl}/get_all`);
    }
    deletePerformance(id: number): Observable<void> {
      return this.httpClient.delete<void>(`${this.baseUrl}/delete_performance/${id}`);
    }
    

    updatePerformance(id: number, note: number, commentaire: string, dateEvaluation: string): Observable<any> {
      return this.httpClient.put(`${this.baseUrl}/update_performance/${id}`, {
        note,
        commentaire,
        dateEvaluation
      });
    }
    
    
      
    addPerformance(employeeId: number, performance: Performance): Observable<Performance> {
      const url = `${this.baseUrl}/add_performance/${employeeId}`;
      return this.httpClient.post<Performance>(url, performance);
    }

    /*
    affecterPerformance(employeeId: number, performance: Performance): Observable<Performance> {
      return this.httpClient.post<Performance>(`${this.baseUrl}/performances/${employeeId}`, performance);
    }

    // Méthode pour récupérer les performances par ID d'employé
    getPerformancesByEmployeeId(employeeId: number): Observable<any[]> {
      return this.httpClient.get<any[]>(`${this.baseUrl}/get_performances_by_employee/${employeeId}`);
    }
      */
}


 