import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, transition, style, animate } from '@angular/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommandeComponent } from './Component/commande/commande.component';
import { RHComponent } from './Component/rh/rh.component';
import { RisqueComponent } from './Component/risque/risque.component';
import { TerreComponent } from './Component/terre/terre.component';
import { ProjetComponent } from './Component/projet/projet.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployeedetailsComponent } from './Component/rh/employe/employeedetails/employeedetails.component';
import { NgChartsModule } from 'ng2-charts';
import { DisponibiliteComponent } from './Component/rh/employe/disponibilite/disponibilite.component';
import { RecrutementComponent } from './Component/rh/recrutement/recrutement/recrutement.component';
import { RecrutementBackComponent } from './Component/rh/recrutement/recrutement-back/recrutement-back.component';
import { UtilisateurComponent } from './Component/user/utilisateur.component';




@NgModule({
  declarations: [
    AppComponent,
    CommandeComponent,
    RHComponent,
    RisqueComponent,
    TerreComponent,
    ProjetComponent,
    DashboardComponent,
    EmployeeComponent,
    AddemployeeComponent,
    UpdateemployeeComponent,
    PerformanceComponent,
    AddPerformanceComponent,
    ListPerformanceComponent,
    ListPerAllComponent,
    AbsenceComponent,
    AddAbsenceComponent,
    ListeAbsenceComponent,
    EmplAbsenceComponent,
    SalaireComponent,
    HistoriqueSalaireComponent,
    DemandeComponent,
    DemandefrontComponent,
    ContactComponent,
    EmployeedetailsComponent,
    DisponibiliteComponent,
    RecrutementComponent,
    RecrutementBackComponent,
    UtilisateurComponent
   

   
  ],
  imports: [
    NgChartsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
animations: [
  trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms ease-in', style({ opacity: 1 })),
    ]),
  ]),
];
