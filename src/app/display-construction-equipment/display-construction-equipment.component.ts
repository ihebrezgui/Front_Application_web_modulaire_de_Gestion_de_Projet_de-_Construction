import { Component, OnInit } from '@angular/core';
import { ConstructionEquipment } from '../safety-management/ConstructionEquipment';
import { PPEService } from '../PPE.service';

@Component({
  selector: 'app-display-construction-equipment',
  templateUrl: './display-construction-equipment.component.html',
  styleUrls: ['./display-construction-equipment.component.css']
})
export class DisplayConstructionEquipmentComponent implements OnInit {
  equipmentList: ConstructionEquipment[] = [];

  constructor(private ppeService: PPEService) { }

  ngOnInit(): void {
    this.loadConstructionEquipment();
  }

  loadConstructionEquipment(): void {
    this.ppeService.getConstructionEquipmentList().subscribe(
      (data: ConstructionEquipment[]) => {
        console.log('Construction Equipment loaded:', data);
        this.equipmentList = data;
      },
      (error) => {
        console.error('Error loading construction equipment:', error);
      }
    );
  }
  updateConstructionEquipment(equipment: ConstructionEquipment): void {
    console.log('Update button clicked for equipment:', equipment);
  
    // Ensure lastMaintenance is converted to Date if it is a string
    const lastMaintenanceDate = equipment.lastMaintenance ? new Date(equipment.lastMaintenance) : null;
    const maintenanceDateValue = equipment.maintenanceDate ? new Date(equipment.maintenanceDate) : null;
  
    const lastMaintenance = prompt(
      "Enter Last Maintenance Date (YYYY-MM-DD):", 
      lastMaintenanceDate ? lastMaintenanceDate.toISOString().split('T')[0] : ''
    );
  
    const maintenanceDate = prompt(
      "Enter Next Maintenance Date (YYYY-MM-DD):", 
      maintenanceDateValue ? maintenanceDateValue.toISOString().split('T')[0] : ''
    );
  
    if (lastMaintenance && maintenanceDate) {
      const updatedData: Partial<ConstructionEquipment> = {
        lastMaintenance: new Date(lastMaintenance),
        maintenanceDate: new Date(maintenanceDate)
      };
  
      console.log('Updated data:', updatedData);
  
      this.ppeService.updateConstructionEquipment(equipment.equipment_id, updatedData).subscribe(
        (response) => {
          console.log('Construction Equipment updated:', response);
          this.loadConstructionEquipment();
        },
        (error) => {
          console.error('Error updating construction equipment:', error);
        }
      );
    }
  }

  deleteConstructionEquipment(id: number): void {
    if (confirm('Are you sure you want to delete this equipment?')) {
      this.ppeService.deleteConstructionEquipment(id).subscribe(
        () => {
          console.log(`Construction Equipment with ID ${id} deleted.`);
          this.loadConstructionEquipment(); // Refresh the list
        },
        (error) => {
          console.error('Error deleting construction equipment:', error);
        }
      );
    }
  }
  
  
}  