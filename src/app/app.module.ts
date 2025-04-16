import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlbViewerComponent } from './glb-viewer/glb-viewer.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CatalogComponent } from './catalog/catalog.component';




@NgModule({
  declarations: [
    AppComponent,
    GlbViewerComponent,
    CatalogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Add this line to recognize model-viewer
})
export class AppModule { }
