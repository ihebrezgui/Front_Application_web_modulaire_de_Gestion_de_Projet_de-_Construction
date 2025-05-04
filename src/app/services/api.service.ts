import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/Project';
import { Rapport } from '../models/Rapport';
import { Task } from '../models/Task';


const BASE_URL = 'http://localhost:8091';
interface KPI {
  metricName: string;
  metricValue: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private selectedProject: Project | null = null;

  constructor(private http: HttpClient) { }

  getProjets(): Observable<Project[]> {
    return this.http.get<Project[]>(`${BASE_URL}/project_list`);
  }
  


  getProjetsandTasks(id: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${BASE_URL}/list_projet&tasks`);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${BASE_URL}/ajouterProjet`, project);
  }
  
  
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/delete/${id}`);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/deleteTache/${id}`);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${BASE_URL}/updateProjet/${id}`, project);
  }

  setSelectedProject(project: Project): void {
    this.selectedProject = project;
  }

  getSelectedProject(): Project | null {
    return this.selectedProject;
  }


  addRapport(id: number,rapport: Rapport): Observable<Rapport> {
    return this.http.post<Rapport>(`${BASE_URL}/ajouterRapport/${id}`, rapport);
   } 
   addTaskToProject(id: number, task: Task): Observable<Task> {
    return this.http.post<Task>(`${BASE_URL}/ajouterTache/${id}`, task);
  }


   getTasks(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${BASE_URL}/listtasks/${id}`);
  }
  
  getProjectStats(id: number): Observable<KPI[]> {
    return this.http.get<KPI[]>(`${BASE_URL}/kpis/${id}`);
  }
    
  
  }