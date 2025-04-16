import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommandeComponent } from './Component/commande/commande.component';
import { ResourceComponent } from './Component/commande/resource/resource.component'; // Assurez-vous que le chemin est correct
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddRessourceComponent } from './Component/commande/resource/add-ressource/add-ressource.component';
import { UpdateressourceComponent } from './Component/commande/resource/updateressource/updateressource.component';
import { FournisseurComponent } from './Component/commande/fournisseur/fournisseur.component';
import { AddFournisseurComponent } from './Component/commande/fournisseur/add-fournisseur/add-fournisseur.component';
import { UpdatefournisseurComponent } from './Component/commande/fournisseur/updatefournisseur/updatefournisseur.component';
import { FrontressourceComponent } from './Component/commande/frontressource/frontressource.component';
import { PanierComponent } from './Component/commande/panier/panier.component';
import { CommandeHistoriqueComponent } from './Component/commande/commande-historique/commande-historique.component';
import { EquipementComponent } from './Component/commande/frontressource/equipement/equipement.component';
import { UtilisateurComponentComponent } from './Component/commande/utilisateur-component/utilisateur-component.component';
import{ MapTrackingComponent } from './Component/commande/map-tracking/map-tracking.component';



@NgModule({
  declarations: [
    AppComponent,
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
    UtilisateurComponentComponent,
   
   
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
   
  ],
  providers: [ 
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
