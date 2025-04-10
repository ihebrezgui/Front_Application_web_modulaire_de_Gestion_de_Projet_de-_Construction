import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CommandeComponent } from './Component/commande/commande.component';
import { ResourceComponent } from './Component/commande/resource/resource.component';
import { AddRessourceComponent } from './Component/commande/resource/add-ressource/add-ressource.component';
import { UpdateressourceComponent } from './Component/commande/resource/updateressource/updateressource.component';
import { Fournisseur } from './Component/commande/fournisseur';
import { FournisseurComponent } from './Component/commande/fournisseur/fournisseur.component';
import { AddFournisseurComponent } from './Component/commande/fournisseur/add-fournisseur/add-fournisseur.component';
import { UpdatefournisseurComponent } from './Component/commande/fournisseur/updatefournisseur/updatefournisseur.component';
import { FrontressourceComponent } from './Component/commande/frontressource/frontressource.component';
import { PanierComponent } from './Component/commande/panier/panier.component';
import { CommandeHistoriqueComponent } from './Component/commande/commande-historique/commande-historique.component';
import { EquipementComponent } from './Component/commande/frontressource/equipement/equipement.component';
import { UtilisateurComponentComponent } from './Component/commande/utilisateur-component/utilisateur-component.component';

const routes: Routes = [
  { path: '', component: CommandeComponent },
  { path: 'resource', component: ResourceComponent },
  { path: 'updateressource/:id', component: UpdateressourceComponent },
  { path: 'updatefournisseur/:id', component: UpdatefournisseurComponent },
  {path:'Fournisseur',component:FournisseurComponent},
  { path: 'add-fournisseur', component:AddFournisseurComponent },
  { path: 'afficher', component:FrontressourceComponent },
  { path: 'panier', component:PanierComponent },
  { path: 'historique', component:CommandeHistoriqueComponent },
  { path: 'add-resource', component:AddRessourceComponent }, 
  { path: 'equipement', component:EquipementComponent }, 
  { path: 'login', component:UtilisateurComponentComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
