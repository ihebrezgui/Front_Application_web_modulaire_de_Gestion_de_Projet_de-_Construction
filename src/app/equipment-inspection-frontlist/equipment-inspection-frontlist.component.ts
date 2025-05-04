import { Component, OnInit } from '@angular/core';
import { EquipmentInspection } from '../safety-management/EquipmentInspection';
import { PPEService } from '../PPE.service';
import { finalize, catchError, of } from 'rxjs';
@Component({
  selector: 'app-equipment-inspection-frontlist',
  templateUrl: './equipment-inspection-frontlist.component.html',
  styleUrls: ['./style2.css']
})
export class EquipmentInspectionFrontlistComponent implements OnInit {

  equipmentInspections: EquipmentInspection[] = [];
  filteredInspections: EquipmentInspection[] = [];
  filter: string = 'all'; 
  isLoading: boolean = false;
  inspectionStats: { pass: number; fail: number; total: number } = { pass: 0, fail: 0, total: 0 };

  constructor(private ppeService: PPEService) { }

  ngOnInit(): void {
    this.loadEquipmentInspections();
    this.ensureChatbotVisible();
  }
  
  ensureChatbotVisible(): void {
    const existingIframe = document.querySelector('iframe[src*="chatbase.co"]') as HTMLIFrameElement;
  
    if (existingIframe) {
      existingIframe.style.display = 'block'; // Re-show it if hidden
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.chatbase.co/embed.min.js';
      script.id = '4jQ7rr-L43pZzIuFqUgxi';
      script.setAttribute('domain', 'www.chatbase.co');
      document.body.appendChild(script);
    }
  }
  

  loadEquipmentInspections() {
    this.ppeService.getEquipmentInspectionList().subscribe(
      (data: EquipmentInspection[]) => {
        this.equipmentInspections = data;
        this.applyFilter(); 
        this.calculateStats();
      },
      (error) => {
        console.error('Error fetching equipment inspections:', error);
      }
    );
  }

  applyFilter() {
    if (this.filter === 'all') {
      this.filteredInspections = this.equipmentInspections;
    } else {
      this.filteredInspections = this.equipmentInspections.filter(
        inspection => inspection.result.toLowerCase() === this.filter
      );
    }
    this.calculateStats(); 
  }

  setFilter(filterValue: string) {
    this.filter = filterValue;
    this.applyFilter();
  }

  finalizeInspection(inspectionId: number): void {
    this.isLoading = true; 

    this.ppeService.finalizeInspection(inspectionId)
      .pipe(
        finalize(() => this.isLoading = false), 
        catchError((error) => {
          console.error('Error finalizing inspection:', error);
          return of('Failed to finalize'); 
        })
      )
      .subscribe((response) => {
        console.log('Inspection finalized:', response);
        this.loadEquipmentInspections(); 
      });
  }

  calculateStats(): void {
    const pass = this.filteredInspections.filter(inspection => inspection.result.toLowerCase() === 'pass').length;
    const fail = this.filteredInspections.filter(inspection => inspection.result.toLowerCase() === 'fail').length;
    const total = this.filteredInspections.length;

    this.inspectionStats = { pass, fail, total };
  }
}
