import { Component, OnInit } from '@angular/core';
import { EquipmentInspection } from '../safety-management/EquipmentInspection';
import { PPEService } from '../PPE.service';

@Component({
  selector: 'app-safety-dashboard',
  templateUrl: './safety-dashboard.component.html',
  styleUrls: ['./safety-dashboard.component.css']
})
export class SafetyDashboardComponent implements OnInit {
  inspections: EquipmentInspection[] = [];
  inspectionStats = { pass: 0, fail: 0, total: 0 };
  passPercent = 0;
failPercent = 0;
passDegrees = 0;
recentInspections: EquipmentInspection[] = [];
  
  

  constructor(private ppeService: PPEService) {}

  ngOnInit(): void {
    this.loadInspections();
  }

  loadInspections(): void {
    this.ppeService.getEquipmentInspectionList().subscribe((data: EquipmentInspection[]) => {
      this.inspections = data;
      this.calculateStats();
      this.recentInspections = data.slice(-5).reverse(); // show last 5 inspections
    });
  }

  calculateStats(): void {
    const pass = this.inspections.filter(i => i.result?.toLowerCase() === 'pass').length;
    const fail = this.inspections.filter(i => i.result?.toLowerCase() === 'fail').length;
    const total = this.inspections.length;
  
    this.inspectionStats = { pass, fail, total };
  
    this.passPercent = total > 0 ? (pass / total) * 100 : 0;
    this.failPercent = 100 - this.passPercent;
    this.passDegrees = this.passPercent / 100 * 360;
  
    this.recentInspections = [...this.inspections]
      .sort((a, b) => new Date(b.inspectionDate).getTime() - new Date(a.inspectionDate).getTime())
      .slice(0, 5);
  }
}
