import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterTerreComponent } from './ajouter-terre/ajouter-terre.component';
import { ListterreComponent } from './listterre/listterre.component';
import { DetailsterreComponent } from './detailsterre/detailsterre.component';
import { ListPapierComponent } from './list-papier/list-papier.component';
import { AjouterContratComponent } from './ajouter-contrat/ajouter-contrat.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TerrefrontlistComponent } from './terrefrontlist/terrefrontlist.component';
import { PapierfrontComponent } from './papierfront/papierfront.component';
import { ContratDetailComponent } from './contrat-detail/contrat-detail.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';

import { ClientcontartComponent } from './clientcontart/clientcontart.component';
import { ContratfrontComponent } from './contratfront/contratfront.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResourceComponent } from './commande/resource/resource.component';
import { CommandeHistoriqueComponent } from './commande/commande-historique/commande-historique.component';
import { AddFournisseurComponent } from './commande/fournisseur/add-fournisseur/add-fournisseur.component';
import { FournisseurComponent } from './commande/fournisseur/fournisseur.component';
import { UpdatefournisseurComponent } from './commande/fournisseur/updatefournisseur/updatefournisseur.component';
import { EquipementComponent } from './commande/frontressource/equipement/equipement.component';
import { FrontressourceComponent } from './commande/frontressource/frontressource.component';
import { MapTrackingComponent } from './commande/map-tracking/map-tracking.component';
import { PanierComponent } from './commande/panier/panier.component';
import { AddRessourceComponent } from './commande/resource/add-ressource/add-ressource.component';
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
import { AddProjetComponent } from './projet/add-projet/add-projet.component';
import { AddRapportComponent } from './projet/add-rapport/add-rapport.component';
import { AddTaskComponent } from './projet/add-task/add-task.component';
import { KpiComponent } from './projet/kpi/kpi.component';
import { ProjetComponent } from './projet/projet.component';
import { TaskComponent } from './projet/tasks/tasks.component';
import { UpdateProjetComponent } from './projet/update-projet/update-projet.component';


import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { CommandeComponent } from './commande/commande.component';
import { AddEcheanceComponent } from './add-echeance/add-echeance.component';
import { AddPaiementComponent } from './add-paiement/add-paiement.component';
import { ListEcheanceComponent } from './list-echeance/list-echeance.component';
import { ListFactureComponent } from './list-facture/list-facture.component';
import { ListPaiementComponent } from './list-paiement/list-paiement.component';
import { PaimentComponent } from './paiment/paiment.component';
import { UpdateEcheanceComponent } from './update-echeance/update-echeance.component';
import { UpdatePaiementComponent } from './update-paiement/update-paiement.component';
import { CatalogComponent } from './catalog/catalog.component';
import { GlbViewerComponent } from './glb-viewer/glb-viewer.component';

/////////////////////commmandeeeee////////


/////////////////////finnnnnnnn commmandeeeee////////


const routes: Routes = [
{path:'listterre',component:ListterreComponent},
{path:'ajouter-terre',component:AjouterTerreComponent},
{path:'detailsterre/:id',component:DetailsterreComponent},
{path:'list-papier/:id',component:ListPapierComponent},
{path:'',redirectTo:'utilisateur',pathMatch:'full'} ,
{path:'contrat/:id',component: AjouterContratComponent},
{path:'calendar',component:CalendarComponent},
{path: 'terrefront',component:TerrefrontlistComponent},
{path:'papier/:id',component:PapierfrontComponent},
{ path: 'detailcontrat/:id', component: ContratDetailComponent },
{path:'utilisateur',component:UtilisateurComponent},

{path:'clientcontart',component:ClientcontartComponent},
{path:'contratfront/:id',component:ContratfrontComponent},
{ path: 'reset-password', component:ResetPasswordComponent },


  {path: 'resource', component: ResourceComponent },
  { path: 'updateressource/:id', component: UpdateressourceComponent },
  { path: 'updatefournisseur/:id', component: UpdatefournisseurComponent },
  {path:'Fournisseur',component:FournisseurComponent},
  { path: 'add-fournisseur', component:AddFournisseurComponent },
  { path: 'afficher', component:FrontressourceComponent },
  { path: 'panier', component:PanierComponent },
  { path: 'historique', component:CommandeHistoriqueComponent },
  { path: 'add-resource', component:AddRessourceComponent }, 
  { path: 'equipement', component:EquipementComponent }, 
  { path: 'tracking/:id', component: MapTrackingComponent },
  { path: 'commande', component:CommandeComponent },
   
  



  { path: 'employe', component: EmployeeComponent },
{ path: 'employees', component: EmployeeComponent },
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

  {path: 'projets' ,component:ProjetComponent},
  {path: 'add-projet',component:AddProjetComponent},
  {path: 'update-projet/:id' ,component:UpdateProjetComponent},
  {path: 'add-rapport/:idProjet' ,component:AddRapportComponent} ,
  {path: 'tasks/:id',component:TaskComponent},
  {path: 'add-task/:idProjet',component:AddTaskComponent},
  {path: 'kpi' ,component:KpiComponent},
  {path: 'kpi/:id' ,component:KpiComponent},


  { path: 'factures', component: ListFactureComponent },
  { path: 'echeances', component: ListEcheanceComponent },
  { path: 'addEcheance', component: AddEcheanceComponent },
  { path: 'updateEcheance/:id', component: UpdateEcheanceComponent },
  {path: 'paiements', component: ListPaiementComponent},
  { path: 'addPaiement', component: AddPaiementComponent },
  {path: 'paiment', component: PaimentComponent},
  {path: 'update-paiement /:id', component: UpdatePaiementComponent},

  {path: 'viewer/:id' ,component:GlbViewerComponent},
  {path: '', component:CatalogComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
