import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Project } from '../models/Project';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  projects: Project[] = [];
  endingSoonProjects: Project[] = [];
  showAlert: boolean = true;
  sortDirection: 'asc' | 'desc' = 'asc';
  dateSortDirection: 'asc' | 'desc' = 'asc';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.apiService.getProjets().subscribe({
      next: (data: Project[]) => {
        this.projects = data;
        this.checkDeadlines();
      },
      error: (error) => console.error('Error fetching projects:', error)
    });
  }

  checkDeadlines(): void {
    const today = new Date();
    this.endingSoonProjects = this.projects.filter(project => {
      if (!project.dateFinProjet) return false;
      
      const endDate = new Date(project.dateFinProjet);
      const timeDiff = endDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      return daysDiff > 0 && daysDiff <= 30;
    });
  }

  daysRemaining(endDate: string | Date | undefined): number {
    if (!endDate) return Infinity; // Return large number if no date
    const today = new Date();
    const projectEndDate = new Date(endDate);
    const timeDiff = projectEndDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  sortByName(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.projects.sort((a, b) => {
      const nameA = a.nomProjet?.toLowerCase() || '';
      const nameB = b.nomProjet?.toLowerCase() || '';
      return this.sortDirection === 'asc' 
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }

  sortByDate(): void {
    this.dateSortDirection = this.dateSortDirection === 'asc' ? 'desc' : 'asc';
    this.projects.sort((a, b) => {
      const dateA = a.dateDebutProjet ? new Date(a.dateDebutProjet).getTime() : 0;
      const dateB = b.dateDebutProjet ? new Date(b.dateDebutProjet).getTime() : 0;
      return this.dateSortDirection === 'asc' 
        ? dateA - dateB 
        : dateB - dateA;
    });
  }

  deleteProject(id?: number): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this project?')) {
      this.apiService.deleteProject(id).subscribe({
        next: () => {
          this.projects = this.projects.filter(p => p.idProjet !== id);
          this.checkDeadlines();
        },
        error: (err) => console.error('Error deleting project:', err)
      });
    }
  }

  navigateToUpdate(project: Project): void {
    if (!project.idProjet) return;
    this.router.navigate(['/update-projet', project.idProjet]);
  }

  navigateToKpi(project: Project): void {
    if (!project.idProjet) return;
    this.router.navigate(['/kpi', project.idProjet]);
  }

  navigateToTasks(project: Project): void {
    if (!project.idProjet) return;
    this.router.navigate(['/tasks', project.idProjet]);
  }

  navigateToAddTask(project: Project): void {
    if (!project.idProjet) return;
    this.router.navigate(['/add-task', project.idProjet]);
  }

  closeAlert(): void {
    this.showAlert = false;
  }

  getStatusClass(status?: string): string {
    if (!status) return 'bg-info';
    switch(status.toLowerCase()) {
      case 'completed': return 'bg-success';
      case 'in progress': return 'bg-warning';
      case 'pending': return 'bg-secondary';
      case 'delayed': return 'bg-danger';
      default: return 'bg-info';
    }
  }
}