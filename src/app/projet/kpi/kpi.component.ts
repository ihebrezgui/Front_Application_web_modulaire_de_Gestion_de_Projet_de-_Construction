import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

interface KPI {
  metricName: string;
  metricValue: string;
}

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})
export class KpiComponent implements AfterViewInit, OnInit {
  projectId = 1;
  kpiList: KPI[] = [];
  projectName: string = '';
  projectStatus: string = '';

  @ViewChild('kpiChart') kpiChart: any;
  chart: any;
  progressChart: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    // Charts will be created after data is loaded
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.projectId = id;
      this.fetchProjectStats();
    });
  }

  fetchProjectStats(): void {
    this.apiService.getProjectStats(this.projectId).subscribe(
      (data: KPI[]) => {
        this.kpiList = data;
        
        // Extract specific values
        this.projectName = this.getMetricValue('Projet');
        this.projectStatus = this.getMetricValue('Statut');
        
        // Create charts after data is loaded
        this.createCharts();
      },
      (error) => {
        console.error('Error fetching project stats:', error);
      }
    );
  }

  getMetricValue(metricName: string): string {
    const metric = this.kpiList.find(kpi => kpi.metricName === metricName);
    return metric ? metric.metricValue : '';
  }

  createCharts(): void {
    // Task Distribution Chart
    const totalTasks = parseInt(this.getMetricValue('Total Tasks')) || 0;
    const completedTasks = parseInt(this.getMetricValue('Completed Tasks')) || 0;
    const inProgressTasks = parseInt(this.getMetricValue('In Progress Tasks')) || 0;
    const pendingTasks = parseInt(this.getMetricValue('Pending Tasks')) || 0;
    const avgProgress = this.getMetricValue('Average Task Progress');

    const ctx = this.kpiChart.nativeElement.getContext('2d');
    
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Tasks', 'Completed', 'In Progress', 'Pending'],
        datasets: [{
          label: 'Task Distribution',
          data: [totalTasks, completedTasks, inProgressTasks, pendingTasks],
          backgroundColor: [
            '#4e73df',
            '#1cc88a',
            '#f6c23e',
            '#e74a3b'
          ],
          borderColor: [
            '#4e73df',
            '#1cc88a',
            '#f6c23e',
            '#e74a3b'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `${this.projectName} - Task Distribution`,
            font: {
              size: 16
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });

    // Progress Pie Chart
    const progressValue = parseFloat(avgProgress) || 0;
    const progressCtx = document.getElementById('progressChart') as HTMLCanvasElement;
    
    this.progressChart = new Chart(progressCtx, {
      type: 'doughnut',
      data: {
        labels: ['Completed Progress', 'Remaining'],
        datasets: [{
          data: [progressValue, 100 - progressValue],
          backgroundColor: [
            '#1cc88a',
            '#e74a3b'
          ],
          hoverBackgroundColor: [
            '#17a673',
            '#be2617'
          ],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Average Task Progress: ${avgProgress}`,
            font: {
              size: 14
            }
          },
          legend: {
            position: 'bottom'
          }
        },
        cutout: '80%'
      }
    });
  }
}