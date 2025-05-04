import { Component, OnInit } from '@angular/core';
import { PPEService } from '../PPE.service';
import { ConstructionEquipment } from '../safety-management/ConstructionEquipment';

@Component({
  selector: 'app-construction-equipment-frontlist',
  templateUrl: './construction-equipment-frontlist.component.html',
  styleUrls: ['./style2.css']
})
export class ConstructionEquipmentFrontlistComponent implements OnInit {
  equipmentList: ConstructionEquipment[] = []; 
  notifications: string[] = []; // Added for maintenance alerts

  constructor(private ppeService: PPEService) {}

  ngOnInit(): void {
    this.getConstructionEquipmentList();
    
    // Subscribe to notifications
    this.ppeService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
    });
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

  getConstructionEquipmentList(): void {
    this.ppeService.getConstructionEquipmentList().subscribe(data => {
      this.equipmentList = data; 
      this.generateMaintenanceNotifications();
    });
  }

  updateConstructionEquipment(equipment: ConstructionEquipment): void {
    console.log('Update button clicked for equipment:', equipment);

    const lastMaintenance = prompt(
      "Enter Last Maintenance Date (YYYY-MM-DD):",
      equipment.lastMaintenance ? new Date(equipment.lastMaintenance).toISOString().split('T')[0] : ''
    );

    const maintenanceDate = prompt(
      "Enter Next Maintenance Date (YYYY-MM-DD):",
      equipment.maintenanceDate ? new Date(equipment.maintenanceDate).toISOString().split('T')[0] : ''
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
          this.getConstructionEquipmentList(); // Refresh list
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
          this.getConstructionEquipmentList(); // Refresh the list
        },
        (error) => {
          console.error('Error deleting construction equipment:', error);
        }
      );
    }
  }

  // Generate maintenance alerts for equipment
  private generateMaintenanceNotifications(): void {
    this.notifications = this.equipmentList
      .filter(equipment => this.isMaintenanceDue(equipment))
      .map(equipment => `🚨 Maintenance due for ${equipment.type} (Serial: ${equipment.serialNumber}) on ${new Date(equipment.maintenanceDate).toISOString().split('T')[0]}`);

  }

  private isMaintenanceDue(equipment: ConstructionEquipment): boolean {
    if (!equipment.maintenanceDate) return false;
    const today = new Date();
    const maintenanceDate = new Date(equipment.maintenanceDate);
    
    // Check if maintenance is due within the next 7 days
    return (maintenanceDate.getTime() - today.getTime()) / (1000 * 3600 * 24) <= 7;
  }
}
