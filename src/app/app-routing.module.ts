import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateFactureComponent } from './update-facture/update-facture.component';
import { AddFactureComponent } from './add-facture/add-facture.component';
import { ListFactureComponent } from './list-facture/list-facture.component';
import { ListEcheanceComponent } from './list-echeance/list-echeance.component';
import { AddEcheanceComponent } from './add-echeance/add-echeance.component';
import { UpdateEcheanceComponent } from './update-echeance/update-echeance.component';
import { ListPaiementComponent } from './list-paiement/list-paiement.component';
import { AddPaiementComponent } from './add-paiement/add-paiement.component';
import { PaimentComponent } from './paiment/paiment.component';
import { UpdatePaiementComponent } from './update-paiement/update-paiement.component';
import { UserComponent } from './user/user.component';
import { CalendarComponent } from './calendar/calendar.component';




const routes: Routes = [
  { path: '', redirectTo: '/factures', pathMatch: 'full' },
  { path: 'factures', component: ListFactureComponent },
  { path: 'echeances', component: ListEcheanceComponent },
  { path: 'addEcheance', component: AddEcheanceComponent },
  { path: 'updateEcheance/:id', component: UpdateEcheanceComponent },
  {path: 'paiements', component: ListPaiementComponent},
  { path: 'addPaiement', component: AddPaiementComponent },
  {path: 'paiment', component: PaimentComponent},
  {path: 'update-paiement /:id', component: UpdatePaiementComponent},
  {path: 'user', component: UserComponent},
  {path: 'calendar', component: CalendarComponent},
 
  

  { path: 'update-facture/:id', component: UpdateFactureComponent },
  { path: 'addFacture', component: AddFactureComponent },  // Changed to camel case for consistency
  { path: '**', redirectTo: '/factures' },  // Catch-all route for undefined paths
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
