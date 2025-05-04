import { EquipmentInspection } from "./EquipmentInspection";

export class ConstructionEquipment {
    equipment_id!: number;
    type!: string;
    serialNumber!: string;
    purchaseDate! :Date;
    lastMaintenance!: Date;
    maintenanceDate!: Date;
    statusEquipment!: string;
    //inspections!: EquipmentInspection[];
  
  
    
  }