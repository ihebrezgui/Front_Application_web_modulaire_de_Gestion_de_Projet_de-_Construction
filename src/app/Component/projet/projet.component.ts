import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Project } from '../../models/Project';
import { Rapport } from 'src/app/models/Rapport';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {

  projects:any[] = [];
  selectedProject: Project | null = null; // Store selected project for update

  constructor(private apiService:ApiService,private router: Router){}
  
  ngOnInit(): void {
    this.getProjects();
    this.fetchProjects();
    
  } 

 // Sort projects by name A-Z
 sortByName() {
  this.projects.sort((a, b) => {
    if (a.nomProjet < b.nomProjet) {
      return -1;
    }
    if (a.nomProjet > b.nomProjet) {
      return 1;
    }
    return 0;
  });
}

// Sort projects by date (Date Debut)
sortByDate() {
  this.projects.sort((a, b) => {
    const dateA = new Date(a.dateDebutProjet);
    const dateB = new Date(b.dateDebutProjet);
    return dateA.getTime() - dateB.getTime();
  });
}

  fetchProjects(): void {
    this.apiService.getProjets().subscribe(
      (data: Project[]) => this.projects = data,
      error => console.error('Error fetching projects:', error)
    );
  }

  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.apiService.deleteProject(id).subscribe(() => {
        this.projects = this.projects.filter(p => p.idProjet !== id);
      });
    }
  }

  private getProjects() {
    this.apiService.getProjets().subscribe(data => {
      this.projects = data;
    });
  }

  navigateToUpdate(project: Project): void {
    this.apiService.setSelectedProject(project); // Store the selected project
    this.router.navigate(['/update-projet/:id']); // Navigate to update page
  }

  navigateToRapport(project: Project): void {
    this.apiService.setSelectedProject(project); // Store the selected project
    this.router.navigate(['/u/:id']); // Navigate to update page
  }
  navigateToKpi(project: Project): void {
    this.apiService.setSelectedProject(project); // Store the selected project
    this.router.navigate(['/kpi', project.idProjet]); // Navigate to KPI page
  }
  navigateToTasks(project: Project): void {
    this.apiService.setSelectedProject(project); // Store the selected project
    this.router.navigate(['/tasks', project.idProjet]); // Navigate to tasks page
  }

  navigateToAddTask(project: Project): void {
    this.apiService.setSelectedProject(project); // Store the selected project
    this.router.navigate(['/add-task', project.idProjet]); // Navigate to add task page
  }

}
