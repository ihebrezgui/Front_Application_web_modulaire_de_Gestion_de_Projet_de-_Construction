import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from './employee/employee';
import { Absence } from '../absence/absence';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  private baseUrl = 'http://localhost:8081/employee';

  constructor(private httpClient: HttpClient) {}




  
  getempList(): Observable<Employe[]> {
    return this.httpClient.get<Employe[]>(`${this.baseUrl}/get_all_employees`);
  }
  getEmployeById(id: number): Observable<Employe> {
    return this.httpClient.get<Employe>(`${this.baseUrl}/get_employee/${id}`);
  }


    addEmploye(employe: Employe): Observable<Employe> {
      return this.httpClient.post<Employe>(`${this.baseUrl}/add_employee`, employe);
    }

  deleteEmploye(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete_employee/${id}`);
  }


  updateEmploye(id: number, employeData: any): Observable<Employe> {
    return this.httpClient.put<Employe>(`${this.baseUrl}/update_employee/${id}`, employeData);
  }
  searchEmployees(keyword: string): Observable<Employe[]> {
    return this.httpClient.get<Employe[]>(`${this.baseUrl}/search?keyword=${keyword}`);
  }
  getEmployeesSortedByName(): Observable<Employe[]> {
    return this.httpClient.get<Employe[]>(`${this.baseUrl}/sorted-by-name`);
  }

  getEmployeesSortedBySalary(): Observable<Employe[]> {
    return this.httpClient.get<Employe[]>(`${this.baseUrl}/sorted-by-salary`);
  }

  /*getEmployeeStats(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/stats-over-time`);
  }
*/

  getDisponibiliteParPoste(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/disponibilite`);
  }

  getTotalEmployeesParPoste(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/total`);
  }
}
