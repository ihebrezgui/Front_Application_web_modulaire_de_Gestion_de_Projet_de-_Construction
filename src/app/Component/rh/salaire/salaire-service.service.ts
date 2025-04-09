import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salary } from './salaire';

@Injectable({
  providedIn: 'root'
})
export class SalaireServiceService {
  private apiUrl = 'http://localhost:8081/salaries';

  constructor(private http: HttpClient) {}

  calculateSalary(employeeId: number, mois: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/calculate/${employeeId}`, null, {
      params: { mois }
    });
  }

  getSalaryHistory(employeeId: number): Observable<Salary[]> {
    return this.http.get<Salary[]>(`${this.apiUrl}/historique/${employeeId}`);
  }

  getSalariesBetweenDates(employeeId: number, startDate: string, endDate: string) {
    return this.http.get<any[]>(`${this.apiUrl}/historique/${employeeId}/filtre`, {
      params: {
        startDate,
        endDate
      }
    });
  }
  
}
