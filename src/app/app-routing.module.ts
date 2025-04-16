import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlbViewerComponent } from './glb-viewer/glb-viewer.component';
import { CatalogComponent } from './catalog/catalog.component';


const routes: Routes = [
  {path: 'viewer/:id' ,component:GlbViewerComponent},
  {path: '', component:CatalogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
