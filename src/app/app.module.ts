import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListterreComponent } from './listterre/listterre.component';
import { AjouterTerreComponent } from './ajouter-terre/ajouter-terre.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsterreComponent } from './detailsterre/detailsterre.component';
import { ListPapierComponent } from './list-papier/list-papier.component';
import { AjouterContratComponent } from './ajouter-contrat/ajouter-contrat.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ScheduleModule, RecurrenceEditorModule,DayService, WeekService, WorkWeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TerrefrontlistComponent } from './terrefrontlist/terrefrontlist.component';
import { PapierfrontComponent } from './papierfront/papierfront.component';
import { DatePipe } from '@angular/common';

import { ContratDetailComponent } from './contrat-detail/contrat-detail.component';

import { UtilisateurComponent } from './utilisateur/utilisateur.component';

import { ClientcontartComponent } from './clientcontart/clientcontart.component';
import { ContratfrontComponent } from './contratfront/contratfront.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { WebcamImage } from 'ngx-webcam';
import { WebcamModule } from 'ngx-webcam';
import { CommandeHistoriqueComponent } from './commande/commande-historique/commande-historique.component';
import { CommandeComponent } from './commande/commande.component';
import { AddFournisseurComponent } from './commande/fournisseur/add-fournisseur/add-fournisseur.component';
import { FournisseurComponent } from './commande/fournisseur/fournisseur.component';
import { UpdatefournisseurComponent } from './commande/fournisseur/updatefournisseur/updatefournisseur.component';
import { EquipementComponent } from './commande/frontressource/equipement/equipement.component';
import { FrontressourceComponent } from './commande/frontressource/frontressource.component';
import { PanierComponent } from './commande/panier/panier.component';
import { AddRessourceComponent } from './commande/resource/add-ressource/add-ressource.component';
import { ResourceComponent } from './commande/resource/resource.component';
import { UpdateressourceComponent } from './commande/resource/updateressource/updateressource.component';
import { AbsenceComponent } from './rh/absence/absence/absence.component';
import { AddAbsenceComponent } from './rh/absence/add-absence/add-absence.component';
import { ListeAbsenceComponent } from './rh/absence/liste-absence/liste-absence.component';
import { ContactComponent } from './rh/demande/contact/contact.component';
import { DemandeComponent } from './rh/demande/demande/demande.component';
import { DemandefrontComponent } from './rh/demandefront/demandefront.component';
import { AddemployeeComponent } from './rh/employe/addemployee/addemployee.component';
import { DisponibiliteComponent } from './rh/employe/disponibilite/disponibilite.component';
import { EmplAbsenceComponent } from './rh/employe/empl-absence/empl-absence.component';
import { EmployeeComponent } from './rh/employe/employee/employee.component';
import { EmployeedetailsComponent } from './rh/employe/employeedetails/employeedetails.component';
import { UpdateemployeeComponent } from './rh/employe/updateemployee/updateemployee.component';
import { AddPerformanceComponent } from './rh/Performance/add-performance/add-performance.component';
import { ListPerAllComponent } from './rh/Performance/list-per-all/list-per-all.component';
import { ListPerformanceComponent } from './rh/Performance/list-performance/list-performance.component';
import { PerformanceComponent } from './rh/Performance/performance/performance.component';
import { RecrutementBackComponent } from './rh/recrutement/recrutement-back/recrutement-back.component';
import { RecrutementComponent } from './rh/recrutement/recrutement/recrutement.component';
import { HistoriqueSalaireComponent } from './rh/salaire/historique-salaire/historique-salaire.component';
import { SalaireComponent } from './rh/salaire/salaire/salaire.component';
import { RHComponent } from './rh/rh.component';


import { trigger, transition, style, animate } from '@angular/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddProjetComponent } from './projet/add-projet/add-projet.component';
import { AddRapportComponent } from './projet/add-rapport/add-rapport.component';
import { AddTaskComponent } from './projet/add-task/add-task.component';
import { KpiComponent } from './projet/kpi/kpi.component';
import { RapportComponent } from './projet/rapport/rapport.component';
import { TaskComponent } from './projet/tasks/tasks.component';
import { UpdateProjetComponent } from './projet/update-projet/update-projet.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProjetComponent } from './projet/projet.component';
import { HeadComponent } from './head/head.component';
import { AddEcheanceComponent } from './add-echeance/add-echeance.component';
import { AddFactureComponent } from './add-facture/add-facture.component';
import { AddPaiementComponent } from './add-paiement/add-paiement.component';
import { ListEcheanceComponent } from './list-echeance/list-echeance.component';
import { ListPaiementComponent } from './list-paiement/list-paiement.component';
import { PaimentComponent } from './paiment/paiment.component';
import { UpdateEcheanceComponent } from './update-echeance/update-echeance.component';
import { UpdateFactureComponent } from './update-facture/update-facture.component';
import { UpdatePaiementComponent } from './update-paiement/update-paiement.component';
import { ListFactureComponent } from './list-facture/list-facture.component';


import { NgChartsModule } from 'ng2-charts';  // Import ng2-charts module
import { CatalogComponent } from './catalog/catalog.component';
import { GlbViewerComponent } from './glb-viewer/glb-viewer.component';

















@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    ListterreComponent,
    AjouterTerreComponent,
    DetailsterreComponent,
    ListPapierComponent,
    AjouterContratComponent,
    CalendarComponent,
    TerrefrontlistComponent,
    PapierfrontComponent,

    ContratDetailComponent,

     UtilisateurComponent,

     ClientcontartComponent,
     ContratfrontComponent,
     ResetPasswordComponent,
     CommandeComponent,
     ResourceComponent,
     AddRessourceComponent,
     UpdateressourceComponent,
     FournisseurComponent,
     AddFournisseurComponent,
     UpdatefournisseurComponent,
     FrontressourceComponent,
     PanierComponent,
     CommandeHistoriqueComponent,
     EquipementComponent,

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

     RHComponent,
ProjetComponent,
     AddProjetComponent,
     UpdateProjetComponent,
     AddRapportComponent,
     TaskComponent,
     AddTaskComponent,
     RapportComponent,
     KpiComponent,
     HeaderComponent,
     SidebarComponent,
     FooterComponent,
     HeadComponent,
     ListFactureComponent,
     AddFactureComponent,
     UpdateFactureComponent,
     ListEcheanceComponent,
     AddEcheanceComponent,
     UpdateEcheanceComponent,
     ListPaiementComponent,
     AddPaiementComponent,
    
     PaimentComponent,
         UpdatePaiementComponent,
         GlbViewerComponent,
    CatalogComponent

  
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DatePipe,    
    ReactiveFormsModule,
    ScheduleModule, RecurrenceEditorModule, BrowserAnimationsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    WebcamModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    NgChartsModule  // Ajouter ChartsModule
    



    
    
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
