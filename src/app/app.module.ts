import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjetComponent } from './Component/projet/projet.component';
import { CommandeComponent } from './Component/commande/commande.component';
import { RHComponent } from './Component/rh/rh.component';
//import { UserComponent } from './Component/user/user.component';
import { RisqueComponent } from './Component/risque/risque.component';
import { TerreComponent } from './Component/terre/terre.component';

import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { HeaderComponent } from './Component/header/header.component';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { FooterComponent } from './Component/footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddProjetComponent } from './Component/projet/add-projet/add-projet.component';
import { FormsModule } from '@angular/forms';
import { UpdateProjetComponent } from './Component/projet/update-projet/update-projet.component';
import { AddRapportComponent } from './Component/projet/add-rapport/add-rapport.component';
import { TaskComponent } from './Component/projet/tasks/tasks.component';
import { AddTaskComponent } from './Component/projet/add-task/add-task.component';
import { RapportComponent } from './Component/projet/rapport/rapport.component';
import { KpiComponent } from './Component/projet/kpi/kpi.component';
import { UserComponent } from './Component/user/user.component';

import { WebcamModule } from 'ngx-webcam';
import { LoginComponent } from './Component/login/login.component';

//import { UserComponent } from './Component/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjetComponent,
    CommandeComponent,
    RHComponent,
    RisqueComponent,
    TerreComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AddProjetComponent,
    UpdateProjetComponent,
    AddRapportComponent,
    TaskComponent,
    AddTaskComponent,
    RapportComponent,
    KpiComponent,
    UserComponent,
    LoginComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
