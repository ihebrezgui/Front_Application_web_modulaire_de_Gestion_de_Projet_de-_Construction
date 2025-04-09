import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
interface KPI {
  metricName: string;
  metricValue: string;
}

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})
export class KpiComponent {
  projectId = 1;  // Replace with the dynamic project ID if needed
  kpiList: KPI[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!; // Get the project ID from the route
      this.projectId = id;
      this.fetchProjectStats(); // Fetch the KPIs for the selected project
    });
  }
  fetchProjectStats(): void {
    this.apiService.getProjectStats(this.projectId).subscribe(
      (data: KPI[]) => {
        this.kpiList = data;
      },
      (error) => {
        console.error('Error fetching project stats:', error);
      }
    );
  }

}
