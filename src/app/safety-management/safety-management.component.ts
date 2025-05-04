import { Component, OnInit } from '@angular/core';
import { PPE } from './PPE';
import { PPEService } from '../PPE.service';

@Component({
  selector: 'app-safety-management',
  templateUrl: './safety-management.component.html',
  styleUrls: ['./safety-management.component.css']
})
export class SafetyManagementComponent implements OnInit {

  PPE!: PPE[];

  constructor(private ppeService: PPEService) {}

  ngOnInit(): void {
    this.getPPE();
  }

  private getPPE() {
    this.ppeService.getPPEList().subscribe(data => {
      this.PPE = data;
    });
  }

  deletePPE(id: number) {
    this.ppeService.deletePPE(id).subscribe(() => {
      // Filter out the deleted PPE from the list
      this.PPE = this.PPE.filter(ppe => ppe.ppe_id !== id);
    });
  }
}
