import { Component, OnInit } from '@angular/core';
import { PPEService } from '../PPE.service';
import { EquipmentInspection } from '../safety-management/EquipmentInspection';
import { ConstructionEquipment } from '../safety-management/ConstructionEquipment';
import { PPE } from '../safety-management/PPE';

@Component({
  selector: 'app-equipment-inspection-frontadd',
  templateUrl: './equipment-inspection-frontadd.component.html',
  styleUrls: ['./style2.css']
})
export class EquipmentInspectionFrontaddComponent implements OnInit {
  itemType: string = ''; // Will hold 'EQUIPMENT' or 'PPE'
  inspectionDate: string = '';
  result: string = '';
  remarks: string = '';
  equipmentList: ConstructionEquipment[] = [];
  ppeList: PPE[] = [];
  selectedItemId: number | null = null; // Stores the selected equipment or PPE ID

  constructor(private ppeService: PPEService) {}

  ngOnInit(): void {
    this.loadEquipmentAndPPE();
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
      inspectionId: 0, // Default ID, will be set by backend
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