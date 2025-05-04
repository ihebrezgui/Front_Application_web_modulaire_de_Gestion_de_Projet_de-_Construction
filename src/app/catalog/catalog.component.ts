import { Component, OnInit ,ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';



@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./style.css']
})
export class CatalogComponent implements OnInit {
  models: any[] = [];

  constructor(private supabase:SupabaseService, private router: Router) {}

  ngOnInit(): void {
    this.loadModels();
  }

  async loadModels() {
    this.models = await this.supabase.getAllModels();
  }

  viewModel(modelId: number) {
    this.router.navigate(['/viewer', modelId]);
  }
}
