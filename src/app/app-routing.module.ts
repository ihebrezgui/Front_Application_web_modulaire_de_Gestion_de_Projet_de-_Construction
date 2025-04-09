import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjetComponent } from './Component/projet/projet.component';
import { HeaderComponent } from './Component/header/header.component';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { FooterComponent } from './Component/footer/footer.component';
import { AddProjetComponent } from './Component/projet/add-projet/add-projet.component';
import { UpdateProjetComponent } from './Component/projet/update-projet/update-projet.component';
import { AddRapportComponent } from './Component/projet/add-rapport/add-rapport.component';
import { TaskComponent } from './Component/projet/tasks/tasks.component';
import { AddTaskComponent } from './Component/projet/add-task/add-task.component';
import { KpiComponent } from './Component/projet/kpi/kpi.component';
import { UserComponent } from './Component/user/user.component';
import { LoginComponent } from './Component/login/login.component';


const routes: Routes = [
  {path: 'projets' ,component:ProjetComponent},
  {path: 'add-projet',component:AddProjetComponent},
  {path: 'update-projet/:id' ,component:UpdateProjetComponent},
  {path: 'add-rapport/:idProjet' ,component:AddRapportComponent} ,
  {path: 'tasks/:id',component:TaskComponent},
  {path: 'add-task/:idProjet',component:AddTaskComponent},
  {path: 'kpi' ,component:KpiComponent},
  {path: 'kpi/:id' ,component:KpiComponent},
  {path: 'user',component:UserComponent},
  {path: 'facelogin' ,component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
