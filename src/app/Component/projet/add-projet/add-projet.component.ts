import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Project } from '../../../models/Project';

@Component({
  selector: 'app-add-projet',
  templateUrl: './add-projet.component.html',
  styleUrls: ['./add-projet.component.css']
})
export class AddProjetComponent {

  newProject: Project = new Project('', ''); // Initialized with empty values

  constructor(private apiService: ApiService) {}

  addProject() {
    this.apiService.addProject(this.newProject).subscribe(response => {
      console.log('Project added:', response);
      alert('Project added successfully!');
      this.newProject = new Project('', ''); // Reset form after submission
    });
  }

}
