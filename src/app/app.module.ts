import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'angular-checklist' }),
    AppRoutingModule,
    ModuleMapLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
