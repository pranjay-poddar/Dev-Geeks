import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Container1Component } from './container1/container1.component';
import { Container2Component } from './container2/container2.component';
import { Container3Component } from './container3/container3.component';
import { Container4Component } from './container4/container4.component';
import { AngularDashboardComponent } from './angular-dashboard/angular-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Container1Component,
    Container2Component,
    Container3Component,
    Container4Component,
    AngularDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
