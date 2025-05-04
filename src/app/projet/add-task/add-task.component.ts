import { Component } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  newTask: Task = {
    descriptionTache: '', 
    dateDebutTache: new Date(),  // Default to today
    dateFinTache: new Date(),
    progresTache: 0, // Set default progress to 0
    statut: 'Pending'
  };
  projectId!: number;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectId = Number(params.get('idProjet'));
    });
  }

  addTask() {
    if (!this.projectId) {
      alert('Project ID is missing!');
      return;
    }

    this.apiService.addTaskToProject(this.projectId, this.newTask).subscribe(response => {
      console.log('Task added:', response);
      alert('Task added successfully!');

      // Reset form after submission
      this.newTask = {
        descriptionTache: '',
        dateDebutTache: new Date(),
        dateFinTache: new Date(),
        progresTache: 0,
        statut: 'Pending'
      };
    });
  }
}
