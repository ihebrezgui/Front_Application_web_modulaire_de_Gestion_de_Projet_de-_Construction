import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PPEService } from '../PPE.service';
import { ConstructionEquipment } from '../safety-management/ConstructionEquipment';

@Component({
  selector: 'app-add-construction-equipment',
  templateUrl: './add-construction-equipment.component.html',
  styleUrls: ['./add-construction-equipment.component.css']
})
export class AddConstructionEquipmentComponent {
  equipmentForm: FormGroup;

  constructor(private fb: FormBuilder, private ppeService: PPEService) {
    this.equipmentForm = this.fb.group({
      type: ['', Validators.required],
      serialNumber: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      lastMaintenance: ['', Validators.required],
      maintenanceDate: ['', Validators.required],
      statusEquipment: ['OPERATIONAL', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.equipmentForm.valid) {
      const equipment: ConstructionEquipment = {
        type: this.equipmentForm.value.type,
        serialNumber: this.equipmentForm.value.serialNumber,
        purchaseDate: new Date(this.equipmentForm.value.purchaseDate),
        lastMaintenance: new Date(this.equipmentForm.value.lastMaintenance),
        maintenanceDate: new Date(this.equipmentForm.value.maintenanceDate),
        statusEquipment: this.equipmentForm.value.statusEquipment,
        equipment_id: 0
      };

      this.ppeService.addConstructionEquipment(equipment).subscribe({
        next: (response) => {
          console.log('Construction Equipment added:', response);
          alert('Construction Equipment added successfully!');
          this.equipmentForm.reset();
        },
        error: (error) => {
          console.error('Error adding Construction Equipment:', error);
          alert('Failed to add Construction Equipment.');
        }
      });
    }
  }
}