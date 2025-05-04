import { Component, OnInit } from '@angular/core';
import { PPEService } from '../PPE.service';
import { EquipmentInspection } from '../safety-management/EquipmentInspection';
import { ConstructionEquipment } from '../safety-management/ConstructionEquipment';
import { PPE } from '../safety-management/PPE';

@Component({
  selector: 'app-add-equipment-inspection',
  templateUrl: './add-equipment-inspection.component.html',
  styleUrls: ['./add-equipment-inspection.component.css']
})
export class AddEquipmentInspectionComponent implements OnInit {
  itemType: string = '';
  inspectionDate: string = '';
  result: string = '';
  remarks: string = '';
  equipmentList: ConstructionEquipment[] = [];
  ppeList: PPE[] = [];
  selectedItemId: number | null = null;

  constructor(private ppeService: PPEService) {}

  ngOnInit(): void {
    this.loadEquipmentAndPPE();
  }

  loadEquipmentAndPPE(): void {
    this.ppeService.getConstructionEquipmentList().subscribe(data => {
      this.equipmentList = data;
    }); 

    this.ppeService.getPPEList().subscribe(data => {
      this.ppeList = data;
    });
  }

  addInspection(): void {
    if (!this.itemType || !this.selectedItemId) {
      alert("Please select an item type and an equipment/PPE.");
      return;
    }
  
    const inspection: EquipmentInspection = {
      inspectionId: 0,  // Set a default value
      inspectionDate: new Date(this.inspectionDate), // Convert string to Date
      result: this.result,
      remarks: this.remarks,
      itemType: this.itemType
    };
  
    this.ppeService.addEquipmentInspection(inspection, this.itemType, this.selectedItemId).subscribe(
      response => {
        alert("Inspection added successfully!");
      },
      error => {
        alert("Error adding inspection.");
      }
    );
  }
}
