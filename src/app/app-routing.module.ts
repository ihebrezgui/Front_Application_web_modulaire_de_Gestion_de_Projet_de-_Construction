import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './Component/rh/employe/employee/employee.component';
import { AddemployeeComponent } from './Component/rh/employe/addemployee/addemployee.component';
import { UpdateemployeeComponent } from './Component/rh/employe/updateemployee/updateemployee.component';
import { PerformanceComponent } from './Component/rh/Performance/performance/performance.component';
import { AddPerformanceComponent } from './Component/rh/Performance/add-performance/add-performance.component';
import { ListPerformanceComponent } from './Component/rh/Performance/list-performance/list-performance.component';
import { ListPerAllComponent } from './Component/rh/Performance/list-per-all/list-per-all.component';
import { AbsenceComponent } from './Component/rh/absence/absence/absence.component';
import { AddAbsenceComponent } from './Component/rh/absence/add-absence/add-absence.component';
import { ListeAbsenceComponent } from './Component/rh/absence/liste-absence/liste-absence.component';
import { EmplAbsenceComponent } from './Component/rh/employe/empl-absence/empl-absence.component';
import { SalaireComponent } from './Component/rh/salaire/salaire/salaire.component';
import { HistoriqueSalaireComponent } from './Component/rh/salaire/historique-salaire/historique-salaire.component';
import { DemandeComponent } from './Component/rh/demande/demande/demande.component';
import { DemandefrontComponent } from './Component/rh/demandefront/demandefront.component';
import { ContactComponent } from './Component/rh/demande/contact/contact.component';
import { EmployeedetailsComponent } from './Component/rh/employe/employeedetails/employeedetails.component';
import { DisponibiliteComponent } from './Component/rh/employe/disponibilite/disponibilite.component';
import { RecrutementComponent } from './Component/rh/recrutement/recrutement/recrutement.component';
import { RecrutementBackComponent } from './Component/rh/recrutement/recrutement-back/recrutement-back.component';
import { UtilisateurComponent } from './Component/user/utilisateur.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent }, 
  { path: 'add-employee', component: AddemployeeComponent},
  { path: 'performance', component: PerformanceComponent }, 
  { path: 'update-employee/:id', component: UpdateemployeeComponent },
  { path: 'add-performance/:id', component: AddPerformanceComponent },
  {path: 'listperformance',component:ListPerformanceComponent},
  {path: 'listperformanceEmpl',component:ListPerAllComponent},
  {path:'absence',component:AbsenceComponent},
  { path: 'addabsence/:id', component: AddAbsenceComponent },
  { path: 'employees/absences', component: ListeAbsenceComponent },
  { path: 'absences/:id', component: EmplAbsenceComponent },
  {path:'salaire',component:SalaireComponent},
  {path:'salairehistorique/:id',component:HistoriqueSalaireComponent},
  { path: 'demande',component:DemandeComponent },
  { path: 'add-demande',component:DemandefrontComponent },
  {path:'send',component:ContactComponent},
  { path: 'employee-details/:id', component: EmployeedetailsComponent },
  {path:'disponibilite',component:DisponibiliteComponent},
  {path:'recrutement',component:RecrutementBackComponent},
  
  {path:'recruter',component:RecrutementComponent},
  {path:'user',component:UtilisateurComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
