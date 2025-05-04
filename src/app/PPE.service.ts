import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { PPE } from './safety-management/PPE';
import { Employee } from './safety-management/Employee';
import { ConstructionEquipment } from './safety-management/ConstructionEquipment';
import { EquipmentInspection } from './safety-management/EquipmentInspection';

@Injectable({
  providedIn: 'root'
})
export class PPEService {
  private ppeBaseUrl = 'http://localhost:1111/ppe/listppe';
  private ppeApiUrl = 'http://localhost:1111/ppe/addPPE/';
  private deletePpeUrl = 'http://localhost:1111/ppe/delete/';
  private constructionEquipUrl = 'http://localhost:1111/constructionequip/list';
  private addConstructionEquipUrl = 'http://localhost:1111/constructionequip/add';
  private equipmentInspectionUrl = 'http://localhost:1111/equipinspection/list';
  private addEquipmentInspectionUrl = 'http://localhost:1111/equipinspection/add';
  private finalizeInspectionUrl = 'http://localhost:1111/equipinspection/finalize';

  private notificationsSubject = new BehaviorSubject<string[]>([]);
  notifications$ = this.notificationsSubject.asObservable();
  constructor(private httpClient: HttpClient) {}

  // PPE Methods
  getPPEList(): Observable<PPE[]> {
    return this.httpClient.get<PPE[]>(this.ppeBaseUrl);
  }

  addPPE(ppe: PPE, employeeId: number): Observable<PPE> {
    const urlWithEmployeeId = `${this.ppeApiUrl}${employeeId}`;
    return this.httpClient.post<PPE>(urlWithEmployeeId, ppe);
  }

  deletePPE(ppeId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.deletePpeUrl}${ppeId}`);
  }

  // Employee Methods
  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>('http://localhost:1111/employee/listEmployee');
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>('http://localhost:1111/employee/addEmployee', employee);
  }

  // Construction Equipment Methods
  getConstructionEquipmentList(): Observable<ConstructionEquipment[]> {
    return this.httpClient.get<ConstructionEquipment[]>(this.constructionEquipUrl).pipe(
      map(equipmentList => {
        this.checkMaintenanceNotifications(equipmentList);
        return equipmentList;
      })
    );
  }

  private checkMaintenanceNotifications(equipmentList: ConstructionEquipment[]): void {
    const today = new Date();
    const upcomingMaintenance = equipmentList
      .filter(equipment => {
        const maintenanceDate = new Date(equipment.maintenanceDate);
        const daysDifference = (maintenanceDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
        return daysDifference >= 0 && daysDifference <= 7; // Maintenance within the next 7 days
      })
      .map(equipment => `⚠️ Maintenance due soon for ${equipment.serialNumber} on ${equipment.maintenanceDate}`);

    this.notificationsSubject.next(upcomingMaintenance);
  }

  addConstructionEquipment(equipment: ConstructionEquipment): Observable<ConstructionEquipment> {
    return this.httpClient.post<ConstructionEquipment>(this.addConstructionEquipUrl, equipment);
  }

  updateConstructionEquipment(equipmentId: number, updatedEquipment: Partial<ConstructionEquipment>): Observable<ConstructionEquipment> {
    const url = `http://localhost:1111/constructionequip/update/${equipmentId}`;
    console.log('Sending update request to:', url, 'with data:', updatedEquipment);
    return this.httpClient.put<ConstructionEquipment>(url, updatedEquipment);
  }

  deleteConstructionEquipment(id: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:1111/constructionequip/delete/${id}`);
  }

  // Equipment Inspection Methods
  getEquipmentInspectionList(): Observable<EquipmentInspection[]> {
    return this.httpClient.get<EquipmentInspection[]>(this.equipmentInspectionUrl);
  }

  
  

  // Add Equipment Inspection based on itemType (EQUIPMENT or PPE)
  addEquipmentInspection(inspection: EquipmentInspection, itemType: string, itemId: number): Observable<EquipmentInspection> {
    const url = `${this.addEquipmentInspectionUrl}/${itemId}`;
    return this.httpClient.post<EquipmentInspection>(url, { ...inspection, itemType });
  }

  updateInspection(inspectionId: number, inspection: EquipmentInspection): Observable<EquipmentInspection> {
    const url = `http://localhost:1111/equipinspection/update/${inspectionId}`;
    return this.httpClient.put<EquipmentInspection>(url, inspection);
  }

  finalizeInspection(inspectionId: number): Observable<string> {
    const url = `${this.finalizeInspectionUrl}/${inspectionId}`;
    return this.httpClient.put(url, {}, { responseType: 'text' });
  }
  getSafetyAlerts(): Observable<string[]> {
    return this.httpClient.get<string[]>('http://localhost:1111/safetyalert/active');
  }
  
  
  
}
