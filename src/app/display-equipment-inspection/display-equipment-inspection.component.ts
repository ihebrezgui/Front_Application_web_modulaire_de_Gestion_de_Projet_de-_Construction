import { Component, OnInit } from '@angular/core';
import { EquipmentInspection } from '../safety-management/EquipmentInspection';
import { PPEService } from '../PPE.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-display-equipment-inspection',
  templateUrl: './display-equipment-inspection.component.html',
  styleUrls: ['./display-equipment-inspection.component.css']
})
export class DisplayEquipmentInspectionComponent implements OnInit {
  inspections: EquipmentInspection[] = [];
  isLoading: boolean = false;

  constructor(private ppeService: PPEService) {}

  ngOnInit(): void {
    this.loadInspections();
  }

  loadInspections(): void {
    this.isLoading = true;
    this.ppeService.getEquipmentInspectionList()
      .pipe(
        finalize(() => (this.isLoading = false)),
        catchError((error) => {
          console.error('Error loading inspections:', error);
          return of([]); // Return empty array on error
        })
      )
      .subscribe((data) => {
        console.log('Fetched Inspections:', JSON.stringify(data, null, 2));
        this.inspections = data;
      });
  }

  finalizeInspection(inspectionId: number): void {
    this.isLoading = true;
    this.ppeService.finalizeInspection(inspectionId)
      .pipe(
        finalize(() => (this.isLoading = false)),
        catchError((error) => {
          console.error('Error finalizing inspection:', error);
          return of('Failed to finalize');
        })
      )
      .subscribe((response) => {
        console.log('Inspection finalized:', response);
        this.loadInspections(); // Refresh list after finalization
      });
  }
}
