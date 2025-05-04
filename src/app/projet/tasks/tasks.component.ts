import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { Task } from 'src/app/models/Task';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-task',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TaskComponent implements OnInit {
  projectId: number = 1;  // Default to 1, will be replaced by route param
  tasks: Task[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!; // Get the project ID from the route
      console.log('Project ID:', id); // Log the project ID
      this.projectId = id;
      this.fetchProjectTasks(); // Fetch tasks for the selected project
    });
  }
  

  fetchProjectTasks(): void {
    this.apiService.getTasks(this.projectId).subscribe(
      (data: Task[]) => {
        console.log('Fetched tasks:', data);
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching project tasks:', error.message || error); // Log the error message
      }
    );
  }
  
  onDeleteTask(id: number | undefined): void {
    if (id === undefined) {
      console.error('Task ID is undefined.');
      return;
    }
  
    if (confirm('Are you sure you want to delete this task?')) {
      this.apiService.deleteTask(id).subscribe(
        () => {
          this.tasks = this.tasks.filter(task => task.idTache !== id);
          console.log(`Task with ID ${id} deleted.`);
        },
        (error) => {
          console.error('Error deleting task:', error.message || error);
        }
      );
    }
  }
  
  

}
