import { ConstructionEquipment } from "./ConstructionEquipment";
import { PPE } from "./PPE";

export class EquipmentInspection {
    inspectionId!: number;
    inspectionDate!: Date;
    result!: string;
    remarks!: string;
    itemType!: string;
   // equipment_id!: number; // Association with ConstructionEquipment
    //ppe_id!: number; // Association with PPE

    equipment?: ConstructionEquipment;
  ppe?: PPE;

  
    
  }