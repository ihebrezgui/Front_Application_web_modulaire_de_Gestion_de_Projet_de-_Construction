import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-update-projet',
  templateUrl: './update-projet.component.html',
  styleUrls: ['./update-projet.component.css']
})
export class UpdateProjetComponent implements OnInit {
  project: Project | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.project = this.apiService.getSelectedProject();
    if (!this.project) {
      alert('No project selected!');
      this.router.navigate(['/']); // Redirect if no project is selected
    }
  }

  updateProject(): void {
    if (this.project && this.project.idProjet !== undefined) {
      this.apiService.updateProject(this.project.idProjet, this.project).subscribe(() => {
        alert('Project updated successfully!');
        this.router.navigate(['/']); // Redirect to project list
      });
    } else {
      alert('Invalid project data!');
    }
  }

}
