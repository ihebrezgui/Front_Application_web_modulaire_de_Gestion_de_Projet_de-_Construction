import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListFactureComponent } from './list-facture/list-facture.component';
import { HttpClientModule } from '@angular/common/http';
import { AddFactureComponent } from './add-facture/add-facture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateFactureComponent } from './update-facture/update-facture.component';
import { ListEcheanceComponent } from './list-echeance/list-echeance.component';
import { AddEcheanceComponent } from './add-echeance/add-echeance.component';
import { ListFactureService } from './list-facture.service';
import { EcheanceService } from './echeance.service';
import { UpdateEcheanceComponent } from './update-echeance/update-echeance.component';
import { ListPaiementComponent } from './list-paiement/list-paiement.component';
import { PaiementService } from './paiement.service';
import { AddPaiementComponent } from './add-paiement/add-paiement.component';

import { PaimentComponent } from './paiment/paiment.component';
import { UpdatePaiementComponent } from './update-paiement/update-paiement.component';

import { NgChartsModule } from 'ng2-charts';
import { UserComponent } from './user/user.component';
import { CalendarComponent } from './calendar/calendar.component';


import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [
    AppComponent,
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
        UserComponent,
        CalendarComponent
    
  
   
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule,
    FullCalendarModule,
    
   
    
  
    ReactiveFormsModule
  ],
  providers: [ListFactureService, EcheanceService,PaiementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
